let currentQuestion = 0;
let currentCorrectAnswerIndex = 0; // Index de la bonne réponse après mélange

const questions = [
    {
        question: "How do you say 'bonjour' in English?",
        options: ["Hello", "Goodbye", "Good morning"],
        correctAnswer: 0
    },
    {
        question: "What is the plural form of 'child'?",
        options: ["Children", "Childs", "Childer"],
        correctAnswer: 0
    },
    {
        question: "What is the past tense of 'go'?",
        options: ["Went", "Goes", "Gone"],
        correctAnswer: 0
    },
    {
        question: "Which word means 'a large body of water'?",
        options: ["Ocean", "Mountain", "River"],
        correctAnswer: 0
    },
    {
        question: "What does the expression 'break a leg' mean?",
        options: ["Good luck", "Be careful", "Don't make noise"],
        correctAnswer: 0
    },
    {
        question: "Which one is a synonym of 'happy'?",
        options: ["Sad", "Joyful", "Angry"],
        correctAnswer: 1
    },
    {
        question: "What is the opposite of 'up'?",
        options: ["Down", "Right", "Left"],
        correctAnswer: 0
    },
    {
        question: "Which word refers to 'a person who writes books'?",
        options: ["Writer", "Reader", "Editor"],
        correctAnswer: 0
    },
    {
        question: "How do you say 'merci' in English?",
        options: ["Thank you", "Please", "Sorry"],
        correctAnswer: 0
    },
    {
        question: "What is the capital of the United Kingdom?",
        options: ["London", "New York", "Paris"],
        correctAnswer: 0
    },
    {
        question: "How do you ask someone's name in English?",
        options: ["What is your name?", "How old are you?", "Where do you live?"],
        correctAnswer: 0
    },
    {
        question: "Which one is a correct sentence in English?",
        options: ["She can sings well", "She sings well", "She well sings"],
        correctAnswer: 1
    },
    {
        question: "What is the opposite of 'big'?",
        options: ["Large", "Small", "Huge"],
        correctAnswer: 1
    },
    {
        question: "Which word means 'to move your body to music'?",
        options: ["Sing", "Dance", "Draw"],
        correctAnswer: 1
    },
    {
        question: "What does 'to feel under the weather' mean?",
        options: ["To feel sick", "To feel happy", "To feel sad"],
        correctAnswer: 0
    },
    {
        question: "Which verb is used to express possession?",
        options: ["Have", "Do", "Go"],
        correctAnswer: 0
    },
    {
        question: "What is the plural of 'foot'?",
        options: ["Feet", "Foots", "Feets"],
        correctAnswer: 0
    },
    {
        question: "Which word is an adjective?",
        options: ["Quickly", "Quick", "Quickness"],
        correctAnswer: 1
    },
    {
        question: "Which sentence is in the future tense?",
        options: ["I am going to the park", "I go to the park", "I went to the park"],
        correctAnswer: 0
    },
    {
        question: "What does 'to make ends meet' mean?",
        options: ["To manage financially", "To travel around the world", "To make friends"],
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
