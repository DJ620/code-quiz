// Variables
var main = document.querySelector("main");
var homepage = document.querySelector("#homepage");
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var question1 = document.querySelector("#question1");
var finish = document.querySelector("#finish");

var sectionArray = [homepage, question1, , finish]
var counter = 1;

// Functions
function hide() {
    sectionArray.forEach(element=>element.style.display="none");
}

function reveal(element) {
    element.style.display="block";
}

//EventListeners
start.addEventListener("click", function() {
    hide(homepage);
    reveal(question1);
    timer.textContent = counter;
    var timerInterval = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter === 0) {
            clearInterval(timerInterval);
            hide();
            reveal(finish);
        }
    }, 1000); 
})

// Javascript to run when page first loads
hide();
reveal(homepage);