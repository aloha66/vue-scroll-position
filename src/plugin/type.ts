export interface Options {
  exclude: (RegExp | string)[];
  el: string;
  max: number;
  delay: number | undefined;
  router: unknown;
}

export interface To {
  fullPath: string;
}

export type Next = (e?: unknown) => void;

export type Each = (to: To, from: To, next: Next) => void;

export interface Router {
  // // $router :{
  beforeEach: (e: Each) => void;
  // // }
  afterEach: (e: Each) => void;
}
