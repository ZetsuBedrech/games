let currentQuestion = 0;
let currentCorrectAnswerIndex = 0; // Index de la bonne réponse après mélange

const questions = [
    {
        question: "Complète l'expression : 'Mettre du beurre dans les ...' ",
        options: ["Nouille", "Patates", "Epinards"],
        correctAnswer: 2
    },
    {
        question: "Comment s'appelle l'ami lapin de Bambi ?",
        options: ["Pan Pan", "Ping Pong", "Nicolas"],
        correctAnswer: 0
    },
    {
        question: "Dans quelle articlutation du corps humain se situe la rotule ?",
        options: ["Le coude", "Le cou", "Le genou"],
        correctAnswer: 2
    },
    {
        question: "Dans quel pays se trouve la ville de Tokyo ? ",
        options: ["Japon", "Corée du Sud", "Chine"],
        correctAnswer: 0
    },
    {
        question: "Combien y a t il de lettres dans l'alphabet ?",
        options: ["24", "26", "28"],
        correctAnswer: 1
    },
    {
        question: "Combien y a t il de surfaces de réparation sur un terrain de football ?",
        options: ["1", "2", "4"],
        correctAnswer: 1
    },
    {
        question: "Tout les mois qui ont un vendredi 13 commecent un ...",
        options: ["Samedi", "Dimanche", "Lundi"],
        correctAnswer: 1
    },
    {
        question: "Quel est le symbole chimique de l'eau ? ",
        options: ["O2", "CO2", "H2O"],
        correctAnswer: 2
    },
    {
        question: "Que signifie en français le mot 'Guten Tag' en allemand ?",
        options: ["Bonjour", "Au revoir", "Merci"],
        correctAnswer: 0
    }
];

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question").textContent = question.question;
    const answers = document.querySelector('.answers');
    answers.innerHTML = '';

    // On crée une copie des options avec leur index original
    const shuffledOptions = question.options.map((option, index) => ({
        text: option,
        isCorrect: index === question.correctAnswer
    }));

    // Mélange aléatoire
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    shuffledOptions.forEach((optionData, index) => {
        const button = document.createElement('button');
        button.textContent = optionData.text;
        button.classList.add('answer-button');

        if (optionData.isCorrect) currentCorrectAnswerIndex = index;

        button.onclick = () => checkAnswer(index);
        answers.appendChild(button);
    });
}

function checkAnswer(userAnswer) {
    const rightAnswer = document.querySelector('.rightanswer');
    const falseAnswer = document.querySelector('.falseanswer');
    const result = document.getElementById("result");

    const answers = document.querySelectorAll('.answer-button');

    answers.forEach(btn => btn.disabled = true);

    if (userAnswer === currentCorrectAnswerIndex) {
        result.textContent = "Bonne réponse !";
        result.style.color = "green";
        answers[userAnswer].style.backgroundColor = "green";
        rightAnswer.textContent = "Nombre de bonnes réponses : " + (parseInt(rightAnswer.textContent.split(" : ")[1]) + 1);
    } else {
        result.textContent = "Mauvaise réponse.";
        result.style.color = "red";
        answers[userAnswer].style.backgroundColor = "red";
        answers[currentCorrectAnswerIndex].style.backgroundColor = "green";
        falseAnswer.textContent = "Nombre de mauvaises réponses : " + (parseInt(falseAnswer.textContent.split(" : ")[1]) + 1);
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
            result.textContent = "";
        } else {
            result.textContent = "Quiz terminé !";
            result.style.color = "blue";
        }
    }, 1000);
}

loadQuestion();
