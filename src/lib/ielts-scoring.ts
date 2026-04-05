export type ReadingModule = "academic" | "general";

function clampCorrectAnswers(value: number): number {
  return Math.max(0, Math.min(40, Math.round(value)));
}

export function calculateListeningBand(correctAnswers: number): number {
  const score = clampCorrectAnswers(correctAnswers);

  if (score >= 39) return 9;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8;
  if (score >= 32) return 7.5;
  if (score >= 30) return 7;
  if (score >= 26) return 6.5;
  if (score >= 23) return 6;
  if (score >= 18) return 5.5;
  if (score >= 16) return 5;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4;
  if (score >= 8) return 3.5;
  if (score >= 6) return 3;
  if (score >= 4) return 2.5;
  return 0;
}

export function calculateAcademicReadingBand(correctAnswers: number): number {
  const score = clampCorrectAnswers(correctAnswers);

  if (score >= 39) return 9;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8;
  if (score >= 33) return 7.5;
  if (score >= 30) return 7;
  if (score >= 27) return 6.5;
  if (score >= 23) return 6;
  if (score >= 19) return 5.5;
  if (score >= 15) return 5;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4;
  if (score >= 8) return 3.5;
  if (score >= 6) return 3;
  if (score >= 4) return 2.5;
  return 0;
}

export function calculateGeneralReadingBand(correctAnswers: number): number {
  const score = clampCorrectAnswers(correctAnswers);

  if (score >= 39) return 9;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8;
  if (score >= 33) return 7.5;
  if (score >= 30) return 7;
  if (score >= 27) return 6.5;
  if (score >= 23) return 6;
  if (score >= 19) return 5.5;
  if (score >= 15) return 5;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4;
  if (score >= 8) return 3.5;
  if (score >= 6) return 3;
  if (score >= 4) return 2.5;
  return 0;
}

export function calculateReadingBand(
  module: ReadingModule,
  correctAnswers: number
): number {
  return module === "academic"
    ? calculateAcademicReadingBand(correctAnswers)
    : calculateGeneralReadingBand(correctAnswers);
}

export function roundOverallIeltsBand(average: number): number {
  const roundedToQuarter = Math.round(average * 4) / 4;
  const decimalPart = roundedToQuarter - Math.floor(roundedToQuarter);

  if (decimalPart < 0.25) {
    return Math.floor(roundedToQuarter);
  }

  if (decimalPart < 0.75) {
    return Math.floor(roundedToQuarter) + 0.5;
  }

  return Math.ceil(roundedToQuarter);
}

export function calculateOverallIeltsBand(scores: {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}): { average: number; overall: number } {
  const average =
    (scores.listening + scores.reading + scores.writing + scores.speaking) / 4;

  return {
    average,
    overall: roundOverallIeltsBand(average),
  };
}
