# Sección 2 - Conceptos generales antes de empezar

## Introduccióna a la sección

- Angular tiene una curva de aprendizaje elevada
- Usa TypeScript

## ¿Qué es TypeScript? y ¿Por qué Angular usa TypeScript?

- Tenemos tipados estrictos
- Usa interfaces, decoradores, etc.
- Extiende de JavaScript
  - Si sabes JavaScript, sabes un 80% de TypeScript

```ts
// Ejemplo
interface Producto {
  desc: string;
  precio: number;
}

function calcularISV(productos: Producto[]): number {
  let total = 0;

  for (const producto of productos) {
    total += producto.precio;
  }

  return total * 0.19;
  // 19% de ISV
}
```

- Angular usa Typescript
- Nos ayuda con el Intellisense
- Tipado estricto y errores al momento de escritura
- Nos permite inyección de dependencias

## 10 Mitos y Realidades de Angular

1. Angular es mejor que React, Vue y Svelte -> `Mito`
2. Angular es más ordenado que React, Vue y Svelte -> `Mito`
3. Angular es complicado de aprender -> `Mito` (Depende mucho de tu background)
4. Angular libera nuevas versiones a cada rato (6 meses aprox) -> `Verdad`
5. Las aplicaciones de Angular son muy pesadas -> `Mito`
6. Angular no es SEO Friendly -> `Mito` (Genera SPA)
7. Angular no sporta diferentes patrones como Redux -> `Mito`
8. Angular 2, 4, 5, 6, 7, 8, 9, 10, 11, 12... Es el mismo Angular -> `Verdad`
9. Solo puedo correr código de TypeScript en mis aplicaciones Angular -> `Mito`
