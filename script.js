const enLetters = "abcdefghijklmnopqrstuvwxyz\'.&";
const lettersContainer = document.querySelector('.letters');
const guessed = document.querySelector('.guessed');
const categorySpan = document.querySelector('.status p span');
const drawing = document.querySelector('.drawing');
const loseAlert = document.querySelector('.lose-alert');
const loseAlertBtn = document.querySelector('.lose-alert button');
const winAlert = document.querySelector('.win-alert');
const winAlertBtn = document.querySelector('.win-alert button');
const attemptsSpans = document.querySelectorAll('.attempts .spans span');
let answerSpan = document.createElement('span');;
let guessedSpans;
let champion;
let attempts = 4;

async function classes() {
    const data = await fetch('./champions.json').then((data) => data.json())
    const categories = Object.keys(data);
    const category = categories[Math.floor(Math.random() * categories.length)]
    champion = data[category][Math.floor(Math.random() * data[category].length)];
    
    categorySpan.appendChild(document.createTextNode(category))
    
    Array.from(champion).forEach((letter) => {
        if (letter === ' ') {
            const letterSpan = document.createElement('span');
            letterSpan.setAttribute('class', 'space')
            guessed.appendChild(document.createElement('span').appendChild(letterSpan));
        } else {
            const letterSpan = document.createElement('span');
            guessed.appendChild(document.createElement('span').appendChild(letterSpan));
        }
    })

    guessedSpans = document.querySelectorAll('.guessed span');
    answerSpan.appendChild(document.createTextNode(`The champion is ${champion}`));
    console.log(category, champion, Math.floor(Math.random() * data[category].length));

}

classes()

Array.from(enLetters).forEach((letter) => {
    let letterSpan = document.createElement('span');
    letterSpan.appendChild(document.createTextNode(letter));
    lettersContainer.appendChild(letterSpan)
})

lettersContainer.addEventListener('click', (e) => {
    if (e.target !== lettersContainer) {
        const champArr = Array.from(champion);
        let exists = false;
        let victory = false;

        for (let i = 0; i < champArr.length; i++) {
            if (champArr[i].toLowerCase() === e.target.innerHTML) {
                guessedSpans[i].innerHTML = e.target.innerHTML;
                exists = true;
            }
        }

        if (!exists) {
            attemptsSpans[attempts - 1].setAttribute('class', 'disabled');
            attempts--;
            drawing.classList.add(`attempt-${attempts + 1}`);
        } else {
            e.target.classList.add('disabled')
        }

        if(attempts === 0) {
            setTimeout(() => {
                loseAlert.style.display = 'flex';
                document.querySelector('.lose-alert p').after(answerSpan);
                document.querySelector('.container').classList.add('lose-alert-bg');
            }, 500);
        }

        for (span of guessedSpans) {
            if(span.innerHTML !== '') {
                victory = true;
            } else {
                victory = false;
                break;
            }
        }

        if(victory) {
            setTimeout(() => {
                winAlert.style.display = 'flex';
                document.querySelector('.container').classList.add('win-alert-bg');
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

