const form = document.querySelector("#form-element-wrapper");
const inputs = form.querySelectorAll("[required]");
const submitBtn = document.querySelector("#submitBtn");

let invalidAttempts = 0;
let formFilled = true;

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

    // input.addEventListener("input", () => {
    //   updateSubmitState();
    // });
  });

  const allValid = Array.from(inputs).every((input) => input.checkValidity());
  if (allValid) {
    submitBtn.disabled = false;
    submitBtn.textContent = "submit";
    submitBtn.style.cssText = "opacity: 1; cursor: pointer;";
  }
};

inputs.forEach((input) => input.addEventListener("input", updateSubmitState));

const handleFormUpdate = (e) => {
  e.preventDefault();

  updateSubmitState();

  if (formFilled) {
    console.log("Form submitted successfully");
    form.reset();
    invalidAttempts = 0;
    updateSubmitState();
  } else {
    invalidAttempts++;
  }

  if (invalidAttempts >= 4) {
    formFilled = false;
    submitBtn.disabled = true;
    submitBtn.textContent = "removing...";
    setTimeout(() => {
      submitBtn.style.cssText = "opacity: 0; cursor: default;";
    }, 800);
    submitBtn.classList.add("holdExcessive");
  } else {
    formFilled = true;
    submitBtn.classList.remove("holdExcessive");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", handleFormUpdate);
});
