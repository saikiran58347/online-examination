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
}
];

function startExam() {

    const studentName = document.getElementById("studentName").value;

    if (studentName.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("exam-section").classList.remove("hidden");

    document.getElementById("welcome").textContent =
        "Welcome, " + studentName + "!";

    loadQuestions();
}

function loadQuestions() {

    const container = document.getElementById("question-container");

    container.innerHTML = "";

    questions.forEach((q, index) => {

        const questionDiv = document.createElement("div");

        questionDiv.className = "question";

        questionDiv.innerHTML = `
            <p><strong>${index + 1}. ${q.question}</strong></p>

            ${q.options.map(option => `
                <label>
                    <input type="radio"
                           name="question${index}"
                           value="${option}">
                    ${option}
                </label>
                <br>
            `).join("")}
        `;

        container.appendChild(questionDiv);
    });
}

function submitExam() {

    let score = 0;

    let totalMarks = questions.length;

    let passingMarks = 3;

    questions.forEach((q, index) => {

        const selected =
            document.querySelector(
                `input[name="question${index}"]:checked`
            );

        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    document.getElementById("result").textContent =
        "Your Score: " + score + " / " + questions.length;
}