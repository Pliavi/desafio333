const $playerLogin = document.querySelector(".player-login");
const $select = document.querySelectorAll(".select");
const $play = document.querySelector(".play");

$select.forEach(($selected) =>
  $selected.addEventListener("click", function () {
    $select.forEach(($selected) => {
      $selected.classList.remove("-active");
    });
    this.classList.add("-active");
  })
);

$play.addEventListener("click", () => {
  const $game = document.querySelector("#game > canvas");
  $game.style.display = "block";

  $playerLogin.classList.add("-inactive");
  setTimeout(() => {
    $playerLogin.remove();
  }, 1000);
});
