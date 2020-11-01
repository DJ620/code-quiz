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

var counter = 60;

//EventListeners
start.addEventListener("click", function() {
    homepage.style.display="none";
    questionBlock.style.display = "block";
    timer.textContent = counter;
    var timerInterval = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter === 0) {
            clearInterval(timerInterval);
        }
    }, 1000); 
})