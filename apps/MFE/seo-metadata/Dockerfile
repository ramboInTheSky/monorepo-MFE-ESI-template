# base image
FROM node:lts-alpine3.14 AS base
# set working directory
WORKDIR /app
# install and cache app dependencies
COPY . .
RUN npm cache clean --force
# RUN npm audit --production --registry=https://registry.npmjs.org/ --audit-level=high
RUN npm install

FROM base as build
RUN npm run build

# start app
CMD ["npm", "run", "start"]