import React from "react";
export function FileCard({ children }: { children: React.ReactNode }) {
  return <main className="site-shell">{children}</main>;
}
export function Header({ title }: { title: string }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}
export function Closing({ children }: { children: React.ReactNode }) {
  return <footer>{children}</footer>;
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

