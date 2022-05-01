let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("novo-jogo");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("mensagem");

// Matriz de padrões vencedores
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

// Jogador 'X' joga primeiro
let xTurn = true;
let count = 0;

// Desabilita todos os botões
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //habilita popup
  popupRef.classList.remove("hide");
};

//Ativar todos os botões (Para Novo Jogo e Reiniciar)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //Desabilita popup
  popupRef.classList.add("hide");
};

//Esta função é executada quando um jogador ganha
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML =
      "<p style=text-align:center;font-size:55%>Parabéns</p><h1 style=text-align:center;color:white;font-size:150%;>X</h1> <p style=text-align:center;font-size:50%>Venceu!</p>";;
  } else {
    msgRef.innerHTML =
      "<p style=text-align:center;font-size:55%>Parabéns</p><h1 style=text-align:center;color:white;font-size:150%;>O</h1> <p style=text-align:center;font-size:50%>Venceu!</p>";
  }
};

//Função para desenhar
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "Deu velha!";
};

//Novo jogo
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Lógica de vitória
const winChecker = () => {
  //Faça um loop por todos os padrões de vitória
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Verifica se os elementos estão preenchidos
    //Se 3 elementos vazios são iguais e dariam vitória como faria
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //Se todos os 3 botões tiverem os mesmos valores, passe o valor para winFunction
        winFunction(element1);
      }
    }
  }
};

//Exibe X/O ao clicar
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Exibi X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Exibi Y
      element.innerText = "O";
      element.disabled = true;
    }
    //Incrementa a contagem a cada clique
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Verifica se há ganho em cada clique
    winChecker();
  });
});

//Ativa os botões e desativa o pop-up no carregamento da página
window.onload = enableButtons;
