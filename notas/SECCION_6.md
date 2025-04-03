# Sección 6 - Despliegues a producción

- Antes del despliegue hacemos el proceso que se llama `treeshaking` que consiste en eliminar el código muerto y optimizar el código para que pese menos y sea más rápido.
- Generalmente se sube a producción el código minificado

_Temas fundamentales_:

1. Generar build de producción
2. Desplegarlo rápidamente
3. Netlify
4. GitHub Pages
5. npm Scripts para automatizar el proceso

## Generar build de producción

```bash
Initial chunk files | Names         |  Raw size
polyfills.js        | polyfills     |  90.23 kB |
main.js             | main          |  37.16 kB |
styles.css          | styles        |  95 bytes |

                    | Initial total | 127.49 kB
```

- `main.js`: Es el archivo principal de la aplicación, donde se encuentra el código de la misma.
- `polyfills.js`: Es un archivo que contiene código adicional para asegurar la compatibilidad con navegadores más antiguos.
- `styles.css`: Es el archivo de estilos de la aplicación.

- Dentro del `package.json` tenemos un script que se llama `build` que se encarga de crear el build de producción. Este script ejecuta el comando `ng build`.

```bash
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-W6KKN7QG.js      | main          | 259.97 kB |                68.03 kB
polyfills-SC4UBBZS.js | polyfills     |  34.52 kB |                11.28 kB
styles-5INURTSO.css   | styles        |   0 bytes |                 0 bytes

                      | Initial total | 294.49 kB |                79.31 kB
```

- Cada vez que se genere un build, los hashes de los archivos cambiarán. Esto es para asegurar que el navegador descargue la nueva versión del archivo y no use una versión en caché. Esto se hace para evitar problemas de caché y asegurar que el usuario siempre tenga la última versión de la aplicación.

## HttpServer Local y Netlify

- Primero creamos el build del proyecto con el comando `ng build` o `npm run build`.
- Todos los archivos necesarios se guardan en la carpeta `dist`.

- `http-server`: Sirve para levantar un servidor local y ver el proyecto en producción. Se utiliza con el fin de probar la aplicación y no debe usarse en producción. Se puede instalar de manera global o local

```bash
npm install -g http-server
```

- Para levantar el servidor local, debemos localizarnos en la carpeta `dist/nombre-del-proyecto/browser` y ejecutar el siguiente comando:

```bash
http-server -o
```

- Este servidor nos brinda la posibilidad también de poder ver la aplicación en otros dispositivos. Para esto nos brinda una url con nuestra IP local y el puerto 8080. Para poder acceder a la aplicación desde otro dispositivo, debemos asegurarnos de que ambos dispositivos estén conectados a la misma red.

- `Netlify`: Es un servicio que nos permite desplegar nuestras aplicaciones. Es gratuito y muy fácil de usar.
- Debemos arrastrar la carpeta `browser` dentro de `dist/nombre-del-proyecto` a la página de Netlify y automáticamente se desplegará la aplicación.

## GitHub Pages

- Dentro del repositorio que va a contener nuestro código, debemis ir a la pestaña `settings` y luego a la pestaña `pages`.
- Se puede deployar desde una rama, o bien utilizar `github actions` para hacer un deploy automático cada vez que hagamos un push a la rama `main`.
- Deploya desde una carpeta llamada `docs` que debemos crearla y copiar dentro de ella el contenido de la carpeta `dist/nombre-del-proyecto/browser`.

- De entrada este deploy va a presentar un problema porque no va a encontra los archivos `.js` dentro del repositorio.
- Esto es porque se encuentra dentro de la ruta con el nombre del repositorio y no en el proyecto raíz.

- La primera solución es dentro de el archivo raíz `html` cambiar la etiqueta `<base href="/">` por `<base href="./">`.
- Aunque esto soluciona el problema, cada vez que hagamos un build, debemos volver a cambiar la etiqueta `<base>`.

## package.json Scripts

- Dentro del `package.json` podemos crear scripts para automatizar tareas. Se pueden crear scripts para cualquier comando basado en la terminal que estemos usando.
- Vamos a crear un script que nos sirva para el deploy a `GitHub Pages`:

```json
{
  "scripts": {
    // ...
    "build:href": "ng build --base-href ./"
  }
}
```

- `del-cli`: Es una librería que nos permite eliminar archivos y carpetas de manera sencilla.
- Otro script que vamos a crear es para eliminar la carpeta `docs`
- `copyfiles`: Es una librería que nos permite copiar archivos y carpetas de manera sencilla. La vamos a utilizar para copiar los archivos de la carpeta `dist/nombre-del-proyecto/browser` a la carpeta `docs`.

```json
{
  "scripts": {
    // ...
    "delete:docs": "del docs",
    "copy:dist": "copyfiles dist/frontend/browser/* ./docs -f"
  }
}
```

- Para finalizar vamos a crear un comando que ejecute todos los comandos anteriores de manera secuencial.

```json
{
  "scripts": {
    // ...
    "build:github": "npm run delete:docs && npm run build:href && npm run copy:dist"
  }
}
```
