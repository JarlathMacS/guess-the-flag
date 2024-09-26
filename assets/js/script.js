const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const introElement = document.getElementById('intro-to-quiz');
const flagContainer = document.getElementById('flag-container');
const answerContainer = document.getElementById('answer-container');
const flagElement = document.getElementById('flag-image');
const counterElement = document.getElementById('counter');

let shuffledFlags, currentFlagIndex;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentFlagIndex++;
    nextFlag();
});

/**
 * Sets up the page to begin the quiz, shuffles the deck of countries data
 */
function startQuiz() {

    startButton.classList.add('hide');
    introElement.classList.add('hide');
    flagContainer.classList.remove('hide');
    answerContainer.classList.remove('hide');

    // Math.random generates random numbers
    shuffledFlags = flagDeck.sort(() => Math.random() - .5);
    //Start with the first flag in the shuffled deck
    currentFlagIndex = 0;

    nextFlag();
    //Removes the previous quiz score
    clearCounters();
    //Set the progress counter 
    counterElement.innerText = '1';

}

/**
 * Calls up next flag from the shuffled deck 
 */
function nextFlag() {

    resetQuiz();
    showFlag(shuffledFlags[currentFlagIndex]);
}

/**
 * Populates the HTML with the flag image, creates the corresponding answer buttons
 */
function showFlag(country) {

    let oldCounter = parseInt(counterElement.innerText);
    counterElement.innerText = ++oldCounter;

    flagElement.innerHTML = country.image;
    country.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.classList.add('btn');
        //Assign the correct button only
        if (choice.correct) {
            button.dataset.correct = choice.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerContainer.appendChild(button);
    });
}

/**
 * Removes the previous answer buttons and their data
 */
function resetQuiz() {

    nextButton.classList.add('hide');

    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
    }
}

/**
 * Takes the button selected as an answer by the user and checks if it is stored as correct,
 * increments scores, assigns relevant classes to the answer buttons, which will cause their background
 * colours to change.  Checks if there are any more countries left in the shuffled deck, if not then restart
 * button is presented 
 */
function selectAnswer(e) {

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    if (correct) {
        incrementCorrect();
    } else {
        incrementIncorrect();
    }

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

/**
 * Checks the correct boolean of the answer button
 * and adds a correct or incorrect class to the button,
 * causing their background colours to change
 */
function setStatusClass(element, correct) {

    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

/**
 * Removes any previous designation 
 */
function clearStatusClass(element) {

    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

/**
 * Resets the score counters to 0 
 */
function clearCounters() {
    document.getElementById("correct").innerText = '0';
    document.getElementById("incorrect").innerText = '0';

}

/**
 * Gets the correct score and increments it by 1
 */
function incrementCorrect() {
    let oldScore = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldScore;

}

/**
 * Gets the incorrect score and increments it by 1
 */
function incrementIncorrect() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

/**
 * Array of (10) country objects
 */
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