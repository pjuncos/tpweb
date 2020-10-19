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

### Usuarios
* Lista `GET /users`
* Consultar un usuario `GET /users/:id`
* Alta `POST /users`
* Baja `DELETE /users/:id`
* Modificar `PUT /users/:id`

### Productos
* Lista `GET /products`
* Consultar un producto `GET /products/:id`
* Alta `POST /products`
* Baja `DELETE /products/:id`
* Modificar `PUT /products/:id`

### Promociones
* Lista `GET /combos`
* Consultar una prmoción `GET /combos/:id`
* Alta `POST /combos`
* Baja `DELETE /combos/:id`
* Modificar `PUT /combos/:id`

### Clientes
* Lista `GET /clients`
* Consultar un cliente `GET /clients/:id`
* Alta `POST /clients`
* Baja `DELETE /clients/:id`
* Modificar `PUT /clients/:id`

### Pedidos
* Lista `GET /orders`
* Consultar un pedido `GET /orders/:id`
* Alta `POST /orders`
* Modificar `PUT /orders/:id`
