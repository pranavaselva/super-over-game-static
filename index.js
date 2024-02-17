let batting = document.getElementById("strike");
let reset = document.getElementById("reset");
let scoreTeam1 = document.getElementById("score-team1");
let wicketTeam1 = document.getElementById("wickets-team1");
let scoreTeam2 = document.getElementById("score-team2");
let wicketTeam2 = document.getElementById("wickets-team2");

const battingAudio = new Audio("http://bit.ly/so-ball-hit");
const gameLostAudio = new Audio("http://bit.ly/so-crowd-cheer");

var score1 = 0;
var wicket1 = 0;
var score2 = 0;
var wicket2 = 0;
var team1BallsFaced = 0;
var team2BallsFaced = 0;
var turn = 1;
const runs = [0, 1, 2, 3, 4, 6, "W"];

function updateScore() {
    scoreTeam1.textContent =score1;
    wicketTeam1 .textContent = wicket1;
    scoreTeam2.textContent = score2;
    wicketTeam2.textContent = wicket2;
}  

function gameOver() {
  gameLostAudio.play();
  if (score1 > score2) alert("India wins");
  if (score2 > score1) alert("Pakistan wins");
  if (score2 === score1) alert("This match is draw");
}

reset.onclick = () => {
  window.location.reload();
};

batting.onclick = () => {
  battingAudio.pause();
  battingAudio.currentTime = 0;
  battingAudio.play();

  const randomElement = runs[Math.floor(Math.random() * runs.length)];

  if (turn === 2) {
    team2BallsFaced++;
    document.querySelector(`#team2-superover div:nth-child(${team2BallsFaced})`).textContent = randomElement;

    if(randomElement === "W"){
        wicket2++;
    }else {
        score2 += randomElement;
    }

    if (team2BallsFaced === 6 ||wicket2 === 2 || score2 > score1){
      turn = 3;
      gameOver();
    }
  }

  if (turn === 1) {
    team1BallsFaced++;
    document.querySelector(`#team1-superover div:nth-child(${team1BallsFaced})`).textContent = randomElement;
    
    if(randomElement === "W") {
        wicket1++;
    }else {
        score1 += randomElement;
    }

    if(team1BallsFaced === 6 || wicket1 === 2) turn = 2;
  }
  updateScore();
};