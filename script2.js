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
var finish = document.querySelector("#finish");
var finalScore = document.querySelector("#final-score");

// Variables
var counter = 60;
var questionCount = 1;
var score = 0;
var timerInterval;

// Questions
var question1 = {
    question: "Which of the following is not one of the three fundamental programming languages of the modern web?",
    answers: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    correct: "Bootstrap"
};
var question2 = {
    question: "What is HTML used for?",
    answers: ["Styling content", "Writing content", "Handling logic", "Interacting with the user"],
    correct: "Writing content"
}
var question3 = {
    question: "What is CSS used for?",
    answers: ["Styling content", "Writing content", "Handling logic", "Interacting with the user"],
    correct: "Styling content"
}

var question4 = {
    question: "Header, footer, nav, article, and section tags are all examples of ____________ HTML.",
    answers: ["formal", "basic", "semantic", "pseudo"],
    correct: "semantic"
}
var question5 = {
    question: "Inside what tag should external stylesheets be linked?",
    answers: ["header", "footer", "body", "head"],
    correct: "head"
}
var question6 = {
    question: "Which is the correct way to set text to bold in CSS?",
    answers: ["font-style: bold", "font-weight: bold", "font-type: bold", "font = bold"],
    correct: "font-weight: bold"
}

var question7 = {
    question: "Which of the following is a popular CSS framework directed at responsive, mobile-first front-end web development?",
    answers: ["Bootclick", "SASS", "jQuery", "Bootstrap"],
    correct: "Bootstrap"
}
var question8 = {
    question: "What is the pseudo-class activated when a mouse interacts with an element without clicking it?",
    answers: ["Hover", "mouseOver", "Active", "Focus"],
    correct: "Hover"
}
var question9 = {
    question: "What is the method used to display data in the browser's console?",
    answers: ["console.print()", "console.send()", "console.push()", "console.log()"],
    correct: "console.log()"
}
var question10 = {
    question: "Which of the following is not one of the six primitive JavaScript data types?",
    answers: ["undefined", "function", "boolean", "string"],
    correct: "function"
}
var question11 = {
    question: "Which of the following data types is not able to be held in an array?",
    answers: ["booleans", "strings", "numbers", "none of the above"],
    correct: "none of the above"
}
var question12 = {
    question: "Which of the following is the method used to add data to the end of an array?",
    answers: [".add()", ".push()", ".pull()", ".shift()"],
    correct: ".push()"
}
var question13 = {
    question: "What range of numbers will the following code pick from: \nMath.floor(Math.random() * 10) + 1",
    answers: ["0 to 10", "1 to 11", "0 to 11", "1 to 10"],
    correct: "1 to 10"
}
var question14 = {
    question: "",
    answers: [],
    correct: ""
}
var question15 = {
    question: "",
    answers: [],
    correct: ""
}

// Arrays
var allQuestions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];
var options = [option1, option2, option3, option4];

// Functions
function hide(element) {
    element.style.display = "none";
};

function reveal(element) {
    element.style.display = "block";
};

function correct() {
    outcome.textContent = "Correct!";
    reveal(outcome);
    score++;
};

function incorrect() {
    outcome.textContent = "Wrong.";
    reveal(outcome);
    counter -= 10;
};

function setOptions() {
    for (var i = 0; i < options.length; i++) {
        options[i].textContent = allQuestions[questionCount - 1].answers[i];
    };
};

function finished() {
    hide(questionBlock);
    hide(outcome);
    reveal(finish);
    finalScore.textContent = score;
}

function nextQuestion() {
    hide(outcome);
    if (allQuestions[questionCount - 1] === undefined) {
        clearInterval(timerInterval);
        finished();
    } else {
        questionNum.textContent = questionCount;
        question.textContent = allQuestions[questionCount - 1].question;
        setOptions();
        questionCount++;
    }
};

//EventListeners
start.addEventListener("click", function() {
    hide(homepage);
    reveal(questionBlock);
    nextQuestion();
    timer.textContent = counter;
    timerInterval = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter === 0) {
            clearInterval(timerInterval);
            finished();
        }
    }, 1000); 
});

for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function(event) {
        if (event.target.textContent === allQuestions[questionCount - 2].correct) {
            correct();
        } else {
            incorrect();
        }
        setTimeout(function() {
            nextQuestion();
        }, 500);
    })
}



