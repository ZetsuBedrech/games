let currentQuestion = 0;
let currentCorrectAnswerIndex = 0; // Index de la bonne réponse après mélange

const questions = [
    {
      question: "Quel est le livre sacré des chrétiens ?",
      options: ["La Torah", "Le Coran", "La Bible"],
      correctAnswer: 2
    },
    {
      question: "Qui est considéré comme le fils de Dieu dans le christianisme ?",
      options: ["Abraham", "Moïse", "Jésus"],
      correctAnswer: 2
    },
    {
      question: "Combien de testaments contient la Bible chrétienne ?",
      options: ["1", "2", "3"],
      correctAnswer: 1
    },
    {
      question: "Quel événement célèbre-t-on à Noël ?",
      options: ["La résurrection de Jésus", "La naissance de Jésus", "La montée au ciel de Jésus"],
      correctAnswer: 1
    },
    {
      question: "Quel événement célèbre-t-on à Pâques ?",
      options: ["La naissance de Jésus", "La crucifixion de Jésus", "La résurrection de Jésus"],
      correctAnswer: 2
    },
    {
      question: "Où Jésus est-il né selon la Bible ?",
      options: ["Nazareth", "Bethléem", "Jérusalem"],
      correctAnswer: 1
    },
    {
      question: "Quel apôtre a trahi Jésus ?",
      options: ["Pierre", "Jean", "Judas"],
      correctAnswer: 2
    },
    {
      question: "Combien y avait-il d’apôtres ?",
      options: ["10", "12", "14"],
      correctAnswer: 1
    },
    {
      question: "Quel est le symbole principal du christianisme ?",
      options: ["L’étoile", "Le croissant", "La croix"],
      correctAnswer: 2
    },
    {
      question: "Quel jour les chrétiens vont-ils traditionnellement à l’église ?",
      options: ["Vendredi", "Samedi", "Dimanche"],
      correctAnswer: 2
    },
    {
      question: "Quel est le nom du chef de l'Église catholique ?",
      options: ["Le prêtre", "L'évêque", "Le pape"],
      correctAnswer: 2
    },
    {
      question: "Dans quelle ville vit le pape ?",
      options: ["Paris", "Rome", "Vatican"],
      correctAnswer: 2
    },
    {
      question: "Que signifie le mot 'Évangile' ?",
      options: ["Bonne nouvelle", "Parole divine", "Foi chrétienne"],
      correctAnswer: 0
    },
    {
      question: "Combien d’Évangiles principaux y a-t-il dans le Nouveau Testament ?",
      options: ["2", "4", "6"],
      correctAnswer: 1
    },
    {
      question: "Quel est le premier livre de la Bible ?",
      options: ["Genèse", "Exode", "Psaumes"],
      correctAnswer: 0
    },
    {
      question: "Que signifie le mot 'chrétien' ?",
      options: ["Disciple de Jésus", "Croyant", "Sauveur"],
      correctAnswer: 0
    },
    {
      question: "Qui a construit l'arche pour survivre au déluge ?",
      options: ["Abraham", "Moïse", "Noé"],
      correctAnswer: 2
    },
    {
      question: "Quel roi a combattu Goliath ?",
      options: ["Salomon", "David", "Saül"],
      correctAnswer: 1
    },
    {
      question: "Quel commandement dit 'Tu ne tueras point' ?",
      options: ["Le 1er", "Le 6e", "Le 10e"],
      correctAnswer: 1
    },
    {
      question: "Quel est le nom du dernier livre de la Bible ?",
      options: ["Psaumes", "Apocalypse", "Actes"],
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
