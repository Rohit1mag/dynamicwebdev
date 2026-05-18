import { css, html, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import reset from "./styles/reset-in-shadow.js";

export class ItrHeaderElement extends HTMLElement {
  viewModel = createViewModel({
    authenticated: false,
    username: undefined,
    token: undefined
  }).with(fromAuth(this), "authenticated", "username", "token");

  constructor() {
    super();
    shadow(this).styles(reset.styles, ItrHeaderElement.styles);

    this.viewModel.createEffect(($) => {
      this.renderHeader($);
    });
  }

  renderHeader($) {
    const authClass = $.authenticated ? "logged-in" : "logged-out";
    const name = $.username || "investor";

    shadow(this).replace(html`
      <header class="site-header">
        <div class="site-header__brand">
          <a class="site-logo" href="/index.html">Investment Tracker</a>
        </div>
        <nav class="site-header__nav" aria-label="Main">
          <a href="/index.html">Home</a>
          <a href="/investor-rohit.html">Investors</a>
          <a href="/portfolio-growth.html">Portfolios</a>
          <a href="/asset-aapl.html">Assets</a>
        </nav>
        <div class="site-header__user">
          <nav class=${authClass}>
            <p class="greeting">Hello, ${name}</p>
            <menu>
              <li class="when-signed-in">
                <button class="signout-btn">Sign Out</button>
              </li>
              <li class="when-signed-out">
                <a href="/login.html">Sign In</a>
              </li>
            </menu>
          </nav>
        </div>
      </header>
    `);

    const signoutButton = this.shadowRoot.querySelector(".signout-btn");
    if (signoutButton) {
      signoutButton.addEventListener("click", (event) =>
        this.signout(event)
      );
    }
  }

  signout(event) {
    if (event) event.preventDefault();
    const customEvent = new CustomEvent("auth:message", {
      bubbles: true,
      composed: true,
      detail: ["auth/signout"]
    });
    this.dispatchEvent(customEvent);
    this.viewModel.set("authenticated", false);
    this.viewModel.set("username", undefined);
    this.viewModel.set("token", undefined);
  }

  static styles = css`
    .site-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.75rem 1.5rem;
      background-color: var(--color-header-bg, #1a3a5c);
      color: var(--color-header-text, #fff);
      margin-bottom: 1.5rem;
    }

    .site-logo {
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 700;
      font-size: 1.35rem;
      text-decoration: none;
      color: inherit;
    }

    .site-logo:hover {
      text-decoration: underline;
    }

    .site-header__nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1rem;
    }

    .site-header__nav a {
      font-size: 0.9rem;
      text-decoration: none;
      color: inherit;
      opacity: 0.92;
      border-bottom: 1px solid transparent;
    }

    .site-header__nav a:hover {
      opacity: 1;
      border-bottom-color: currentColor;
    }

    .site-header__user {
      display: flex;
      align-items: center;
    }

    nav.logged-in,
    nav.logged-out {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .greeting {
      font-size: 0.9rem;
      white-space: nowrap;
    }

    menu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
    }

    li {
      display: none;
    }

    .logged-in .when-signed-in,
    .logged-out .when-signed-out {
      display: block;
    }

    .when-signed-out a {
      color: inherit;
      font-size: 0.9rem;
      text-decoration: none;
      opacity: 0.92;
      border-bottom: 1px solid transparent;
    }

    .when-signed-out a:hover {
      opacity: 1;
      border-bottom-color: currentColor;
    }

    .signout-btn {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: inherit;
      border-radius: 4px;
      padding: 0.25rem 0.75rem;
      font-size: 0.85rem;
      cursor: pointer;
    }

    .signout-btn:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  `;
}
