import Link from "next/link";

export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.smartbillmanager";

export function sanitizePlacement(placement: string): string {
  return (
    String(placement || "website")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "website"
  );
}

export function buildPlayStoreUrl(
  placement: string = "website",
  deepLinkRoute?: string
): string {
  const campaign = sanitizePlacement(placement);
  const cleanRoute = deepLinkRoute
    ? sanitizePlacement(deepLinkRoute.replace(/^\/+|\/+$/g, ""))
    : "";
  const referrer = cleanRoute
    ? `utm_source=website&utm_medium=seo&utm_campaign=${campaign}&deep_link_route=${cleanRoute}`
    : `utm_source=website&utm_medium=seo&utm_campaign=${campaign}`;
  return `${PLAY_URL}&referrer=${encodeURIComponent(referrer)}`;
}

export function buildAndroidIntentUrl(route: string, playUrl: string = PLAY_URL): string {
  const cleanRoute = route.replace(/^\/+|\/+$/g, "") || "bills";
  return `intent://${cleanRoute}#Intent;scheme=smartbillmanager;package=com.smartbillmanager;S.browser_fallback_url=${encodeURIComponent(playUrl)};end`;
}

export function PlayCta({
  placement,
  label = "Download on Google Play",
  secondary = false,
}: {
  placement: string;
  label?: string;
  secondary?: boolean;
}) {
  return (
    <a
      className={secondary ? "btn btn-secondary" : "btn btn-primary"}
      href={buildPlayStoreUrl(placement)}
      target="_blank"
      rel="noopener noreferrer"
      data-conversion="play-download"
      data-conversion-placement={sanitizePlacement(placement)}
    >
      {label}
    </a>
  );
}

export function OpenInAppCta({
  route,
  placement,
  label = "Open in Smart Bill Manager",
  secondary = false,
}: {
  route: string;
  placement: string;
  label?: string;
  secondary?: boolean;
}) {
  const cleanPlacement = sanitizePlacement(placement);
  const cleanRoute = route.replace(/^\/+|\/+$/g, "") || "bills";
  const fallbackPlayUrl = buildPlayStoreUrl(cleanPlacement, cleanRoute);
  return (
    <a
      className={secondary ? "btn btn-secondary" : "btn btn-primary"}
      href={buildAndroidIntentUrl(cleanRoute, fallbackPlayUrl)}
      data-conversion="open-in-app"
      data-conversion-placement={cleanPlacement}
    >
      {label}
    </a>
  );
}

export function AppCta({
  placement,
  label = "Get Smart Bill Manager",
}: {
  placement: string;
  label?: string;
}) {
  return (
    <Link
      className="btn btn-primary"
      href="/download/"
      data-conversion="download-page"
      data-conversion-placement={sanitizePlacement(placement)}
    >
      {label}
    </Link>
  );
}

export function DesktopQrBridge({
  heading = "On a computer? Scan to install on Android",
  body = "Point your Android phone camera at this QR code to open Smart Bill Manager directly in the Google Play Store — no typing or desktop sign-in needed.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <aside className="desktop-qr-bridge" aria-label="QR code to install Smart Bill Manager on Android">
      <img
        src="/play-qr.svg"
        width={136}
        height={136}
        loading="lazy"
        decoding="async"
        alt="QR code linking to Smart Bill Manager on Google Play"
      />
      <div>
        <h3>{heading}</h3>
        <p>{body}</p>
      </div>
    </aside>
  );
}
