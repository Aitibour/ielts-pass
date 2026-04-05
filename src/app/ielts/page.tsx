"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlarmClock,
  ArrowLeft,
  BookOpen,
  Calculator,
  CheckCircle2,
  ExternalLink,
  Headphones,
  FileText,
  FilePenLine,
  RotateCcw,
} from "lucide-react";
import {
  calculateGeneralReadingBand,
  ieltsGeneralReadingTest2,
  isCorrectAnswer,
} from "@/lib/ielts";
import { saveGeneralIeltsScores } from "@/lib/ielts-general-score-store";

const test = ieltsGeneralReadingTest2;
const storageKey = `ielts-simulator-${test.id}`;

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function IeltsPage() {
  const initialSeconds = test.minutes * 60;
  const [answers, setAnswers] = useState<string[]>(
    () => Array.from({ length: 40 }, () => "")
  );
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedScore, setSavedScore] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as {
        answers?: string[];
        timeLeft?: number;
        isSubmitted?: boolean;
      };

      if (Array.isArray(parsed.answers) && parsed.answers.length === 40) {
        setAnswers(parsed.answers);
      }

      if (typeof parsed.timeLeft === "number") {
        setTimeLeft(parsed.timeLeft);
      }

      if (typeof parsed.isSubmitted === "boolean") {
        setIsSubmitted(parsed.isSubmitted);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ answers, timeLeft, isSubmitted })
    );
  }, [answers, timeLeft, isSubmitted]);

  useEffect(() => {
    if (!isRunning || isSubmitted) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setIsRunning(false);
          setIsSubmitted(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, isSubmitted]);

  const score = useMemo(
    () =>
      answers.reduce((total, answer, index) => {
        return total + (isCorrectAnswer(answer, test.answerKey[index]) ? 1 : 0);
      }, 0),
    [answers]
  );
  const band = calculateGeneralReadingBand(score);
  const answeredCount = answers.filter((answer) => answer.trim()).length;

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    saveGeneralIeltsScores({
      readingRaw: score,
      readingBand: band,
    });
    setSavedScore(true);
  }, [band, isSubmitted, score]);

  function updateAnswer(index: number, value: string) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  }

  function resetExam() {
    setAnswers(Array.from({ length: 40 }, () => ""));
    setTimeLeft(initialSeconds);
    setIsRunning(false);
    setIsSubmitted(false);
    setSavedScore(false);
    window.localStorage.removeItem(storageKey);
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
            <span className="font-medium text-navy">Reading Simulator</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                General Reading
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                {test.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                Practice with a real reading paper from {test.sourceLabel}. The page
                includes a 60-minute timer, 40 answer boxes, and instant raw-score
                plus IELTS band calculation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-navy px-4 py-4 text-white shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Time Left
                </div>
                <div className="mt-1 text-2xl font-extrabold">{formatTime(timeLeft)}</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Answered
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">
                  {answeredCount}/40
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Score
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">
                  {isSubmitted ? `${score}/40` : "--"}
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Band
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">
                  {isSubmitted ? band.toFixed(1) : "--"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.9fr)] lg:px-8">
        {/* PDF Viewer */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Reading Paper</h2>
              <p className="text-sm text-gray-400">
                Embedded PDF or open the source directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={test.questionPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                <FileText className="h-4 w-4" />
                Open PDF
              </a>
              <a
                href={test.articleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4" />
                Source
              </a>
            </div>
          </div>
          <iframe
            title={test.title}
            src={test.questionPdfUrl}
            className="h-[70vh] w-full bg-gray-50"
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Controls */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                disabled={isSubmitted || timeLeft === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <AlarmClock className="h-4 w-4" />
                {isRunning ? "Pause Timer" : "Start Timer"}
              </button>
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-ielts-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Submit
              </button>
              <button
                type="button"
                onClick={resetExam}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            {/* Quick links */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-primary-light p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Test format
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  40 questions, 60 minutes, auto-save, instant marking.
                </p>
              </div>
              <div className="space-y-2 rounded-2xl bg-gray-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Navigate
                </div>
                <Link
                  href="/ielts/writing"
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Writing practice
                  <FilePenLine className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/ielts/listening"
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Listening tests
                  <Headphones className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/ielts/calculator"
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Score calculator
                  <Calculator className="h-4 w-4 text-gray-400" />
                </Link>
                <a
                  href={test.answersPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Answer key PDF
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </div>
            </div>

            {/* Results */}
            {isSubmitted ? (
              <div className="mt-5 rounded-2xl bg-navy p-6 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Result
                </div>
                <div className="mt-3 flex flex-wrap items-end gap-6">
                  <div>
                    <div className="text-4xl font-extrabold">{score}/40</div>
                    <div className="mt-1 text-sm text-white/60">Raw score</div>
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold">{band.toFixed(1)}</div>
                    <div className="mt-1 text-sm text-white/60">IELTS Band</div>
                  </div>
                </div>
                {savedScore && (
                  <div className="mt-4 text-sm text-white/60">
                    Saved to the General IELTS calculator.
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Answer Sheet */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="mb-5">
              <h2 className="text-base font-bold text-gray-900">Answer Sheet</h2>
              <p className="mt-1 text-sm text-gray-400">
                Enter answers exactly as they appear in the test.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {answers.map((answer, index) => {
                const correct = isCorrectAnswer(answer, test.answerKey[index]);
                const showState = isSubmitted && answer.trim().length > 0;

                return (
                  <label
                    key={index}
                    className={`rounded-2xl border p-3 transition ${
                      showState
                        ? correct
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-red-200 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      Q{index + 1}
                    </div>
                    <input
                      value={answer}
                      onChange={(event) => updateAnswer(index, event.target.value)}
                      disabled={isSubmitted}
                      className="w-full border-none bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-300 disabled:cursor-not-allowed"
                      placeholder="..."
                    />
                    {isSubmitted ? (
                      <div className="mt-2 text-xs leading-5 text-gray-500">
                        {test.answerKey[index].join(" / ")}
                      </div>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
