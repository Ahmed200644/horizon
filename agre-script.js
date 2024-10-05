let currentLevel = 1;
let wrongAnswerCount = 0; // To track how many times the answer is wrong

const questions = [
    {
        question: `
                   <br><strong>Problem 2</strong>: Hassan and Leila observed that several important crops, such as wheat and rice, are severely impacted by water scarcity. The cause is climate change-induced changes in rainfall patterns. How can they help farmers preserve water? Select the proper solution. 
                   <br><strong>Answer 1</strong>: Promote the use of advanced irrigation methods. 
                   <br><strong>Answer 2</strong>: Request that farmers minimize the area they crop. `,
        correctAnswer: "Answer 1",
        nextLevel: 2
    },
    {
        question: `"
                   <br><strong>Problem 3:</strong> During their travels, Hassan and Leila discovered an agricultural area that had flooded owing to severe rains. Climate change has increased the intensity of rainfall over short periods of time. How can they assist farmers deal with this issue? Select the proper solution. 
                   <br><strong>Answer 1</strong>: Help construct drainage ditches to divert water away from the farms.   
                   <br><strong>Answer 2</strong>: Instruct farmers to shift their crops. 
`,
        correctAnswer: "Answer 1",
        nextLevel: 3
    },
    {
        question: `
                   <br><strong>Problem 4</strong>: Hassan and Leila saw that agricultural fields are becoming degraded due to soil erosion. Deforestation has resulted in insufficient vegetation cover. How can they assist to restore ecological balance? Select the proper solution. 
                   <br><strong>Answer 1</strong>: Plant more trees to increase soil protection.
                   <br><strong>Answer 2</strong>: Collect stones to improve soil quality. `,
        correctAnswer: "Answer 1",
        nextLevel: 4
    },
    {
        question: `
                   <br><strong>Problem 4</strong>: Hassan and Leila went to a seaside location that used to be abundant in freshwater, but they noticed that saltwater had begun to creep in. The major reason for this is the rising sea level caused by polar ice melting. How can they assist the local community in meeting this challenge? Select the proper solution. 
                   <br><strong>Answer 1</strong>: Create barriers that prevent saltwater from entering freshwater regions.
                   <br><strong>Answer 2</strong>:  Consider using seawater for cultivation.`,
        correctAnswer: "Answer 1",
        nextLevel: 5
    },
    {
        question: `
                   <br><strong>Problem 5</strong>: During their travel, Hassan and Leila faced severe winds, which cause soil erosion in agricultural fields. The cause for this is the reduction in vegetative cover. How will they solve this issue? Select the proper solution. 
                   <br><strong>Answer 1</strong>: Plant more trees to lessen wind effect. 
                   <br><strong>Answer 2</strong>: Create concrete walls to safeguard the land.`,
        correctAnswer: "Answer 1",
        nextLevel: 6
    },
   
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

    // Show feedback regardless of whether the answer is correct or wrong
    if (answer === questions[currentLevel - 1].correctAnswer) {
        resultContainer.innerHTML = "Correct!";
    } else {
        resultContainer.innerHTML = "Wrong answer."; // Just inform the user it's wrong
        changeFeedbackImage(); // Change the image on a wrong answer
        sinkAvatar(); // Call the function to sink the avatar
    }

    // Move to the next question after showing feedback
    currentLevel++;
    
    // Check if all questions have been answered
    if (currentLevel > questions.length) {
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
