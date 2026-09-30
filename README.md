# Prados de Sisbal · Sitio web

Landing page del proyecto residencial **Prados de Sisbal** (Aldea Tontem, Cobán, Alta Verapaz), construida a partir del brochure oficial.

Es un sitio estático (HTML, CSS y JavaScript sin dependencias ni paso de build), así que se puede publicar gratis en casi cualquier hosting.

## Secciones

| Sección | Contenido |
| --- | --- |
| Inicio | Render de la entrada, lema y datos clave (200 m², cuota, Km 203, seguridad 24/7) |
| Proyecto | Presentación "Un lugar con historia propia para escribir la tuya" |
| Historia | "Un nombre que ya existe": la Cueva de Sisbal y Aldea Tontem |
| Ubicación | Dirección, mapa de acceso desde la CA-14 y enlace a Google Maps |
| Amenidades | Salón de eventos, canchas, gimnasio, juegos, buses escolares, senderos y laguna (con visor de imágenes) |
| Seguridad | Garita 24/7, cámaras, parqueo de visitas, área comercial |
| Incluido | Calles, banquetas, agua, luz, fibra óptica, basura |
| Precios | Preventa Fase 1 y promoción de 18 meses sin intereses |
| Oficinas | Oficinas centrales en Cobán |
| Contacto | Formulario que abre WhatsApp con el mensaje listo y botones para compartir el sitio |

## Estructura

```
index.html            Página principal
assets/css/styles.css Estilos (paleta y tipografía del brochure)
assets/js/main.js     Menú, animaciones, visor de imágenes, formulario y compartir
assets/img/           Renders optimizados (WebP), logo, favicon e imagen para redes
assets/fonts/         Fuentes autoalojadas (Marcellus, Outfit y Oswald, licencia SIL OFL)
robots.txt            Permite que buscadores indexen el sitio
```

## Verlo en tu computadora

```bash
python3 -m http.server 8000
# o bien: npx serve .
```

Luego abre <http://localhost:8000>.

## Datos que conviene revisar antes de publicar

- **WhatsApp:** `3036 3921` (en enlaces `wa.me/50230363921` de `index.html` y en `assets/js/main.js`).
- **Precios:** Q143,000.00 por lote, enganche Q35,750.00, cuota Q2,591.90 (60 meses) y promoción de Q5,958.33 (18 meses).
- **Dominio:** las etiquetas `canonical`, `og:url`, `og:image` y los enlaces de compartir usan `https://prados-de-sisbal.vercel.app/`. Si se usa otro dominio, reemplázalo en `index.html`.

## Publicarlo

Cualquier hosting de sitios estáticos sirve; no hay comando de build y la carpeta a publicar es la raíz del repositorio.

- **Vercel:** importar el repositorio en <https://vercel.com/new>, framework "Other", sin build command. El plan Hobby (gratis) es solo para uso personal no comercial; para un proyecto inmobiliario corresponde el plan Pro.
- **Netlify** o **Cloudflare Pages:** conectar el repositorio, sin build command, directorio de publicación `/`.
- **GitHub Pages:** *Settings → Pages → Deploy from a branch*, carpeta `/ (root)`.

Para un sitio de venta se recomienda comprar un dominio propio (por ejemplo `pradosdesisbal.com`) y conectarlo al hosting elegido.

## Cómo darlo a conocer

1. **Compartir el enlace por WhatsApp y Facebook.** El sitio ya incluye imagen y descripción para que el enlace se vea con vista previa.
2. **Perfil de Empresa en Google** (Google Business Profile) con la dirección de las oficinas y el enlace al sitio, para aparecer en Google Maps.
3. **Google Search Console:** registrar el dominio y enviar la página para que Google la indexe más rápido.
4. **Código QR** en el brochure, vallas y material impreso apuntando al sitio.
5. **Enlace en la biografía** de Instagram, Facebook y TikTok del proyecto.
