let currentLevel = 1;
let wrongAnswerCount = 0; // To track how many times the answer is wrong
let wrongAnswers = []; // Store wrong answers and explanations

const questions = [
    {
        question: `<br><strong>Question 2</strong> What do greenhouse gases from manufacturing and automobiles contribute to?
                   <br><strong>Answer 1</strong>: Rising temperatures. 
                   <br><strong>Answer 2</strong>: Decreasing temperatures.`,
        correctAnswer: "Answer 1",
        explanation: "Greenhouse gases contribute to rising temperatures, leading to global warming.",
        nextLevel: 2
    },
    {
        question: `<br><strong>Question 3:</strong>How does rising temperature impact water consumption in agriculture?
                   <br><strong>Answer 1</strong>:It increases the requirement for irrigation in plants due to more evaporation.   
                   <br><strong>Answer 2</strong>: It decreases the requirement for irrigation in plants (False).`,
        correctAnswer: "Answer 1",
        explanation: "Rising temperatures cause more evaporation, increasing the need for irrigation.",
        nextLevel: 3
    },
    // Add more questions similarly
];

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

    // Check if the answer is correct
    if (answer === questions[currentLevel - 1].correctAnswer) {
        resultContainer.innerHTML = "Correct!";
    } else {
        resultContainer.innerHTML = "Wrong answer.";
        changeFeedbackImage(); // Change the image on a wrong answer
        sinkAvatar(); // Call the function to sink the avatar
        
        // Store the wrong answer and explanation
        wrongAnswers.push({
            question: questions[currentLevel - 1].question,
            explanation: questions[currentLevel - 1].explanation
        });
    }

    // Move to the next question after showing feedback
    currentLevel++;

    // Check if all questions have been answered
    if (currentLevel > questions.length) {
        // Store wrong answers in localStorage before redirecting
        localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));

        // Redirect to the success page after answering all questions
        window.location.href = '../success.html'; // The new page showing completion message
    } else {
        loadQuestion(currentLevel);
    }
}

function loadQuestion(level) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = `<h2 class="Green-Horizon">Level ${level}</h2>
                                    <div class="question">
                                        <p class="answers">${questions[level - 1].question}</p>
                                        <button class="start" onclick="checkAnswer('Answer 1')">Answer A (Correct)</button>
                                        <button class="start" onclick="checkAnswer('Answer 2')">Answer B</button>
                                    </div>`;
    startTimer(timerDuration); // Start the timer for the question
}

function changeFeedbackImage() {
    const feedbackImage = document.getElementById('feedback-image');
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
