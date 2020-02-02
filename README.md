# Taller 1 - Aplicaciones Progresivas</h1>
<h2><u>Herramientas implementadas</u></h2>
<p>PouchDB
  <br>Workbox
  <br>Glitch
</p>
<h2><u>Reportes</u></h2>
<h3>Inicial</h3>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/image1.png?raw=true" width=50% height=50%>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/image3.png?raw=true" width=50% height=50%>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/image2.png?raw=true" width=50% height=50%>
<h3>Final</h3>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/img1.png?raw=true" width=50% height=50%>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/img2.png?raw=true" width=50% height=50%>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/img3.png?raw=true" width=50% height=50%>
<h2><u>Justificación</u></h2>
<p>(F2) Las estaciones seleccionadas por el usuario fueron almacenadas en PouchDB, la cual permite almacenar datos localmente y consultarlos, así no haya conexión a internet. (F1) A partir de esto, se implementó las consultas a PouchDB para retornar los Timetables, compuestos por un key y un label, previamente seleccionados por el usuario. De esta forma se garantiza que al hacer un reload de la página, el usuario pueda obtener las preferencias que ya había seleccionado.</p>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/img4.png?raw=true" width=10% height=10%>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/img5.png?raw=true" width=50% height=50%>
<p>(F3) En el Service Worker, se hizo uso de Workbox para el precache de la página. Esto quiere decir, que se almacena en cache todos los archivos estáticos necesarios para construir el shell de la aplicación. (F4) Adicionalmente, Workbox permitió hacer el routing del consumo del servicio REST de las peticiones que iniciaran por &nbsp;
  <a href="https://api-ratp.pierre-grimaud.fr/,">https://api-ratp.pierre-grimaud.fr/,</a> usando la estrategia StaleWhileRevalidate, guardando así en cache los horarios de las estaciones que hayan sido seleccionadas.
</p>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/img6.png?raw=true" width=10% height=10%>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/img7.png?raw=true" width=50% height=50%>
<img src="https://github.com/idromero556/ImagenesTaller1Pruebas/blob/master/img8.png?raw=true" width=50% height=50%>
<p>(F5) Se hicieron las adiciones necesarias de código para integrar nativamente las aplicaciones de Android y iOS, y se hizo una prueba de instalación en un iPhone 6 obteniendo así una aplicación totalmente funcional.</p>
<p>(F6) El despliegue se hizo en Glitch. Se puede consular desde el siguiente enlace: 
  <a data-fr-linked="true" href="https://glitch.com/~idromero556-taller1entregable">https://glitch.com/~idromero556-taller1entregable</a> &nbsp;
</p>
<p>
  <br>
</p>
