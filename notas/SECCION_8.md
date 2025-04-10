# Sección 8 - Image Loader

- Hasta el momento los gifs de nuestra app aparecen de golpe. Vamos a agregarle una animación de carga.
- También vamos a crear módulos para poder compartir componentes.
- En nuestro caso crearemos en el módulo `Shared` un componente `LazyImage` que se encargará de mostrar una imagen y una animación de carga mientras la imagen no esté lista.

## Pensemos en componentes

- La idea es crear un componente `card` para separarlo de la `card-list`
- En mi caso ya lo había hecho, pero lo refactoricé para que quede todo en un solo componente, sin archivo `.html` ni `.css`.

```typescript
import { Component, Input } from "@angular/core";
import { Gif } from "../../interface/gifs.interfaces";

@Component({
  selector: "gifs-card",
  standalone: false,
  template: `
    <div class="card">
      <div class="card-image">
        <img [src]="gif.images.downsized.url" />
      </div>
      <div class="card-content">
        <span class="card-title">{{ gif.title }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .card {
        width: 250px;
      }
    `,
  ],
})
export class CardComponent {
  @Input()
  public gif!: Gif;

  constructor() {}
}
```

## Solucion a tarea

- Aunque ya lo había hecho, le profesor utilizó `OnInit` para inicializar el gif

```typescript
ngOnInit(): void {
if (!this.gif) throw new Error('Gif property is required');
}

```

## Lazy Image Parte 1

- Este componente lo vamos a implementar o va a estar relacionado con el componente de `card`.
- Vamos a crear el componente con el `CLI`

```bash
ng g c shared/components/lazy-image
```

## Lazy Image - Parte 2

- Nuestro componente debe recibir la propiedad `src` y `alt`.

- Debemos descargar un `svg` con algún loader y guardarlo en la carpeta `public` de nuestro proyecto.
- A la hora de llamarlo en nuestro componente simplemente lo agregamos en el `src` de la etiqueta `img`.

```html
<img src="loader.svg" />
```

- Las imagenes tienen un evento llamdo `load` que se dispara cuando la imagen se ha cargado. En este caso, vamos a utilizarlo para ocultar el loader y mostrar la imagen.
- Creamos una propiedad llamada `hasLoaded` que por defecto es `false` y un método llamado `onLoad` que cambia el valor de `hasLoaded` a `true` cuando la imagen se ha cargado.
- Vamos a agregar este evento a la etiqueta `img` de nuestro componente `lazy-image` y le pasamos el método `onLoad` como parámetro.

- Quedaría de la isguiente manera:

```html
<div class="d-flex justify-content-center p-5">
  @if (!hasLoaded) {
  <img src="loader.svg" alt="" height="35" width="35" />
  }
  <img
    [src]="url"
    [alt]="alt"
    (load)="onLoad()"
    [ngStyle]="{ display: hasLoaded ? 'block' : 'none',}"
  />
</div>
```

## Animaciones de CSS

- Para esto vamos a utilizar la libreria de `animate.css`. Copiamos el `cdn` en nuestro `index.html` y ya tendremos las animaciones disponibles.
