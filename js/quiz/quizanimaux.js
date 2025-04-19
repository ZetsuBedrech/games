let currentQuestion = 0;
let currentCorrectAnswerIndex = 0;

const questions = [
    {
        question: "Quel est le plus grand animal vivant sur Terre ?",
        options: ["L’éléphant d’Afrique", "La baleine bleue", "L’ours polaire"],
        correctAnswer: 1
    },
    {
        question: "Quel animal pond des œufs mais allaite ses petits ?",
        options: ["Le kangourou", "Le tatou", "L’ornithorynque"],
        correctAnswer: 2
    },
    {
        question: "Combien de pattes a une araignée ?",
        options: ["6", "8", "10"],
        correctAnswer: 1
    },
    {
        question: "Quel animal est surnommé 'le roi de la savane' ?",
        options: ["Le lion", "Le guépard", "Le rhinocéros"],
        correctAnswer: 0
    },
    {
        question: "Quel animal a la morsure la plus puissante ?",
        options: ["Le crocodile du Nil", "Le requin blanc", "L’ours brun"],
        correctAnswer: 0
    },
    {
        question: "Lequel de ces animaux peut dormir debout ?",
        options: ["Le cheval", "Le chien", "Le dauphin"],
        correctAnswer: 0
    },
    {
        question: "Quel est le seul mammifère capable de voler ?",
        options: ["La chauve-souris", "L’écureuil volant", "Le colibri"],
        correctAnswer: 0
    },
    {
        question: "Quel animal change de couleur pour se camoufler ?",
        options: ["Le caméléon", "Le crapaud", "Le lézard vert"],
        correctAnswer: 0
    },
    {
        question: "Lequel de ces animaux vit le plus longtemps ?",
        options: ["Le chien", "La tortue des Galápagos", "Le dauphin"],
        correctAnswer: 1
    },
    {
        question: "Quel est le nom du bébé du kangourou ?",
        options: ["Joey", "Cabri", "Marsouin"],
        correctAnswer: 0
    },
    {
        question: "Quel animal a un très long cou ?",
        options: ["Le zèbre", "La girafe", "L’antilope"],
        correctAnswer: 1
    },
    {
        question: "Quel oiseau est symbole de la paix ?",
        options: ["Le corbeau", "Le pigeon", "La colombe"],
        correctAnswer: 2
    },
    {
        question: "Quel animal vit dans une ruche ?",
        options: ["La guêpe", "L’abeille", "La mouche"],
        correctAnswer: 1
    },
    {
        question: "Lequel de ces animaux est un félin ?",
        options: ["Le tigre", "Le loup", "Le panda"],
        correctAnswer: 0
    },
    {
        question: "Combien de cœurs possède une pieuvre ?",
        options: ["1", "2", "3"],
        correctAnswer: 2
    },
    {
        question: "Quel est l’animal terrestre le plus rapide ?",
        options: ["Le guépard", "Le léopard", "L’autruche"],
        correctAnswer: 0
    },
    {
        question: "Quel animal utilise l’écholocalisation pour se déplacer ?",
        options: ["Le hibou", "Le dauphin", "Le pélican"],
        correctAnswer: 1
    },
    {
        question: "Quel est le plus grand félin du monde ?",
        options: ["Le lion", "Le jaguar", "Le tigre de Sibérie"],
        correctAnswer: 2
    },
    {
        question: "Quel animal possède une trompe ?",
        options: ["Le rhinocéros", "Le tapir", "L’éléphant"],
        correctAnswer: 2
    },
    {
        question: "Quel est le cri du chien ?",
        options: ["Miaou", "Ouaf ouaf", "Meuh"],
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
