

var interval = 0;

// Reset game button
document.getElementById("resetButton").onclick = function() {
    window.location.reload();
  };


// The Questions
var questions = [{
    question: "Electronic Music includes this genre ",
    choices: ["Dub/Reggae ", "Jungle", "Techno", "All of the above"],
    correctAnswer: 3
}, {
    question: "What does 'bpm' stand for?",
    choices: ["Beat Post Match", "Bring Party Moves", "Beats per Match", "Beats per Minute"],
    correctAnswer: 3
}, {
    question: "Deep House is typically played at what tempo range?",
    choices: ["90-115 bpm", "130-150 bpm", "120-125 bpm", "125-130 bpm"],
    correctAnswer: 2
}, {
    question: "Which genre is not considered 'Electronic Dance Music'?",
    choices: ["Downtempo/Chillout", "Tech House", "Hard House", "Rapid House"],
    correctAnswer: 3
}, {
    question: "Where did Techno orignate?",
    choices: ["Toronto", "London", "Detroit", "Amsterdam"],
    correctAnswer: 2
}, {
    question: "What is a DJ?",
    choices: ["Someone who produces electronic dance music", "A party host", "Someone that plays electronic dance music", "A person that mixes live music"],
    correctAnswer: 3
}, {
    question: "What is often regarded as the 'Techno Capital'?",
    choices: ["Miami", "Amsterdam", "Berlin", "Chicago"],
    correctAnswer: 2
}, {
    question: "What decade was the use of electronic instruments first recorded?",
    choices: ["60s", "70s", "80s", "90s"],
    correctAnswer: 0
}, {
    question: "The origin of electronic dance music is:",
    choices: ["Techno", "Acid House", "Disco", "Punk"],
    correctAnswer: 2
}, {
    question: "Which of these is not a DJ technique?",
    choices: ["Hot Cueing", "Splicing", "Beat Jumping", "Filtering"],
    correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;



// Wait until the document loads to...
$(document).ready(function () {
    
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        $(document).find(".nextButton").val("NEXT QUESTION");
        
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").val("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        };
    });

});
    
// This displays the current question AND the choices
function displayCurrentQuestion() {
    clearInterval(interval)
    startTimer();    
    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    };
};
    
// Reset the quiz
function resetQuiz() {
    //bkgrndAudio.play();
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
    clearInterval(interval)
    startTimer();
};
    
// Display the score after the game
function displayScore() {
    
    if (correctAnswers >= 7) {
       
        $(document).find(".quizContainer > .result").text("Excellent job! You scored: " + correctAnswers + " out of " + questions.length);
    }
    else if (correctAnswers >= 4) {
        
        $(document).find(".quizContainer > .result").text("Not bad. You scored: " + correctAnswers + " out of " + questions.length + " Try again, perhaps?");
    }
    else if (correctAnswers >= 1) {
        
        $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of " + questions.length + " You can do better!");
    }
    else if (correctAnswers < 1) {
        
        $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of " + questions.length + ", you should try again...");
    }

    $(document).find(".quizContainer > .result").show();
};

// Hide the score upon restarting the quiz
function hideScore() {
    
    $(document).find(".result").hide();
};

// Countdown Timer
function startTimer () {
    var timer = 15;
    interval = setInterval(function() {
        timer--;
        $('#timer').text(timer);
        if (timer === 0) {
            clearInterval(interval);
            $('#timer').text("You Are Out of Time!");
        }
    }, 1000);
};

