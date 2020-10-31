// Variables
var main = document.querySelector("main");
var homepage = document.querySelector("#homepage");
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var finished = document.querySelector("#finish");

var counter = 60;

// Functions
function hide(element) {
    element.style.display="none";
}

function reveal(element) {
    element.style.display="block";
}

function finish() {
    main.appendChild(finished);
}

//EventListeners
start.addEventListener("click", function() {
    hide(homepage);
    timer.textContent = counter;
    var timerInterval = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter === 0) {
            clearInterval(timerInterval);
            finish();
        }
    }, 1000); 
})