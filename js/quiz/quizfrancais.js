let currentQuestion = 0;
let currentCorrectAnswerIndex = 0; // Index de la bonne réponse après mélange

const questions = [
    {
        question: "Comment appelle-t-on une phrase qui contient une proposition subordonnée ?",
        options: ["Phrase complexe", "Phrase simple", "Phrase interrogative"],
        correctAnswer: 0
    },
    {
        question: "Quelle est la bonne orthographe du pluriel de 'château' ?",
        options: ["Chateaux", "Châteaux", "Chateauxs"],
        correctAnswer: 1
    },
    {
        question: "Quel est le synonyme de 'rapide' ?",
        options: ["Lent", "Vif", "Sage"],
        correctAnswer: 1
    },
    {
        question: "Quel est le féminin du mot 'acteur' ?",
        options: ["Actrice", "Acteuse", "Acteur"],
        correctAnswer: 0
    },
    {
        question: "Quel est le contraire de 'difficile' ?",
        options: ["Facile", "Compliqué", "Improbable"],
        correctAnswer: 0
    },
    {
        question: "Quelle est la bonne conjugaison du verbe 'être' au présent pour 'nous' ?",
        options: ["Nous sommes", "Nous etons", "Nous est"],
        correctAnswer: 0
    },
    {
        question: "Quel est le participe passé du verbe 'voir' ?",
        options: ["Vus", "Vue", "Vu"],
        correctAnswer: 2
    },
    {
        question: "Complétez la phrase : 'Elle a ____ livre.'",
        options: ["lu", "lue", "luis"],
        correctAnswer: 1
    },
    {
        question: "Quel est l'antonyme du mot 'vieux' ?",
        options: ["Jeune", "Ancien", "Nouveau"],
        correctAnswer: 0
    },
    {
        question: "Quel est le féminin de 'roi' ?",
        options: ["Reine", "Roié", "Royale"],
        correctAnswer: 0
    },
    {
        question: "Quel est le pluriel de 'métal' ?",
        options: ["Métals", "Métaux", "Métals et métaux"],
        correctAnswer: 1
    },
    {
        question: "Quel est le féminin de 'roi' ?",
        options: ["Reine", "Princesse", "Dame"],
        correctAnswer: 0
    },
    {
        question: "Comment s'appelle le grand écrivain français connu pour 'Les Misérables' ?",
        options: ["Victor Hugo", "Marcel Proust", "Émile Zola"],
        correctAnswer: 0
    },
    {
        question: "Comment appelle-t-on une figure de style qui consiste à comparer deux éléments ?",
        options: ["Métaphore", "Comparaison", "Allégorie"],
        correctAnswer: 1
    },
    {
        question: "Quel est le synonyme de 'heureux' ?",
        options: ["Joyeux", "Triste", "Mécontent"],
        correctAnswer: 0
    },
    {
        question: "Quelle est la fonction de 'me' dans la phrase 'Il me parle' ?",
        options: ["Complément d'objet direct", "Complément d'objet indirect", "Sujet"],
        correctAnswer: 1
    },
    {
        question: "Quelle est la bonne conjugaison du verbe 'finir' à l'imparfait pour 'je' ?",
        options: ["Je finis", "Je finissais", "Je finirai"],
        correctAnswer: 1
    },
    {
        question: "Que veut dire 'c'est la cerise sur le gâteau' ?",
        options: ["C'est la meilleure partie", "C'est un mauvais moment", "C'est la fin d'un problème"],
        correctAnswer: 0
    },
    {
        question: "Comment s'appelle l'Académie qui régule la langue française ?",
        options: ["L'Académie des sciences", "L'Académie française", "L'Académie de Paris"],
        correctAnswer: 1
    },
    {
        question: "Que signifie l'expression 'avoir le coup de foudre' ?",
        options: ["Tomber amoureux soudainement", "Avoir un coup de vent", "Se faire un accident"],
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
