const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const cpuResult = document.querySelector(".cpu_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");

let userScore = 0; // Track user score
let cpuScore = 0;  // Track CPU score

const userScoreDisplay = document.querySelector(".user_score");
const cpuScoreDisplay = document.querySelector(".cpu_score");

const winSound = document.getElementById("win-sound");
const lossSound = document.getElementById("loss-sound");
const drawSound = document.getElementById("draw-sound");
const shakeSound = document.getElementById("shake-sound");

// Add click event for each choice
optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        // Disable buttons to prevent multiple clicks during waiting period
        optionImages.forEach(img => img.classList.add("disabled"));

        // Reset the result visuals
        userResult.src = cpuResult.src = "images/rock.png";
        result.textContent = "Wait...";

        // Play shake sound
        shakeSound.play();

        // Animate choices
        gameContainer.classList.add("start");

        setTimeout(() => {
            // Stop shake sound
            shakeSound.pause();
            shakeSound.currentTime = 0;

            gameContainer.classList.remove("start");

            // Show user selection
            let imageSrc = e.target.querySelector("img").src;
            userResult.src = imageSrc;

            // Random CPU selection
            let randomNumber = Math.floor(Math.random() * 3);
            let cpuImages = [
                "images/rock.png",
                "images/paper.png",
                "images/scissors.png",
            ];
            cpuResult.src = cpuImages[randomNumber];

            let cpuValue = ["R", "P", "S"][randomNumber];
            let userValue = ["R", "P", "S"][index];

            // Determine result
            let outcomes = {
                RR: "Draw",
                RP: "Cpu",
                RS: "You",
                PP: "Draw",
                PR: "You",
                PS: "Cpu",
                SS: "Draw",
                SR: "Cpu",
                SP: "You",
            };
            let outcomeValue = outcomes[userValue + cpuValue];

            // Update the result and play sounds
            if (userValue === cpuValue) {
                result.textContent = "Match Draw";
                drawSound.play();
            } else if (outcomeValue === "You") {
                result.textContent = "You Won!!";
                userScore++;
                winSound.play();
            } else {
                result.textContent = "You Lost!!";
                cpuScore++;
                lossSound.play();
            }

            // Update score display
            userScoreDisplay.textContent = `You: ${userScore}`;
            cpuScoreDisplay.textContent = `CPU: ${cpuScore}`;

            // Re-enable buttons after the round ends
            optionImages.forEach(img => img.classList.remove("disabled"));

        }, 2500);
    });
});

// Restart game button
const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => {
    userScore = 0;
    cpuScore = 0;
    userScoreDisplay.textContent = `You: ${userScore}`;
    cpuScoreDisplay.textContent = `CPU: ${cpuScore}`;
    result.textContent = "Let's Play!!";
    userResult.src = cpuResult.src = "images/rock.png";
});
