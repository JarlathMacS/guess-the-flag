const startButton = document.getElementById('start-button');
const introElement = document.getElementById('intro-to-quiz');
const flagContainer = document.getElementById('flag-container');
const answerContainer = document.getElementById('answer-container');
const flagElement = document.getElementById('flag-image');
const answerButtons = document.getElementById('answer-container');

let shuffledFlags, currentFlagIndex;

// let quizFlags = shuffledFlags(flagDeck);
// currentFlagIndex;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    console.log('started');
    startButton.classList.add('hide');
    introElement.classList.add('hide');
    flagContainer.classList.remove('hide');
    answerContainer.classList.remove('hide');

    shuffledFlags = flagDeck.sort(() => Math.random() - .5);

    // shuffledFlags = (array) => {
    //     let shuffledData = array.slice().sort(() => Math.random() - 0.5);
    //     console.log(shuffledData);
    //     return shuffledData;
    // };

    currentFlagIndex = 0;

    nextFlag();

}

function nextFlag() {
    showFlag(shuffledFlags[currentFlagIndex]);

}

function showFlag(country) {
    flagElement.innerHTML = country.image;
    console.log(flagElement.innerHTML);
}

function selectAnswer() {

}

const flagDeck = [{
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/pl.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'United Kingdom',
                correct: false
            },
            {
                text: 'Panama',
                correct: false
            },
            {
                text: 'Poland',
                correct: true
            }
        ]
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/dj.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'Azerbaijan',
                correct: false
            },
            {
                text: 'Djibouti',
                correct: true
            },
            {
                text: 'Guinea-Bissau',
                correct: false
            }
        ]
    }
];