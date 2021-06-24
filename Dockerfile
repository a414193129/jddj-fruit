FROM node:lts-alpine
LABEL maintainer="wgg <kingw0814@gmail.com>"
CMD ["/bin/sh"]
ARG REPO=github
ARG REPO_URL=github.com
ARG JD_SCRIPTS=jd_scripts
ARG JD_SCRIPTS_BRANCH=main
ARG JD_SCRIPTS_HOST=jd_scripts_github
RUN mkdir -p /jd/jbot
COPY ./bin /bin
COPY ./etc /etc
COPY ./init / 
COPY ./libexec /libexec
COPY ./usr/ /usr/
WORKDIR /jd / # buildkit
COPY ./jbot/ /jdjbot
COPY ./s6-overlay /jd/s6-overlay
COPY ./jcode.sh /jd/jcode.sh
COPY ./jcsv.sh /jd/jcsv.sh
COPY ./jlog.sh /jd/jlog.sh
COPY ./jshare.sh /jd/jshare.sh
COPY ./jtask.sh /jd/jtask.sh
COPY ./jup.sh /jd/jup.sh
COPY ./mtask.sh /jd/mtask.sh
COPY ./notify.js /jd/notify.js
COPY ./otask.sh /jd/otask.sh
COPY ./sample /jd/sample
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    LANG=zh_CN.UTF-8 \
    SHELL=/bin/bash \
    PS1="\u@\h:\w \$ " \
    JD_DIR=/jd \
    ENABLE_HANGUP=true \
    ENABLE_WEB_PANEL=true\
    JD_SCRIPTS_URL=https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts.git
RUN REPO=github REPO_URL=github.com JD_SCRIPTS=jd_scripts JD_SCRIPTS_BRANCH=main JD_SCRIPTS_HOST=jd_scripts_github 
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories     \
	&& echo "========= 安装软件 ========="     \
	&& apk update -f     \
	&& apk upgrade     \
	&& apk --no-cache add -f bash coreutils diffutils git wget curl nano tzdata perl openssh-client nodejs-lts npm     \
	&& echo "========= 修改时区 ========="     \
	&& ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime     \
	&& echo "Asia/Shanghai" > /etc/timezone     \
	&& echo "========= 安装PM2 ========="     \
	&& npm install -g pm2     \
	&& echo "========= 创建软链接 ========="     \
	&& ln -sf $JD_DIR/jtask.sh /usr/local/bin/jtask     \
	&& ln -sf $JD_DIR/jtask.sh /usr/local/bin/otask     \
	&& ln -sf $JD_DIR/jtask.sh /usr/local/bin/mtask     \
	&& ln -sf $JD_DIR/jup.sh /usr/local/bin/jup     \
	&& ln -sf $JD_DIR/jlog.sh /usr/local/bin/jlog     \
	&& ln -sf $JD_DIR/jcode.sh /usr/local/bin/jcode     \
	&& ln -sf $JD_DIR/jcsv.sh /usr/local/bin/jcsv     \
	&& if [ -d /etc/cont-init.d ]; then             rm -rf /etc/cont-init.d;        fi     \
	&& if [ -d /etc/services.d ]; then             rm -rf /etc/services.d;        fi     \
	&& ln -sf $JD_DIR/s6-overlay/etc/cont-init.d /etc/cont-init.d     \
	&& ln -sf $JD_DIR/s6-overlay/etc/services.d /etc/services.d     \
	&& echo "========= 清理 ========="     \
	&& rm -rf /root/.npm /var/cache/apk/* # buildkit
WORKDIR /jd
ENTRYPOINT ["/init"]