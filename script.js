const question = [
    {
        question: " كم عمر النبي محمد عندما توفي ", 
        answers: [
            {text: "46", correct: false},
            {text: "63", correct: true},
            {text: "56", correct: false},
            {text: "37", correct: false},
        ]

    },
    {
        question: "تقع سورة يوسف في الجزء  ", 
        answers: [
            {text: "11", correct: false},
            {text: "12", correct: true},
            {text: "7", correct: false},
            {text: "27", correct: false},
        ]

    },
    {
        question: " كم مرى ذكر اسم موسى بالقران ", 
        answers: [
            {text: "136", correct: true},
            {text: "123", correct: false},
            {text: "56", correct: false},
            {text: "165", correct: false},
        ]

    },
    {
        question: " كم عدد المبشرين بالجنة ", 
        answers: [
            {text: "10", correct: true},
            {text: "7", correct: false},
            {text: "3", correct: false},
            {text: "15", correct: false},
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML = "Next"
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo =currentQuestionIndex +1;
    questionElement.innerHTML = questionNo  + " . " + currentQuestion.question;

    currentQuestion.answers.forEach( answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener( 'click' , SelectAnswer );
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function SelectAnswer (e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true ;
    });
    nextButton.style.display = "block"; 
}

function showScore(){
    resetState();
    questionElement.innerHTML = ` نتيجتك ${score} من أصل ${question.length}! `;
    nextButton.innerHTML = " العب مجددًا "
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click' , ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();         


