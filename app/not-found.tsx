import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <div className="container prose">
        <div className="kicker">404</div>
        <h1>Page not found.</h1>
        <p className="lead">The page you requested does not exist or may have moved.</p>
        <p><Link className="btn btn-primary" href="/">Back to Smart Bill Manager</Link></p>
        <p className="related"><Link href="/features/">Features</Link> · <Link href="/blog/">Guides</Link> · <Link href="/support/">Support</Link></p>
      </div>
    </main>
  );
}
