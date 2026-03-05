# 📸 Cómo Subir una Galería de Boda

## 1. Preparar las fotos

Organiza las fotos en carpetas según el momento de la boda. La estructura debe ser:

```
rawBodas/
└── Nombre del Novio y Novia/
    ├── miniatura.jpg   ← (opcional) foto de portada para la boda
    ├── preparacion/
    ├── preboda/
    ├── ceremonia/
    ├── coctel/
    ├── barraLibre/
```

> [!IMPORTANT]
>
> - El nombre de la carpeta principal será el que se muestre en la web (ej: `Alejandro y Marta`).
> - Los nombres de las subcarpetas serán los **filtros** que aparecerán en la galería.
> - El **orden de los filtros** es automático y lógico: _preparacion, ceremonia, sesion, coctel, banquete, barralibre, fiesta, postboda, preboda_. Las demás van al final en orden alfabético.
> - Puedes crear tantas subcarpetas como quieras, no hay límite.

> [!TIP]
>
> - Si creas una carpeta `todas/`, esa será la primera en mostrarse cuando alguien entre en la boda.
> - Si guardas un archivo llamado `miniatura.jpg` (o `.jpeg`) junto a las carpetas (en la raíz de la boda), esa se usará como portada. Si no, usará la primera foto que encuentre.

---

## 2. Comprimir y copiar a `public/`

Ejecuta el siguiente comando desde la raíz del proyecto:

```bash
npm run optimize:bodas
```

Este script:

- ✅ Lee todas las fotos de `rawBodas/`
- ✅ Las redimensiona a máx. 1920px de ancho
- ✅ Las comprime (JPEG quality 80, mozjpeg)
- ✅ Replica la misma estructura de carpetas en `public/bodas/`
- ✅ Omite imágenes que ya existan en el destino

> [!NOTE]
> Las fotos originales en `rawBodas/` **no se modifican**. Puedes borrarlas después si quieres liberar espacio.

---

## 3. Sincronizar con la galería

Abre el panel de administración en el navegador:

```
http://localhost:9002/admin/gallery
```

Pulsa el botón **"Sincronizar Carpetas"**. Esto registrará todas las fotos nuevas en `gallery.ts` con:

- `category: "Bodas"`
- `subFolder: "Nombre del Novio y Novia"`
- `tags: ["preparacion"]` (según la subcarpeta)

---

## 4. Verificar en la web

Ve a la galería pública:

```
http://localhost:9002/gallery
```

1. Pulsa **BODAS** → debería aparecer la tarjeta de la nueva boda con miniatura
2. Haz clic en la tarjeta → aparecerán los filtros de cada subcarpeta
3. Navega entre filtros para comprobar que las fotos se muestran correctamente

---

## 5. Cómo Eliminar una Boda (Limpiar)

Si te has equivocado o quieres borrar una boda entera:

1. Ve a la carpeta `public/bodas/` y **borra la carpeta de la boda** entera (ej: `Carlos y Laura`).
2. (Opcional) Borra también la carpeta original en `rawBodas/`.
3. Abre el panel de administración (`/admin/gallery`).
4. Pulsa el botón rojo **"Limpiar Enlaces Rotos"**.

Esto escaneará la base de datos de la galería y eliminará todas las fotos que ya no existan físicamente en las carpetas, dejando la web completamente limpia sin errores de carga ("fotos fantasma").

---

## Ejemplo Completo

```
rawBodas/
└── Carlos y Laura/
    ├── miniatura.jpg
    ├── preparacion/
    │   ├── IMG_0001.jpg
    │   └── IMG_0002.jpg
    ├── ceremonia/
    │   ├── IMG_0100.jpg
    │   └── IMG_0101.jpg
    ├── coctel/
    │   └── IMG_0200.jpg
    ├── barraLibre/
    │   ├── IMG_0300.jpg
    │   └── IMG_0301.jpg
    └── todas/
        ├── IMG_0001.jpg
        ├── IMG_0100.jpg
        ├── IMG_0200.jpg
        ├── IMG_0300.jpg
        └── IMG_0301.jpg
```

Después de ejecutar `npm run optimize:bodas` y presiionar el boton "Sincronizar Carpetas" en el panel de administración `/admin/gallery` , en la galería aparecerá:

**BODAS** → `Carlos y Laura` → Filtros: `TODAS | PREPARACION | CEREMONIA | COCTEL | BARRALIBRE`

---

## Resolución de Problemas

| Problema                            | Solución                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| La boda no aparece en la galería    | Ejecutar `npm run optimize:bodas` + Sincronizar desde admin                                                           |
| Aparecen fotos borradas / rotas     | Has borrado fotos físicas. Pulsa "Limpiar Enlaces Rotos" en el admin (`/admin/gallery`).                              |
| Las fotos no se ven (404)           | Comprobar que existen en `public/bodas/NombreBoda/tag/`                                                               |
| La miniatura no carga / no me gusta | Coloca un archivo `miniatura.jpg` en la raíz de la boda (ej: `rawBodas/Carlos y Laura/miniatura.jpg`) y resincroniza. |
| El script no comprime nada          | Verificar que las fotos están en `rawBodas/` y no directamente en la raíz                                             |
