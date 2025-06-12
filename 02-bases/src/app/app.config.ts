import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// Importa las rutas de la aplicación y la estrategia de localización

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // HashStrategy
    // Esta estrategia utiliza el hash en la URL para manejar la navegación
    // Esto es útil para aplicaciones que necesitan funcionar en servidores que no soportan el modo HTML5 History API
    // y para evitar problemas de recarga de página en rutas no soportadas por el servidor.
    // En este caso, se utiliza HashLocationStrategy para manejar las rutas de la aplicación.
    // Con HashLocationStrategy, las rutas de la aplicación se verán como http://localhost:4200/#/ruta,
    // lo que facilita la compatibilidad con servidores que no están configurados para manejar rutas de
    // aplicaciones de una sola página (SPA). Así, todo lo que está después del # es gestionado por Angular y
    // no por el servidor, evitando errores 404 al recargar o navegar directamente a rutas internas.
    // Esta configuración es útil en entornos donde no se puede modificar la configuración del servidor web.
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};
