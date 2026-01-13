import "@testing-library/jest-dom";

if (!HTMLElement.prototype.scrollTo) {
  HTMLElement.prototype.scrollTo = function scrollTo(
    options?: ScrollToOptions | number,
    y?: number,
  ): void {
    if (typeof options === "number") {
      this.scrollLeft = options;
      if (typeof y === "number") {
        this.scrollTop = y;
      }
      return;
    }

    if (options && typeof options === "object") {
      if (typeof options.left === "number") {
        this.scrollLeft = options.left;
      }
      if (typeof options.top === "number") {
        this.scrollTop = options.top;
      }
    }
  };
}
