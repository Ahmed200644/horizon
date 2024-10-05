let currentLevel = 1;
let wrongAnswerCount = 0; // To track how many times the answer is wrong

const questions = [
    {
        question: "What is the main environmental issue in Alexandria?",
        correctAnswer: "correct",
        nextLevel: 2
    },
    {
        question: "What is the population of Alexandria?",
        correctAnswer: "correct",
        nextLevel: 3
    },
    {
        question: "What is the famous landmark in Alexandria?",
        correctAnswer: "correct",
        nextLevel: 4
    }
];

// Array of images for wrong answers
const wrongAnswerImages = [
    "../imgs/lvl-11.png",
    "../imgs/lvl-2.png",
    "../imgs/lvl-3.png",
    "../imgs/lvl-4.png",
    "../imgs/dead-girl-final.png"
];
let wrongAnswerIndex = 0; // To track which image to show on wrong answers
const timerDuration = 30; // Timer duration in seconds
let timer; // Variable to hold the timer interval

function checkAnswer(answer) {
    const resultContainer = document.getElementById('result');

    // Clear the timer when an answer is checked
    clearInterval(timer);

    // Show feedback regardless of whether the answer is correct or wrong
    if (answer === questions[currentLevel - 1].correctAnswer) {
        resultContainer.innerHTML = "Correct!";
    } else {
        resultContainer.innerHTML = "Wrong answer.";
        changeFeedbackImage(); // Change the image on a wrong answer
        sinkAvatar(); // Call the function to sink the avatar
    }

    // Move to the next question after showing feedback
    currentLevel++;
    
    if (currentLevel <= questions.length) {
        loadQuestion(currentLevel);
    } else {
        // Redirect to the success page after completion
        window.location.href = '../success.html'; // The new page showing completion message
    }
}

function loadQuestion(level) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = `<h2 class="Green-Horizon">Level ${level}</h2>
                                    <div class="question">
                                        <p class="answers">${questions[level - 1].question}</p>
                                        <button class="start" onclick="checkAnswer('correct')">Answer A (Correct)</button>
                                        <button class="start" onclick="checkAnswer('wrong')">Answer B</button>
                                    </div>`;
    startTimer(timerDuration); // Start the timer for the question
}

function changeFeedbackImage() {
    const feedbackImage = document.getElementById('feedback-image');
    
    // Change to the next wrong answer image
    feedbackImage.src = wrongAnswerImages[wrongAnswerIndex];
    wrongAnswerIndex = (wrongAnswerIndex + 1) % wrongAnswerImages.length; // Cycle through images
}

function startTimer(duration) {
    const resultContainer = document.getElementById('result');
    const timerContainer = document.getElementById('timer');
    timerContainer.innerHTML = `Time left: ${duration} seconds`;

    let remainingTime = duration; // Store remaining time
    timer = setInterval(() => {
        remainingTime--;
        timerContainer.innerHTML = `Time left: ${remainingTime} seconds`;

        if (remainingTime <= 0) {
            clearInterval(timer);
            resultContainer.innerHTML = "Time's up!";
            checkAnswer('wrong'); // Mark the answer as wrong when time is up
        }
    }, 1000);
}

function sinkAvatar() {
    const avatar = document.getElementById('avatar');
    wrongAnswerCount++;
    let sinkPercentage = wrongAnswerCount * 10; // Calculate sinking percentage

    // Move avatar down by increasing the 'top' property
    avatar.style.top = `${sinkPercentage}%`;
}

// Load the first question initially
loadQuestion(currentLevel);


