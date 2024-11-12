const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked = null;
function handleCheck(e) {
  console.log("Shift key held:", e.shiftKey);
  console.log("Current checkbox checked:", this.checked);
  console.log("Last checked box:", lastChecked);
  // check if they had the sift key down
  // AND check that they are checking it
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", handleCheck);
});
