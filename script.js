const enLetters = "qwertyuiopasdfghjklzxcvbnm\'.&";
const lettersContainer = document.querySelector('.letters');
const guessed = document.querySelector('.guessed');
const categorySpan = document.querySelector('.status p span');
const drawing = document.querySelector('.drawing');
const loseAlert = document.querySelector('.lose-alert');
const loseAlertBtn = document.querySelector('.lose-alert button');
const winAlert = document.querySelector('.win-alert');
const winAlertBtn = document.querySelector('.win-alert button');
const attemptsSpansContainer = document.querySelector('.attempts .spans');
const correct = document.querySelector('#correct');
const wrong = document.querySelector('#wrong');
const win = document.querySelector('#win');
const lose = document.querySelector('#lose');
let answerSpan = document.createElement('span');;
let guessedSpans;
let champion;
let attempts = 4;

// Creating attempts' spans
for (let i = 0; i < attempts; i++) {
    const span = document.createElement('span');
    attemptsSpansContainer.appendChild(span);
}

const attemptsSpans = document.querySelectorAll('.attempts .spans span');

// Getting data and creating adaptive spans function
async function classes() {
    const data = await fetch('./champions.json').then((data) => data.json())
    const categories = Object.keys(data);
    const category = categories[Math.floor(Math.random() * categories.length)]
    champion = data[category][Math.floor(Math.random() * data[category].length)];
    // Specifying the picked category on the page
    categorySpan.appendChild(document.createTextNode(category))
    // Creating a number of spans equal to the word letters
    Array.from(champion).forEach((letter) => {
        if (letter === ' ') {
            // if the letter is a space add the "space" class
            const letterSpan = document.createElement('span');
            letterSpan.setAttribute('class', 'space')
            guessed.appendChild(document.createElement('span').appendChild(letterSpan));
        } else {
            const letterSpan = document.createElement('span');
            guessed.appendChild(document.createElement('span').appendChild(letterSpan));
        }
    })
    // Assigning the spans to the guessed span variable
    guessedSpans = document.querySelectorAll('.guessed span');
    // Assigning the word to the answer span as an answer
    answerSpan.appendChild(document.createTextNode(`The champion is ${champion}`));
    console.log(category, champion, Math.floor(Math.random() * data[category].length));

}

classes();
// Creating the on-screen keyboard letters
Array.from(enLetters).forEach((letter) => {
    let letterSpan = document.createElement('span');
    letterSpan.appendChild(document.createTextNode(letter));
    lettersContainer.appendChild(letterSpan)
});
// Adding an event listener to the letters container that only fires if the clicked element is its children (letters spans)
lettersContainer.addEventListener('click', (e) => {
    if (e.target !== lettersContainer) {
        const champArr = Array.from(champion);
        let exists = false;
        let victory = false;
        // Checking if the clicked letters exists in the word to append it to the appropirate span
        for (let i = 0; i < champArr.length; i++) {
            if (champArr[i].toLowerCase() === e.target.innerHTML) {
                guessedSpans[i].innerHTML = e.target.innerHTML;
                exists = true;
            }
        }
        // If the word doesn't contain the letter reduce the attempts by 1 and display a part of the drawing
        if (!exists) {
            attemptsSpans[attempts - 1].setAttribute('class', 'disabled');
            attempts--;
            drawing.classList.add(`attempt-${attempts + 1}`);
            wrong.load();
            wrong.play();
            document.querySelector('.container').classList.add('wrong-flash');
            setTimeout(() => document.querySelector('.container').classList.remove('wrong-flash'), 100);
        } else {
            // If the word contains the letter, the letter is disabled after getting clicked
            e.target.classList.add('disabled');
            correct.load();
            correct.play();
        }
        // On lose, display the lose overlay after 0.5s
        if(attempts === 0) {
            setTimeout(() => {
                loseAlert.style.display = 'flex';
                document.querySelector('.lose-alert p').after(answerSpan);
                document.querySelector('.container').classList.add('lose-alert-bg');
                lose.load();
                lose.play();
            }, 500);
        }
        // Checking if each span of the guessing spans contains a letter, if so, it's a win
        for (span of guessedSpans) {
            if(span.innerHTML !== '' || span.classList.contains('space')) {
                victory = true;
            } else {
                victory = false;
                break;
            }
        }
        // On victory, display the win overlay after 0.5s
        if(victory) {
            setTimeout(() => {
                winAlert.style.display = 'flex';
                document.querySelector('.container').classList.add('win-alert-bg');
                win.load();
                win.play();
            }, 500)
        }
    }
})

loseAlertBtn.addEventListener('click', () => {
    location.reload() 
})

winAlertBtn.addEventListener('click', () => {
    location.reload() 
})

