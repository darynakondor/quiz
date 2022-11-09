const option1 = document.querySelector(".option1");
option2 = document.querySelector(".option2");
option3 = document.querySelector(".option3");
option4 = document.querySelector(".option4");
const optionElements = document.querySelectorAll(".option");
const question = document.getElementById("question");
const numberOfQuestion = document.getElementById("number-of-question");
numberOfAllQuestion = document.getElementById("number-of-all-questions");

let indexOfQuestion,
  indexOfPage = 0;

const answersTracker = document.getElementById("answers-tracker");
const btnNext = document.getElementById("btn-next");

let score = 0;

const correctAnswer = document.getElementById("correct-answer");
const numberOfAllQuestion2 = document.getElementById(
  "number-of-all-questions-2"
);
const btnTryAgain = document.getElementById("btn-try-again");

const questions = [
  {
    question:
      "Поїзд рухався першу половину часу зі швидкістю 60 км/год, а другу - зі швидкістю 40 км/год. Визначте середню швидкість руху поїзда на всьому шляху.",
    options: ["45", "50", "50,5", "48,5"],
    rightAnswer: 1,
  },
  {
    question:
      "Знайдіть вибіркове середнє: 4, 5, 5, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 13, 20",
    options: ["9,3", "9,6", "10,4", "9,4"],
    rightAnswer: 3,
  },
  {
    question:
      "Знайдіть медіану варіаційного ряду, отриманого на підставі вибірки: 12, 11, 14, 10, 11, 12, 13, 11",
    options: ["11,5", "10", "11", "11,75"],
    rightAnswer: 0,
  },
  {
    question: "Яка мода вибірки: 3, 5, 8, 10, 13, 5, 15, 11, 7, 6, 5, 3, 15?",
    options: ["15", "10", "5", "3"],
    rightAnswer: 2,
  },
  {
    question:
      "Що доречно використати для порівняння двох емпіричних розподілів та визначення того, чи підпорядковуються вони (розподіли) одному закону?",
    options: [
      "Теорему Піфагора",
      "Двовибірковий критерій узгодженості Колмогорова-Смирнова",
      "Інтегральну формулу Коші",
      "Теорему Байеса",
    ],
    rightAnswer: 1,
  },
];

numberOfAllQuestion.innerHTML = questions.length;

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question;

  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1;
  indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Вам потрібно вибрати одну відповідь");
  } else {
    randomQuestion();
    enableOptions();
  }
};

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

btnNext.addEventListener("click", () => {
  validate();
});

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});
