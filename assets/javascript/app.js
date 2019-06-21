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
        question: 'A driving technique where the driver intentionally oversteers, with loss of traction in the rear wheels or all tires, while maintaining control and driving the car through the entirety of a corner is called...',
        answers: ['Running', 'Speeding', 'Drifting', 'Riding the Apex'],
        correctAnswer: 'Drifting'
    },
    {
        question: 'What was the first car launched into space?',
        answers: ['Ford Mustang', 'Tesla Roadster', 'Rinspeed Oasis', 'Porsche 911'],
        correctAnswer: 'Tesla Roadster'
    },
    // {
    //     question: 'How cool is this quiz?',
    //     answers: [`It's aiiight`, `Great, a true work of art`, `Don't worry, I won't be upset`, `This is the answer, thanks for playing`],
    //     correctAnswer: `This is the answer, thanks for playing`
    // }
]

var rightAnswers = 0;
// var wrongAnswers = 0;
var timer;
var counter = 30;
var rollSound2 = new Audio("./assets/audiofiles/Corvette+pass.mp3");
var yay = new Audio("./assets/audiofiles/1_person_cheering-Jett_Rifkin-1851518140.mp3");

$('#start').click(e => rollSound2.play());


var addQuestions = function () {  //function to generate questions based on the array above
    for (let i = 0; i < questions.length; i++) {
        $("#quiz-area").append("<h4>" + questions[i].question + "</h4>");
        for (let j = 0; j < questions[i].answers.length; j++) {
            $("#quiz-area").append(`<input class='question' type="radio" name="question-${i}" value="${questions[i].answers[j]}">` + `<span class="answer">` + questions[i].answers[j]) + `</span>`;

        }

    }
}

function checkAnswers() {  // function checks how many wrong and right answers are picked
    yay.play();
    var answerCheck = $(`#quiz-area`).children(`input:checked`);

    console.log(answerCheck);
    // if ((answerNotChecked.length % 4) == 1) {
    //     console.log(answerNotChecked);        
    // }
    // console.log(answerNotChecked.length % 4);

    // console.log(answerCheck);
    for (let i = 0; i < answerCheck.length; i++) {
        var currentValue = answerCheck[i].value;
        // console.log(currentValue);
        if (currentValue === questions[i].correctAnswer) {
            rightAnswers++;
            }
        // else if (currentValue != questions[i].correctAnswer) {
        //     wrongAnswers+=1;
        // }
        // else {
        //     wrongAnswers+=1;
        // }
 
    }
    
    alert(`You got ` + rightAnswers + ` out of ` + questions.length + ` questions correct!` + `\n` + `\n` + `Refresh the page if you want to try again.`);

}


function startTimer() {
    
    timer=setInterval(function(){
        if (counter <= 1) {
            clearInterval(timer);
            $(`#finish`).attr(`disabled`, true);
            checkAnswers();
        }
        counter--;
        $(`#timer`).text(counter);
    },1000)
    
}

$(document).ready(function () {
    // console.log(questions[4].correctAnswer);
    // console.log(questions[4].answers[3]);
    
    $(`#finish`).hide();
    $(`#start`).on('click', function(){
        startTimer();
        addQuestions();
        $(`#finish`).show();
        $(`#start`).attr(`disabled`, true);
    });
    
    $('#finish').on('click', function (event) {
        yay.play();
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