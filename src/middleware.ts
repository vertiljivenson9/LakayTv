import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware simple que no depende de Clerk
// Cuando configures las claves de Clerk, puedes cambiar esto por el middleware de Clerk
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Rutas que requieren autenticación (por ahora solo mostramos advertencia)
  const protectedRoutes = ['/producer', '/admin']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtected) {
    // Por ahora, permitir acceso pero en producción verificar sesión
    // Cuando Clerk esté configurado, esto validará la sesión
    const response = NextResponse.next()
    
    // Agregar header para indicar que necesita configuración
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      response.headers.set('X-Clerk-Status', 'not-configured')
    }
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!x)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
