export interface GeneralIeltsScores {
  listeningRaw: number | null;
  listeningBand: number | null;
  readingRaw: number | null;
  readingBand: number | null;
  writingTask1Band: number | null;
  writingTask2Band: number | null;
  speakingBand: number | null;
}

export const generalIeltsScoresStorageKey = "ielts-general-scores";

export const defaultGeneralIeltsScores: GeneralIeltsScores = {
  listeningRaw: null,
  listeningBand: null,
  readingRaw: null,
  readingBand: null,
  writingTask1Band: null,
  writingTask2Band: null,
  speakingBand: null,
};

export function loadGeneralIeltsScores(): GeneralIeltsScores {
  if (typeof window === "undefined") {
    return defaultGeneralIeltsScores;
  }

  const saved = window.localStorage.getItem(generalIeltsScoresStorageKey);

  if (!saved) {
    return defaultGeneralIeltsScores;
  }

  try {
    return {
      ...defaultGeneralIeltsScores,
      ...(JSON.parse(saved) as Partial<GeneralIeltsScores>),
    };
  } catch {
    return defaultGeneralIeltsScores;
  }
}

export function saveGeneralIeltsScores(update: Partial<GeneralIeltsScores>): GeneralIeltsScores {
  const next = {
    ...loadGeneralIeltsScores(),
    ...update,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      generalIeltsScoresStorageKey,
      JSON.stringify(next)
    );
  }

  return next;
}
