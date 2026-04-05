"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Calculator,
  Ear,
  FileText,
  MessageSquareQuote,
  Mic2,
  TrendingUp,
} from "lucide-react";
import {
  calculateListeningBand,
  calculateOverallIeltsBand,
  calculateGeneralReadingBand,
} from "@/lib/ielts-scoring";
import {
  loadGeneralIeltsScores,
  saveGeneralIeltsScores,
} from "@/lib/ielts-general-score-store";

function clampInput(value: string, min: number, max: number): number {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return min;
  }

  return Math.max(min, Math.min(max, parsed));
}

export default function IeltsCalculatorPage() {
  const [listeningCorrect, setListeningCorrect] = useState("30");
  const [readingCorrect, setReadingCorrect] = useState("30");
  const [writingBand, setWritingBand] = useState("6.5");
  const [speakingBand, setSpeakingBand] = useState("6.5");
  const [task1Band, setTask1Band] = useState<number | null>(null);
  const [task2Band, setTask2Band] = useState<number | null>(null);

  useEffect(() => {
    const saved = loadGeneralIeltsScores();

    if (saved.listeningRaw !== null) {
      setListeningCorrect(String(saved.listeningRaw));
    }

    if (saved.readingRaw !== null) {
      setReadingCorrect(String(saved.readingRaw));
    }

    if (saved.speakingBand !== null) {
      setSpeakingBand(saved.speakingBand.toFixed(1));
    }

    setTask1Band(saved.writingTask1Band);
    setTask2Band(saved.writingTask2Band);

    if (saved.writingTask1Band !== null && saved.writingTask2Band !== null) {
      const suggestedWriting = (saved.writingTask1Band + saved.writingTask2Band) / 2;
      setWritingBand(suggestedWriting.toFixed(1));
    } else if (saved.writingTask2Band !== null) {
      setWritingBand(saved.writingTask2Band.toFixed(1));
    } else if (saved.writingTask1Band !== null) {
      setWritingBand(saved.writingTask1Band.toFixed(1));
    }
  }, []);

  const listeningBand = calculateListeningBand(clampInput(listeningCorrect, 0, 40));
  const readingBand = calculateGeneralReadingBand(clampInput(readingCorrect, 0, 40));
  const writing = clampInput(writingBand, 0, 9);
  const speaking = clampInput(speakingBand, 0, 9);

  const overall = useMemo(
    () =>
      calculateOverallIeltsBand({
        listening: listeningBand,
        reading: readingBand,
        writing,
        speaking,
      }),
    [listeningBand, readingBand, speaking, writing]
  );

  return (
    <main className="flex-1 bg-[url('/bg-pattern.svg')] bg-cover bg-fixed bg-center bg-no-repeat">
      {/* Page Header */}
      <section className="border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-navy">Score Calculator</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Calculator className="h-3.5 w-3.5" />
                Band Score Calculator
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                IELTS Overall Band Calculator
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                Enter General Listening and Reading correct answers (out of 40), plus
                Writing and Speaking band scores. The overall band is rounded to the
                nearest whole or half band.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-navy px-4 py-4 text-white shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Listening
                </div>
                <div className="mt-1 text-2xl font-extrabold">{listeningBand.toFixed(1)}</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Reading
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900">
                  {readingBand.toFixed(1)}
                </div>
              </div>
              <div className="rounded-2xl bg-ielts-green px-4 py-4 text-white shadow-card">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Overall
                </div>
                <div className="mt-1 text-2xl font-extrabold">{overall.overall.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Listening */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2.5 text-base font-bold text-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ielts-listening text-white">
                <Ear className="h-5 w-5" />
              </div>
              Listening
            </div>
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Correct Answers (0-40)
            </label>
            <input
              type="number"
              min="0"
              max="40"
              value={listeningCorrect}
              onChange={(event) => setListeningCorrect(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
            />
            <div className="mt-4 rounded-xl bg-purple-50 px-4 py-3 text-sm font-semibold text-ielts-listening">
              Band: {listeningBand.toFixed(1)}
            </div>
          </div>

          {/* Reading */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2.5 text-base font-bold text-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <FileText className="h-5 w-5" />
              </div>
              General Reading
            </div>
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Correct Answers (0-40)
            </label>
            <input
              type="number"
              min="0"
              max="40"
              value={readingCorrect}
              onChange={(event) => setReadingCorrect(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
            />
            <div className="mt-4 rounded-xl bg-primary-light px-4 py-3 text-sm font-semibold text-primary">
              Band: {readingBand.toFixed(1)}
            </div>
          </div>

          {/* Writing */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2.5 text-base font-bold text-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                <MessageSquareQuote className="h-5 w-5" />
              </div>
              Writing
            </div>
            <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-600">
              Saved Task 1: <span className="font-semibold">{task1Band !== null ? task1Band.toFixed(1) : "--"}</span>
              <span className="mx-2 text-gray-300">|</span>
              Saved Task 2: <span className="font-semibold">{task2Band !== null ? task2Band.toFixed(1) : "--"}</span>
            </div>
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Band Score
            </label>
            <input
              type="number"
              min="0"
              max="9"
              step="0.5"
              value={writingBand}
              onChange={(event) => {
                setWritingBand(event.target.value);
                saveGeneralIeltsScores({
                  writingTask1Band: task1Band,
                  writingTask2Band: task2Band,
                });
              }}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Speaking */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2.5 text-base font-bold text-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ielts-green text-white">
                <Mic2 className="h-5 w-5" />
              </div>
              Speaking
            </div>
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Band Score
            </label>
            <input
              type="number"
              min="0"
              max="9"
              step="0.5"
              value={speakingBand}
              onChange={(event) => {
                setSpeakingBand(event.target.value);
                saveGeneralIeltsScores({
                  speakingBand: Math.max(0, Math.min(9, Number(event.target.value) || 0)),
                });
              }}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Overall Result */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card-lg">
          <div className="gradient-navy p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              <TrendingUp className="h-4 w-4" />
              Overall Result
            </div>
            <div className="mt-4 grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Average
                </div>
                <div className="mt-2 text-4xl font-extrabold text-white">
                  {overall.average.toFixed(2)}
                </div>
              </div>
              <div className="rounded-2xl bg-ielts-green p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Overall Band
                </div>
                <div className="mt-2 text-4xl font-extrabold text-white">
                  {overall.overall.toFixed(1)}
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Calculation
                </div>
                <div className="mt-2 text-sm leading-6 text-white/70">
                  Average of all 4 modules, rounded to nearest whole or half band.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
