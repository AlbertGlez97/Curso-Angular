# Curso-Angular

## ¿Qué es Angular?

- Framework de Google para crear aplicaciones web (principalmente SPAs).
- Soporta también Server-Side Rendering, Static Site Generation y mezclas de estas estrategias.
- Permite generar apps móviles (Ionic, NativeScript) y de escritorio (Electron) usando el mismo código.

## ¿Por qué “framework”?

- Incluye de serie todo lo necesario (enrutamiento, gestión de estado, reactividad, HTTP, directivas…).
- Mínimas dependencias externas, aunque puedes añadir bibliotecas adicionales (por ejemplo, gráficas).
- Versionado sincronizado: todas las piezas (core, HTTP, directivas…) comparten la misma versión.

## Seis piezas fundamentales

### Componentes

- Unidades de interfaz (botón, pantalla entera…).
- Lógica en TypeScript + plantilla HTML + estilos (internos o externos).

### Rutas

- Asocian URLs a componentes de pantalla completa.
- Gestionan transiciones, protección de rutas y estrategias de renderizado.

### Directivas

- Modifican comportamiento de elementos HTML.
- Atributo (p.ej. clases, estilos), estructurales (ngIf, ngFor) y de componente.
- Próximo flujo de control reemplazará gradualmente a ngIf/ngFor.

### Servicios

- Encapsulan lógica de negocio y datos.
- Base de la inyección de dependencias y la gestión de estado.

### Módulos

- Agrupan funcionalidad relacionada y permiten lazy loading.
- Cada vez se usan menos gracias a los “standalone components”.

### Pipes

- Transforman datos para la vista (p.ej. formato moneda).
- Puros (se reevalúan solo si cambia el input) e impuros (se reevalúan en cada ciclo de cambio).

---

En esta sección aprenderemos sobre:

- Señales
- Estado
- Propiedades
- Rutas
- Métodos
- Eventos
- Cambios en el DOM
- Cada archivo y directorio de un proyecto

## Principios SOLID

Los principios SOLID son un conjunto de buenas prácticas para el diseño de software orientado a objetos, que ayudan a crear sistemas más mantenibles, escalables y comprensibles:

- **S** (Single Responsibility Principle): Cada clase debe tener una única responsabilidad o motivo de cambio.
- **O** (Open/Closed Principle): Las entidades deben estar abiertas para extensión, pero cerradas para modificación.
- **L** (Liskov Substitution Principle): Los objetos de una clase derivada deben poder sustituir a los de la clase base sin alterar el funcionamiento del programa.
- **I** (Interface Segregation Principle): Es mejor tener varias interfaces específicas que una sola interfaz general.
- **D** (Dependency Inversion Principle): Los módulos de alto nivel no deben depender de módulos de bajo nivel, ambos deben depender de abstracciones.

## Ejemplo sencillo de los principios SOLID

Supongamos que queremos modelar un sistema para enviar notificaciones por diferentes canales (correo y SMS):

```typescript
// Violando SOLID: una clase hace demasiado
class Notificador {
  enviarCorreo(mensaje: string) {
    // lógica para enviar correo
  }
  enviarSMS(mensaje: string) {
    // lógica para enviar SMS
  }
}
```

Aplicando SOLID:

```typescript
// S: Una clase, una responsabilidad
interface Notificacion {
  enviar(mensaje: string): void;
}

// O: Podemos extender sin modificar
class Correo implements Notificacion {
  enviar(mensaje: string) {
    // lógica para enviar correo
  }
}

class SMS implements Notificacion {
  enviar(mensaje: string) {
    // lógica para enviar SMS
  }
}

// D: Dependemos de la abstracción, no de la implementación
class ServicioNotificaciones {
  constructor(private canal: Notificacion) {}

  notificar(mensaje: string) {
    this.canal.enviar(mensaje);
  }
}
```

Así, si queremos agregar un nuevo canal (por ejemplo, WhatsApp), solo creamos una nueva clase que implemente `Notificacion` sin modificar el resto del código.

## Señanes en Angular

- En Angular, las señales son una nueva forma reactiva de manejar y rastrear el estado.
- Permiten definir valores que pueden cambiar con el tiempo y notificar automáticamente a los componentes o servicios que dependen de ellos cuando ocurre una actualización.
- Esto facilita la gestión eficiente del flujo de datos y la reactividad en las aplicaciones Angular.

### ¿Qué es una señal computada?

Una **computada** (o valor computado) es un valor que no se almacena directamente, sino que se calcula automáticamente a partir de otras señales o valores reactivos. Cuando alguna de sus dependencias cambia, la computada se actualiza de forma automática.

### Señales computadas en Angular

En Angular, una **señal computada** (`computed`) es una función que deriva su valor de una o más señales. Se define usando la función `computed()` y se recalcula automáticamente cuando cambian las señales de las que depende. Esto permite crear valores derivados y mantener la lógica reactiva y sincronizada en la aplicación.

**Ejemplo:**

```typescript
import { signal, computed } from "@angular/core";

const nombre = signal("Juan");
const apellido = signal("Pérez");

const nombreCompleto = computed(() => `${nombre()} ${apellido()}`);

// Si cambias nombre o apellido, nombreCompleto se actualiza automáticamente
nombre.set("Ana");
console.log(nombreCompleto()); // "Ana Pérez"
```

## ¿Qué es un pipe en Angular?

Un **pipe** en Angular es una función que transforma valores en plantillas para mostrarlos de una manera específica. Se utilizan en las vistas para modificar la presentación de los datos sin alterar el modelo original.

Por ejemplo, puedes usar pipes para formatear fechas, monedas, textos en mayúsculas/minúsculas, o crear transformaciones personalizadas.

**Ejemplo de uso de un pipe en una plantilla:**

```html
<p>{{ fechaNacimiento | date:'longDate' }}</p>
<p>{{ precio | currency:'EUR' }}</p>
<p>{{ nombre | uppercase }}</p>
```

También puedes crear tus propios pipes personalizados implementando la interfaz `PipeTransform`.


# Inyección de Dependencias en Angular (versión moderna con `inject()`)

## 🧠 ¿Qué es una **dependencia**?

Una *dependencia* es cualquier recurso que tu componente necesita para funcionar, por ejemplo:
- Un servicio que obtiene datos.
- Un formateador.
- Un registrador de logs.

En lugar de crearla con `new`, Angular se la *inyecta* al componente.

---

## ⚙️ ¿Por qué usar inyección de dependencias?

- **Desacopla** el componente de la implementación.
- Facilita **reutilización** y **testeo**.
- Angular gestiona las instancias (por ejemplo, singleton o instancias específicas según el ámbito).

---

## 🚀 ¿Qué es `inject()`?

Es la forma moderna (Angular v14+ y superior) de solicitar dependencias sin usar el constructor. Permite obtener una dependencia directamente en la definición de un campo o dentro de funciones. Ejemplo:

- 1. Crea el servicio (CalculatorService)

```typescript
// calculator.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  add(x: number, y: number): number {
    return x + y;
  }
}
```

- 2. Usa inject() en un componente 

Crea un componente que utilice el servicio para mostrar una suma:

```typescript
// receipt.component.ts
import { Component, inject } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-receipt',
  template: `<h1>Total: {{ total }}</h1>`
})
export class ReceiptComponent {
  private calc = inject(CalculatorService); // Se inyecta el servicio
  total = this.calc.add(50, 25); // Se usa el servicio para calcular y obtener el total
}
```

En este ejemplo, Angular se encarga de proporcionar la instancia de CalculatorService sin necesidad de un constructor.


# Comunicación entre Componentes: `@Input()` y `@Output()`

En Angular, la comunicación entre componentes padre e hijo se realiza principalmente usando los decoradores `@Input()` y `@Output()`.

## `@Input()`: Recibir datos desde el componente padre

Permite que un componente hijo reciba datos desde su componente padre a través de propiedades.

**Ejemplo sencillo:**

```typescript
// hijo.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hijo',
  template: `<p>Mensaje: {{ mensaje }}</p>`
})
export class HijoComponent {
  @Input() mensaje: string = '';
}
```

```html
<!-- padre.component.html -->
<app-hijo [mensaje]="'¡Hola desde el padre!'"></app-hijo>
```

## `@Output()`: Emitir eventos o valores al componente padre

Permite que el componente hijo envíe información o eventos al padre usando un `EventEmitter`.

**Ejemplo sencillo:**

```typescript
// hijo.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hijo',
  template: `<button (click)="enviarSaludo()">Saludar</button>`
})
export class HijoComponent {
  @Output() saludar = new EventEmitter<string>();

  enviarSaludo() {
    this.saludar.emit('¡Hola padre!');
  }
}
```

```html
<!-- padre.component.html -->
<app-hijo (saludar)="mostrarMensaje($event)"></app-hijo>
```

```typescript
// padre.component.ts
mostrarMensaje(mensaje: string) {
  console.log(mensaje); // "¡Hola padre!"
}
```