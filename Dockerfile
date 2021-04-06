FROM node:14.15.4 as base

WORKDIR /code

COPY . .

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn

RUN --mount=type=secret,id=SERVER_HOST cat /run/secrets/SERVER_HOST

FROM base as prod
RUN yarn build
CMD [ "yarn", "start" ]

FROM base as dev
CMD ["yarn", "dev"]