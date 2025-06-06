# Sistema de Mensajería

## Descripción

Sistema de mensajería distribuido que permite la publicación y consumo de notificaciones de manera asíncrona.

## Tecnologías Utilizadas

- **NestJS** - Framework de Node.js para aplicaciones escalables
- **MongoDB** - Base de datos NoSQL para almacenamiento de datos
- **RabbitMQ** - Message broker para gestión de colas de mensajes
- **Docker** - Containerización de la aplicación

## Arquitectura del Proyecto

El sistema está dividido en dos componentes principales:

### 📁 notification-publisher

Servicio encargado de publicar mensajes en las colas de RabbitMQ.

### 📁 notification-consumer

Servicio encargado de consumir y procesar los mensajes de las colas.

## Instalación y Configuración

### Paso 1: Configurar Variables de Entorno

Crear el archivo `.env` basándose en el template proporcionado:

```bash
cp .env.template .env
```

Editar el archivo `.env` con los valores correspondientes a tu entorno.

### Paso 2: Ejecutar el Sistema

Ejecutar el siguiente comando para levantar todos los servicios:

```bash
docker-compose up
```

Para ejecutar en segundo plano:

```bash
docker-compose up -d
```

## Documentación de la API

Una vez que el sistema esté ejecutándose, puedes acceder a la documentación interactiva de la API en:

🔗 **http://localhost:5000/api**

Esta documentación incluye:

- Endpoints disponibles
- Esquemas de request/response
- Ejemplos de uso
- Posibilidad de probar las APIs directamente

## Comandos Útiles

### Detener el sistema

```bash
docker-compose down
```

### Ver logs de los servicios

```bash
docker-compose logs -f
```

### Ver logs de un servicio específico

```bash
docker-compose logs -f notification-publisher
docker-compose logs -f notification-consumer
```

### Reconstruir los contenedores

```bash
docker-compose up --build
```

## Estructura de Carpetas

```
├── notification-publisher/     # Servicio publicador
├── notification-consumer/      # Servicio consumidor
├── docker-compose.yml         # Configuración de Docker Compose
├── .env.template             # Template de variables de entorno
└── README.md                # Esta documentación
```

## Puertos por Defecto

- **API Documentation**: http://localhost:5000/api
- **Publisher Service**: Puerto 5000
- **MongoDB**: Puerto 27017
- **RabbitMQ Management**: Puerto 15672

## Soporte

Para reportar problemas o solicitar nuevas funcionalidades, por favor crear un issue en el repositorio del proyecto.
