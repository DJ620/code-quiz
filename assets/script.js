// querySelectors==================================================================================================================
var jeopardy = document.querySelector("#jeopardy");
var scoreBtn = document.querySelector("#high-score");
var stopMusic = document.querySelector("#stop-music");
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var outcome = document.querySelector("#outcome");
var homepage = document.querySelector("#homepage");
var questionBlock = document.querySelector("#question-block");
var questionNum = document.querySelector("#question-number");
var question = document.querySelector("#question");
var optionList = document.querySelector("#options-list");
var finish = document.querySelector("#finish");
var finalScore = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit-btn");
var scoreBlock = document.querySelector("#highscore-block");
var table = document.querySelector("tbody");
var restart = document.querySelector("#restart");

// Variables=======================================================================================================================

// The variable used as my countdown/timer
var counter = 60;

// The variable used to display what question number the user is on, and also used to determine which question to display on screen
var questionCount = 1;

// The variable used to track the user's score
var score = 0;

// The variable that will hold my interval declared globally so I can clear it from different functions
var timerInterval;

// Questions=======================================================================================================================
var question1 = {
    question: "Which of the following is not one of the three fundamental programming languages of the modern web?",
    answers: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    correct: "Bootstrap"
};
var question2 = {
    question: "What is HTML used for?",
    answers: ["Styling content", "Writing content", "Handling logic", "Interacting with the user"],
    correct: "Writing content"
};
var question3 = {
    question: "What is CSS used for?",
    answers: ["Styling content", "Writing content", "Handling logic", "Interacting with the user"],
    correct: "Styling content"
};
var question4 = {
    question: "Header, footer, nav, article, and section tags are all examples of ____________ HTML.",
    answers: ["formal", "basic", "semantic", "pseudo"],
    correct: "semantic"
};
var question5 = {
    question: "Inside what tag should external stylesheets be linked?",
    answers: ["header", "footer", "body", "head"],
    correct: "head"
};
var question6 = {
    question: "Which is the correct way to set text to bold in CSS?",
    answers: ["font-style: bold", "font-weight: bold", "font-type: bold", "font = bold"],
    correct: "font-weight: bold"
};
var question7 = {
    question: "Which of the following is a popular CSS framework directed at responsive, mobile-first front-end web development?",
    answers: ["Bootclick", "SASS", "jQuery", "Bootstrap"],
    correct: "Bootstrap"
};
var question8 = {
    question: "What is the pseudo-class activated when a mouse interacts with an element without clicking it?",
    answers: ["Hover", "mouseOver", "Active", "Focus"],
    correct: "Hover"
};
var question9 = {
    question: "What is the method used to display data in the browser's console?",
    answers: ["console.print()", "console.send()", "console.push()", "console.log()"],
    correct: "console.log()"
};
var question10 = {
    question: "Which of the following is not one of the six primitive JavaScript data types?",
    answers: ["undefined", "function", "boolean", "string"],
    correct: "function"
};
var question11 = {
    question: "Which of the following data types is not able to be held in an array?",
    answers: ["booleans", "strings", "numbers", "for loops"],
    correct: "for loops"
};
var question12 = {
    question: "Which of the following is the method used to add data to the end of an array?",
    answers: [".add()", ".push()", ".pull()", ".shift()"],
    correct: ".push()"
};
var question13 = {
    question: "What range of numbers will the following code pick from: \nMath.floor(Math.random() * 10) + 1",
    answers: ["0 to 10", "1 to 11", "0 to 11", "1 to 10"],
    correct: "1 to 10"
};
var question14 = {
    question: "Which of the following is the correct way for a JavaScript variable to be assigned to an HTML element with an id of 'variable'?",
    answers: ["document.querySelector('variable')", "document.querySelector('#variable')", "document.getElementByClass('#variable')", "document.assignToElement('#variable')"],
    correct: "document.querySelector('#variable')"
};
var question15 = {
    question: "What JavaScript method do you use when you want a function to run when a specific element is clicked?",
    answers: [".whenClicked()", ".addEvent()", ".addEventListener()", ".listenForEvent()"],
    correct: ".addEventListener()"
};

// Arrays==========================================================================================================================

// An array of all the question objects
var questionsArr = [question1, question2, question3, question4, question5, question6, question7, question8, 
    question9, question10, question11, question12, question13, question14, question15];

// An empty array used to push the randomly selected question into
var allQuestions = [];

// An empty array that will hold the 10 previous highest scores
var playersArr = [];

// This block of code checks if there is data in local storage, and if there is, it pushes it to the above playersArr
var checkScores = JSON.parse(localStorage.getItem("players"));
if (checkScores) {
    for (var i =0; i<checkScores.length; i++) {
        playersArr.push(checkScores[i]);
    };
    localStorage.setItem("players", JSON.stringify(playersArr));
};

// Functions=======================================================================================================================

// When called, this function sets the display of whatever element is passed into it to none
function hide(element) {
    element.style.display = "none";
};

// When called, this function sets the display of whatever element is passed into it to none
function reveal(element) {
    element.style.display = "block";
};

// When called, this function displays the word 'correct' on the screen and adds 5 points to the score variable
function correct() {
    outcome.textContent = "Correct!";
    reveal(outcome);
    score += 5;
};

/* When called, this function displays the word 'wrong' on the screen and subtracts 10 seconds from the counter 
   variable and 3 points from the score variable */
function incorrect() {
    outcome.textContent = "Wrong.";
    reveal(outcome);
    counter -= 10;
    score -= 3;

    // The correct answer's background will change color to let the user know what the correct answer is
    for (var i = 0; i < optionList.children.length; i++) {
        if (optionList.children[i].children[0].children[1].textContent === allQuestions[questionCount - 2].correct) {
            optionList.children[i].children[0].children[1].classList.add("correct");
        };
    };
};

// When called, this function displays a randomly selected question 
function nextQuestion() {
    hide(outcome);

    /* Changes the background-color of any buttons that might have changed due to an
       incorrectly answered question */
    for (var i = 0; i < optionList.children.length; i++) {
        optionList.children[i].children[0].children[1].classList.remove("correct");
    };

    // This code selects a random question from the questionsArr array and splices it into the allQuestions array
    var randomIndex = Math.floor(Math.random() * questionsArr.length);
    allQuestions.push(...questionsArr.splice(randomIndex, 1));

    // If the array of questions has run out, it will run the finished function and end the countdown
    if (allQuestions[questionCount - 1] === undefined) {
        clearInterval(timerInterval);
        finished();
    } else {
        questionNum.textContent = questionCount;
        question.textContent = allQuestions[questionCount - 1].question;
        setOptions();
        questionCount++;
    };
};

/* When called, this function loops through the array of answers in the specified question object and assigns 
   them to one of the four option buttons */
function setOptions() {
    var answerReset = [];
    for (var i = 0; i < optionList.children.length; i++) {

        // Fetches the answers from the current question's object
        var answersArr = allQuestions[questionCount - 1].answers;
        var randomIndex = Math.floor(Math.random() * answersArr.length);

        /* Randomizes the order of the answers so that if a user takes the quiz multiple times, 
           the answers will be in a different order */
        optionList.children[i].children[0].children[1].textContent = answersArr[randomIndex];

        // Ensures that answers don't get duplicated by moving them to a new array once they've been assigned a button
        answerReset.push(answersArr.splice(randomIndex, 1));
    };
    // Resets the answers back to their original array
    for (var i = 0; i<answerReset.length; i++) {
        var answersArr = allQuestions[questionCount - 1].answers;
        answersArr[answersArr.length] = answerReset[i];
    };
};

/* When called, this function displays the finished message, final score, and initials submission 
   on the screen and stops the music if the music is still being played */
function finished() {
    hide(questionBlock);
    hide(stopMusic);
    hide(outcome);
    reveal(scoreBtn);
    reveal(finish);
    finalScore.textContent = score;
    jeopardy.pause();
};

// When called, this function displays the highscores table
function scoreTable() {
    hide(scoreBtn);
    hide(stopMusic);
    reveal(restart);

    // Resets the highscore table so that no scores are repeated
    table.innerHTML = "";

    // Fetches the previous high scores from local storage
    var playersArr = JSON.parse(localStorage.getItem("players"));

    // Only runs the following code if there are scores stored in local storage
    if (playersArr) {
        /* Loops through the array of player objects and creates elements to display 
        the rank, initials, and score of the 10 best players */
        for (var i=0; i<playersArr.length; i++) {
            var tableRank = document.createElement("td");
            tableRank.textContent = i+1;
            var tableInitials = document.createElement("td");
            tableInitials.textContent = playersArr[i].initials;
            var tableScore = document.createElement("td");
            tableScore.textContent = playersArr[i].score;

            // Creates a row for each player, and attaches the elements made above
            var row = document.createElement("tr");
            table.append(row);
            row.append(tableRank);
            row.append(tableInitials);
            row.append(tableScore);
        };
    };
};

//EventListeners===================================================================================================================

/* When the start button is clicked, the first question is displayed, background music begins to play, and 
   the counter begins counting down from 60. Once the counter reaches 0, the finished section is displayed */
start.addEventListener("click", function() {
    hide(homepage);
    hide(scoreBtn);
    reveal(questionBlock);
    reveal(stopMusic);

    // This code resets the questions back into their original array
    questionsArr.push(...allQuestions.splice(0));
    nextQuestion();
    jeopardy.currentTime = 0;
    jeopardy.play();
    jeopardy.volume = 0.5;
    timer.textContent = counter;
    timerInterval = setInterval(function() {
        counter--;
        timer.textContent = counter;
        if (counter <= 0) {
            clearInterval(timerInterval);
            timer.textContent = 0;
            finished();
        };
    }, 1000); 
});

/* At any point in the quiz, if the player clicks the view highscores button, they will exit the quiz,
   the timerInterval will be cleared, and the highscores table will be displayed */
scoreBtn.addEventListener("click", function() {
    scoreTable();
    hide(homepage);
    hide(questionBlock);
    hide(outcome);
    hide(finish);
    reveal(scoreBlock);
    clearInterval(timerInterval);
    timer.textContent = 0;
});

// When clicked, this button stops the background music from playing and replaces the button with the 'View Highscores' button
stopMusic.addEventListener("click", function() {
    jeopardy.pause();
    hide(stopMusic);
    reveal(scoreBtn);
});

/* When an answer option button is clicked, this function checks if the 
   answer is correct or not, and runs the appropriate function */
optionList.addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        if (event.target.textContent === allQuestions[questionCount - 2].correct) {
            correct();
        } else {
            incorrect();
        };
        /* A setTimeout that gives the user half a second to see the outcome of 
           their chosen answer before running the nextQuestion() function */
        setTimeout(function() {
            nextQuestion();
        }, 500);
    };
});

// When this button is clicked, the user's initials and score are added to the playersArr array
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // If the user hasn't entered their intials, they are shown an alert
    if (!initialsInput.value) {
        alert("Please enter your initials");
        return;
    };

    // This code is creating a new object with the user's initials and score and storing it at the end of the playersArr array
    playersArr[playersArr.length] = {
        initials: initialsInput.value,
        score: score
    };

    // Sorts the objects in the playersArr array by highest score
    if (playersArr.length > 1) {
        playersArr.sort(function(a,b) {
            return b.score-a.score; 
        });
    };

    // This conditional statement ensures that local storage only holds the 10 highest scores
    if (playersArr.length > 10) {
        playersArr.splice(10);
    };

    // Sends the playersArr array to local storage
    localStorage.setItem("players", JSON.stringify(playersArr));
    hide(finish);
    scoreTable();
    reveal(scoreBlock);
});

// When clicked, this button will bring the user back to the homepage and reset the timer, score, and questionCount variables
restart.addEventListener("click", function() {
    hide(scoreBlock);
    hide(restart);
    reveal(scoreBtn);
    questionCount = 1;
    counter = 60;
    score = 0;
    reveal(homepage);
});
