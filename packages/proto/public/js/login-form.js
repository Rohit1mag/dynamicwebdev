import { css, html, shadow } from "@unbndl/html";
import { createViewModel, fromInputs } from "@unbndl/view";
import reset from "./styles/reset-in-shadow.js";

export class LoginFormElement extends HTMLElement {
  viewModel = createViewModel({
    username: "",
    password: ""
  }).with(fromInputs(this), "username", "password");

  view = html`<form>
    <slot></slot>
    <button type="submit">
      <slot name="submit-label">Login</slot>
    </button>
  </form>`;

  constructor() {
    super();
    shadow(this)
      .styles(reset.styles, LoginFormElement.styles)
      .replace(this.viewModel.render(this.view))
      .listen({
        submit: (ev) =>
          this.submitLogin(ev, this.getAttribute("api") || "#")
      });
  }

  submitLogin(event, endpoint) {
    event.preventDefault();
    const data = this.viewModel.toObject();
    const method = "POST";
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(data);
    console.log("Posting login form:", endpoint, body, event);
    fetch(endpoint, { method, headers, body })
      .then((res) => {
        if (!res.ok)
          throw `Form submission failed: Status ${res.status}`;
        return res.json();
      })
      .then((json) => {
        const { token } = json;
        const customEvent = new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect: "/" }]
        });
        this.dispatchEvent(customEvent);
      })
      .catch((err) => console.error("Login failed:", err));
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    button[type="submit"] {
      align-self: flex-start;
      padding: 0.5rem 1.5rem;
      background-color: var(--color-accent, #2266aa);
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }

    button[type="submit"]:hover {
      opacity: 0.88;
    }
  `;
}
