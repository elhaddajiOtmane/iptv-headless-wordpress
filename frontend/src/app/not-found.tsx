import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-8xl font-heading font-bold text-gradient mb-4">404</h1>
      <h2 className="text-3xl font-heading font-semibold text-foreground mb-6">Pagina Niet Gevonden</h2>
      <p className="text-foreground/70 max-w-md mb-8 text-lg">
        De pagina die je zoekt bestaat niet of is verplaatst. Controleer de URL of ga terug naar de homepagina.
      </p>
      <Link 
        href="/"
        className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/20"
      >
        Terug naar Home
      </Link>
    </div>
  );
}
