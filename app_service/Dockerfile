# Fase de construcción
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Fase de ejecución
FROM nginx:alpine

# Suponiendo que la salida de la construcción está en el directorio "dist"
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
