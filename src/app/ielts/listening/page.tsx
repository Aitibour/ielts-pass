"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlarmClock,
  ArrowLeft,
  ExternalLink,
  FileAudio,
  FileText,
  Headphones,
  RotateCcw,
  Save,
} from "lucide-react";
import { ieltsListeningTests } from "@/lib/ielts-listening";
import { saveGeneralIeltsScores } from "@/lib/ielts-general-score-store";
import { calculateListeningBand } from "@/lib/ielts-scoring";

const defaultMinutes = 30;
const storagePrefix = "ielts-listening-session";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function storageKey(testId: string): string {
  return `${storagePrefix}-${testId}`;
}

export default function IeltsListeningPage() {
  const [selectedTestId, setSelectedTestId] = useState(ieltsListeningTests[0].id);
  const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [notes, setNotes] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState("0");

  const selectedTest = useMemo(
    () =>
      ieltsListeningTests.find((test) => test.id === selectedTestId) ??
      ieltsListeningTests[0],
    [selectedTestId]
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey(selectedTest.id));

    setTimeLeft(defaultMinutes * 60);
    setIsRunning(false);
    setNotes("");
    setCorrectAnswers("0");

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as {
        timeLeft?: number;
        notes?: string;
        correctAnswers?: string;
      };

      if (typeof parsed.timeLeft === "number") {
        setTimeLeft(parsed.timeLeft);
      }

      if (typeof parsed.notes === "string") {
        setNotes(parsed.notes);
      }

      if (typeof parsed.correctAnswers === "string") {
        setCorrectAnswers(parsed.correctAnswers);
      }
    } catch {
      window.localStorage.removeItem(storageKey(selectedTest.id));
    }
  }, [selectedTest.id]);

  useEffect(() => {
    window.localStorage.setItem(
      storageKey(selectedTest.id),
      JSON.stringify({ timeLeft, notes, correctAnswers })
    );
  }, [correctAnswers, notes, selectedTest.id, timeLeft]);

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

  function resetSession() {
    setTimeLeft(defaultMinutes * 60);
    setIsRunning(false);
    setNotes("");
    setCorrectAnswers("0");
    window.localStorage.removeItem(storageKey(selectedTest.id));
  }

  const listeningRaw = Math.max(0, Math.min(40, Number(correctAnswers) || 0));
  const listeningBand = calculateListeningBand(listeningRaw);

  function saveListeningScore() {
    saveGeneralIeltsScores({
      listeningRaw,
      listeningBand,
    });
  }

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
            <span className="font-medium text-navy">Listening Practice</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ielts-listening">
                <Headphones className="h-3.5 w-3.5" />
                General Listening
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                IELTS Listening Practice
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                Real IELTS Fever listening materials: question PDF, audio file, and
                answer page. No extra generated content.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-navy px-4 py-4 text-white shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Timer
                </div>
                <div className="mt-1 text-2xl font-extrabold">{formatTime(timeLeft)}</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Tests
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">
                  {ieltsListeningTests.length}
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Band
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">
                  {listeningBand.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-8">
        {/* Test Library Sidebar */}
        <aside className="rounded-3xl border border-gray-200 bg-white p-5 shadow-card">
          <div className="text-base font-bold text-gray-900">Listening Library</div>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            From the IELTS Fever sample papers page.
          </p>

          <div className="mt-4 space-y-3">
            {ieltsListeningTests.map((test) => (
              <button
                key={test.id}
                type="button"
                onClick={() => setSelectedTestId(test.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedTest.id === test.id
                    ? "border-ielts-listening/30 bg-purple-50 shadow-md"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="inline-block rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                  Listening
                </div>
                <div className="mt-3 text-sm font-semibold leading-6 text-gray-900">
                  {test.title}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Panel */}
        <div className="space-y-5">
          {/* Selected Test */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <FileAudio className="h-3.5 w-3.5" />
                  Selected Test
                </div>
                <h2 className="mt-3 text-xl font-extrabold text-gray-900">
                  {selectedTest.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Start the timer, play the audio, answer on the PDF, then check answers.
                </p>
              </div>
              <a
                href={selectedTest.sourcePage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4" />
                Source
              </a>
            </div>

            {/* Controls */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                disabled={timeLeft === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <AlarmClock className="h-4 w-4" />
                {isRunning ? "Pause" : "Start 30-Min Timer"}
              </button>
              <button
                type="button"
                onClick={resetSession}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <a
                href={selectedTest.audioUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-ielts-listening px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                <FileAudio className="h-4 w-4" />
                Open Audio
              </a>
              <a
                href={selectedTest.answersUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <FileText className="h-4 w-4" />
                Answers
              </a>
            </div>

            {/* Score Input */}
            <div className="mt-5 grid gap-4 sm:grid-cols-[220px_1fr]">
              <div className="rounded-2xl bg-gray-50 p-4">
                <label className="block text-sm font-medium text-gray-700">
                  Correct Answers (0-40)
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={correctAnswers}
                  onChange={(event) => setCorrectAnswers(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-lg font-semibold text-gray-900 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <div className="mt-3 text-sm font-medium text-gray-600">
                  Band: <span className="font-bold text-navy">{listeningBand.toFixed(1)}</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm leading-6 text-gray-500">
                  After checking the official answers, enter your correct count
                  and save to the calculator.
                </p>
                <button
                  type="button"
                  onClick={saveListeningScore}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-ielts-listening px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  <Save className="h-4 w-4" />
                  Save Score
                </button>
              </div>
            </div>

            {/* Audio Player */}
            <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <audio controls className="w-full">
                <source src={selectedTest.audioUrl} />
              </audio>
            </div>
          </section>

          {/* PDF Viewer */}
          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Question PDF</h3>
                <p className="text-sm text-gray-400">From IELTS Fever</p>
              </div>
              <a
                href={selectedTest.questionPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-deep"
              >
                <ExternalLink className="h-4 w-4" />
                Open PDF
              </a>
            </div>
            <iframe
              title={selectedTest.title}
              src={selectedTest.questionPdfUrl}
              className="h-[65vh] w-full bg-gray-50"
            />
          </section>

          {/* Notes */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <h3 className="text-base font-bold text-gray-900">Notes</h3>
            <p className="mt-1 text-sm text-gray-400">
              Scratch area saved per test in your browser.
            </p>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Write quick notes here..."
              className="mt-4 min-h-[180px] w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
            />
          </section>
        </div>
      </section>
    </main>
  );
}
