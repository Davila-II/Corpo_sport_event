#!/bin/bash
set -e

# Adapter le port d'écoute d'Apache selon la variable $PORT injectée par Render (ex: 10000)
PORT="${PORT:-80}"
sed -i "s/Listen [0-9]*/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:[0-9]*>/<VirtualHost \*:${PORT}>/" /etc/apache2/sites-available/000-default.conf

# Vérifier la validité de l'APP_KEY (doit commencer par base64:)
if [ -z "${APP_KEY}" ] || [[ "${APP_KEY}" != base64:* ]]; then
    echo ">> APP_KEY manquante ou invalide, génération d'une clé sécurisée..."
    export APP_KEY=$(php artisan key:generate --show)
fi

# Vérifier et créer le lien symbolique du stockage public
php artisan storage:link --force || true

# S'assurer que les assets Filament sont publiés
php artisan filament:assets || true

# Préparer SQLite si utilisé
if [ "${DB_CONNECTION}" = "sqlite" ] || [ -z "${DB_CONNECTION}" ]; then
    mkdir -p /var/www/html/database
    touch /var/www/html/database/database.sqlite
    chmod 777 /var/www/html/database
    chmod 666 /var/www/html/database/database.sqlite
fi

# Attendre la disponibilité de la base de données externe (PostgreSQL / MySQL)
if [ "${DB_CONNECTION}" = "pgsql" ] || [ "${DB_CONNECTION}" = "mysql" ]; then
    echo ">> Vérification de la connexion à la base de données..."
    for i in {1..20}; do
        if php artisan db:show > /dev/null 2>&1; then
            echo ">> Connexion à la base de données réussie !"
            break
        fi
        echo ">> En attente de la base de données ($i/20)..."
        sleep 2
    done
fi

# Migrations automatiques
if [ "${AUTO_MIGRATE:-true}" = "true" ]; then
    echo ">> Exécution des migrations..."
    php artisan migrate --force || true

    if [ "${AUTO_SEED:-false}" = "true" ]; then
        echo ">> Exécution des seeders..."
        php artisan db:seed --force || true
    fi

    # Création automatique garantie du compte administrateur
    php artisan db:seed --class=Database\\Seeders\\AdminUserSeeder --force || true
fi

# Préparer les répertoires de stockage essentiels
mkdir -p /var/www/html/storage/framework/sessions /var/www/html/storage/framework/views /var/www/html/storage/framework/cache /var/www/html/storage/logs /var/www/html/storage/app/public
chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
if [ -f /var/www/html/database/database.sqlite ]; then
    chmod 664 /var/www/html/database/database.sqlite
fi

# Recharger les caches Laravel
php artisan config:clear || true
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

exec "$@"
