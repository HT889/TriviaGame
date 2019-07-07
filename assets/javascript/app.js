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
var timer;
var counter = 5;
var rollSound2 = new Audio("./assets/audiofiles/Corvette+pass.mp3");
var yay = new Audio("./assets/audiofiles/1_person_cheering-Jett_Rifkin-1851518140.mp3");

$('#start').click(e => rollSound2.play());

var addQuestions = function () {  //function to generate questions based on the array above
    let quizArea = $('#quiz-area');

    for (let i = 0; i < questions.length; i++) {
        let question = $('<div>').attr('id', `question-div-${i}`);
        question.append("<h4>" + questions[i].question + "</h4>");
        for (let j = 0; j < questions[i].answers.length; j++) {
            question.append(`<input class='question' type="radio" name="question-${i}" value="${questions[i].answers[j]}">` + `<span class="answer">` + questions[i].answers[j]) + `</span>`;

        }
        quizArea.append(question)
    }

};

function updateScore(array) {

    array.forEach( (answer,i) => {
        if (answer.value === questions[i].correctAnswer) {
            rightAnswers++
        }
    })

    /* PREVIOUS ====================================================
        for (let i = 0; i < array.length; i++ ) {
            if ( array[i].value === questions[i].correctAnswer ) {
                rightAnswers++
            } 
        }
    ============================================================= */

}

function checkAnswers() {  // function checks how many wrong and right answers are picked
    yay.play();
    let answer = {};
    let checkAnswers = [];

    for (let i = 0; i < questions.length; i++) {
       let answerCheck = $(`#question-div-${i}`).children(`input:checked`);

       if ( answerCheck.length === 1 ) { // if an answer was selected, i.e. length of 1
            answer.value = answerCheck[0].value; // put 'value: <selected answer>' in an object
            checkAnswers.push(answer); // push that object to checkAnswers array
            answer = {}; // reset object
        } else {
            answer.value = 0; // if answer was not selected, put 'value: 0' in object
            checkAnswers.push(answer); // push object to checkAnswers array
            answer = {}; // reset object
        }
    }

    updateScore(checkAnswers); // pass array into updateScore function

    /* PREVIOUS ====================================================
        var answerCheck1 = $(`#question-div-0`).children(`input:checked`); 
        var answerCheck2 = $(`#question-div-1`).children(`input:checked`);
        var answerCheck3 = $(`#question-div-2`).children(`input:checked`);
        var answerCheck4 = $(`#question-div-3`).children(`input:checked`);

        if ( answerCheck1.length === 1 ) {
            answer.value = answerCheck1[0].value;
            checkAnswers.push(answer);
            answer = {};
            // console.log(checkAnswers);
        } else {
            answer.value = 0;
            checkAnswers.push(answer);
            answer = {};
            // console.log(checkAnswers);
        }

        if ( answerCheck2.length === 1 ) {
            answer.value = answerCheck2[0].value;
            checkAnswers.push(answer);
            answer = {};
            // console.log(checkAnswers);
        } else {
            answer.value = 0;
            checkAnswers.push(answer);
            answer = {};
            // console.log(checkAnswers);
        }

        if ( answerCheck3.length === 1 ) {
            answer.value = answerCheck3[0].value;
            checkAnswers.push(answer);
            answer = {};
            // console.log(checkAnswers);
        } else {
            answer.value = 0;
            checkAnswers.push(answer);
            answer = {};
            // console.log(checkAnswers);
        }

        if ( answerCheck4.length === 1 ) {
            answer.value = answerCheck4[0].value;
            checkAnswers.push(answer);
            answer = {};
            // console.log(checkAnswers);
        } else {
            answer.value = 0;
            checkAnswers.push(answer);
            answer = {};
            // console.log(checkAnswers);
        }

        updateScore(checkAnswers);
        alert(`You got ` + rightAnswers + ` out of ` + questions.length + ` questions correct!` + `\n` + `\n` + `Refresh the page if you want to try again.`); // display score to user

    ============================================================= */
}

function startTimer() {
    
    timer = setInterval(function(){
        if (counter <= 1) {
            clearInterval(timer);
            $(`#finish`).attr(`disabled`, true);
            checkAnswers();
        }
        counter--;
        $(`#timer`).text(counter);
    }, 1000)
    
}

$(document).ready(function () {   
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
        displayScore();
        $(`#finish`).attr(`disabled`, true); 
    });
    
});
