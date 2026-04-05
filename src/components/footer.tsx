import Link from "next/link";
import {
  BookOpen,
  Calculator,
  FilePenLine,
  Headphones,
  NotebookPen,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="gradient-navy mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                IELTS <span className="text-red-400">PASS</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Free IELTS General Training practice platform. Reading, listening,
              writing, and score calculation tools.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Practice
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/ielts"
                  className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Reading Simulator
                </Link>
              </li>
              <li>
                <Link
                  href="/ielts/listening"
                  className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                  <Headphones className="h-3.5 w-3.5" />
                  Listening Practice
                </Link>
              </li>
              <li>
                <Link
                  href="/ielts/writing"
                  className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                  <FilePenLine className="h-3.5 w-3.5" />
                  Writing Task 1
                </Link>
              </li>
              <li>
                <Link
                  href="/ielts/writing/task-2"
                  className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                  <NotebookPen className="h-3.5 w-3.5" />
                  Writing Task 2
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Tools
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/ielts/calculator"
                  className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  Score Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              About
            </h4>
            <p className="mt-4 text-sm leading-6 text-white/60">
              Practice materials sourced from IELTS Fever. This platform is for
              educational purposes only.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/40">
            IELTS PASS &mdash; Free IELTS General Training Practice Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
