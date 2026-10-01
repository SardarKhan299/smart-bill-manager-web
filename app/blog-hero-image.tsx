export function BlogHeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="blog-hero-image">
      <img src={src} alt={alt} width={1600} height={900} loading="eager" decoding="async" />
      <figcaption>Illustration for this household money management guide.</figcaption>
    </figure>
  );
}
