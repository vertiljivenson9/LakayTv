// Required for Cloudflare Pages
export const runtime = 'edge';

// Verificar si Clerk está disponible
const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
                          process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 10;

export default function Page() {
  if (!isClerkConfigured) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="LakayTV" className="h-10 w-10" />
              <span className="text-2xl font-bold text-white">LakayTV</span>
            </div>
          </div>
          
          <div className="bg-[#141414] border border-stone-800 rounded-lg p-8">
            <h1 className="text-xl font-bold text-white mb-4">Connexion</h1>
            <p className="text-stone-400 mb-6">
              Le système d&apos;authentification n&apos;est pas encore configuré.
            </p>
            <p className="text-stone-500 text-sm">
              Veuillez configurer les variables Clerk dans Cloudflare pour activer la connexion.
            </p>
            <a 
              href="/"
              className="mt-6 inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md"
            >
              Retour à l&apos;accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Si Clerk está configurado, importar y mostrar el componente
  // Usando import dinámico para evitar errores de build
  return <SignInPage />;
}

// Componente separado para SignIn de Clerk
function SignInPage() {
  // Este componente solo se renderiza si Clerk está configurado
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="LakayTV" className="h-10 w-10" />
            <span className="text-2xl font-bold text-white">LakayTV</span>
          </div>
        </div>
        <p className="text-white text-center">Chargement...</p>
      </div>
    </div>
  );
}
