let currentQuestion = 0;
// les questions
const questions = [
    {
        question: "Comment s'appelle la lane du haut ?",
        options: ["Toplane", "Midlane", "Botlane"],
        correctAnswer: 0
    },
    {
        question: "Comment s'appelle la lane du milieu ?",
        options: ["Toplane", "Midlane", "Botlane"],
        correctAnswer: 1
    },
    {
        question: "Quel est l'objectif principal dans une partie de League of Legends ?",
        options: ["Détruire la base ennemie", "Tuer tous les champions ennemis", "Avoir le plus de gold"],
        correctAnswer: 0
    },
    {
        question: "Que fait une 'ward' dans League of Legends ?",
        options: ["Soigne un allié", "Révèle une zone de la carte", "Augmente les dégâts des alliés"],
        correctAnswer: 1
    },
    {
        question: "Que font les 'dragons' dans League of Legends ?",
        options: ["Donne des malus aux ennemis", "Augmente les dégâts des monstres alliés", "Donne des bonus aux alliés"],
        correctAnswer: 2
    },
    {
        question: "Que signifie 'dive' ?",
        options: ["Se cacher pour faire une embuscade", "Aller sous la tour ennemie pour le tuer", "Aider un allié sur sa lane"],
        correctAnswer: 1
    },
    {
        question: "Que signifie 'bush' ?",
        options: ["Buisson", "Tour", "Champion"],
        correctAnswer: 0
    },
    {
        question: "Que donne le monstre bleu (blue buff) ?",
        options: ["Une régénération de mana", "Une régénération de vie", "Une résistance aux dégâts physiques"],
        correctAnswer: 0
    },
    {
        question: "Que donne le monstre rouge (red buff) ?",
        options: ["Une régénération de mana", "Une régénération de vie", "Des dégâts de brûlure"],
        correctAnswer: 2
    },
    {
        question: "Combien de tours ennemies doivent être détruites avant de pouvoir attaquer le Nexus ?",
        options: ["0", "3", "5"],
        correctAnswer: 2
    }
];

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question").textContent = question.question;
    const answers = document.querySelector('.answers');
    answers.innerHTML = ''; // Réinitialise les réponses

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('answer-button');
        button.onclick = () => checkAnswer(index);
        answers.appendChild(button);
    });
}

function checkAnswer(userAnswer) {
    const rightAnswer = document.querySelector('.rightanswer');
    const falseAnswer = document.querySelector('.falseanswer');
    const result = document.getElementById("result");
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer) {
        result.textContent = "Bonne réponse !";
        result.style.color = "green";
        rightAnswer.textContent = "Nombre de bonnes réponses : " + (parseInt(rightAnswer.textContent.split(" : ")[1]) + 1);
    } else {
        result.textContent = "Mauvaise réponse. La bonne réponse était : " + questions[currentQuestion].options[correctAnswer];
        result.style.color = "red";
        falseAnswer.textContent = "Nombre de mauvaises réponses : " + (parseInt(falseAnswer.textContent.split(" : ")[1]) + 1);
    }

    // Passe à la prochaine question après 2 secondes
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
            result.textContent = "";
        } else {
            result.textContent = "Quiz terminé !";
            result.style.color = "blue";
        }
    }, 2000);
}

// Charge la première question au démarrage
loadQuestion();
