FROM php:8.4-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Outil d'installation officiel des extensions PHP
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Extensions requises par Laravel 13, Filament 5 et les bases de données (MySQL, PostgreSQL, SQLite)
RUN install-php-extensions \
    pdo_mysql \
    pdo_pgsql \
    pdo_sqlite \
    intl \
    zip \
    bcmath \
    gd \
    opcache

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configurer Apache pour pointer sur le dossier public de Laravel
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && a2enmod rewrite

WORKDIR /var/www/html

# Mettre en cache les dépendances Composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --ignore-platform-req=php+

# Copier le code source de l'application
COPY . .

# Générer l'autoloader optimisé pour la production
RUN composer dump-autoload --optimize --no-dev

# Permissions pour www-data
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Point d'entrée
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
