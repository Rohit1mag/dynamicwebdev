import { html, css, shadow } from "@unbndl/html";
import { createViewModel, fromAttributes } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import reset from "./styles/reset-in-shadow.js";

export class HomeDirectoryElement extends HTMLElement {
  viewModel = createViewModel({
    authenticated: false,
    token: undefined,
    src: undefined
  })
    .with(fromAttributes(this), "src")
    .with(fromAuth(this), "authenticated", "token");

  constructor() {
    super();
    shadow(this).styles(reset.styles, HomeDirectoryElement.styles);

    this.viewModel.createEffect(($) => {
      if ($.src) {
        this.hydrate($.src).then((data) => {
          if (data) shadow(this).replace(HomeDirectoryElement.render(data));
        });
      }
    });
  }

  get authorization() {
    const $ = this.viewModel.toObject();
    if ($.authenticated)
      return { Authorization: `Bearer ${$.token}` };
    else return {};
  }

  hydrate(src) {
    return fetch(src, { headers: this.authorization })
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
