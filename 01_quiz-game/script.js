// DOM Elemnets
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Added by me
const saveNextButton = document.getElementById("save-next-btn");
const skipButton = document.getElementById("skip-btn");
const previousButton = document.getElementById("prev-btn");

const quizQuestions = [
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Madrid", correct: false },
    ],
    answered: false,
    selectedIndex: null
  },
  {
    question: "How many days are in a leap year?",
    answers: [
      { text: "435", correct: false },
      { text: "366", correct: true },
      { text: "365", correct: false },
      { text: "378", correct: false },
    ],
    answered: false,
    selectedIndex: null
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
    answered: false,
    selectedIndex: null
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Helium", correct: false },
      { text: "Carbon Dioxide", correct: true },
    ],
    answered: false,
    selectedIndex: null
  },
  {
    question: "What is the currency of India?",
    answers: [
      { text: "Euro", correct: false },
      { text: "Yen", correct: false },
      { text: "Rupee", correct: true },
      { text: "Dollar", correct: false },
    ],
    answered: false,
    selectedIndex: null
  },
];

// QUIZ STATE VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let selectedButton = null;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
saveNextButton.addEventListener("click", doSaveAndNext);
skipButton.addEventListener("click", doSkip);
previousButton.addEventListener("click", doPrevious);

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;
  quizQuestions.forEach(q => {
    q.answered = false;
    q.selectedIndex = null;
  });
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}


function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  answersDisabled = currentQuestion.answered;

  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  answersContainer.innerHTML = "";
  selectedButton = null;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    if (currentQuestion.answered) {
      if (currentQuestion.selectedIndex === index) {
        if (answer.correct === true) {
          button.classList.add("correct");
        } else {
          button.classList.add("incorrect");
        }
      }
      button.disabled = true;
    } else {
      button.addEventListener("click", selectAnswer);
    }

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  Array.from(answersContainer.children).forEach(button => {
    button.classList.remove("selected");
  });

  selectedButton = event.target;
  selectedButton.classList.add("selected");
}

function doSaveAndNext() {
  if (!selectedButton || answersDisabled) return;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestion.answered = true;
  currentQuestion.selectedIndex = Array.from(answersContainer.children).indexOf(selectedButton);

  answersDisabled = true;

  const isCorrect = selectedButton.dataset.correct === 'true';
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  Array.from(answersContainer.children).forEach((button, index) => {
    button.classList.remove("selected");
    if (button.dataset.correct === 'true') {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function doSkip() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showResults();
  }
}

function doPrevious() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect!";
  } else if (percentage >= 70) {
    resultMessage.textContent = "Keep it up";
  } else if (percentage >= 40) {
    resultMessage.textContent = "You can do better";
  } else {
    resultMessage.textContent = "Hard work needed";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
