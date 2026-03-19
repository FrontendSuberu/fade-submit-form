const form = document.querySelector("#form-element-wrapper");
const inputs = form.querySelectorAll("[required]");
const submitBtn = document.querySelector("#submitBtn");

// Show/hide warnings and button live
const validateForm = () => {
  let allValid = true;

  inputs.forEach(input => {
    const warning = input.parentElement.querySelector(".warningBlock");

    if (!input.checkValidity()) {
      warning.textContent = input.validationMessage;
      warning.style.display = "inline";
      allValid = false;
    } else {
      warning.textContent = "";
      warning.style.display = "none";
    }
  });

  // Button appears only if all inputs are valid
  submitBtn.style.opacity = allValid ? "1" : "0";
  submitBtn.disabled = !allValid;
  submitBtn.style.cursor = allValid ? "pointer" : "default";
};

// Attach live input listeners once
inputs.forEach(input => input.addEventListener("input", validateForm));

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // final check
  validateForm();

  const allValid = Array.from(inputs).every(input => input.checkValidity());
  if (allValid) {
    console.log("Form submitted!");
    form.reset();
    validateForm(); // reset button & warnings
  }
});

// Initialize button and warnings
validateForm();