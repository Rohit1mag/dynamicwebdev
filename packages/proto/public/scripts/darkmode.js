function relayEvent(event, newType, detail) {
  event.stopPropagation();
  let custom = new CustomEvent(newType, {
    bubbles: true,
    detail: detail
  });
  event.currentTarget.dispatchEvent(custom);
}

let toggleLabel = document.querySelector(".darkmode-toggle");

if (toggleLabel) {
  toggleLabel.onchange = (event) => {
    let isChecked = event.target.checked;
    relayEvent(event, "darkmode:toggle", { checked: isChecked });
  };
}

document.body.addEventListener("darkmode:toggle", (event) => {
  if (event.detail.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});
