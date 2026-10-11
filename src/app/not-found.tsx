import Link from "next/link";
import Scramble from "@/components/Scramble";

export default function NotFound() {
  return (
    <section className="wrap page-hero" style={{ minHeight: "70vh" }}>
      <span className="kicker">
        <span className="idx">404</span> signal lost
      </span>
      <h1 className="h1" style={{ marginTop: 24 }}>
        <Scramble text="Nothing at" />
        <br />
        <span className="serif accent">this address.</span>
      </h1>
      <p className="lead">The page moved, or never existed. Head back to base, or press ⌘K / Ctrl K to jump anywhere.</p>
      <Link href="/" className="btn btn-primary mt-l">
        Return home
      </Link>
    </section>
  );
}
