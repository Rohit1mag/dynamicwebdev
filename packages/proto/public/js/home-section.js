import { html, css, shadow } from "@unbndl/html";
import reset from "./styles/reset-in-shadow.js";

// CS lab: wraps each category block on the home page (same pattern repeated 6 times before)
export class HomeSectionElement extends HTMLElement {
  static template = html`
    <template>
      <section class="section-card">
        <h2>
          <svg class="icon" aria-hidden="true"><use href="" /></svg>
          <slot name="title">(untitled section)</slot>
        </h2>
        <slot></slot>
      </section>
    </template>
  `;

  constructor() {
    super();
    shadow(this)
      .template(HomeSectionElement.template)
      .styles(reset.styles, HomeSectionElement.styles);
  }

  static observedAttributes = ["section-id", "icon-href"];

  attributeChangedCallback(name, _old, newValue) {
    const root = this.shadowRoot;
    if (!root) return;
    const section = root.querySelector("section");
    const useEl = root.querySelector("use");
    switch (name) {
      case "section-id":
        if (newValue != null && newValue !== "") section.id = newValue;
        else section.removeAttribute("id");
        break;
      case "icon-href":
        if (useEl) useEl.setAttribute("href", newValue ?? "");
        break;
    }
  }

  static styles = css`
    :host {
      display: block;
      grid-column: span 4;
    }

    .section-card {
      background-color: var(--color-card-bg);
      border: 1px solid var(--color-border);
      padding: var(--space-3);
      border-radius: 4px;
    }

    h2 {
      margin-bottom: var(--space-2);
    }

    svg.icon {
      display: inline;
      height: 2em;
      width: 2em;
      vertical-align: top;
      fill: currentColor;
    }

    /* list lives in light DOM so we need slotted() */
    ::slotted(ul) {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding-left: 1.25rem;
      margin: 0;
    }
  `;
}
