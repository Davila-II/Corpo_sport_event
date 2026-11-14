#!/bin/bash
set -e

# Adapter le port d'écoute d'Apache selon la variable $PORT injectée par Render (ex: 10000)
PORT="${PORT:-80}"
sed -i "s/Listen [0-9]*/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:[0-9]*>/<VirtualHost \*:${PORT}>/" /etc/apache2/sites-available/000-default.conf

# Vérifier et créer le lien symbolique du stockage public
php artisan storage:link --force || true

# Préparer SQLite si utilisé
if [ "${DB_CONNECTION}" = "sqlite" ] || [ -z "${DB_CONNECTION}" ]; then
    mkdir -p /var/www/html/database
    touch /var/www/html/database/database.sqlite
    chown -R www-data:www-data /var/www/html/database
fi

# Migrations automatiques
if [ "${AUTO_MIGRATE:-true}" = "true" ]; then
    echo ">> Exécution des migrations..."
    php artisan migrate --force || true

    if [ "${AUTO_SEED:-false}" = "true" ]; then
        echo ">> Exécution des seeders..."
        php artisan db:seed --force || true
    fi
fi

# Mettre en cache pour des performances maximales
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

exec "$@"
