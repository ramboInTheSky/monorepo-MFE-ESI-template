FROM cypress/base:14 AS test
WORKDIR /app
COPY . .
LABEL test=true
RUN mkdir /testresults
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
ARG ASSETS_PATH
ENV ASSETS_PATH=${ASSETS_PATH}
# ARG REACT_APP_CDN_BASEURL
# ENV REACT_APP_CDN_BASEURL=${REACT_APP_CDN_BASEURL}
# ARG REACT_APP_API_BASEURL
# ENV REACT_APP_API_BASEURL=${REACT_APP_API_BASEURL}
# ARG REACT_APP_ENTRYPOINT
# ENV REACT_APP_ENTRYPOINT=${REACT_APP_ENTRYPOINT}
# ARG LOG_LEVEL
# ENV LOG_LEVEL=${LOG_LEVEL}
ARG REACT_APP_BLOB_STORAGE_SSR_BASEURL
ENV REACT_APP_BLOB_STORAGE_SSR_BASEURL=${REACT_APP_BLOB_STORAGE_SSR_BASEURL}
RUN npm run build
RUN find /app/build/public/static/js/*.js -exec sed -i -e '/\/\/# sourceMappingURL.*/d' {} +


# start app
CMD ["npm", "run", "start:container"]
