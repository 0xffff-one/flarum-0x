FROM ranadeeppolavarapu/nginx-http3:latest

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    echo "Asia/Shanghai" > /etc/timezone

RUN apk add openssl \
    && openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt \
           -subj "/C=CN/ST=Warwickshire/L=Leamington/O=OrgName/OU=IT Department/CN=0xffff.one" \
    && apk del openssl \
    && rm /var/cache/apk/*
