# 🗄️ Configuración de Base de Datos Supabase

## 📋 Pasos para configurar la base de datos

### 1. Crear las tablas en Supabase

1. Ve a tu [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **SQL Editor** en el menú lateral
4. Crea un nuevo query
5. Copia el contenido del archivo `supabase-schema.sql` y pégalo
6. Ejecuta el script (botón "Run")

### 2. Configurar variables de entorno

```bash
# El archivo .env.local ya está configurado con tus credenciales
# Verifica que las variables estén correctas:

NEXT_PUBLIC_SUPABASE_URL=https://swmzmbmvkljfyvfvsubv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 3. Ejecutar el setup

Tienes dos opciones:

#### Opción A: Desde la interfaz web

```bash
bun run dev
# Ve a http://localhost:3000/setup
# Sigue las instrucciones en pantalla
```

#### Opción B: Desde la terminal

```bash
bun run db:setup
```

### 4. Verificar la configuración

```bash
bun run dev
# Ve a http://localhost:3000
# El contenido debería cargarse desde Supabase
```

---

## 📊 Estructura de la Base de Datos

### Tablas Principales

| Tabla | Descripción |
|-------|-------------|
| `users` | Usuarios de la plataforma |
| `content` | Películas, series y documentales |
| `genres` | Géneros cinematográficos |
| `favorites` | Lista de favoritos de usuarios |
| `watch_history` | Historial de visualización |
| `ratings` | Calificaciones y reseñas |
| `subscriptions` | Suscripciones de pago |
| `submissions` | Envíos de productores |

### Relaciones

```
users ──┬── favorites ────── content
        ├── watch_history ── content
        ├── ratings ──────── content
        └── subscriptions

content ─── seasons ─── episodes
```

---

## 🔒 Row Level Security (RLS)

Las políticas de seguridad están configuradas para:

- ✅ **Contenido**: Visible para todos (status = 'active')
- ✅ **Favoritos**: Solo el usuario propietario puede ver/editar
- ✅ **Historial**: Solo el usuario propietario puede ver/editar
- ✅ **Ratings**: Todos pueden ver, usuarios pueden crear propios
- ✅ **Usuarios**: Solo pueden ver/editar su propio perfil

---

## 🚀 APIs Disponibles

### Contenido

```bash
# Obtener todo el contenido
GET /api/content

# Filtrar por categoría
GET /api/content?category=movie
GET /api/content?category=series

# Solo destacados
GET /api/content?featured=true

# Obtener por ID
GET /api/content/[id]
```

### Búsqueda

```bash
# Buscar contenido
GET /api/search?q=tonton
```

### Setup

```bash
# Probar conexión
GET /api/setup/test

# Insertar géneros
GET /api/setup/genres

# Insertar contenido inicial
GET /api/setup/content
```

---

## 🔧 Uso en Componentes

### Cliente (use client)

```tsx
"use client";

import { getSupabaseClient } from "@/lib/supabase";

export function MyComponent() {
  const supabase = getSupabaseClient();

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('status', 'active');
    
    if (!error) {
      console.log(data);
    }
  };

  // ...
}
```

### Servidor (Server Component)

```tsx
import { createServerClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createServerClient();
  
  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('status', 'active');

  return <div>...</div>;
}
```

---

## ⚠️ Solución de Problemas

### Error: "relation does not exist"

Las tablas no han sido creadas. Ejecuta `supabase-schema.sql` en el SQL Editor.

### Error: "permission denied"

Verifica que las políticas RLS estén configuradas correctamente.

### Error: "Invalid API key"

Revisa que las variables de entorno estén correctas en `.env.local`.

### El contenido no carga

1. Verifica la consola del navegador
2. Revisa los logs del servidor
3. Comprueba que el contenido existe en Supabase Dashboard

---

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
