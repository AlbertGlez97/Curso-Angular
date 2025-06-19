import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

/**
 * Configuración principal de la aplicación Angular.
 *
 * Esta constante define los proveedores globales que se utilizarán en toda la aplicación.
 *
 * - `provideBrowserGlobalErrorListeners()`: Registra listeners para manejar errores globales en el navegador.
 * - `provideZoneChangeDetection({ eventCoalescing: true })`: Configura la detección de cambios usando Zone.js, optimizando la agrupación de eventos para mejorar el rendimiento.
 * - `provideRouter(routes)`: Proporciona el sistema de enrutamiento de Angular usando las rutas definidas.
 * - `provideHttpClient(withFetch())`: Configura el cliente HTTP de Angular para que utilice la API Fetch del navegador en lugar de XMLHttpRequest. Esto permite aprovechar las ventajas modernas de Fetch, como un mejor soporte para streams y una API más simple y moderna.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withFetch()),
  ]
};
