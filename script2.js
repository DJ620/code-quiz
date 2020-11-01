// Variables
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var outcome = document.querySelector("#outcome");
var homepage = document.querySelector("#homepage");
var questionBlock = document.querySelector("#question-block");
var questionNum = document.querySelector("#question-number");
var question = document.querySelector("#question");
var option1 = document.querySelector("#option1");
var option2 = document.querySelector("#option2");
var option3 = document.querySelector("#option3");
var option4 = document.querySelector("#option4");
var finish = document.querySelector("#finish");
var finalScore = document.querySelector("#final-score");

var counter = 5;
var score = 0;

// Functions
function hide(element) {
    element.style.display = "none";
}

function reveal(element) {
    element.style.display = "block";
}

//EventListeners
start.addEventListener("click", function() {
    hide(homepage);
    reveal(questionBlock);
    timer.textContent = counter;
    var timerInterval = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter === 0) {
            clearInterval(timerInterval);
            hide(questionBlock);
            reveal(finish);
            finalScore.textContent = score;
        }
    }, 1000); 
})

// Questions
var question1 = {
    question: "Which of the following is not one of the three fundamental programming languages of the modern web?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    correct: "Python",
    incorrect: ["HTML", "CSS", "JavaScript"]
}