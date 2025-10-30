import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <nav className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/testy">Testy</Link>
          <Link href="/idb-text">IndexedDB Text</Link>
        </nav>
      </div>
      {children}
    </>
  );
}
