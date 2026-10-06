/* =========================================================
   ONLINE EXAMINATION SYSTEM
   Pure HTML + CSS + JavaScript
   Works Offline
   ========================================================= */


/* =========================================================
   DEMO LOGIN
   ========================================================= */

const DEMO_STUDENT_ID = "student01";
const DEMO_PASSWORD = "Exam@123";


/* =========================================================
   EXAM QUESTIONS
   ========================================================= */

const questions = [

    {
        question: "Which data structure follows the FIFO principle?",
        options: [
            "Stack",
            "Queue",
            "Tree",
            "Graph"
        ],
        answer: 1
    },

    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "static"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },

    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "foreground"
        ],
        answer: 2
    },

    {
        question: "Which sorting algorithm repeatedly selects the minimum element?",
        options: [
            "Merge Sort",
            "Quick Sort",
            "Selection Sort",
            "Bubble Sort"
        ],
        answer: 2
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing Utility"
        ],
        answer: 0
    },

    {
        question: "Which protocol is commonly used to access web pages?",
        options: [
            "FTP",
            "HTTP",
            "SMTP",
            "SSH"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: [
            "//",
            "##",
            "<!--",
            "**"
        ],
        answer: 0
    },

    {
        question: "Which method converts a JavaScript object into a JSON string?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.object()"
        ],
        answer: 1
    },

    {
        question: "What is the main purpose of an operating system?",
        options: [
            "Only to browse the internet",
            "Only to write programs",
            "Manage computer hardware and software resources",
            "Only to store files"
        ],
        answer: 2
    }

];


/* =========================================================
   APPLICATION STATE
   ========================================================= */

let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);

let timeRemaining = 5 * 60;

let timerInterval = null;

let examSubmitted = false;

let loggedInStudent = "";


/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const loginPage =
    document.getElementById("loginPage");

const dashboardPage =
    document.getElementById("dashboardPage");

const examPage =
    document.getElementById("examPage");

const resultPage =
    document.getElementById("resultPage");

const reviewPage =
    document.getElementById("reviewPage");


/* =========================================================
   LOGIN ELEMENTS
   ========================================================= */

const loginForm =
    document.getElementById("loginForm");

const studentIdInput =
    document.getElementById("studentId");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");

const togglePassword =
    document.getElementById("togglePassword");


/* =========================================================
   DASHBOARD ELEMENTS
   ========================================================= */

const dashboardStudent =
    document.getElementById("dashboardStudent");

const startExamButton =
    document.getElementById("startExamButton");

const logoutButton =
    document.getElementById("logoutButton");


/* =========================================================
   EXAM ELEMENTS
   ========================================================= */

const timerElement =
    document.getElementById("timer");

const questionCounter =
    document.getElementById("questionCounter");

const currentQuestionNumber =
    document.getElementById("currentQuestionNumber");

const questionText =
    document.getElementById("questionText");

const optionsContainer =
    document.getElementById("optionsContainer");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const submitExamButton =
    document.getElementById("submitExamButton");

const questionNumbers =
    document.getElementById("questionNumbers");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");


/* =========================================================
   RESULT ELEMENTS
   ========================================================= */

const resultStudent =
    document.getElementById("resultStudent");

const scoreValue =
    document.getElementById("scoreValue");

const correctAnswers =
    document.getElementById("correctAnswers");

const wrongAnswers =
    document.getElementById("wrongAnswers");

const percentage =
    document.getElementById("percentage");

const resultMessage =
    document.getElementById("resultMessage");

const resultIcon =
    document.getElementById("resultIcon");

const reviewButton =
    document.getElementById("reviewButton");

const restartButton =
    document.getElementById("restartButton");


/* =========================================================
   REVIEW ELEMENTS
   ========================================================= */

const reviewContainer =
    document.getElementById("reviewContainer");

const reviewBackButton =
    document.getElementById("reviewBackButton");


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(page) {

    const pages = [
        loginPage,
        dashboardPage,
        examPage,
        resultPage,
        reviewPage
    ];

    pages.forEach(function(currentPage) {

        currentPage.classList.remove("active");

    });

    page.classList.add("active");

    window.scrollTo(0, 0);
}


/* =========================================================
   LOGIN
   ========================================================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const studentId =
        studentIdInput.value.trim();

    const password =
        passwordInput.value;

    if (
        studentId === DEMO_STUDENT_ID &&
        password === DEMO_PASSWORD
    ) {

        loggedInStudent = studentId;

        sessionStorage.setItem(
            "loggedInStudent",
            loggedInStudent
        );

        loginError.textContent = "";

        dashboardStudent.textContent =
            loggedInStudent;

        showPage(dashboardPage);

    } else {

        loginError.textContent =
            "Invalid Student ID or Password.";

    }

});


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

togglePassword.addEventListener(
    "click",
    function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "👁";

        }

    }
);


/* =========================================================
   LOGOUT
   ========================================================= */

logoutButton.addEventListener(
    "click",
    function() {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (!confirmLogout) {
            return;
        }

        stopTimer();

        sessionStorage.removeItem(
            "loggedInStudent"
        );

        loggedInStudent = "";

        studentIdInput.value = "";

        passwordInput.value = "";

        loginError.textContent = "";

        resetExam();

        showPage(loginPage);

    }
);


/* =========================================================
   START EXAM
   ========================================================= */

startExamButton.addEventListener(
    "click",
    function() {

        const confirmed =
            confirm(
                "Start the examination now?\n\n" +
                "You will have 5 minutes to complete it."
            );

        if (!confirmed) {
            return;
        }

        startExam();

    }
);


/* =========================================================
   START EXAM FUNCTION
   ========================================================= */

function startExam() {

    currentQuestion = 0;

    userAnswers =
        new Array(questions.length).fill(null);

    timeRemaining = 5 * 60;

    examSubmitted = false;

    showPage(examPage);

    renderQuestion();

    renderQuestionNavigation();

    updateTimer();

    startTimer();

}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {

    stopTimer();

    timerInterval =
        setInterval(
            function() {

                if (examSubmitted) {
                    return;
                }

                timeRemaining--;

                updateTimer();

                if (timeRemaining <= 0) {

                    stopTimer();

                    alert(
                        "Time is over. Your examination will be submitted automatically."
                    );

                    submitExam(true);

                }

            },
            1000
        );

}


function stopTimer() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;

    }

}


function updateTimer() {

    const minutes =
        Math.floor(timeRemaining / 60);

    const seconds =
        timeRemaining % 60;

    const formattedMinutes =
        String(minutes).padStart(2, "0");

    const formattedSeconds =
        String(seconds).padStart(2, "0");

    timerElement.textContent =
        formattedMinutes + ":" +
        formattedSeconds;


    if (timeRemaining <= 60) {

        timerElement.parentElement.classList.add(
            "timer-warning"
        );

    } else {

        timerElement.parentElement.classList.remove(
            "timer-warning"
        );

    }

}


/* =========================================================
   RENDER QUESTION
   ========================================================= */

function renderQuestion() {

    const question =
        questions[currentQuestion];

    questionCounter.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;

    currentQuestionNumber.textContent =
        currentQuestion + 1;

    questionText.textContent =
        question.question;

    optionsContainer.innerHTML = "";


    question.options.forEach(
        function(option, index) {

            const optionDiv =
                document.createElement("div");

            optionDiv.className = "option";


            if (
                userAnswers[currentQuestion] === index
            ) {

                optionDiv.classList.add(
                    "selected"
                );

            }


            const radio =
                document.createElement("input");

            radio.type = "radio";

            radio.name = "answer";

            radio.value = index;

            radio.id =
                "option-" + index;

            radio.checked =
                userAnswers[currentQuestion] === index;


            const label =
                document.createElement("label");

            label.htmlFor =
                "option-" + index;

            label.textContent =
                option;


            radio.addEventListener(
                "change",
                function() {

                    userAnswers[currentQuestion] =
                        index;

                    updateOptionStyles();

                    renderQuestionNavigation();

                    updateProgress();

                }
            );


            optionDiv.appendChild(radio);

            optionDiv.appendChild(label);

            optionsContainer.appendChild(optionDiv);

        }
    );


    previousButton.disabled =
        currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {

        nextButton.textContent =
            "Finish →";

    } else {

        nextButton.textContent =
            "Next →";

    }


    updateProgress();

    renderQuestionNavigation();

}


/* =========================================================
   OPTION VISUAL STATE
   ========================================================= */

function updateOptionStyles() {

    const options =
        document.querySelectorAll(".option");

    options.forEach(
        function(option, index) {

            option.classList.remove(
                "selected"
            );

            if (
                userAnswers[currentQuestion] === index
            ) {

                option.classList.add(
                    "selected"
                );

            }

        }
    );

}


/* =========================================================
   NEXT BUTTON
   ========================================================= */

nextButton.addEventListener(
    "click",
    function() {

        if (
            currentQuestion ===
            questions.length - 1
        ) {

            const confirmSubmit =
                confirm(
                    "You are on the last question.\n\n" +
                    "Submit your examination?"
                );

            if (confirmSubmit) {

                submitExam(false);

            }

            return;

        }


        currentQuestion++;

        renderQuestion();

    }
);


/* =========================================================
   PREVIOUS BUTTON
   ========================================================= */

previousButton.addEventListener(
    "click",
    function() {

        if (currentQuestion > 0) {

            currentQuestion--;

            renderQuestion();

        }

    }
);


/* =========================================================
   QUESTION NAVIGATION
   ========================================================= */

function renderQuestionNavigation() {

    questionNumbers.innerHTML = "";


    questions.forEach(
        function(question, index) {

            const button =
                document.createElement("button");

            button.className =
                "question-number-button";

            button.textContent =
                index + 1;


            if (index === currentQuestion) {

                button.classList.add(
                    "current"
                );

            }


            if (userAnswers[index] !== null) {

                button.classList.add(
                    "answered"
                );

            }


            button.addEventListener(
                "click",
                function() {

                    currentQuestion = index;

                    renderQuestion();

                }
            );


            questionNumbers.appendChild(button);

        }
    );

}


/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {

    const answered =
        userAnswers.filter(
            function(answer) {
                return answer !== null;
            }
        ).length;

    const progress =
        Math.round(
            (answered / questions.length) * 100
        );

    progressBar.style.width =
        progress + "%";

    progressText.textContent =
        progress + "%";

}


/* =========================================================
   SUBMIT EXAM
   ========================================================= */

submitExamButton.addEventListener(
    "click",
    function() {

        const unanswered =
            userAnswers.filter(
                function(answer) {
                    return answer === null;
                }
            ).length;


        let message =
            "Are you sure you want to submit the examination?";


        if (unanswered > 0) {

            message +=
                "\n\nYou have " +
                unanswered +
                " unanswered question(s).";

        }


        const confirmed =
            confirm(message);

        if (confirmed) {

            submitExam(false);

        }

    }
);


/* =========================================================
   CALCULATE RESULT
   ========================================================= */

function submitExam(autoSubmitted) {

    if (examSubmitted) {
        return;
    }

    examSubmitted = true;

    stopTimer();


    let score = 0;


    questions.forEach(
        function(question, index) {

            if (
                userAnswers[index] ===
                question.answer
            ) {

                score++;

            }

        }
    );


    const correct =
        score;

    const wrong =
        questions.length - correct;


    const percentageValue =
        Math.round(
            (score / questions.length) * 100
        );


    scoreValue.textContent =
        score;

    correctAnswers.textContent =
        correct;

    wrongAnswers.textContent =
        wrong;

    percentage.textContent =
        percentageValue + "%";

    resultStudent.textContent =
        loggedInStudent;


    if (percentageValue >= 80) {

        resultIcon.textContent = "🏆";

        resultMessage.textContent =
            "Excellent performance!";

    } else if (percentageValue >= 60) {

        resultIcon.textContent = "🎉";

        resultMessage.textContent =
            "Good job! Keep improving.";

    } else if (percentageValue >= 40) {

        resultIcon.textContent = "👍";

        resultMessage.textContent =
            "You passed. Keep practicing.";

    } else {

        resultIcon.textContent = "📚";

        resultMessage.textContent =
            "More practice is needed.";

    }


    showPage(resultPage);

}


/* =========================================================
   REVIEW ANSWERS
   ========================================================= */

reviewButton.addEventListener(
    "click",
    function() {

        renderReview();

        showPage(reviewPage);

    }
);


function renderReview() {

    reviewContainer.innerHTML = "";


    questions.forEach(
        function(question, index) {

            const item =
                document.createElement("div");

            const isCorrect =
                userAnswers[index] ===
                question.answer;

            item.className =
                "review-item " +
                (isCorrect ? "correct" : "wrong");


            const questionElement =
                document.createElement("div");

            questionElement.className =
                "review-question";

            questionElement.textContent =
                (index + 1) +
                ". " +
                question.question;


            const selectedAnswer =
                userAnswers[index];


            const selectedElement =
                document.createElement("div");

            selectedElement.className =
                "review-answer";


            if (selectedAnswer === null) {

                selectedElement.innerHTML =
                    "Your answer: " +
                    '<span class="not-answered">' +
                    "Not answered" +
                    "</span>";

            } else {

                if (isCorrect) {

                    selectedElement.innerHTML =
                        "Your answer: " +
                        '<span class="correct-text">' +
                        question.options[selectedAnswer] +
                        " ✓</span>";

                } else {

                    selectedElement.innerHTML =
                        "Your answer: " +
                        '<span class="wrong-text">' +
                        question.options[selectedAnswer] +
                        " ✗</span>";

                }

            }


            const correctElement =
                document.createElement("div");

            correctElement.className =
                "review-answer";

            correctElement.innerHTML =
                "Correct answer: " +
                '<span class="correct-text">' +
                question.options[question.answer] +
                "</span>";


            item.appendChild(
                questionElement
            );

            item.appendChild(
                selectedElement
            );

            item.appendChild(
                correctElement
            );


            reviewContainer.appendChild(item);

        }
    );

}


/* =========================================================
   BACK TO RESULT
   ========================================================= */

reviewBackButton.addEventListener(
    "click",
    function() {

        showPage(resultPage);

    }
);


/* =========================================================
   TAKE EXAM AGAIN
   ========================================================= */

restartButton.addEventListener(
    "click",
    function() {

        const confirmed =
            confirm(
                "Start a new examination?"
            );

        if (!confirmed) {
            return;
        }

        startExam();

    }
);


/* =========================================================
   RESET EXAM
   ========================================================= */

function resetExam() {

    stopTimer();

    currentQuestion = 0;

    userAnswers =
        new Array(questions.length).fill(null);

    timeRemaining = 5 * 60;

    examSubmitted = false;

}


/* =========================================================
   RESTORE LOGIN SESSION
   ========================================================= */

window.addEventListener(
    "load",
    function() {

        const savedStudent =
            sessionStorage.getItem(
                "loggedInStudent"
            );


        if (savedStudent) {

            loggedInStudent =
                savedStudent;

            dashboardStudent.textContent =
                loggedInStudent;

            showPage(dashboardPage);

        } else {

            showPage(loginPage);

        }

    }
);