FROM cypress/base:14 as test
WORKDIR /app
COPY . .
LABEL test=true
RUN mkdir /testresults
RUN npm cache clean --force
RUN npm install
RUN npm run test-ci; exit 0
ARG ASSETS_PATH
ENV ASSETS_PATH=${ASSETS_PATH}
RUN npm run build
RUN npm run test:integration

# base image
FROM node:14.16.0-buster-slim AS base
# set working directory
WORKDIR /app
# install and cache app dependencies
COPY . .
RUN npm cache clean --force
# RUN npm audit --production --registry=https://registry.npmjs.org/ --audit-level=high
RUN npm install --only=production

FROM base as build
ARG ASSETS_PATH
ENV ASSETS_PATH=${ASSETS_PATH}
RUN npm run build

# start app
CMD ["npm", "run", "start:container"]