# API de Red Social

Este proyecto es una **API REST construida con Node.js, Express y MongoDB** que gestiona usuarios y relaciones de seguimiento (followers/followed).

## 🚀 Funcionalidades
- Registro y login de usuarios con autenticación mediante **JWT**.
- Actualización de perfil y subida de avatar usando **Multer**.
- Listado y consulta de perfiles.
- Sistema de “seguir” y “dejar de seguir” entre usuarios, con referencias en MongoDB usando `ObjectId` y `ref`.
- Servir imágenes de perfil desde el servidor.

## 📦 Instalación
Clona el repositorio y ejecuta:
```bash
npm install