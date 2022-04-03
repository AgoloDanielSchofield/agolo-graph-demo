#--------
# BUILD
#--------
FROM node:14.17.5-alpine3.14 as base


WORKDIR /src
COPY package.json package.json yarn.lock
COPY package-lock.json package-lock.json yarn.lock
COPY . .
RUN npm i
RUN npm run build

##--------
## W`EBAPP
##--------
FROM nginx:1.17.1-alpine

# run process as agolo user
USER nginx

COPY --from=base /src/build /app/
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
EXPOSE 8080