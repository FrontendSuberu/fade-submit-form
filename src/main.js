const form = document.querySelector("#form-element-wrapper");
const inputs = form.querySelectorAll("[required]");
const submitBtn = document.querySelector("#submitBtn");

let invalidAttempts = 0;
let formFilled = true;

// validation check
const updateSubmitState = () => {
  inputs.forEach((input) => {
    const warning = input.parentElement.querySelector("#warningBlock");

    // reset state first
    warning.textContent = "";

    if (!input.checkValidity()) {
      formFilled = false;
      warning.textContent = input.validationMessage;
    } else {
      warning.textContent = "";
    }
  });

  const allValid = Array.from(inputs).every((input) => input.checkValidity());
  if (allValid) {
    formFilled = true;
    submitBtn.disabled = false;
    submitBtn.textContent = "submit";
    submitBtn.classList.remove("hidden");
    submitBtn.style.cssText = "cursor: pointer;";
    // submitBtn.classList.add("holdExcessive");
  }
};

// live validation block on each input
inputs.forEach((input) => input.addEventListener("input", updateSubmitState));

// prevent default behaviour, interaction check + implementation
const handleFormUpdate = (e) => {
  e.preventDefault();

  updateSubmitState();

  if (formFilled) {
    const submitStatus = document.querySelector("#form-status");
    submitStatus.textContent = "Form submitted successfully";
    setTimeout(() => {
      submitStatus.textContent = "";
    }, 1500);
    console.log("Form submitted successfully");
    form.reset();
    invalidAttempts = 0;
    // updateSubmitState();
  } else {
    invalidAttempts++;
  }

  if (invalidAttempts >= 3) {
    formFilled = false;
    submitBtn.disabled = true;
    submitBtn.textContent = "removing...";
    submitBtn.classList.add("holdExcessive");
    setTimeout(() => {
      submitBtn.style.cssText = " cursor: default;";
      submitBtn.classList.remove("holdExcessive");
      submitBtn.classList.add("hidden");
    }, 800);
  } else {
    formFilled = true;
    submitBtn.disabled = false;
    submitBtn.textContent = "submit";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", handleFormUpdate);
});
