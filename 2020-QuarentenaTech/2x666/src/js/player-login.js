const $playerLogin = document.querySelector(".player-login");
const $select = document.querySelectorAll(".select");
const $play = document.querySelector(".play");
const $canvas = document.querySelector("canvas");

$select.forEach(($selected) =>
  $selected.addEventListener("click", function () {
    $select.forEach(($selected) => {
      $selected.classList.remove("-active");
    });
    this.classList.add("-active");
  })
);

$play.addEventListener("click", () => {
  $playerLogin.classList.add("-inactive");
  setTimeout(() => {
    $playerLogin.remove();
  }, 1000);
});
