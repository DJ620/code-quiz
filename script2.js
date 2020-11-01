// querySelectors
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
var optionButton = document.querySelectorAll(".option");
var finish = document.querySelector("#finish");
var finalScore = document.querySelector("#final-score");

// Variables
var counter = 5;
var questionCount = 1;
var score = 0;

// Questions
var question1 = {
    question: "Which of the following is not one of the three fundamental programming languages of the modern web?",
    answers: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    correct: "Bootstrap"
}

// Arrays
var allQuestions = [question1];
var options = [option1.textContent, option2.innerHTML, option3.textContent, option4.textContent];

// Functions
function hide(element) {
    element.style.display = "none";
}

function reveal(element) {
    element.style.display = "block";
}

function correct() {
    outcome.textContent = "Correct!";
    reveal(outcome);
}

function incorrect() {
    outcome.textContent = "Wrong.";
    reveal(outcome);
}

function setOptions() {
    for (var i = 0; i < options.length; i++) {
        options[i] = allQuestions[questionCount - 1].answers[i];
    }
}

function nextQuestion() {
    hide(outcome);
    questionNum.textContent = questionCount;
    question.textContent = allQuestions[questionCount - 1].question;
    setOptions();
    console.log(options);
    questionCount++;
}

//EventListeners
start.addEventListener("click", function() {
    hide(homepage);
    reveal(questionBlock);
    nextQuestion();
    timer.textContent = counter;
    var timerInterval = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter === 0) {
            clearInterval(timerInterval);
            hide(questionBlock);
            hide(outcome);
            reveal(finish);
            finalScore.textContent = score;
        }
    }, 1000); 
})

