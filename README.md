<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


1. Instalar dependencias
```
yarn
```

2. Copiar __.env.template__, renombrar a __.env__ y cambiar variables de entorno 

3. Cambiar el __container_name__ en __docker-compose.yaml__

4. Levantar database
```
docker compose up -d
```

5. Levantar aplicación 
```
yarn start:dev
```