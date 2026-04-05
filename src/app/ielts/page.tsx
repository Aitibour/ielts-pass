"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlarmClock,
  BookOpen,
  Calculator,
  CheckCircle2,
  ExternalLink,
  Headphones,
  FileText,
  FilePenLine,
  RotateCcw,
  TimerReset,
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5_35%,_#f8fafc_75%)]">
      <section className="border-b border-orange-100/80 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
              <BookOpen className="h-3.5 w-3.5" />
              General IELTS Simulator
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              {test.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Practice with a real reading paper from {test.sourceLabel}. The page
              includes a 60-minute timer, 40 answer boxes, and instant raw-score
              plus IELTS band calculation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-3xl bg-slate-950 px-4 py-4 text-white shadow-xl shadow-slate-950/10">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                Time Left
              </div>
              <div className="mt-1 text-2xl font-black">{formatTime(timeLeft)}</div>
            </div>
            <div className="rounded-3xl bg-white px-4 py-4 shadow-lg shadow-orange-100/60 ring-1 ring-orange-100">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Answered
              </div>
              <div className="mt-1 text-2xl font-black text-slate-900">
                {answeredCount}/40
              </div>
            </div>
            <div className="rounded-3xl bg-white px-4 py-4 shadow-lg shadow-orange-100/60 ring-1 ring-orange-100">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Score
              </div>
              <div className="mt-1 text-2xl font-black text-slate-900">
                {isSubmitted ? `${score}/40` : "--"}
              </div>
            </div>
            <div className="rounded-3xl bg-white px-4 py-4 shadow-lg shadow-orange-100/60 ring-1 ring-orange-100">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                IELTS Band
              </div>
              <div className="mt-1 text-2xl font-black text-slate-900">
                {isSubmitted ? band.toFixed(1) : "--"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.9fr)]">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Reading Paper</h2>
              <p className="text-sm text-slate-500">
                Use the embedded PDF or open the source directly if your browser blocks
                cross-site previews.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={test.questionPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                <FileText className="h-4 w-4" />
                Open PDF
              </a>
              <a
                href={test.articleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <ExternalLink className="h-4 w-4" />
                Open Article
              </a>
            </div>
          </div>
          <iframe
            title={test.title}
            src={test.questionPdfUrl}
            className="h-[70vh] w-full bg-slate-50"
          />
        </div>

        <div className="space-y-5">
          <div className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-xl shadow-orange-100/50">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                disabled={isSubmitted || timeLeft === 0}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <AlarmClock className="h-4 w-4" />
                {isRunning ? "Pause Timer" : "Start Timer"}
              </button>
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                <CheckCircle2 className="h-4 w-4" />
                Submit Answers
              </button>
              <button
                type="button"
                onClick={resetExam}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-orange-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-orange-900">
                  <TimerReset className="h-4 w-4" />
                  Test format
                </div>
                <p className="mt-2 text-sm leading-6 text-orange-900/75">
                  40 questions, 60 minutes, auto-save in this browser, and
                  instant marking when you submit.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Source links</div>
                <div className="mt-2 space-y-2 text-sm text-slate-600">
                  <Link
                    href="/ielts/writing"
                    className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 transition hover:bg-slate-100"
                  >
                    Writing practice
                    <FilePenLine className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/ielts/writing/task-2"
                    className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 transition hover:bg-slate-100"
                  >
                    Writing Task 2
                    <FilePenLine className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/ielts/listening"
                    className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 transition hover:bg-slate-100"
                  >
                    Listening tests
                    <Headphones className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/ielts/calculator"
                    className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 transition hover:bg-slate-100"
                  >
                    Score calculator
                    <Calculator className="h-4 w-4" />
                  </Link>
                  <a
                    href={test.answersPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 transition hover:bg-slate-100"
                  >
                    Answer key PDF
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    href="/"
                    className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 transition hover:bg-slate-100"
                  >
                    Back to home
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {isSubmitted ? (
              <div className="mt-5 rounded-[1.75rem] bg-slate-950 p-5 text-white">
                <div className="text-sm uppercase tracking-[0.2em] text-white/50">
                  Result
                </div>
                <div className="mt-2 flex flex-wrap items-end gap-4">
                  <div>
                    <div className="text-4xl font-black">{score}/40</div>
                    <div className="text-sm text-white/65">Raw correct answers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black">{band.toFixed(1)}</div>
                    <div className="text-sm text-white/65">Estimated IELTS band</div>
                  </div>
                </div>
                {savedScore ? (
                  <div className="mt-4 text-sm text-white/70">
                    Saved to the General IELTS calculator.
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900">Answer Sheet</h2>
              <p className="text-sm text-slate-500">
                Enter letters, words, or short phrases exactly as you see them in the
                test.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {answers.map((answer, index) => {
                const correct = isCorrectAnswer(answer, test.answerKey[index]);
                const showState = isSubmitted && answer.trim().length > 0;

                return (
                  <label
                    key={index}
                    className={`rounded-3xl border p-3 transition ${
                      showState
                        ? correct
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-rose-200 bg-rose-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      Q{index + 1}
                    </div>
                    <input
                      value={answer}
                      onChange={(event) => updateAnswer(index, event.target.value)}
                      disabled={isSubmitted}
                      className="w-full border-none bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-300 disabled:cursor-not-allowed"
                      placeholder="Your answer"
                    />
                    {isSubmitted ? (
                      <div className="mt-2 text-xs leading-5 text-slate-500">
                        Accepts: {test.answerKey[index].join(" / ")}
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
