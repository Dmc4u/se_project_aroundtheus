export default class Section {
  constructor({ renderer }, containerSelector) {
    if (typeof renderer !== "function") {
      throw new Error("Section: Renderer must be a valid function.");
    }

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    if (!this._container) {
      throw new Error(
        `Section: Container with selector "${containerSelector}" not found.`
      );
    }
  }

  renderItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
      console.warn("Section: No valid items to render.");
      return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const element = this._renderer(item);
      if (element) {
        fragment.appendChild(element);
      }
    });

    this._container.appendChild(fragment);
  }

  addItem(element) {
    if (!element) {
      console.error("Section: Cannot add an empty or undefined element.");
      return;
    }
    this._container.prepend(element);
  }
}
