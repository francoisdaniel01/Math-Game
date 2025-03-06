document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const gameContainer = document.getElementById("game-container");
  const startBtn = document.getElementById("start-btn");
  
  const n1 = document.querySelector(".first");
  const n2 = document.querySelector(".second");
  const input = document.getElementById("answer");
  const scoreDisp = document.getElementById("score");
  const niveau = document.getElementById("niveau");
  const chronoDisp = document.getElementById("chrono");

  let score = 0;
  let result = 0;
  let inter;
  let currentLevel = 1;
  let gameStarted = false;

  const levels = {
      1: { min: 0, max: 5, time: 5 },
      2: { min: 5, max: 10, time: 7 },
      3: { min: 8, max: 20, time: 10 },
      4: { min: 10, max: 25, time: 13 },
      5: { min: 15, max: 35, time: 20 },
  };

  let level = levels[currentLevel];

  function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  }

  function updateGame() {
      let num1 = randomNumber(level.min, level.max);
      let num2 = randomNumber(level.max, level.min);
      result = num1 + num2;

      n1.textContent = num1;
      n2.textContent = num2;
      scoreDisp.textContent = score;
      niveau.textContent = currentLevel;
      input.value = "";
  }

  input.addEventListener("keyup", () => {
      const value = parseInt(input.value);
      if (value === result) {
          clearInterval(inter);
          score += 5;

          if (score >= 50) {
              if (currentLevel === 5) {
                  alert("🎉 Félicitations, tu as terminé le jeu ! 🎉");
                  resetGame();
              } else {
                  currentLevel += 1;
                  level = levels[currentLevel];
                  score = 0;
                  updateGame();
                  startTimer();
              }
          } else {
              updateGame();
              startTimer();
          }
      }
  });

  function startTimer() {
      let count = level.time;
      chronoDisp.textContent = count;

      inter = setInterval(() => {
          chronoDisp.textContent = count;
          if (count === 0) {
              clearInterval(inter);
              if (score === 0) {
                  alert("❌ Vous avez perdu !");
                  resetGame();
              } else {
                  score -= 5;
                  updateGame();
                  startTimer();
              }
          }
          count--;
      }, 1000);
  }

  function startGame() {
      startScreen.style.display = "none";
      gameContainer.style.display = "block";
      gameStarted = true;
      updateGame();
      startTimer();
  }

  function resetGame() {
      startScreen.style.display = "block";
      gameContainer.style.display = "none";
      gameStarted = false;
      currentLevel = 1;
      score = 0;
      level = levels[currentLevel];
  }

  startBtn.addEventListener("click", startGame);
});
