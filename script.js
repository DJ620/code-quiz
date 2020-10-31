// Variables
var main = document.querySelector("main");
var homepage = document.querySelector("#homepage");
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var outcome = document.querySelector("#outcome");
var correct = document.querySelectorAll(".correct");
var incorrect = document.querySelectorAll(".incorrect");
var question1 = document.querySelector("#question1");
var question2 = document.querySelector("#question2");
var finish = document.querySelector("#finish");

var sectionArray = [question1, question2, finish];
var sectionIndex = 0;
var counter = 60;
var score = 0;

// Functions
function hide() {
    sectionArray.forEach(element=>element.style.display="none");
}

function reveal(element) {
    element.style.display="block";
}

function right() {
    outcome.textContent = "Correct!";
    score++;
}

function wrong() {
    outcome.textContent = "Wrong";
    counter -= 5;
}

function reset() {
    outcome.textContent = " ";
}

function next() {
    setTimeout(function() { 
    reset();
    hide();
    sectionIndex++;
    reveal(sectionArray[sectionIndex]);
    }, 700);
}

//EventListeners
start.addEventListener("click", function() {
    homepage.style.display="none";
    reveal(question1);
    timer.textContent = counter;
    var timerInterval = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter === 0) {
            clearInterval(timerInterval);
            hide();
            reveal(finish);
            reset();
        }
    }, 1000); 
})

for (var i=0; i<correct.length; i++) {
    correct[i].addEventListener("click", function() {
        right();
        next();
    })
}

for (var i=0; i<incorrect.length; i++) {
    incorrect[i].addEventListener("click", function() {
        wrong();
        next();
    })
}

// Javascript to run when page first loads
hide();
