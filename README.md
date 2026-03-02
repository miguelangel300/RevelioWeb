# Firebase Studio - Revelio Weddings

Este es un proyecto de NextJS para un fotógrafo de bodas, con un enfoque artístico y minimalista.

## Realizado por

Alejandro y en colaboracion con Miguel Angel

## Primeros Pasos

Para comenzar, echa un vistazo a `src/app/page.tsx` para ver la página principal.

## Estructura y Personalización

### 1. Información de Contacto y Personal

Es crucial que reemplaces la información de ejemplo con tus datos reales en los siguientes archivos:

- `src/app/legal-notice/page.tsx`: **(MUY IMPORTANTE)** Rellena `companyName`, `nif`, `address`, `email` y `domainName` con tus datos fiscales y de contacto.
- `src/app/privacy-policy/page.tsx`: **(MUY IMPORTANTE)** Rellena `companyName`, `nif`, `address`, `email` y `domainName` con tus datos fiscales y de contacto.
- `src/components/layout/TopBanner.tsx`: Actualiza tu teléfono, email, usuario de Instagram y número de WhatsApp.
- `src/components/layout/FloatingWhatsAppButton.tsx`: Configura tu número de teléfono de WhatsApp y el mensaje predeterminado.
- `src/app/contact/page.tsx`: Revisa la información de contacto que se muestra como alternativa al formulario.

### 2. Contenido de las Páginas

- **Página de Inicio (`src/app/page.tsx`)**: Muestra un carrusel a pantalla completa y una breve introducción sobre ti.
- **Página "Sobre Mí" (`src/app/about/page.tsx`)**: Un espacio dedicado para hablar de ti, tu filosofía y tu forma de trabajar. Es fundamental para conectar con los clientes.
- **Página de Galería (`src/app/gallery/page.tsx` y `src/data/gallery.ts`)**: Muestra tus mejores trabajos. Edita `src/data/gallery.ts` para añadir tus propias fotos.
- **Páginas Legales**:
  - `src/app/legal-notice/page.tsx`: Aviso Legal.
  - `src/app/privacy-policy/page.tsx`: Política de Privacidad.
  - `src/app/cookie-policy/page.tsx`: Política de Cookies.
  - `src/app/accessibility-statement/page.tsx`: Declaración de Accesibilidad.

### 3. Gestión de Imágenes (`data-ai-hint`)

Todas las imágenes de marcador de posición (`https://placehold.co/...`) incluyen un atributo `data-ai-hint` con palabras clave (ej: `"wedding couple"`). Este atributo es útil para identificar el tipo de imagen que debería ir en cada lugar.

### 4. Funcionalidades Clave

- **Diseño Responsivo**: La web está adaptada para móviles, tablets y ordenadores.
- **Tema Claro/Oscuro**: Se ha añadido un botón en el encabezado para permitir a los usuarios cambiar entre temas, mejorando la accesibilidad. La preferencia se guarda.
- **Header Inteligente**: El header es transparente sobre el carrusel de la página de inicio y se vuelve opaco con un fondo desenfocado al hacer scroll, mejorando la visibilidad y la estética.
- **Consentimiento de Cookies**: Un banner informa a los usuarios sobre el uso de cookies y enlaza a la política correspondiente.
- **Formulario de Contacto con Validación**: El formulario en la página de contacto incluye validación de campos y requiere la aceptación de la política de privacidad.

### 5. Optimización de Imágenes para Web (Flujo de Trabajo)

Para mantener la página web rápida y posicionar bien en Google, las fotos pesadas de las bodas (que suelen pesar más de 10 MB) se comprimen automáticamente usando un script.

**Cómo subir nuevas fotos:**

1. Copia tus fotos originales pesadas (JPG) dentro de la carpeta `/raw_images` (en la raíz del proyecto, fuera de `public`).
2. Abre la terminal (`Terminal -> New Terminal`).
3. Ejecuta el siguiente comando para optimizarlas:
   ```bash
   node optimize.mjs
   ```
4. El script procesará todas las fotos y creará copias ultra-ligeras (redimensionadas y comprimidas) directamente dentro de la carpeta `/public` con el mismo nombre.
5. Usa los nombres de esas fotos en el archivo `src/data/gallery.ts` como siempre. ¡Tu web cargará súper rápido!

### 6. Clasificador Rápido de Fotografías (Herramienta de Admin)

Para evitar tener que clasificar y titular a mano docenas de fotografías de la galería una por una en código, se ha creado una pequeña herramienta privada de administración visual.

**Cómo usarla:**

1. Arranca tu servidor de desarrollo con `npm run dev`.
2. Ve en tu navegador a [http://localhost:9002/admin/gallery](http://localhost:9002/admin/gallery).
3. Verás la primera foto junto con botones para asignarle rápidamente una **Categoría** y un campo para escribir su **Título** (ej: "El Sí quiero").
4. Haz clic en "Guardar y Siguiente Foto". La foto pasará automáticamente y el archivo `src/data/gallery.ts` se modificará en tu código ¡al instante!

## Desarrollo

### Ejecutar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver el resultado.
