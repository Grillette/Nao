FROM debian:stretch
MAINTAINER Johan Maurel

# Install dependencies
COPY requirements.txt /opt
RUN apt-get update -q && apt-get install -yq --no-install-recommends $(cat /opt/requirements.txt | sed "/^[ \t]*$/d" | grep -v '#' )

RUN curl http://deb.nodesource.com/setup_10.x > setup
RUN chmod +x setup && ./setup
RUN apt-get install -y nodejs

# Cfg dump
COPY site.conf /etc/nginx/sites-available/default

# Project root
RUN mkdir -p /var/www/project

# Wrapper set
COPY wrapper /usr/local/bin
RUN chmod +x /usr/local/bin/wrapper

WORKDIR /var/www/project

CMD ["/usr/local/bin/wrapper"]
