"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between py-4 px-8 border-b border-zinc-600">
      <Link href="/">
        <Image
          src="/pen-and-paper.svg"
          alt="Logo"
          width={35}
          height={35}
          className="invert"
        />
      </Link>

      <nav className="flex items-center gap-x-6">
        <ul className="flex gap-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={`${
                  pathname == link.href ? "underline underline-offset-4" : ""
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <SignedIn>
            <li>
              <Link
                className={`${
                  pathname == "/create" ? "underline underline-offset-4" : ""
                }`}
                href="/create"
              >
                Create Post
              </Link>
            </li>
          </SignedIn>
        </ul>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="cursor-pointer">Sign In</button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}
