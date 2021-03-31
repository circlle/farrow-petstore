FROM node:14.15.4

WORKDIR /code

COPY package.json package.json

COPY yarn.lock yarn.lock

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn

RUN yarn build