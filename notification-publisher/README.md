# Project Template

## Descripción

Plantilla para generación de nuevos proyectos.
Cumple con los siguientes acuerdos de programación:

- [x] Alias @src/
- [x] Eslint y Prettier en precommit con husky
- [x] Manejo de variables de entorno con @nestjs/config
- [x] Manejo de BD relacionales con typeorm
- [x] Manejo de solicitudes http con axios
- [x] Versionamiento en controladores
- [x] CI/CD con gitlab
- [ ] Validaciones de DTOs con class-validator
- [ ] Manejo de mongo DB con mongoose
- [ ] Documentación con swagger
- [ ] Manejo de colas en rabbitmq con amqplib
- [x] Implementación de log

## Instalación

```bash
$ yarn install
```

## Configuración de Precommit

```bash
$ yarn prepare
```

## Configuración de variables de entorno

Crear a partir del archivo .env.template el archivo .env y agregar los valores indicados

## Ejecución del proyecto

```bash
# local
$ yarn start:local
```

## Manejo de variables de entorno

Las variables de entorno se deben gestionar en tres archivos .env .env.development y .env.production.
Se debe tomar de modelo el archivo .env.template para crear el archivo .env

### .env

En el archivo .env debe ir todas las variables (apis, keys, etc) sin embargo este archivo no debe subirse al repositorio

### .env.dev y .env.prod

En los archivos .env.dev y .env.prod solo deben ir varibales que no tengan un nivel se secreto (usuarios y claves), sin embargo si se deben registrar en el archivo docker-compose.yml.

## License

[MIT licensed](LICENSE).
