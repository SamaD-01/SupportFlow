ARG PHP_VERSION=8.4
FROM composer:2 AS composer_stage
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-progress --prefer-dist --optimize-autoloader

FROM php:${PHP_VERSION}-fpm AS backend

RUN apt-get update && apt-get install -y \
        libpq-dev \
        libzip-dev \
        libicu-dev \
        unzip \
        git \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo pdo_pgsql zip opcache intl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY --from=composer_stage /app/vendor ./vendor
COPY . .

RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var

EXPOSE 9000
CMD ["php-fpm"]