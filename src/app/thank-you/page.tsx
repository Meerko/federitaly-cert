import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <main className="container py-16 max-w-2xl">
      <h1 className="text-3xl font-semibold">Richiesta inviata</h1>
      <p className="mt-3 text-muted-foreground">
        Grazie. Abbiamo ricevuto la tua richiesta e ti ricontatteremo al più presto.
      </p>

      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Torna alla home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/certified-companies">Vai al registro</Link>
        </Button>
      </div>
    </main>
  );
}