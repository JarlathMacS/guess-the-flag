//Certain logic was used from the following https://github.com/WebDevSimplified/JavaScript-Quiz-App

//Variables
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const introElement = document.getElementById('intro-to-quiz');
const flagContainer = document.getElementById('flag-container');
const answerContainer = document.getElementById('answer-container');
// const answerButtons = document.getElementsByClassName('ans-btn');
const flagElement = document.getElementById('flag-image');
const counterElement = document.getElementById('counter');

let twice;
// let once = {
//     once: true,
// };
let shuffledFlags, currentFlagIndex;

/**
 * Wait for the page to load, then add event listeners
 */
document.addEventListener("DOMContentLoaded", function () {
    console.log('top of DOMContentLoaded');

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentFlagIndex++;
        nextFlag();
    });
    console.log('bottom of DOMContentLoaded');

});

/**
 * Sets up the page to begin the quiz, shuffles the deck of countries data
 */
function startQuiz() {
    console.log('top of startQuiz');
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
    console.log('bottom of startQuiz');

}

/**
 * Calls up next flag from the shuffled deck 
 */
function nextFlag() {
    console.log('top of nextFlag');

    resetQuiz();
    showFlag(shuffledFlags[currentFlagIndex]);
    console.log('bottom of nextFlag');

}



/**
 * Populates the HTML with the flag image, creates the corresponding answer buttons
 */
function showFlag(country) {
    console.log('top of showFlag');

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

        answerContainer.appendChild(button);
        // button.removeEventListener('click', selectAnswer);
    });

    // button.addEventListener('click', selectAnswer, {
    //     once: true
    // });


    // const wrapper = document.getElementById('answer-container');
    answerContainer.addEventListener('click', selectAnswer);
    // answerContainer.addEventListener('click', function (e) {
    //     const isButton = e.target.nodeName === 'BUTTON';
    //     if (isButton) {
    //         selectAnswer(e);

    //     }
    // });
    // handleAnswerButton();

    // function handleAnswerButton(e) {
    //     const isButton = e.target.nodeName === 'BUTTON';
    //     if (isButton) {
    //         // selectAnswer(e);
    //         answerContainer.addEventListener('click', function () {
    //                 selectAnswer(e);

    //             },
    //             once, );
    //     }
    // }
    // once: true,





    // console.log(selectAnswer.target.nodeName);
    //})
    console.log('bottom of showFlag');

}


/**
 * Hides the next button and removes the previous answer buttons and their data
 */
function resetQuiz() {
    console.log('top of resetQuiz');

    nextButton.classList.add('hide');

    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
    }
    console.log('bottom of resetQuiz');

}

/**
 * Takes the button selected as an answer by the user and checks if it is stored as correct,
 * increments scores, assigns relevant classes to the answer buttons, which will cause their background
 * colours to change.  Checks if there are any more countries left in the shuffled deck, if not then restart
 * button is presented 
 */
function selectAnswer(e) {
    console.log('top of selectAnswer');
    console.log(twice);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    // e.target.removeEventListener('click', selectAnswer);


    const isButton = selectedButton.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }

    answerContainer.removeEventListener('click', selectAnswer);

    console.log(selectedButton.nodeName);


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

    // once = false;

    console.log('bottom of selectAnswer');

}

/**
 * Checks the correct boolean of the answer button
 * and adds a correct or incorrect class to the button,
 * causing their background colours to change
 */
function setStatusClass(element, correct) {
    console.log('top of setStatusClass');

    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
    console.log('bottom of setStatusClass');

}

/**
 * Removes any previous designation 
 */
function clearStatusClass(element) {
    console.log('top of clearStatusClass');

    element.classList.remove('correct');
    element.classList.remove('incorrect');
    console.log('bottom of clearStatusClass');

}

/**
 * Resets the score counters to 0 
 */
function clearCounters() {
    console.log('top of clearCounters');

    document.getElementById("correct").innerText = '0';
    document.getElementById("incorrect").innerText = '0';
    console.log('bottom of clearCounters');

}

/**
 * Gets the correct score and increments it by 1
 */
function incrementCorrect() {
    console.log('top of incrementCorrect');

    let oldScore = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldScore;
    console.log('bottom of incrementCorrect');

}

/**
 * Gets the incorrect score and increments it by 1
 */
function incrementIncorrect() {
    console.log('top of incrementIncorrect');

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
    console.log('bottom of incrementIncorrect');

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