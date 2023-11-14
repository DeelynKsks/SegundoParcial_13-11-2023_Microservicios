FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache add netcat-openbsd

RUN npm install

COPY . .