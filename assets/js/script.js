const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const introElement = document.getElementById('intro-to-quiz');
const flagContainer = document.getElementById('flag-container');
const answerContainer = document.getElementById('answer-container');
const flagElement = document.getElementById('flag-image');
// const answerButtons = document.getElementById('answer-container');

let shuffledFlags, currentFlagIndex;

// let quizFlags = shuffledFlags(flagDeck);
// currentFlagIndex;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentFlagIndex++;
    nextFlag();
});


function startQuiz() {
    // console.log('started');
    startButton.classList.add('hide');
    introElement.classList.add('hide');
    flagContainer.classList.remove('hide');
    answerContainer.classList.remove('hide');

    shuffledFlags = flagDeck.sort(() => Math.random() - .5);



    currentFlagIndex = 0;

    nextFlag();

}

function nextFlag() {
    resetQuiz();
    showFlag(shuffledFlags[currentFlagIndex]);

}

function showFlag(country) {
    flagElement.innerHTML = country.image;
    country.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.classList.add('btn');

        if (choice.correct) {
            button.dataset.correct = choice.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerContainer.appendChild(button);


    });
}

function resetQuiz() {
    nextButton.classList.add('hide');

    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);

    }

}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    //   setStatusClass(document.body, correct)
    Array.from(answerContainer.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledFlags.length > currentFlagIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart ->';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
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
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/aw.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'Cape Verde',
                correct: false
            },
            {
                text: 'Ethiopia',
                correct: false
            },
            {
                text: 'Aruba',
                correct: true
            }
        ]
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/gh.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'Ghana',
                correct: true
            },
            {
                text: 'Kuwait',
                correct: false
            },
            {
                text: 'Marshall Islands',
                correct: false
            }
        ]
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/mz.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'Mozambique',
                correct: true
            },
            {
                text: 'Paraguay',
                correct: false
            },
            {
                text: 'Laos',
                correct: false
            }
        ]
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/pm.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'Wallis and Futuna',
                correct: false
            },
            {
                text: 'Liechtenstein',
                correct: false
            },
            {
                text: 'Saint Pierre and Miquelon',
                correct: true
            }
        ]
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/bl.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'South Georgia',
                correct: false
            },
            {
                text: 'Saint Barthélemy',
                correct: true
            },
            {
                text: 'Niue',
                correct: false
            }
        ]
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/am.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'Armenia',
                correct: true
            },
            {
                text: 'Seychelles',
                correct: false
            },
            {
                text: 'Côte d\'Ivoire',
                correct: false
            }
        ]
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/zm.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'Togo',
                correct: false
            },
            {
                text: 'Gabon',
                correct: false
            },
            {
                text: 'Zambia',
                correct: true
            }
        ]
    },
    {
        image: `
        <div id="flag-image">
        <img id="flag" class="flag" src="assets/images/flags/rw.jpg" alt="country flag">
        </div>
        `,
        choices: [{
                text: 'Macau',
                correct: false
            },
            {
                text: 'Rwanda',
                correct: true
            },
            {
                text: 'Timor-Leste',
                correct: false
            }
        ]
    }
];