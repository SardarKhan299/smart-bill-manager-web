import Link from "next/link";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.smartbillmanager";

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
