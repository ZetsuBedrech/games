let currentQuestion = 0;
let currentCorrectAnswerIndex = 0;

const questions = [
    {
        question: "Comment dit-on 'chien' en anglais ?",
        options: ["Dog", "Cat", "Horse"],
        correctAnswer: 0
    },
    {
        question: "Que signifie 'book' ?",
        options: ["Stylo", "Chaise", "Livre"],
        correctAnswer: 2
    },
    {
        question: "Quelle est la forme correcte du verbe 'to be' à la 3e personne du singulier ?",
        options: ["Am", "Is", "Are"],
        correctAnswer: 1
    },
    {
        question: "Que signifie 'apple' ?",
        options: ["Orange", "Banane", "Pomme"],
        correctAnswer: 2
    },
    {
        question: "Comment dit-on 'merci' en anglais ?",
        options: ["Sorry", "Please", "Thank you"],
        correctAnswer: 2
    },
    {
        question: "Quelle est la traduction de 'maison' ?",
        options: ["Home", "Mouse", "Horse"],
        correctAnswer: 0
    },
    {
        question: "Quel est le pluriel de 'child' ?",
        options: ["Childs", "Children", "Childes"],
        correctAnswer: 1
    },
    {
        question: "Comment demande-t-on l'heure ?",
        options: ["What time is it?", "Where is the clock?", "When is the time?"],
        correctAnswer: 0
    },
    {
        question: "Que veut dire 'blue' ?",
        options: ["Bleu", "Blanc", "Noir"],
        correctAnswer: 0
    },
    {
        question: "Que signifie 'I don't understand' ?",
        options: ["Je comprends", "Je ne comprends pas", "Je suis d'accord"],
        correctAnswer: 1
    },
    {
        question: "Comment dit-on 'école' en anglais ?",
        options: ["School", "Class", "Lesson"],
        correctAnswer: 0
    },
    {
        question: "Que signifie 'cold' ?",
        options: ["Chaud", "Froid", "Pluie"],
        correctAnswer: 1
    },
    {
        question: "Quel est le prétérit de 'go' ?",
        options: ["Gone", "Goed", "Went"],
        correctAnswer: 2
    },
    {
        question: "Comment dit-on 'voiture' ?",
        options: ["Bus", "Car", "Train"],
        correctAnswer: 1
    },
    {
        question: "Que signifie 'Where are you from?'",
        options: ["Tu vas où ?", "D'où viens-tu ?", "Où es-tu ?"],
        correctAnswer: 1
    },
    {
        question: "Que veut dire 'She is happy' ?",
        options: ["Elle est triste", "Elle est contente", "Elle est malade"],
        correctAnswer: 1
    },
    {
        question: "Comment traduit-on 'chat' ?",
        options: ["Chat", "Cat", "Rat"],
        correctAnswer: 1
    },
    {
        question: "Quel est le comparatif de 'good' ?",
        options: ["Gooder", "More good", "Better"],
        correctAnswer: 2
    },
    {
        question: "Que signifie 'to eat' ?",
        options: ["Boire", "Manger", "Dormir"],
        correctAnswer: 1
    },
    {
        question: "Comment dit-on 'bonjour' en anglais ?",
        options: ["Goodbye", "Good morning", "Good night"],
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
