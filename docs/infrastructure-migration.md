# Migración de infraestructura a Erik

Estado comprobado el 3 de noviembre de 2026. Esta preparación no constituye
una migración completada ni cambia los destinos de producción.

## Evidencia y dependencias pendientes

| Elemento | Comprobado | Pendiente para continuar |
| --- | --- | --- |
| Web | `PedroVader/VolumesLab`, rama `master`; Erik tiene permiso de escritura, no de administración | Transferencia del repositorio y aceptación por Erik |
| CMS | Repositorio independiente llamado `volumes-cms`, según `.gitignore`; no aparece entre los repositorios accesibles. Consulta a `PedroVader/volumes-cms`: 404 | URL exacta y acceso al código; cuenta administradora del CMS |
| Cloudflare | La sesión de Wrangler ha caducado; el navegador solicita iniciar sesión | Acceso a la cuenta correcta, comprobar Workers Paid, Worker y zona DNS |
| Neon | El navegador solicita iniciar sesión | Cuenta de Erik, proyecto Frankfurt y copia completa de la base de datos |
| Imágenes | El plan sitúa los originales en Vercel Blob | Inventario completo, acceso para copiar y comprobar R2 |
| Producción | `https://volumeslab.com` devuelve 308 a `https://www.volumeslab.com/`; `www` y `/admin` del CMS devuelven 200 con `server: Vercel` | Identificar el Worker existente y validar su relación con la web pública |

La web pública observada está en Vercel, aunque el plan describe un Worker
existente en Cloudflare. No sustituir el Worker ni cambiar DNS hasta identificar
la versión que se va a publicar y comparar ambas webs.

## DNS público observado

Esto es una consulta parcial, **no una exportación completa de la zona**:

| Nombre | Tipo | Valor observado |
| --- | --- | --- |
| `volumeslab.com` | NS | `cass.ns.cloudflare.com.`, `arch.ns.cloudflare.com.` |
| `volumeslab.com` | MX | `10 smtp.google.com.` |
| `volumeslab.com` | A | `216.150.16.193`, `216.150.1.193` |
| `www.volumeslab.com` | CNAME | `86f9ff6373a28456.vercel-dns-016.com.` |
| `cms.volumeslab.com` | CNAME | `cname.vercel-dns.com.` |
| `_dmarc.volumeslab.com` | TXT | `v=DMARC1;p=none;` |

También se observaron TXT de verificación de Google y Apple en el dominio raíz.
El MX apunta a Google; falta confirmar quién administra el buzón `hello@`.
Exportar la zona desde la cuenta que la gestiona, incluidos TTL, proxy, MX, SPF,
DKIM, DMARC, verificaciones, CAA y subdominios. Los NS ya son de Cloudflare;
no asumir que hay que cambiarlos. Conservar la exportación para rollback.

## Cambio preparado en esta rama

Ambos lectores del CMS y sus URLs relativas de imágenes usan `VITE_CMS_URL`.
Sin configurar nada, siguen usando `https://volumes-cms.vercel.app`.
Copiar `.env.example` a `.env.local` para trabajar localmente. La variable es
pública y se incorpora al compilar; no debe contener contraseñas ni tokens.

Para probar el destino, configurar su origen en el entorno de **build**:

```sh
VITE_CMS_URL=https://cms.volumeslab.com npm run build
```

Cambiar una variable del Worker sin reconstruir no cambia este valor.
Volver al CMS anterior requiere reconstruir con el origen anterior y desplegar,
o restaurar una versión previa del Worker. Se mantiene el comportamiento
existente de contenido de reserva durante fallos del CMS.

## Ejecución cuando estén disponibles los accesos

1. **Recibir el traspaso.** Aceptar ambos repositorios; recibir dump PostgreSQL
   completo, versión del servidor, extensiones, recuentos por tabla, inventario
   de medios con tamaños/checksums, variables requeridas y documentación del CMS.
   Entregar secretos por un canal seguro, fuera de Git y del historial del chat.
2. **Preparar Neon Frankfurt.** Crear el proyecto en la cuenta de Erik y una
   base vacía para restaurar. Usar conexión directa para restauraciones y
   migraciones, con cliente PostgreSQL compatible con el dump. No ejecutar un
   restore destructivo contra la base actual. Comparar tablas, filas, relaciones,
   secuencias, usuarios, borradores, versiones y estado de migraciones de Payload.
3. **Preparar R2.** Copiar todos los objetos, también variantes de imagen,
   preservando claves, tipos de contenido y metadatos. Comparar inventario,
   tamaños y checksums. Adaptar las referencias de Blob según el esquema real;
   la variable de la web no reescribe URLs absolutas guardadas en la base.
4. **Adaptar el CMS en una rama.** Revisar las versiones reales de Payload,
   Next y dependencias antes de escoger el adaptador para Workers. Configurar
   Neon mediante Hyperdrive y almacenamiento R2; secretos solo en el entorno.
   Validar cargas y transformación de imágenes, CORS/CSRF, cookies, URLs públicas,
   conexiones, límites del Worker y migraciones. Mantener Vercel operativo.
5. **Validar en paralelo.** Usar una URL de staging y la copia de Neon. Probar
   inicio/cierre de sesión, permisos, creación/edición/publicación, borradores,
   subida/lectura de imágenes, colecciones completas y la web con ese CMS.
   Comprobar reservas, rutas, redirecciones, canonical, robots y sitemap.
6. **Conectar la web a Workers Builds.** Seleccionar el repositorio transferido,
   rama aprobada y el Worker identificado. El build actual genera
   `.output/server/wrangler.json` con preset `cloudflare-module`.
   Verificar nombre y cuenta del Worker antes del primer deploy: Nitro generó
   `pedrovader-volumeslab` en la comprobación local, que no demuestra que sea el
   Worker de producción. Configurar instalación `npm ci`, build `npm run build`
   y deploy `npx nitro deploy --prebuilt` solo después de fijar ese destino.
7. **Cambiar producción.** Acordar una breve pausa de edición o sincronización
   incremental para no perder cambios hechos en Vercel desde la primera copia.
   Hacer backup final y sincronizar datos e imágenes. Conectar
   `cms.volumeslab.com`, reconstruir la web con ese origen y conectar los dominios
   web, conservando el comportamiento actual de dominio raíz/www. Comprobar HTTPS,
   contenido, medios, correo y reservas. Registrar hora, versiones y rollback.
8. **Cerrar tras 7–14 días estables.** La observación comienza después del cambio
   validado, no al preparar esta rama. Solo entonces coordinar con Pedro el
   apagado de sus servicios, rotar secretos y retirar accesos. Conservar backups
   y verificar que ya no se solicita contenido ni imágenes a los servicios antiguos.

## Referencias técnicas

- [Payload: adaptadores de almacenamiento, incluido R2](https://payloadcms.com/docs/upload/storage-adapters)
- [Cloudflare: Next.js en Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [Cloudflare: OpenNext](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/)
- [Cloudflare: Hyperdrive](https://developers.cloudflare.com/hyperdrive/get-started/)

Estas referencias orientan la adaptación; no sustituyen una prueba con el
repositorio y la base de datos reales del CMS.
