FROM cypress/base:14 AS test
WORKDIR /app
COPY . .
LABEL test=true
# Following line to be removed when Microsoft update their Debian image (Tech Debt Ticket PBI23039)
RUN apt update && apt install -y lz4 && apt clean && rm -rf /var/lib/apt/lists/*
RUN mkdir /testresults
RUN echo 'Building Master Branch'
RUN npm cache clean --force
RUN npm install
RUN npm run test-ci

# base image
FROM node:lts-alpine3.14 AS base
# set working directory
WORKDIR /app
# install and cache app dependencies
COPY . .
LABEL production=true
RUN apk add --no-cache bash
RUN npm cache clean --force
RUN npm install --only=production

FROM base as build
# RUN npm audit --production --registry=https://registry.npmjs.org/ --audit-level=high
ARG ASSETS_PATH
ENV ASSETS_PATH=${ASSETS_PATH}
ARG BLOOMREACH_BASE_URL
ENV BLOOMREACH_BASE_URL=${BLOOMREACH_BASE_URL}
ARG REACT_APP_BLOB_STORAGE_SSR_BASEURL
ENV REACT_APP_BLOB_STORAGE_SSR_BASEURL=${REACT_APP_BLOB_STORAGE_SSR_BASEURL}
RUN npm run build
RUN find /app/build/public/static/js/*.js -exec sed -i -e '/\/\/# sourceMappingURL.*/d' {} +

# start app
CMD ["npm", "run", "start:container"]
