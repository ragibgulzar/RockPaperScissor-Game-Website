
document.addEventListener("DOMContentLoaded", function() {


    const changeText = document.querySelector(".si-text");
    const whoWon = document.querySelector(".fi-text");
    
    const buttons = document.querySelectorAll(".buttonClass");
    const selectedPart = document.querySelector(".selected-part");
    const playerCount = document.querySelector(".count-part p:first-child");
    const computerCount = document.querySelector(".count-part p:last-child");

    const clickButton = new Audio("./audio/button-audio.wav")
    const winAudio = new Audio("./audio/winning-audio.wav");
    const looseAudio = new Audio("./audio/loosing-audio.wav");

  
 
    let playerScore = 0;
    let computerScore = 0;
  

    function computerPlay() {
      const choices = ["🪨", "📃", "✂️"];
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
    }
  

    function updateSelectedChoices(playerChoice, computerChoice) {
      selectedPart.innerHTML = `
        <p>${playerChoice}</p>
        <p>${computerChoice}</p>
      `;
    }
  

    function updateScores() {
      playerCount.textContent = `Player: ${playerScore}`;
      computerCount.textContent = `Computer: ${computerScore}`;
    }
  

    function checkResult(playerChoice, computerChoice) {
      if (playerChoice === computerChoice) {
        whoWon.innerHTML = `It is a Draw, Both Selected ${computerChoice}`
        return "draw";
      } else if (
        (playerChoice === "🪨" && computerChoice === "✂️") ||
        (playerChoice === "📃" && computerChoice === "🪨") ||
        (playerChoice === "✂️" && computerChoice === "📃")
      ) {
        whoWon.innerHTML = `${playerChoice} beat ${computerChoice}`
        return "player";
      } else {
        whoWon.innerHTML = `${computerChoice} beat ${playerChoice}`
        return "computer";
      }
    }
  

    function handleClick(event) {
      const playerChoice = event.target.textContent;
      const computerChoice = computerPlay();
      const result = checkResult(playerChoice, computerChoice);
      clickButton.play();
  
      updateSelectedChoices(playerChoice, computerChoice);
  
      if (result === "player") {
        playerScore++;
      } else if (result === "computer") {
        computerScore++;
      }
  
      updateScores();
  

    if (playerScore === 5) {
        changeText.innerHTML = "<br> Congratulations! You won the game!";
        changeText.style.backgroundColor = '#F1C27B';
        winAudio.play();
        resetGame();
      } else if (computerScore === 5) {
        changeText.innerHTML = "<br> Oops! Computer won the game!";
        changeText.style.backgroundColor = '#F1C27B';
        looseAudio.play();
        resetGame();
      }
    }

    function resetGame() {
      playerScore = 0;
      computerScore = 0;
      updateSelectedChoices("❔", "❔");
      updateScores();
    }
  
    buttons.forEach(button => {
      button.addEventListener("click", handleClick);
    });
  });
  
