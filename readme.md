
# Miga Real - Guía de Ejecución Local

Este sistema está diseñado para correr de forma local y gratuita utilizando Docker.

## Instrucciones para PC Host (Servidor)

1. **Instalar Docker**: Descarga e instala Docker Desktop para Windows o Mac.
2. **Clonar/Descargar**: Coloca todos los archivos en una carpeta llamada `miga-real`.
3. **Lanzar Sistema**: Abre una terminal en esa carpeta y ejecuta:
   ```bash
   docker-compose up -d
   ```
4. **Acceder**: Abre tu navegador en `http://localhost:5173`.

## Instrucciones para Sincronización (Segunda PC)

Para que ambas computadoras vean lo mismo:
1. Asegúrate de que ambas estén en la **misma red Wi-Fi/LAN**.
2. Obtén la IP local de la computadora Host (ej: `192.168.1.50`).
3. En la segunda computadora, entra al navegador y escribe: `http://192.168.1.50:5173`.
4. ¡Listo! Cualquier cambio se reflejará si implementas una base de datos central (en este MVP usamos LocalStorage para rapidez, pero el Docker ya está listo para conectar con un Backend SQLite).

## Notas Técnicas
- El sistema usa **React + Tailwind** para la interfaz.
- Los módulos de **Producción** calculan automáticamente los insumos basados en el criterio de 1/2 docena (6 unidades).
- El módulo **B2B** aplica descuentos de distribuidor automáticamente.
