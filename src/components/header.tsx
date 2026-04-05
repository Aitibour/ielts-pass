"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Calculator,
  FilePenLine,
  Headphones,
  Menu,
  NotebookPen,
  X,
} from "lucide-react";

const navItems = [
  { label: "Reading", href: "/ielts", icon: BookOpen },
  { label: "Listening", href: "/ielts/listening", icon: Headphones },
  { label: "Writing Task 1", href: "/ielts/writing", icon: FilePenLine },
  { label: "Writing Task 2", href: "/ielts/writing/task-2", icon: NotebookPen },
  { label: "Calculator", href: "/ielts/calculator", icon: Calculator },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-navy">
            IELTS <span className="text-accent">PASS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/ielts"
            className="hidden rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark sm:inline-flex"
          >
            Start Practicing
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-50 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <item.icon className="h-4 w-4 text-gray-400" />
              {item.label}
            </Link>
          ))}
          <Link
            href="/ielts"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Start Practicing
          </Link>
        </div>
      )}
    </header>
  );
}
