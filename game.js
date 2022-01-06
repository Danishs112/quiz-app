const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestions = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What’s your favorite way to spend a day off?",
    choice1: "<scipt1></scipt>",
    choice2: "<javascript></javascript>",
    choice3: "<p1></p>",
    choice4: "<a1></a>",
    answer: 1,
  },
  {
    question: "What type of music are you into?",
    choice1: "<scipt2></scipt>",
    choice2: "<javascript></javascript>",
    choice3: "<p2></p>",
    choice4: "<a2></a>",
    answer: 2,
  },
  {
    question: "What was the best vacation you ever took and why?",
    choice1: "<scipt3></scipt>",
    choice2: "<javascript></javascript>",
    choice3: "<p3></p>",
    choice4: "<a3></a>",
    answer: 3,
  },
  {
    question: "What are your hobbies, and how did you get into them?",
    choice1: "<scipt4></scipt>",
    choice2: "<javascript></javascript>",
    choice3: "<p4></p>",
    choice4: "<a4></a>",
    answer: 4,
  },
];

const correctBonus = 10;
const maxQuestions = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;
  console.log(questionCounterText);
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      //   const classToApply = "incorrect";
      //   if (selectedAnswer === currentQuestion.answer) {
      //     classToApply = "correct";
      //   }

      const classToApply =
        selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";
      
      
      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
};

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
