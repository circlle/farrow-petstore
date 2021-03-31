FROM node:14.15.4 as base

WORKDIR /code

COPY . .

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn


FROM base as prod
RUN yarn build
CMD [ "yarn", "start" ]

FROM base as dev
CMD ["yarn", "dev"]