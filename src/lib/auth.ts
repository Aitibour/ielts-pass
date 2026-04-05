import GoTrue, { User } from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://ielts-pass.netlify.app/.netlify/identity",
  setCookie: false,
});

export { auth };
export type { User };
