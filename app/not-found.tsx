import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="font-display text-hero font-bold text-gold">404</p>
      <h1 className="mt-2 font-display text-h2 font-bold text-ink">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-muted">
        The page you&apos;re looking for has moved or no longer exists.
      </p>
      <Link href="/" className="btn-gold mt-6">
        Back to Home
      </Link>
    </div>
  );
}
