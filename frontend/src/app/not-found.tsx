import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-ink">
      <h1 className="text-9xl font-extrabold text-primary-500 mb-4">404</h1>
      <h2 className="text-3xl font-extrabold text-foreground mb-6">Pagina niet gevonden</h2>
      <p className="text-foreground/70 max-w-md mb-8 text-lg">
        De pagina die je zoekt bestaat niet of is verplaatst. Controleer de URL of ga terug naar de homepagina.
      </p>
      <Link href="/" className="btn-red">
        Terug naar Home
      </Link>
    </div>
  );
}
