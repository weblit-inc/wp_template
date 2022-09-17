FROM wordpress:latest
RUN apt-get -y update && apt-get install msmtp -yqq
RUN echo 'sendmail_path = /usr/bin/msmtp -a mailcatcher -t' >> /usr/local/etc/php/conf.d/msmtp.ini
