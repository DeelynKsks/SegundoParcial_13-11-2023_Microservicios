# Segundo Parcial - Microservicios

### Desarrollo del trabajo práctico de nota superior de Docker Swarm - Fernández Jeremías

Este proyecto consta de cuatro servicios: `app_service`, `database_service`, `rest_service` y `soap_service`.

## Construcción de las imágenes Docker

Primero hay que asegurarse de inicializar `docker swarm`, utilizando el siguiente comando:

```bash
docker swarm init
```

Para construir las imágenes Docker para cada servicio, primero hay que posicionarse en la carpeta del repositorio, y utilizar los siguientes comandos:

```bash
docker build -t app ./app_service
docker build -t database ./database_service
docker build -t rest ./rest_service
docker build -t soap ./soap_service
```
## Despliegue de servicios

Luego vamos a desplegar los servicios con Docker Swarm, utilizando el siguiente comando:

```bash
docker stack deploy -c docker_compose.yml segundo_parcial
```

## Uso de la aplicación

Una vez desplegadas las réplicas de los servicios correspondientes, podemos ingresar a "http://localhost:80".
Donde principalmente tendrá un formulario para cargar los datos de una persona, y debajo tendrá una lista actualizable que contendrá los datos de las personas ingresadas.

En la consola del navegador podrá ver como estos datos están estructurados y consultar por su propia cuenta que son correctos.

## Detener los servicios

Una vez que haya terminado de utilizar la aplicación, puede detener los servicios usando el siguiente comando:

```bash
docker stack rm segundo_parcial
```

Y posteriormente, puede eliminar las imágenes.