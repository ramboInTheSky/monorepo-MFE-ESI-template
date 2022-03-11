FROM cypress/base:14 AS test
WORKDIR /app
COPY . .
LABEL test=true
RUN mkdir /testresults
RUN npm cache clean --force
RUN npm install
RUN npm run test-ci; exit 0

# base image
FROM node:lts-alpine3.14 AS base
LABEL production=true
RUN apk add --no-cache bash
# set working directory
WORKDIR /app
# install and cache app dependencies
COPY . .
RUN npm cache clean --force
# RUN npm audit --production --registry=https://registry.npmjs.org/ --audit-level=high
RUN npm install --only=production

FROM base AS build
ARG ASSETS_PATH
ENV ASSETS_PATH=${ASSETS_PATH}
ARG LOG_LEVEL
ENV LOG_LEVEL=${LOG_LEVEL}
RUN npm run build
RUN find /app/build/public/static/js/*.js -exec sed -i -e '/\/\/# sourceMappingURL.*/d' {} +

# start app
CMD ["npm", "run", "start:container"]