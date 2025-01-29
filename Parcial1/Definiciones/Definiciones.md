**Alumna: Leysly Yarismet Mendoza Flores.**    
**#Control: 21100248**    
**Materia: Desarrollo API REST**   
**Octavo semestre**   
# DEFINICIONES
## *¿Qué es una API?* 
Su significado es **Application Programming Interface** y es un conjunto de funcionalidades o recursos 
de un sistema con el que podemos interactuar desde otro sistema. Trabaja con una capa de abstracción por lo que no importa el lenguaje de programación en el que esté escrito. 

Las APIs son muy flexibles y versátiles, permitiendo ser la fuente de datos de cualquier tipo de aplicación, permitiendo a los desarrolladores separar la fuente de datos (generalmente asociado al back-end) de la presentación de dichos datos al usuario final (usualmente llamado front-end). 

### Algunas ventajas que tiene son: 
* Puede reutilizar el back-end en la arquitectura de tu aplicación y sólo tendrías que crear los clientes front-end (web, móvil, desktop...).
* Puede comunicar dos aplicaciones con tecnologías totalmente distintas, por ejemplo una app Android hecha con Java o Kotlin, se comunica con una aplicación web hecha con C# o PHP.
* Nos permite realizar abstracciones, es decir aprovechar el uso de un software sin conocer cómo funciona éste internamente, sólo conocer las funcionalidades que el API expone, y además sin generar fuertes dependencias, sino mas bien un desacoplamiento.
## *¿Qué es REST?*
Sus siglas significan **Representational State Transfer** y es un estilo de arquitectura de software para realizar la comunicación cliente-servidor. Utiliza el protocolo **HTTP** para lograr la comunicación con el servidor y los mensajes que se envían pueden estar en *XML* o *JSON*. 

### Principios de REST 
* Interfaz uniforme: Esta basado en recursos y estos deben ser sustantivos en plural por ejemplo: libros, alumnos, peliculas, etc.
* Stateless: REST no tiene estados, esto quiere decir que una llamada al API es independiente de otra llamada y no depende de ella, sin embargo sí se puede usar caché para reducir el tiempo de espera en consultas GET.
* Operaciones específicas: Cada acción u operacion sobre un recurso está bien definido y tiene un claro propósito, no es "multifuncional" si un endpoint por ejemplo es para insertar nuevos clientes, no debería también insertar pedidos.
* Sintaxis estandarizada: Cada recurso es accesibe únicamente desde su URI.
* Cliente-Servidor: El servidor hace el procesamiento del API y expone los recursos a uno o muchos clientes, que pueden ser una aplicación de escritorio, una página web, etc. El cliente debe ser independiente del servidor y toda comunicación a él se debe dar mediante el API. 

## *¿Qué es RESTFUL?* 
**RESTful** es solo la implementación de la arquitectura **REST**. 
**API RESTful** es una API que fue diseñada usando la arquitectura REST. 
