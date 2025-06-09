// Es recomendable usar 'type' al importar tipos en TypeScript para evitar que el import genere código JavaScript innecesario.
// Esto ayuda a optimizar el bundle final y previene posibles problemas de dependencias circulares.
// Ejemplo: import type { Product } from './product';
// En el contexto de TypeScript, JavaScript y frameworks como Angular, bundle se refiere al 
// archivo o conjunto de archivos finales que contienen todo el código fuente (y sus dependencias) 
// empaquetado y optimizado para ser ejecutado en el navegador o en un entorno de producción.
import type { Product } from "./06-function-destructuring";
import { taxCalculation } from "./06-function-destructuring";

const shoppingCart: Product[] = [
    {
        description: "A smartphone with a large display",
        price: 999.99,
    },
    {
        description: "A powerful laptop for gaming and work",
        price: 1999.99,
    },
];

const tax = 0.21;

const [total, totalTax] = taxCalculation({
  products: shoppingCart,
  tax: tax,
});

console.log(`Total: ${total}`);
console.log(`Tax: ${totalTax}`);
