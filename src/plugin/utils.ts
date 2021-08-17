import { To, Options } from "./type";

type Exclude = Options["exclude"];
export const isIgnoreRoute = (target: To, exclude: Exclude) => {
  return exclude.some((e) => target.fullPath.match(e));
};

export function getScrollPosition(selector: string) {
  const el = document.querySelector(selector);
  return {
    x: el ? el.scrollLeft : window.pageXOffset,
    y: el ? el.scrollTop : window.pageYOffset,
  };
}
