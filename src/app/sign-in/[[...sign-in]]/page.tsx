import { SignIn } from '@clerk/nextjs'

// Required for Cloudflare Pages
export const runtime = 'edge';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="LakayTV" className="h-10 w-10" />
            <span className="text-2xl font-bold text-white">LakayTV</span>
          </div>
        </div>
        <SignIn
          appearance={{
            baseTheme: undefined,
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#141414] border border-stone-800",
              headerTitle: "text-white",
              headerSubtitle: "text-stone-400",
              socialButtonsBlockButton: "bg-stone-800 hover:bg-stone-700 text-white border-stone-700",
              socialButtonsBlockButtonText: "text-white",
              dividerLine: "bg-stone-700",
              dividerText: "text-stone-500",
              formFieldLabel: "text-stone-300",
              formFieldInput: "bg-stone-800 border-stone-700 text-white focus:ring-amber-500",
              formButtonPrimary: "bg-amber-600 hover:bg-amber-700 text-white",
              footerActionLink: "text-amber-500 hover:text-amber-400",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-amber-500",
            },
            variables: {
              colorPrimary: "#d97706",
              colorBackground: "#141414",
              colorInputBackground: "#262626",
              colorInputText: "#ffffff",
              colorText: "#fafafa",
              colorTextSecondary: "#a3a3a3",
              colorNeutral: "#262626",
            }
          }}
          signUpUrl="/sign-up"
          forceRedirectUrl="/"
        />
      </div>
    </div>
  )
}
