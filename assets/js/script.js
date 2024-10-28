//Certain logic was used from the following https://github.com/WebDevSimplified/JavaScript-Quiz-App

//Variables
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const introElement = document.getElementById('intro-to-quiz');
const flagContainer = document.getElementById('flag-container');
const flagImage = document.getElementById('flag-image');
const imgElement = document.createElement('img');
const answerContainer = document.getElementById('answer-container');
const counterElement = document.getElementById('counter');
const correctCounterElement = document.getElementById('correct');
const incorrectCounterElement = document.getElementById('incorrect');

let shuffledFlags, currentFlagIndex;

/**
 * Wait for the page to load, then add event listeners
 */
document.addEventListener("DOMContentLoaded", function () {
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentFlagIndex++;
        nextFlag();
    });
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

    // Set image source dynamically
    imgElement.src = country.image;
    imgElement.alt = 'A country\'s flag';
    // Add image to DOM
    flagImage.appendChild(imgElement);

    country.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.classList.add('btn');
        //Assign the correct button only
        if (choice.correct) {
            button.dataset.correct = choice.correct;
        }
        answerContainer.appendChild(button);
    });
    answerContainer.addEventListener('click', selectAnswer);
}

/**
 * Hides the next button and removes the previous answer buttons and their data
 */
function resetQuiz() {
    renderFlag();
    nextButton.classList.add('hide');

    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
    }
}

function renderFlag() {
    // Initialize the image source
    imgElement.src = 'assets/images/flags/un.jpg';
    imgElement.alt = 'Display of flags';
    imgElement.id = 'flag';
    imgElement.classList.add('flag');
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
    const isButton = selectedButton.nodeName === 'BUTTON';

    // Prevent non-button clicks
    if (!isButton) {
        return;
    }
    // Prevent multiple clicks
    answerContainer.removeEventListener('click', selectAnswer);

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
    correctCounterElement.innerText = '0';
    incorrectCounterElement.innerText = '0';
}

/**
 * Gets the correct score and increments it by 1
 */
function incrementCorrect() {
    let oldScore = parseInt(correctCounterElement.innerText);
    correctCounterElement.innerText = ++oldScore;
}

/**
 * Gets the incorrect score and increments it by 1
 */
function incrementIncorrect() {
    let oldScore = parseInt(incorrectCounterElement.innerText);
    incorrectCounterElement.innerText = ++oldScore;
}

/**
 * Array of (10) country objects
 */
const flagDeck = [{

        image: `assets/images/flags/pl.jpg`,
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
        image: `assets/images/flags/dj.jpg`,
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
        image: `assets/images/flags/aw.jpg`,
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
        image: `assets/images/flags/gh.jpg`,
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
        image: `assets/images/flags/mz.jpg`,
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
        image: `assets/images/flags/pm.jpg`,
        choices: [{
                text: 'Wallis and Futuna',
                correct: false
            },
            {
                text: 'Peru',
                correct: false
            },
            {
                text: 'Saint Pierre and Miquelon',
                correct: true
            }
        ]
    },
    {
        image: `assets/images/flags/bl.jpg`,
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
        image: `assets/images/flags/ar.jpg`,
        choices: [{
                text: 'Argentina',
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
        image: `assets/images/flags/zm.jpg`,
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
        image: `assets/images/flags/rw.jpg`,
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