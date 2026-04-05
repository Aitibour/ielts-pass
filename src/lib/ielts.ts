export { calculateGeneralReadingBand } from "@/lib/ielts-scoring";

export interface IeltsTest {
  id: string;
  title: string;
  sourceLabel: string;
  minutes: number;
  articleUrl: string;
  questionPdfUrl: string;
  answersPdfUrl: string;
  answerKey: string[][];
}

export const ieltsGeneralReadingTest2: IeltsTest = {
  id: "general-reading-test-2",
  title: "IELTS General Reading Test 2",
  sourceLabel: "IELTS Fever",
  minutes: 60,
  articleUrl:
    "https://ieltsfever.org/the-harbour-view-hotel-what-to-do-in-westley-westley/",
  questionPdfUrl:
    "https://ieltsfever.org/wp-content/uploads/2016/03/ieltsfever-general-reading-practice-test-2-pdf.pdf",
  answersPdfUrl:
    "https://ieltsfever.org/wp-content/uploads/2016/03/ANSWERS-ieltsfever-general-reading-practice-test-2-pdf.pdf",
  answerKey: [
    ["r"],
    ["v"],
    ["g"],
    ["v"],
    ["e"],
    ["o"],
    ["s"],
    ["q"],
    ["b"],
    ["g"],
    ["j"],
    ["f"],
    ["b", "d"],
    ["b", "d"],
    ["d", "f"],
    ["d", "f"],
    ["lid", "the lid"],
    ["steam wand", "steam pipe", "wand", "pipe"],
    ["water tank", "the water tank"],
    ["professional medical help", "medical help", "professional help"],
    ["this manual", "the manual", "manual"],
    ["dvds and posters", "dvd and posters", "posters and dvds"],
    ["your", "your own"],
    ["real patient", "patient"],
    ["key terms"],
    ["case studies"],
    ["study questions"],
    ["d"],
    ["e"],
    ["c"],
    ["g"],
    ["a"],
    ["f"],
    ["b"],
    ["c"],
    ["a"],
    ["alarm bells"],
    ["dial locks"],
    ["digital technology"],
    ["conventional keys"],
  ],
};

export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[().,/]+/g, " ")
    .replace(/\s+/g, " ");
}

export function isCorrectAnswer(input: string, acceptedAnswers: string[]): boolean {
  const normalizedInput = normalizeAnswer(input);

  if (!normalizedInput) {
    return false;
  }

  return acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalizedInput);
}
