"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlarmClock,
  ArrowLeft,
  ExternalLink,
  FilePenLine,
  NotebookPen,
  RotateCcw,
  Save,
  ScanSearch,
} from "lucide-react";
import {
  ieltsGeneralWritingTasks,
  type IeltsWritingTask,
} from "@/lib/ielts-writing";
import { saveGeneralIeltsScores } from "@/lib/ielts-general-score-store";

const defaultMinutes = 20;
const storagePrefix = "ielts-writing-draft";

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function practiceStorageKey(taskId: string): string {
  return `${storagePrefix}-${taskId}`;
}

export default function IeltsWritingPage() {
  const [selectedTaskId, setSelectedTaskId] = useState(ieltsGeneralWritingTasks[0].id);
  const [essay, setEssay] = useState("");
  const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [bandInput, setBandInput] = useState("6.0");

  const selectedTask = useMemo(
    () =>
      ieltsGeneralWritingTasks.find((task) => task.id === selectedTaskId) ??
      ieltsGeneralWritingTasks[0],
    [selectedTaskId]
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(practiceStorageKey(selectedTask.id));

    setEssay("");
    setTimeLeft(defaultMinutes * 60);
    setIsRunning(false);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as {
        essay?: string;
        timeLeft?: number;
      };

      if (typeof parsed.essay === "string") {
        setEssay(parsed.essay);
      }

      if (typeof parsed.timeLeft === "number") {
        setTimeLeft(parsed.timeLeft);
      }
    } catch {
      window.localStorage.removeItem(practiceStorageKey(selectedTask.id));
    }
  }, [selectedTask.id]);

  useEffect(() => {
    window.localStorage.setItem(
      practiceStorageKey(selectedTask.id),
      JSON.stringify({ essay, timeLeft })
    );
  }, [essay, selectedTask.id, timeLeft]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning]);

  function resetTask(task: IeltsWritingTask) {
    setEssay("");
    setTimeLeft(defaultMinutes * 60);
    setIsRunning(false);
    window.localStorage.removeItem(practiceStorageKey(task.id));
  }

  const wordCount = countWords(essay);

  return (
    <main className="relative flex-1">
      <div className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/bg-login.jpg')" }} />
      <div className="fixed inset-0 -z-10 bg-white/90" />
      {/* Page Header */}
      <section className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-navy">Writing Task 1</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <NotebookPen className="h-3.5 w-3.5" />
                Writing Practice
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                IELTS General Writing Task 1
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                Practice with source titles and articles from IELTS Fever. Write
                your letter response with a timer and word counter.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-navy px-4 py-4 text-white shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Timer
                </div>
                <div className="mt-1 text-2xl font-extrabold">{formatTime(timeLeft)}</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Words
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">{wordCount}</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Minimum
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">150</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Prompts
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">
                  {ieltsGeneralWritingTasks.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:px-8">
        {/* Task Library */}
        <aside className="rounded-3xl border border-gray-200 bg-white p-5 shadow-card">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900">
            <ScanSearch className="h-5 w-5 text-accent" />
            Task Library
          </div>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            Prompts from the IELTS Fever archive.
          </p>

          <div className="mt-4 space-y-3">
            {ieltsGeneralWritingTasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => setSelectedTaskId(task.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedTask.id === task.id
                    ? "border-accent/30 bg-accent-light shadow-md"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                    {task.category}
                  </span>
                  <span className="text-xs text-gray-400">{task.date}</span>
                </div>
                <div className="mt-3 text-sm font-semibold leading-6 text-gray-900">
                  {task.title}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Writing Area */}
        <div className="space-y-5">
          {/* Selected Prompt */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <FilePenLine className="h-3.5 w-3.5" />
                  Selected Prompt
                </div>
                <h2 className="mt-3 text-xl font-extrabold text-gray-900">
                  {selectedTask.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Open the source article for the full wording, then write here.
                </p>
              </div>
              <a
                href={selectedTask.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                <ExternalLink className="h-4 w-4" />
                Open Source
              </a>
            </div>
          </section>

          {/* Editor */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                disabled={timeLeft === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <AlarmClock className="h-4 w-4" />
                {isRunning ? "Pause" : "Start 20-Min Timer"}
              </button>
              <button
                type="button"
                onClick={() => resetTask(selectedTask)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <div className="ml-auto text-sm text-gray-400">Auto-saved</div>
            </div>

            <textarea
              value={essay}
              onChange={(event) => setEssay(event.target.value)}
              placeholder="Write your IELTS Task 1 response here..."
              className="mt-5 min-h-[440px] w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-base leading-7 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
            />

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full bg-accent-light px-4 py-2 font-medium text-accent">
                Words: {wordCount}
              </div>
              <div
                className={`rounded-full px-4 py-2 font-medium ${
                  wordCount >= 150
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {wordCount >= 150 ? "Minimum reached" : "Target: 150+ words"}
              </div>
            </div>

            {/* Save band */}
            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <div className="text-sm font-bold text-gray-900">Save Task 1 Band</div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="9"
                  step="0.5"
                  value={bandInput}
                  onChange={(event) => setBandInput(event.target.value)}
                  className="w-32 rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-semibold text-gray-900 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() =>
                    saveGeneralIeltsScores({
                      writingTask1Band: Math.max(0, Math.min(9, Number(bandInput) || 0)),
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  <Save className="h-4 w-4" />
                  Save Score
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
