declare interface WidontOptions {
  // Selector to match HTML tags to look into.
  selector: string;
}

declare const widont: Attacher<[WidontOptions?]>;

export default widont;
export { WidontOptions };
