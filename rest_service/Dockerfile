FROM node:18-alpine

WORKDIR /index

RUN apk --no-cache add netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .