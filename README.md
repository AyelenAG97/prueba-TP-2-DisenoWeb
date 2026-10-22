# Reparto de Agua - TP Entregable Angular

Migración del TP de JavaScript a Angular. ABM de clientes de reparto de agua
consumiendo una API creada en MockAPI (https://mockapi.io).

Endpoints del recurso `clientes`:

- (GET) /clientes -> listado de todos los clientes
- (POST) /clientes -> agrega un cliente
- (PUT) /clientes/{id} -> actualiza un cliente
- (DELETE) /clientes/{id} -> borra un cliente

## Antes de ejecutar

Reemplazar la URL en `src/app/services/clientes-service.ts` por el endpoint
del recurso `clientes` creado en MockAPI.

## Ejecutar

```bash
npm install
ng serve
```

Abrir `http://localhost:4200/`.
