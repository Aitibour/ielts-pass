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
    <main className="min-h-screen bg-[linear-gradient(180deg,_#fffaf5_0%,_#f8fafc_45%,_#f0fdf4_100%)]">
      <section className="border-b border-orange-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <Link
              href="/ielts"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to IELTS
            </Link>
            <span>Band score calculator</span>
          </div>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
                <Calculator className="h-3.5 w-3.5" />
                General IELTS Score Calculator
              </div>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                General Listening, Reading, Writing, Speaking
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Enter General Listening and General Reading correct answers out of 40,
                then add Writing and Speaking band scores. The overall band is the
                average of the 4 modules rounded to the nearest whole or half band.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950 px-4 py-4 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Listening
                </div>
                <div className="mt-1 text-2xl font-black">{listeningBand.toFixed(1)}</div>
              </div>
              <div className="rounded-3xl bg-white px-4 py-4 ring-1 ring-orange-100 shadow-lg shadow-orange-100/60">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Reading
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">
                  {readingBand.toFixed(1)}
                </div>
              </div>
              <div className="rounded-3xl bg-emerald-500 px-4 py-4 text-white shadow-lg shadow-emerald-200/80">
                <div className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Overall
                </div>
                <div className="mt-1 text-2xl font-black">{overall.overall.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Ear className="h-5 w-5 text-orange-500" />
              Listening
            </div>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Correct Answers (0-40)
            </label>
            <input
              type="number"
              min="0"
              max="40"
              value={listeningCorrect}
              onChange={(event) => setListeningCorrect(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-900 outline-none focus:border-orange-300 focus:bg-white"
            />
            <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
              Listening band score: {listeningBand.toFixed(1)}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <FileText className="h-5 w-5 text-orange-500" />
              General Reading
            </div>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Correct Answers (0-40)
            </label>
            <input
              type="number"
              min="0"
              max="40"
              value={readingCorrect}
              onChange={(event) => setReadingCorrect(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-900 outline-none focus:border-orange-300 focus:bg-white"
            />
            <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
              Reading band score: {readingBand.toFixed(1)}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <MessageSquareQuote className="h-5 w-5 text-orange-500" />
              Writing
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
              Saved Task 1 band: {task1Band !== null ? task1Band.toFixed(1) : "--"}
              <br />
              Saved Task 2 band: {task2Band !== null ? task2Band.toFixed(1) : "--"}
            </div>
            <label className="mt-4 block text-sm font-medium text-slate-700">
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
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-900 outline-none focus:border-orange-300 focus:bg-white"
            />
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Mic2 className="h-5 w-5 text-orange-500" />
              Speaking
            </div>
            <label className="mt-4 block text-sm font-medium text-slate-700">
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
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-900 outline-none focus:border-orange-300 focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-5 rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/60">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Result
          </div>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950 p-5 text-white">
              <div className="text-xs uppercase tracking-[0.18em] text-white/55">
                Average
              </div>
              <div className="mt-2 text-4xl font-black">
                {overall.average.toFixed(2)}
              </div>
            </div>
            <div className="rounded-3xl bg-emerald-500 p-5 text-white">
              <div className="text-xs uppercase tracking-[0.18em] text-white/70">
                Overall Band
              </div>
              <div className="mt-2 text-4xl font-black">
                {overall.overall.toFixed(1)}
              </div>
            </div>
            <div className="rounded-3xl bg-orange-50 p-5 text-orange-900">
              <div className="text-xs uppercase tracking-[0.18em] text-orange-700/70">
                Rule Used
              </div>
              <div className="mt-2 text-sm leading-6">
                Overall band = average of Listening, Reading, Writing, and Speaking,
                rounded to the nearest whole or half band.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
