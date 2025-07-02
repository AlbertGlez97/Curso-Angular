# 🌍 Country App

Una aplicación web desarrollada en Angular que permite explorar información detallada de países de todo el mundo.

## 📋 Descripción

Country App es una aplicación que utiliza la API de REST Countries para mostrar información completa sobre países, incluyendo:
- Búsqueda de países por nombre
- Filtrado por región
- Búsqueda por capital
- Información detallada de cada país (población, moneda, idiomas, etc.)

## 🛠️ Tecnologías Utilizadas

### Framework Principal
- **Angular 17** - Framework de desarrollo frontend

### Estilos y UI
- **Tailwind CSS** - Framework de CSS utility-first
- **DaisyUI** - Component library para Tailwind CSS

### Iconos
- **Iconify** - Biblioteca de iconos vectoriales

### API Externa
- **REST Countries API** - API gratuita para obtener datos de países

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd 04-country-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   ng serve
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "@angular/core": "^17.x.x",
    "@angular/common": "^17.x.x",
    "@angular/router": "^17.x.x",
    "tailwindcss": "^3.x.x",
    "daisyui": "^4.x.x"
  }
}
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── country/           # Módulo principal de países
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── services/      # Servicios para API
│   │   └── interfaces/    # Interfaces TypeScript
│   └── shared/           # Componentes compartidos
└── assets/              # Recursos estáticos
```

## 🔗 Enlaces Útiles

- [Documentación de Tailwind CSS para Angular](https://tailwindcss.com/docs/installation/framework-guides/angular)
- [Documentación de DaisyUI](https://daisyui.com/docs/install/)
- [Iconify - Biblioteca de Iconos](https://iconify.design/)
- [REST Countries API](https://restcountries.com/)

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado como parte del curso de Angular.