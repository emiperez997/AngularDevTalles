# Sección 7 - GifsApp

## Introducción a la sección

- Vamos a crear una aplicación de gifs.
- Del lado izquierdo va a haber un historial de búsqueda y también un input para buscar gifs.

Temas puntuales:

1. Modularización de la aplicación
2. Estructura de la aplicación de media a gran escala
3. Componentes
4. ViewChild
5. Servicios
6. Historial de búsquedas
7. Uso de Api Keys
8. LocalStorage
9. Peticiones HTTP
10. Animaciones mediante css

## Creación del proyecto

- Como vamos a estar trabajando con módulos, vamos a crear el proyecto con el siguiente comando:

```bash
ng new gifsApp --no-standalone --package-manager pnpm
```

## Diseño y estructura inicial del proyecto

- Tendremos la siguiente estructura de carpetas

```
|- app
|-- gifs
|--- components
|--- services
|--- pages
|-- shared
|--- components
|---- sidenav
```

- Vamos a crear los modulos `gifs` y `shared` con el siguiente comando:

```bash
ng g m gifs
ng g m shared
```

## @ViewChild - Referencia al HTML

- Dentro de nuestro campo de texto, vamos a agregar un `#txtSearch` para poder referenciarlo desde el componente.
- Dentro del parámetro de la función hacemos referencia al input por su id
- Podemos indicar la tecla que se presiona y el valor que tiene el input al momento de presionar la tecla dentro del evento `keyup`.

```html
<input
  id="first_name"
  type="text"
  (keyup)="searchTag(txtTagInput.value)"
  #txtTagInput
/>
```

- El `ViewChild` es muy similar a la función de `querySelector` de JavaScript
- Hace referencia al elemento del DOM que (en este caso) tiene el id `txtTagInput` y lo asigna a la variable `txtTagInput`.
- Para utilizarlo debemos hacer referencia al id del elemento que indicamos en nuestro elemento

```typescript
@ViewChild('txtTagInput')
txtTagInput!: ElementRef<HTMLInputElement>;
```

## GifsService

- La información de los gifs la vamos a obtener de la API de Giphy.
- Es necesario que nosotros tengamos un lugar donde guardar la información de los gifs que vamos a buscar.
- Podemos utilizar el `CLI` para crear el servicio de gifs con el siguiente comando:

```bash
ng g s gifs/services/gifs
```

- Creamos un array donde vamos a guardar el historial de las búsquedas que se realicen.
- Para esto creamos una propiedad privada y un getter para obtener el valor.
- La razón de esto es para que no se pueda modificar el valor del historial desde otro componente.

```typescript
export class GifsService {
  private _tagsHistory: string[] = [];

  constructor() {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }
}
```

- Cuando el `Injectable` esté configurado con `providedIn: 'root'`, le estamos indicando que se puede inyectar en cualquier parte de la aplicación
- Sino colocamos el `provideIn: 'root'`, debemos importar el servicio en el módulo donde lo vayamos a utilizar.

## Giphy Api Key - Giphy Developers

- Para poder utilizar la API de Giphy, debemos registrarnos en su página y obtener una `Api Key`.

- Nos tenemos que registrar en la página de [Giphy Developers](https://developers.giphy.com/) y crear una nueva aplicación para obtener la `Api Key`.
- Seleccionamos la opción de `Create an App` y luego `Giphy API`.
- La otra opción de `Giphy SDK` es para utilizar una librería propia de Giphy para poder utilizarla en nuestro proyecto.

- Para hacer una petición `GET` debemos utilizar el siguiente endpoint:

```bash
https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=SEARCH_QUERY&limit=10&offset=0&rating=g&lang=en
```

- Dentro de nuestro servicio creamos una variable para almacenar la `Api Key` junto con la URL de la API.

```typescript
const GIPHY_API_URL = "https://api.giphy.com/v1/gifs";
const GIPHY_API_KEY = "YOUR_API_KEY";
```

## Realizar una petición HTTP

- Vamos a realizar una petición HTTP para obtener los gifs de la API de Giphy.
- La forma más simple es utilizar el método `fetch` de JavaScript.

```typescript
fetch(`${GIPHY_API_URL}/search?api_key=${GIPHY_API_KEY}&q=${tag}&limit=10`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
  });
```

- Aunque esto resuelve el problema, no es lo más conveniente a la hora de trabajarlo con Angular.
- Angular tiene su propia forma de realizar peticiones HTTP mediante el módulo `HttpClientModule`.
- Este módulo posee muchas ventajas, como la posibilidad de manejar errores, interceptar peticiones y respuestas, entre otras cosas.

- En Angular 19, el `HttpClientModule` está deprecado, para poder utilizarlo debemos inyectar directamente `HttpClient` o usar `provideHttpClient` en el módulo donde lo vayamos a utilizar.

```typescript
@NgModule({
  ...
  providers: [provideHttpClient()],
  ...
})
export class AppModule {}
```

- Luego, en el servicio donde vayamos a utilizarlo, debemos importar el `HttpClient`

```typescript
constructor(private http: HttpClient) {}
```

- A la hora de usarlo, tenemos que `suscribirnos` a la petición para poder obtener la respuesta.

```typescript
this.http
  .get(`${GIPHY_API_URL}/search?api_key=${GIPHY_API_KEY}&q=${tag}&limit=10`)
  .subscribe((response) => {
    console.log(response.data);
  });
```

- También puedo establecer parámetros en la petición, como el `limit`, `offset`, `rating`, etc.

```typescript
const params = new HttpParams()
  .set("api_key", this.api_key)
  .set("limit", "10")
  .set("q", tag);
```

## Colocar un tipo de dato a una respuesta HTTP

- Para poder colocar un tipo de dato a la respuesta de la petición HTTP, debemos crear una interfaz que contenga los datos que vamos a recibir.

- Podemos crear una interfaz utilizando la página de quicktype.io, donde podemos pegar el JSON que nos devuelve la API y nos genera la interfaz automáticamente.

- Una vez creada nuestra interface, podemos importarla y utilizarla en nuestro servicio.

```typescript
this.http
  .get<SearchResponse>(`${this.service_url}/search`, { params })
  .subscribe((response) => {
    console.log(response);
  });
```

- La interface nos sirve para indicar el tipo de dato que vamos a recibir en la respuesta de la API.

## LocalStorage - Persistencia local

- El `localStorage` es una forma de almacenar datos en el navegador del usuario.

- Creamos dos metodos, uno para guardar el historial y otro para obtenerlo.

```typescript
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }
```
