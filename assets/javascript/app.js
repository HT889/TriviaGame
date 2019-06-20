var questions = [
    {
        question: 'Which of the following car companies are originially from Japan?',
        answers: ['Subaru', 'Ford', 'Audi', 'Maserati'],
        correctAnswer: 'Subaru'
    },
    {
        question: 'Some cars have a third pedal to the left of the brake pedal. What is this pedal called?',
        answers: ['Flush', 'Stopper', 'Clutch', 'Picker'],
        correctAnswer: 'Clutch'
    },
    {
        question: 'Some cars have a third pedal to the left of the brake pedal. What is this pedal called?',
        answers: ['Flush', 'Stopper', 'Clutch', 'Picker'],
        correctAnswer: 'Clutch'
    },
]

var rightAnswers = 0;
var wrongAnswers = 0;
var timer;
var counter = 60;

var addQuestions = function () {  //function to generate questions based on the array above
    for (let i = 0; i < questions.length; i++) {
        $("#quiz-area").append("<h3>" + questions[i].question + "</h3>");
        for (let j = 0; j < questions[i].answers.length; j++) {
            $("#quiz-area").append(`<input class='question' type="radio" name="question-${i}" value="${questions[i].answers[j]}">` + questions[i].answers[j]);

        }

    }
}

function checkAnswers() {  // function checks how many wrong and right answers are picked
    var answerCheck = $(`#quiz-area`).children(`input:checked`);
    var answerNotChecked = $('input[type="radio"]:not(:checked)');
    if ((answerNotChecked.length % 4) == 1) {
        console.log(answerNotChecked);        
    }
    // console.log(answerNotChecked.length % 4);

    // console.log(answerCheck);
    for (let i = 0; i < answerCheck.length; i++) {
        var currentValue = answerCheck[i].value;
        // console.log(currentValue);
        if (currentValue === questions[i].correctAnswer) {
            rightAnswers+=1;
            }
        else {
            wrongAnswers+=1;
        }
        
    }
    alert(`Correct: ` + rightAnswers + `\n` + `Incorrect: ` + wrongAnswers);
}

function startTimer() {
    
    timer=setInterval(function(){
        if (counter <= 1) {
            clearInterval(timer)
            checkAnswers();
        }
        counter--;
        $(`#timer`).text(counter);
    },1000)
    
}

$(document).ready(function () {
    
    
    $(`#start`).on('click', function(){
        startTimer();
        addQuestions();
        $(`#start`).attr(`disabled`, true);
    });
    
    $('#finish').on('click', function (event) {
        checkAnswers();
        clearInterval(timer);
        $(`#finish`).attr(`disabled`, true);
        // var attr = $(this).attr('name');
        // console.log(attr);
        // var radioValue = $(`input[name='${attr}']:checked`).val();
        // console.log(radioValue);
    });
});


//questions and answers are generated
//assigning right/wrong answers
//timer based game
//tally up all right answers + wrong answers at the end of timer and display it to player