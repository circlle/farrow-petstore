FROM node:14.15.4

WORKDIR /code

COPY . .

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]