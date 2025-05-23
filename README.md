# Curso-Angular

# # ¿Qué es Angular?

- Framework de Google para crear aplicaciones web (principalmente SPAs)

- Soporta también Server-Side Rendering, Static Site Generation, y mezclas de estas estrategias

- Permite generar apps móviles (Ionic, NativeScript) y de escritorio (Electron) usando el mismo código

# # ¿Por qué “framework”?

- Incluye de serie todo lo necesario (enrutamiento, gestión de estado, reactividad, HTTP, directivas…)

- Mínimas dependencias externas, aunque puedes añadir bibliotecas adicionales (por ejemplo, gráficas)

- Versionado sincronizado: todas las piezas (core, HTTP, directivas…) comparten la misma versión

# # Seis piezas fundamentales

- - Componentes

- Unidades de interfaz (botón, pantalla entera…)

- Lógica en TypeScript + plantilla HTML + estilos (internos o externos)

- - Rutas

- Asocian URLs a componentes de pantalla completa

- Gestionan transiciones, protección de rutas y estrategias de renderizado

- - Directivas

- Modifican comportamiento de elementos HTML

- Atributo (p.ej. clases, estilos), estructurales (ngIf, ngFor) y de componente

- Próximo flujo de control reemplazará gradualmente a ngIf/ngFor

- - Servicios

- Encapsulan lógica de negocio y datos

- Base de la inyección de dependencias y la gestión de estado

- - Módulos

- Agrupan funcionalidad relacionada y permiten lazy loading

- Cada vez se usan menos gracias a los “standalone components”

- - Pipes

- Transforman datos para la vista (p.ej. formato moneda)

- Puros (se reevalúan solo si cambia el input) e impuros (se reevalúan en cada ciclo de cambio)

En esta sección aprenderemos sobre:

• Señales
• Estado
• Propiedades
• Rutas
• Métodos
• Eventos
• Cambios en el DOM
• Cada archivo y directorio de un proyecto
