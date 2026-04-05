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
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_40%,_#fefce8_100%)]">
      <section className="border-b border-sky-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <Link
              href="/ielts"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to IELTS
            </Link>
            <span>Listening practice</span>
          </div>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                <Headphones className="h-3.5 w-3.5" />
                General Listening Tests
              </div>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                IELTS General Listening Practice
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                These tests use the real IELTS Fever listening page materials: question
                PDF, audio file, and answer page. No extra generated test content is
                mixed in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950 px-4 py-4 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Timer
                </div>
                <div className="mt-1 text-2xl font-black">{formatTime(timeLeft)}</div>
              </div>
              <div className="rounded-3xl bg-white px-4 py-4 ring-1 ring-sky-100 shadow-lg shadow-sky-100/60">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Tests
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">
                  {ieltsListeningTests.length}
                </div>
              </div>
              <div className="rounded-3xl bg-white px-4 py-4 ring-1 ring-sky-100 shadow-lg shadow-sky-100/60">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Source
                </div>
                <div className="mt-1 text-sm font-black text-slate-900">IELTS Fever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
          <div className="text-lg font-bold text-slate-900">Listening Library</div>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Tests below are taken from the IELTS Fever listening sample papers page.
          </p>

          <div className="mt-4 space-y-3">
            {ieltsListeningTests.map((test) => (
              <button
                key={test.id}
                type="button"
                onClick={() => setSelectedTestId(test.id)}
                className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                  selectedTest.id === test.id
                    ? "border-sky-200 bg-sky-50 shadow-md shadow-sky-100/60"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 inline-block">
                  Listening
                </div>
                <div className="mt-3 text-sm font-semibold leading-6 text-slate-900">
                  {test.title}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-5">
          <section className="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-xl shadow-sky-100/60">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <FileAudio className="h-3.5 w-3.5" />
                  Selected Test
                </div>
                <h2 className="mt-3 text-2xl font-black text-slate-900">
                  {selectedTest.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Start the timer, play the original audio, answer on the PDF, then
                  open the IELTS Fever answers page to check your work.
                </p>
              </div>
              <a
                href={selectedTest.sourcePage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <ExternalLink className="h-4 w-4" />
                Source Page
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                disabled={timeLeft === 0}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <AlarmClock className="h-4 w-4" />
                {isRunning ? "Pause Timer" : "Start 30-Min Timer"}
              </button>
              <button
                type="button"
                onClick={resetSession}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Session
              </button>
              <a
                href={selectedTest.audioUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
              >
                <FileAudio className="h-4 w-4" />
                Open Audio
              </a>
              <a
                href={selectedTest.answersUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <FileText className="h-4 w-4" />
                Open Answers
              </a>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <label className="block text-sm font-medium text-slate-700">
                  Correct Answers (0-40)
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={correctAnswers}
                  onChange={(event) => setCorrectAnswers(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-lg font-semibold text-slate-900 outline-none focus:border-sky-300"
                />
                <div className="mt-3 text-sm font-medium text-slate-700">
                  Listening band: {listeningBand.toFixed(1)}
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="text-sm leading-6 text-slate-600">
                  After you finish listening and check the official IELTS Fever
                  answers, enter your number of correct answers here and save it to
                  the General IELTS calculator.
                </div>
                <button
                  type="button"
                  onClick={saveListeningScore}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
                >
                  <FileText className="h-4 w-4" />
                  Save Listening Score
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
              <audio controls className="w-full">
                <source src={selectedTest.audioUrl} />
              </audio>
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Question PDF</h3>
                <p className="text-sm text-slate-500">
                  Embedded source file from IELTS Fever
                </p>
              </div>
              <a
                href={selectedTest.questionPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <ExternalLink className="h-4 w-4" />
                Open PDF
              </a>
            </div>
            <iframe
              title={selectedTest.title}
              src={selectedTest.questionPdfUrl}
              className="h-[65vh] w-full bg-slate-50"
            />
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <h3 className="text-lg font-bold text-slate-900">Notes</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Use this scratch area while you listen. Notes are saved per test in your
              browser.
            </p>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Write quick notes here..."
              className="mt-4 min-h-[180px] w-full resize-y rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-sky-300 focus:bg-white"
            />
          </section>
        </div>
      </section>
    </main>
  );
}
