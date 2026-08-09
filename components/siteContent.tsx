import site from "@/content/site.json";
import React from "react";

// Single source of truth for all editable copy + imagery. Edited from /admin,
// committed to content/site.json, and read here at build time.
export const content = site;

export type ImageField = { web: string; mobile?: string };

// Renders a managed image with an optional mobile-specific source. Falls back
// to the web image everywhere when no mobile variant is set.
export function Picture({
  image,
  alt,
  className,
  loading = "lazy",
}: {
  image: ImageField;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const web = image?.web || "";
  const mobile = image?.mobile || "";
  return (
    <picture>
      {mobile ? <source media="(max-width: 760px)" srcSet={mobile} /> : null}
      <img src={web} alt={alt} className={className} loading={loading} />
    </picture>
  );
}

// Turns "\n" inside editable copy into real line breaks.
export function lines(text: string): React.ReactNode {
  return text.split("\n").map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 ? <br /> : null}
    </React.Fragment>
  ));
}

// Keeps the brand word "بيانو" visually emphasised inside free-form copy.
export function highlightBrand(text: string, brandClass: string): React.ReactNode {
  const parts = text.split("بيانو");
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 ? <span className={brandClass}>بيانو</span> : null}
    </React.Fragment>
  ));
}
