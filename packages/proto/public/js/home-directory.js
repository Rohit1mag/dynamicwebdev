import { html, css, shadow } from "@unbndl/html";
import reset from "./styles/reset-in-shadow.js";

export class HomeDirectoryElement extends HTMLElement {
  constructor() {
    super();
    shadow(this).styles(reset.styles, HomeDirectoryElement.styles);
  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, _old, newValue) {
    if (name !== "src" || !newValue) return;
    this.hydrate(newValue).then((data) => {
      if (data) shadow(this).replace(HomeDirectoryElement.render(data));
    });
  }

  hydrate(src) {
    return fetch(src)
      .then((res) => {
        if (res.status !== 200) throw `HTTP Status ${res.status}`;
        return res.json();
      })
      .catch((err) => console.log("Failed to load directory:", err));
  }

  static render(data) {
    const sections = Array.isArray(data) ? data : data.sections;
    const renderItem = (item) => html`
      <li><a href=${item.href}>${item.text}</a>${item.note ?? ""}</li>
    `;
    const renderSection = (s) => html`
      <itr-home-section section-id=${s.sectionId} icon-href=${s.iconHref}>
        <span slot="title">${s.title}</span>
        <ul>
          ${s.items.map(renderItem)}
        </ul>
      </itr-home-section>
    `;
    return html`
      <div class="section-grid">
        ${sections.map(renderSection)}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      grid-column: 1 / -1;
    }

    .section-grid {
      display: grid;
      grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
      gap: var(--space-3);
    }
  `;
}
