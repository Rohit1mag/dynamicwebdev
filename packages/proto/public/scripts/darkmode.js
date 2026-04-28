// dark mode toggle - lab 5

// helper to relay an event as a different (custom) type
// based on relayEvent from class notes
function relayEvent(event, newType, detail) {
  event.stopPropagation();
  let custom = new CustomEvent(newType, {
    bubbles: true,
    detail: detail
  });
  event.currentTarget.dispatchEvent(custom);
}

// grab the label that wraps the checkbox and put a change handler on it
// (doing it on the label so we don't catch every change event on the page)
let toggleLabel = document.querySelector(".darkmode-toggle");

if (toggleLabel) {
  toggleLabel.onchange = (event) => {
    let isChecked = event.target.checked;
    relayEvent(event, "darkmode:toggle", { checked: isChecked });
  };
}

// body listens for our custom event and adds/removes the class
document.body.addEventListener("darkmode:toggle", (event) => {
  if (event.detail.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});
