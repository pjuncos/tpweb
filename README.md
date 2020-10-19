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

###Productos
* Lista `GET /api/producto`
* Consultar un producto `GET /api/producto/:id`
* Alta `POST /api/producto`
* Baja `DELETE /api/producto/:id`
* Modificar `PUT /api/producto/:id`


