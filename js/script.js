var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var optionsEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var liveQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

function startQuiz() {
    var startScreenEl = document.getElementById("initial-screen");
    startScreenEl.setAttribute("class", "conceal");

    questionsEl.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    var liveQuestion = questions[liveQuestionIndex];
  
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = liveQuestion.title;
  
    optionsEl.innerHTML = "";
  
    liveQuestion.options.forEach(function(option, i) {
      var optionNode = document.createElement("button");
      optionNode.setAttribute("class", "option");
      optionNode.setAttribute("value", option);
  
      optionNode.textContent = i + 1 + ". " + option;
  
      optionNode.onclick = questionClick;
  
      optionsEl.appendChild(optionNode);
    });
  }
  
  function questionClick() {
    if (this.value !== questions[liveQuestionIndex].answer) {
      time -= 20;
  
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = "Incorrect!";
      feedbackEl.style.color = "red";
      feedbackEl.style.fontSize = "360%";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
      feedbackEl.style.fontSize = "360%";
    }
  
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback conceal");
    }, 1000);
  
    liveQuestionIndex++;
  
    if (liveQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  
  function quizEnd() {
    clearInterval(timerId);
  
    var endScreenEl = document.getElementById("finish-screen");
    endScreenEl.removeAttribute("class");
  
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
  
    questionsEl.setAttribute("class", "conceal");
  }
  
  function clockTick() {
    time--;
    timerEl.textContent = time;
  
    if (time <= 0) {
      quizEnd();
    }
  }

  function saveHighscore() {
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      var newScore = {
        score: time,
        initials: initials
      };
  
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      window.location.href = "highscores.html";
    }
  }
  
  function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  submitBtn.onclick = saveHighscore;

  startBtn.onclick = startQuiz;

  initialsEl.onkeyup = checkForEnter;