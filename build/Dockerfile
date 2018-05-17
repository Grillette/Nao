FROM debian:stretch
MAINTAINER Johan Maurel

# Install dependencies
COPY requirements.txt /opt
RUN apt-get update -q && apt-get install -yq --no-install-recommends $(cat /opt/requirements.txt | sed "/^[ \t]*$/d" | grep -v '#' )

RUN curl http://deb.nodesource.com/setup_10.x > setup
RUN chmod +x setup && ./setup
RUN apt-get install -y nodejs

RUN a2enmod php7.0
RUN a2enmod rewrite

RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php/7.0/apache2/php.ini
RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php/7.0/apache2/php.ini

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

RUN mkdir -p /var/www/project

# Wrapper set
COPY wrapper /usr/local/bin
RUN chmod +x /usr/local/bin/wrapper

WORKDIR /var/www/project

CMD ["/usr/local/bin/wrapper"]
