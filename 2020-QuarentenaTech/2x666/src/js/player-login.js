const $select = document.querySelectorAll(".select");
console.log($select);

$select.forEach(($selected) =>
  $selected.addEventListener("click", function () {
    this.classList.toggle("-active");
    if (this.classList.contains("-active")) {
      $select.forEach(($selected) => {
        $selected.classList.remove("-active");
      });
    }
    this.classList.toggle("-active");
  })
);
