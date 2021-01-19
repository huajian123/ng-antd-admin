export interface AlainPdfConfig {
  /**
   * [pdf.js](https://github.com/mozilla/pdf.js) library root url, Default: `https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/`
   *
   * **Note** That only the root path, muse be ending with `/`
   */
  lib?: string;
  /**
   * Show single or all pages altogether, Default: `true`
   */
  showAll?: boolean;
  /**
   * Enable text rendering, allows to select text, Default: `true`
   */
  renderText?: boolean;
  /**
   * Show page borders, Default: `false`
   */
  showBorders?: boolean;
  /**
   * Default: `true`
   * - if set to `true` - size will be as same as original document
   * - if set to `false` - size will be as same as container block
   */
  originalSize?: boolean;
  /**
   * You can show your document in original size, and make sure that it's not bigger then container block. Default: `false`
   */
  fitToPage?: boolean;
  /**
   * Turn on or off auto resize, Default: `true`
   * **Important** To make work - make sure that `[originalSize]="false"` and pdf-viewer tag has `max-width` or `display` are set.
   */
  autoReSize?: boolean;
}
