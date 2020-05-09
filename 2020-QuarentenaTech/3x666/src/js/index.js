import io from "socket.io-client";

const socket = io("localhost:3000");
const $cells = document.querySelectorAll(".grid > .cell");
const $result = document.getElementById("result")

$cells.forEach(($cell, i) => {
  $cell.addEventListener("click", (e) => {
    socket.emit("move", { move: i });
  });
});

socket.on("move", ({move, player}) => {
  $cells[move].innerText = player == "you" ? "o" : "x";
  $result.innerText = player == "you" ? "Sua vez!" : "Vez do inimigo, aguarde!"
});

socket.on("game_finish", (text) => {
  if(text == "you win!") {
    $result.innerText = "(😄) Você venceu!"
  return 

  } 
  
  if (text == "you lose!") {
    $result.innerText = "(😭) Você perdeu!";
  return 

  }

  $result.innerText = "(👵) Velha!"

  return 
})