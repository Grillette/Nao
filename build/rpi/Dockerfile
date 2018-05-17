FROM resin/rpi-raspbian:stretch
MAINTAINER Johan Maurel

# Install dependencies
COPY requirements.txt /opt
RUN apt-get update -q && apt-get install -yq --no-install-recommends $(cat /opt/requirements.txt | sed "/^[ \t]*$/d" | grep -v '#' ) \
      && rm -rf /var/lib/apt/lists/* \
      && apt-get clean

RUN a2enmod php7.0
RUN a2enmod rewrite

RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php/7.0/apache2/php.ini
RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php/7.0/apache2/php.ini

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

ADD ../apache-config.conf /etc/apache2/sites-enabled/000-default.conf

# gpg keys listed at https://github.com/nodejs/node
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    56730D5401028683275BD23C23EFEFE93C4CFFFE \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.1.3

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-armv6l.tar.gz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-armv6l.tar.gz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xzf "node-v$NODE_VERSION-linux-armv6l.tar.gz" -C /usr/local --strip-components=1 \
&& rm "node-v$NODE_VERSION-linux-armv6l.tar.gz" SHASUMS256.txt SHASUMS256.txt.asc

RUN mkdir -p /var/www/project

# Wrapper set
COPY ../wrapper /usr/local/bin
RUN chmod +x /usr/local/bin/wrapper

WORKDIR /var/www/project

CMD ["/usr/local/bin/wrapper"]