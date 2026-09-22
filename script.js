const questions = [
    {
        question: "Which language is used to create the structure of a web page?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: "HTML"
    },
    {
        question: "Which language is mainly used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "CSS"
    },
    {
        question: "Which language is used to add interactivity to web pages?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        answer: "JavaScript"
    },
    {
        question: "Which command is used to check the status of a Git repository?",
        options: ["git start", "git status", "git check", "git verify"],
        answer: "git status"
    },
    {
        question: "Which Git command creates a commit?",
        options: ["git save", "git commit", "git push", "git create"],
        answer: "git commit"
    },
    {
        question: "Which command uploads commits to GitHub?",
        options: ["git push", "git pull", "git clone", "git fetch"],
        answer: "git push"
    },
    {
        question: "Which Git command downloads changes from a remote repository?",
        options: ["git push", "git pull", "git save", "git upload"],
        answer: "git pull"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        question: "Which CSS property is used to change text color?",
        options: ["font-style", "text-color", "color", "background"],
        answer: "color"
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        options: ["variable", "let", "define", "declare"],
        answer: "let"
    }
];


let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 10 * 60;
let timerInterval;
let examSubmitted = false;


/* START EXAM */

function startExam() {

    const studentName =
        document.getElementById("studentName").value.trim();

    if (studentName === "") {
        alert("Please enter your name.");
        return;
    }

    document.getElementById("login-section")
        .classList.add("hidden");

    document.getElementById("exam-section")
        .classList.remove("hidden");

    document.getElementById("welcome").textContent =
        studentName;

    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    timeLeft = 10 * 60;
    examSubmitted = false;

    startTimer();
    showQuestion();
}


/* TIMER */

function startTimer() {

    clearInterval(timerInterval);

    updateTimer();

    timerInterval = setInterval(() => {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert("Time is over! Your exam will be submitted.");

            submitExam();
        }

    }, 1000);
}


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

    if (timeLeft <= 60) {

        document.getElementById("timer").style.color =
            "#dc2626";
    }
}


/* SHOW QUESTION */

function showQuestion() {

    const question =
        questions[currentQuestion];

    const container =
        document.getElementById("question-container");

    let optionsHTML = "";

    question.options.forEach(option => {

        const selected =
            userAnswers[currentQuestion] === option;

        optionsHTML += `
            <label class="option ${selected ? "selected" : ""}">
                <input
                    type="radio"
                    name="answer"
                    value="${option}"
                    ${selected ? "checked" : ""}
                    onchange="selectAnswer('${option.replace(/'/g, "\\'")}')"
                >
                ${option}
            </label>
        `;
    });


    container.innerHTML = `
        <div class="question-card">

            <h2>
                ${currentQuestion + 1}.
                ${question.question}
            </h2>

            ${optionsHTML}

        </div>
    `;


    updateProgress();
    updateNavigation();
}


/* SELECT ANSWER */

function selectAnswer(answer) {

    userAnswers[currentQuestion] = answer;

    showQuestion();
}


/* PROGRESS */

function updateProgress() {

    const total =
        questions.length;

    const current =
        currentQuestion + 1;

    const percentage =
        Math.round((current / total) * 100);

    document.getElementById("question-number")
        .textContent =
        `Question ${current} of ${total}`;

    document.getElementById("progress-percent")
        .textContent =
        `${percentage}%`;

    document.getElementById("progress")
        .style.width =
        `${percentage}%`;
}


/* NAVIGATION */

function updateNavigation() {

    const previous =
        document.getElementById("previous-btn");

    const next =
        document.getElementById("next-btn");

    const submit =
        document.getElementById("submit-btn");


    if (currentQuestion === 0) {
        previous.classList.add("hidden");
    } else {
        previous.classList.remove("hidden");
    }


    if (currentQuestion === questions.length - 1) {

        next.classList.add("hidden");

        submit.classList.remove("hidden");

    } else {

        next.classList.remove("hidden");

        submit.classList.add("hidden");
    }
}


function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();
    }
}


function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();
    }
}


/* SUBMIT */

function submitExam() {

    if (examSubmitted) {
        return;
    }

    examSubmitted = true;

    clearInterval(timerInterval);

    let score = 0;

    let totalMarks = questions.length;

    let passingMarks = Math.ceil(totalMarks * 0.6);


    questions.forEach((question, index) => {

        if (
            userAnswers[index] ===
            question.answer
        ) {
            score++;
        }

    });


    const wrong =
        totalMarks - score;

    const percentage =
        Math.round((score / totalMarks) * 100);

    const passed =
        score >= passingMarks;


    document.getElementById("exam-section")
        .classList.add("hidden");

    document.getElementById("result-section")
        .classList.remove("hidden");


    document.getElementById("final-score")
        .textContent = score;

    document.getElementById("percentage")
        .textContent = percentage + "%";

    document.getElementById("correct-count")
        .textContent = score;

    document.getElementById("wrong-count")
        .textContent = wrong;


    if (passed) {

        document.getElementById("result-icon")
            .textContent = "🏆";

        document.getElementById("result-title")
            .textContent = "Congratulations!";

        document.getElementById("result-message")
            .textContent =
            "You have successfully passed the examination.";

    } else {

        document.getElementById("result-icon")
            .textContent = "📚";

        document.getElementById("result-title")
            .textContent = "Keep Practicing!";

        document.getElementById("result-message")
            .textContent =
            "You did not reach the passing mark. Review your answers and try again.";
    }


    showAnswerReview();
}


/* ANSWER REVIEW */

function showAnswerReview() {

    const review =
        document.getElementById("answer-review");

    review.innerHTML =
        "<h3>Answer Review</h3><br>";


    questions.forEach((question, index) => {

        const userAnswer =
            userAnswers[index];

        const correct =
            userAnswer === question.answer;


        const item =
            document.createElement("div");

        item.className =
            "review-item " +
            (correct
                ? "review-correct"
                : "review-wrong");


        item.innerHTML = `
            <strong>
                ${index + 1}. ${question.question}
            </strong>

            <span>
                Your answer:
                ${userAnswer || "Not answered"}
            </span>

            <br>

            <span>
                Correct answer:
                ${question.answer}
            </span>
        `;


        review.appendChild(item);
    });
}


/* RESTART */

function restartExam() {

    clearInterval(timerInterval);

    currentQuestion = 0;

    userAnswers =
        new Array(questions.length).fill(null);

    timeLeft = 10 * 60;

    examSubmitted = false;


    document.getElementById("result-section")
        .classList.add("hidden");

    document.getElementById("login-section")
        .classList.remove("hidden");

    document.getElementById("studentName")
        .value = "";

    document.getElementById("timer")
        .textContent = "10:00";
}