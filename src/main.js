const submitBtn = document.querySelector("#submitBtn");

const UpdateFormBtn = () => {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  UpdateFormBtn();
});
