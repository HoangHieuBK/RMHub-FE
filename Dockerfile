FROM node:10.16.3-alpine as nodejs

RUN mkdir -p /var/www/rmhub.com/dist

WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ./ ./

RUN npm run rmhub:build

FROM httpd:2.4.41-alpine as rmhub-ui

EXPOSE 80
COPY --from=nodejs /var/www/rmhub.com/dist /usr/local/apache2/htdocs/
WORKDIR /usr/local/apache2/htdocs/
