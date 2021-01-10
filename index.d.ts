import type { Attacher } from "unified";

declare namespace widont {
  interface WidontOptions {
    /**
     * Selector to match HTML tags to look into.
     *
     * @default "p, h1, h2, h3, h4, h5, h6, li, dt, dd"
     */
    selector: string;
  }
}
declare const widont: Attacher<[widont.WidontOptions?]>;
export = widont;
