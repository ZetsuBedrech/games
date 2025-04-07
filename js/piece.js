const start = document.querySelector('#start');
const result = document.querySelector('#result');

start.addEventListener('click', () => {
    randommath = Math.floor(Math.random() * 2);
    if (randommath == 0) {
        result.textContent = 'Résultat : Pile';
    } else {
        result.textContent = 'Résultat : Face';
    }
});
