let currentQuestion = 0;
let currentCorrectAnswerIndex = 0;

const questions = [
    {
        question: "Quel est le nom de la plante qui produit des fleurs violettes et est utilisée pour fabriquer des huiles essentielles ?",
        options: ["Lavande", "Rose", "Tulipe"],
        correctAnswer: 0
    },
    {
        question: "Quelle plante est connue pour ses grandes feuilles et ses fleurs odorantes souvent associées aux tropiques ?",
        options: ["Orchidée", "Cactus", "Bananier"],
        correctAnswer: 0
    },
    {
        question: "Quel est le nom de la plante qui produit des pommes ?",
        options: ["Poirier", "Pommier", "Ceriser"],
        correctAnswer: 1
    },
    {
        question: "Quelle plante est utilisée pour aromatiser de nombreux plats italiens ?",
        options: ["Basilic", "Menthe", "Thym"],
        correctAnswer: 0
    },
    {
        question: "Quel est le nom de la plante grimpante qui donne des raisins ?",
        options: ["Vigne", "Ficus", "Lierre"],
        correctAnswer: 0
    },
    {
        question: "Quelle plante est souvent utilisée comme épice et a une saveur piquante ?",
        options: ["Poivron", "Coriandre", "Gingembre"],
        correctAnswer: 2
    },
    {
        question: "Quelle plante produit des graines utilisées pour fabriquer des huiles alimentaires ?",
        options: ["Tournesol", "Pavot", "Coriandre"],
        correctAnswer: 0
    },
    {
        question: "Comment appelle-t-on la partie d'une plante qui capte l'eau et les nutriments ?",
        options: ["Feuille", "Racine", "Tige"],
        correctAnswer: 1
    },
    {
        question: "Quel type de plante possède des épines et peut survivre dans des environnements secs ?",
        options: ["Fougère", "Cactus", "Aloe vera"],
        correctAnswer: 1
    },
    {
        question: "Quel est le nom de l'arbre dont les feuilles deviennent rouges en automne ?",
        options: ["Chêne", "Érable", "Pin"],
        correctAnswer: 1
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
