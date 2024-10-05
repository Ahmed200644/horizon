    let currentLevel = 1;
    let wrongAnswerCount = 0; // To track how many times the answer is wrong

    const questions = [
        {
            question: `Soad, the manager of a big beach hotel, was considering potential strategies to shield her establishment from the impending calamity. She knew the sea had already begun to advance, and four adjacent hotels, including hers, were at risk of flooding.
            
                    <br><strong>Question 2</strong>: How was Soad planning to safeguard her hotel?
                    <br><strong>Answer 1</strong>: She was considering different strategies to safeguard her hotel from flooding caused by increasing sea levels.   
                    <br><strong>Answer 2</strong>: Soad planned to install giant fans along the shore to blow the water back into the sea and prevent flooding.`,
            correctAnswer: "Answer 1",
            nextLevel: 2
        },
        {
            question: `"What can we do?" Soad pondered as she examined the coastline maps. Alexandria's beaches were suffering from significant erosion, with an average of 20 cm of sand lost each year. The development of the Corniche Highway has exacerbated the situation by depriving the beaches of vital sediment.

                    <br><strong>Question 3:</strong> Why is erosion worsening on Alexandria's beaches?

                    <br><strong>Answer 1</strong>: Erosion is exacerbated by human activity such as the construction of the Corniche Highway, which deprives beaches of critical sediments.   
                    <br><strong>Answer 2</strong>: Erosion is worsening due to natural processes and climate change.`,
            correctAnswer: "Answer 1",
            nextLevel: 3
        },
        {
            question: `What can we do? Soad pondered as she examined the coastline maps. Alexandria's beaches were suffering from significant erosion, with an average of 20 cm of sand lost each year. The development of the Corniche Highway has exacerbated the situation by depriving the beaches of vital sediment.
            
                    <br><strong>Question</strong>: Why is erosion worsening on Alexandria's beaches?
                    <br><strong>Answer 1</strong>: Erosion is exacerbated by human activity such as the construction of the Corniche Highway, which deprives beaches of critical sediments.
                    <br><strong>Answer 2</strong>: Erosion is worsening due to natural processes and climate change.`,
            correctAnswer: "Answer 1",
            nextLevel: 4
        },
        {
            question: `Soad wasn't the only one confronting these issues; the entire city was struggling. The causes were clear: climate change was melting glaciers and warming ocean waters, resulting in increasing sea levels. Human activities, such as construction of the Corniche Highway, had aggravated the erosion situation.
        
                    <br><strong>Question</strong>: What were the root reasons for Alexandria's problems?
                    <br><strong>Answer 1</strong>: Climate change and human activity, such as the construction of the Corniche Highway.
                    <br><strong>Answer 2</strong>: The problems were caused by a lack of trees and greenery in Alexandria.`,
            correctAnswer: "Answer 1",
            nextLevel: 5
        },
        {
            question: `Soad wasn't the only one confronting these issues; the entire city was struggling. The causes were clear: climate change was melting glaciers and warming ocean waters, resulting in increasing sea levels. Human activities, such as construction of the Corniche Highway, had aggravated the erosion situation.
        
                    <br><strong>Question</strong>: What were the root reasons for Alexandria's problems?
                    <br><strong>Answer 1</strong>: Climate change and human activity, such as the construction of the Corniche Highway.
                    <br><strong>Answer 2</strong>: The problems were caused by a lack of trees and greenery in Alexandria.`,
            correctAnswer: "Answer 1",
            nextLevel: 6
        },
        {
            question: `Everyone eventually recognized how important awareness was. Soad took part in awareness programs for hotel guests, informing them about climate concerns and how they might help decrease the effect.
        
                    <br><strong>Question</strong>: How did Soad contribute to raising awareness about climate change risks?
                    <br><strong>Answer 1</strong>: She took part in awareness programs for hotel guests, informing them of the hazards and how to mitigate them.
                    <br><strong>Answer 2</strong>: Soad contributed by organizing beach parties to promote tourism.`,
            correctAnswer: "Answer 1",
            nextLevel: 7
        },
        {
            question: `Finally, the inhabitants of Alexandria realized that their future hinged on what they could accomplish right now. They prepared for the problems ahead by increasing infrastructure, strengthening coastlines, and raising awareness.
        
                    <br><strong>Question</strong>: What can the Alexandria community do to prepare for future challenges?
                    <br><strong>Answer 1</strong>: They can enhance infrastructure, strengthen coastlines, and raise awareness of climate hazards.
                    <br><strong>Answer 2</strong>: They can focus solely on promoting tourism and recreational activities.`,
            correctAnswer: "Answer 1",
            nextLevel: 8
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
