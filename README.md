# TP Arquitectura Web

Integrantes
-----------
* Pablo Juncos

Negocio
-------
La aplicación maneja la venta de comidas que realiza una Pyme a clientes registrados.

La empresa mantiene un catálogo de los productos que se ofrecen y de ellos se tiene 
la descripción, precio, foto y el stock actual.

También mantiene promociones que consisten en combinación de diferentes productos.

Para poder realizar una compra los usuarios deben registrarse previamente ingresando los datos
personales y domicilio para los envíos.

Cada compra se abona en efectivo al recibir el pedido o al retirarlo en el negocio.

Endpoints
---------

### Productos
* Lista `GET v1/products`
  * Lista por estado `GET v1/products?status=:status1, :statusN`
* Consultar un producto `GET v1/products/:id`
* Alta `POST v1/products`
* Baja `DELETE v1/products/:id`
* Modificar `PUT v1/products/:id`
#### Imagenes
* Agregar Imagen a producto `POST v1/products/:id/images`
* Lista Imagenes de producto `GET v1/products/:id/images`
* Eliminar imagen de producto `DELETE v1/products/:id/images/:imageId`
* Consultar imagen de producto `GET v1/products/:id/images/:imageId`
* Actualizar titulo de imagen de producto `PATCH v1/products/:id/images/:imageId`

### Clientes
* Lista `GET /clients`
* Consultar un cliente `GET /clients/:id`
* Alta `POST /clients`
* Baja `DELETE /clients/:id`
* Modificar `PUT /clients/:id`

### Pedidos
* Lista `GET /orders`
  * Pedidos pendientes `GET /orders?status=PENDING`
  * Pedidos entregados `GET /orders?status=DELIVERED`
* Consultar un pedido `GET /orders/:id`
* Alta `POST /orders`
* Cambiar estado `PATCH v1/products/:id/images/:imageId`

