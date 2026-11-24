import Link from "next/link";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.smartbillmanager";

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
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-conversion="play-download"
      data-conversion-placement={placement}
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
  return (
    <a
      className={secondary ? "btn btn-secondary" : "btn btn-primary"}
      href={buildAndroidIntentUrl(route)}
      data-conversion="open-in-app"
      data-conversion-placement={placement}
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
      data-conversion-placement={placement}
    >
      {label}
    </Link>
  );
}
