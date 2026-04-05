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
    <main className="min-h-screen bg-[linear-gradient(180deg,_#fffaf5_0%,_#f8fafc_40%,_#eef2ff_100%)]">
      <section className="border-b border-orange-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <Link
              href="/ielts"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to IELTS
            </Link>
            <span>General Writing Task 1 practice</span>
          </div>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
                <NotebookPen className="h-3.5 w-3.5" />
                Writing Practice
              </div>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                IELTS General Writing Task 1
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Practice with source titles and articles from the IELTS Fever archive.
                This page keeps the materials tied to the provided source pages and
                gives you a place to write inside the app.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-3xl bg-slate-950 px-4 py-4 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Timer
                </div>
                <div className="mt-1 text-2xl font-black">{formatTime(timeLeft)}</div>
              </div>
              <div className="rounded-3xl bg-white px-4 py-4 ring-1 ring-orange-100 shadow-lg shadow-orange-100/60">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Words
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">{wordCount}</div>
              </div>
              <div className="rounded-3xl bg-white px-4 py-4 ring-1 ring-orange-100 shadow-lg shadow-orange-100/60">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Minimum
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">150</div>
              </div>
              <div className="rounded-3xl bg-white px-4 py-4 ring-1 ring-orange-100 shadow-lg shadow-orange-100/60">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Prompt Count
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">
                  {ieltsGeneralWritingTasks.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <ScanSearch className="h-5 w-5 text-orange-500" />
            Task Library
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            These prompts come from the requested IELTS Fever category page on
            April 2, 2026.
          </p>

          <div className="mt-4 space-y-3">
            {ieltsGeneralWritingTasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => setSelectedTaskId(task.id)}
                className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                  selectedTask.id === task.id
                    ? "border-orange-200 bg-orange-50 shadow-md shadow-orange-100/60"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {task.category}
                  </span>
                  <span className="text-xs text-slate-400">{task.date}</span>
                </div>
                <div className="mt-3 text-sm font-semibold leading-6 text-slate-900">
                  {task.title}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-5">
          <section className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-xl shadow-orange-100/60">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <FilePenLine className="h-3.5 w-3.5" />
                  Selected Prompt
                </div>
                <h2 className="mt-3 text-2xl font-black text-slate-900">
                  {selectedTask.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Open the source article for the full IELTS Fever task wording and
                  sample material, then write your response here.
                </p>
              </div>

              <a
                href={selectedTask.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                <ExternalLink className="h-4 w-4" />
                Open Source
              </a>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                disabled={timeLeft === 0}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <AlarmClock className="h-4 w-4" />
                {isRunning ? "Pause Timer" : "Start 20-Min Timer"}
              </button>
              <button
                type="button"
                onClick={() => resetTask(selectedTask)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Draft
              </button>
              <div className="ml-auto text-sm text-slate-500">
                Auto-saved for this prompt in your browser
              </div>
            </div>

            <div className="mt-5">
              <textarea
                value={essay}
                onChange={(event) => setEssay(event.target.value)}
                placeholder="Write your IELTS Task 1 response here..."
                className="min-h-[440px] w-full resize-y rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-4 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-orange-300 focus:bg-white"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full bg-orange-50 px-4 py-2 font-medium text-orange-700">
                Word count: {wordCount}
              </div>
              <div
                className={`rounded-full px-4 py-2 font-medium ${
                  wordCount >= 150
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {wordCount >= 150 ? "Minimum reached" : "Target: at least 150 words"}
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">
                Save Task 1 Band
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="9"
                  step="0.5"
                  value={bandInput}
                  onChange={(event) => setBandInput(event.target.value)}
                  className="w-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none focus:border-orange-300"
                />
                <button
                  type="button"
                  onClick={() =>
                    saveGeneralIeltsScores({
                      writingTask1Band: Math.max(
                        0,
                        Math.min(9, Number(bandInput) || 0)
                      ),
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  <NotebookPen className="h-4 w-4" />
                  Save Task 1 Score
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
