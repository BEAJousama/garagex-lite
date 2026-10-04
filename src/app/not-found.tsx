import Link from "next/link";
import { Car } from "lucide-react";
export default function NotFound() {
  return (
    <main className="not-found">
      <Car size={28} />
      <h1>That workshop record isn&apos;t here</h1>
      <p>The page may have moved or the record may not exist in this demo.</p>
      <Link className="btn btn-primary btn-md" href="/dashboard">
        Back to dashboard
      </Link>
    </main>
  );
}
