// Execute code after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
	// Create vars from associated HTML elements
	var startBtn = document.getElementById('start');
	var questionTitle = document.getElementById('question-title');
	var choicesContainer = document.getElementById('choices');
	var timeElement = document.getElementById('time');
	var finalScoreElement = document.getElementById('final-score');
	var initialsInput = document.getElementById('initials');
	var submitBtn = document.getElementById('submit');
	var startScreen = document.getElementById('start-screen');
	var questionsScreen = document.getElementById('questions');
	var endScreen = document.getElementById('end-screen');
	var feedbackElement = document.getElementById('feedback');
  
	// Quiz variables
	var currentQuestionIndex = 0;
	var timeLeft = 30; // Length of timer in seconds
	var timer;
  
	// Event listener for start button
	startBtn.addEventListener('click', startQuiz);
  
	// Event listeners for choices
	choicesContainer.addEventListener('click', function (event) {
	  if (event.target.matches('button')) {
		checkAnswer(event.target.textContent);
	  }
	});
  
	// Event listener for submit button on end screen
	submitBtn.addEventListener('click', function () {
	  saveScore();
	});
  
	// Array to store quiz questions in questions.js
	var quizQuestions = getQuizQuestions();
  

    //Start quiz
	function startQuiz() {
	  // Hide the start screen and show questions screen
	  startScreen.classList.add('hide');
	  questionsScreen.classList.remove('hide');
  
	  // Start timer
	  startTimer();
  
	  // Display first question
	  displayQuestion();
	}
  
	function displayQuestion() {
	  var currentQuestion = quizQuestions[currentQuestionIndex];
  
	  // Display question
	  questionTitle.textContent = currentQuestion.question;
  
	  // Clear previous questions
	  choicesContainer.innerHTML = '';
  
	  // Display answer choices
        currentQuestion.answers.forEach(function (answer) {
		var choiceBtn = document.createElement('button');
		choiceBtn.textContent = answer;
		choicesContainer.appendChild(choiceBtn);
	  });
	}
    // Function to check the selected answer
	function checkAnswer(selectedChoice) {
        var currentQuestion = quizQuestions[currentQuestionIndex];
  
	    // Check if the selected choice is correct
	    if (selectedChoice === currentQuestion.correctAnswer) {
		    // If correct, show feedback, play audio and go to next question
            showFeedback('Correct!', 'green');
            var correctAudio = new Audio();
            correctAudio.src = "assets/sfx/correct.wav";
            correctAudio.play();
            currentQuestionIndex++;

            if (currentQuestionIndex < quizQuestions.length) {
                // Display next question after a short delay
                setTimeout(displayQuestion, 1000);
            } else {
                // End the quiz if all questions are answered
                endQuiz();
            } 

        return;
	  } 

	    // If incorrect, show feedback, play audio and add penalty time
        showFeedback('Wrong!', 'red');
        var incorrectAudio = new Audio();
            incorrectAudio.src = "assets/sfx/incorrect.wav";
            incorrectAudio.play();
	    timeLeft -= 10;

	    // Check if time has run out
	    if (timeLeft <= 0) {
	        endQuiz();
	    }
	}
  
    // Function to start timer
	function startTimer() {
	  // Update the timer every second
	  timer = setInterval(function () {
		timeLeft--;
		timeElement.textContent = timeLeft;
  
		// Check if time has run out
		if (timeLeft <= 0) {
		  endQuiz();
		}
	  }, 1000);
	}
    
    // Function to end quiz
	function endQuiz() {

	  // Stop the timer
	  clearInterval(timer);
  
	  // Hide questions screen and show end screen
	  questionsScreen.classList.add('hide');
	  endScreen.classList.remove('hide');
  
	  // Display final score
	  finalScoreElement.textContent = timeLeft;
	}
     // Function to show feedback message
	function showFeedback(message, color) {
	  feedbackElement.textContent = message;
	  feedbackElement.style.color = color;
	  feedbackElement.classList.remove('hide');
  
	  // Hide feedback after a short delay
	  setTimeout(function () {
		feedbackElement.classList.add('hide');
	  }, 1000);
	}
    
    // Function to save score and trim spaces off the ends for functionality
	function saveScore() {
		var initials = initialsInput.value.trim();

		// If no input, display prompt
		if (initials === '') {
		  alert('Please enter your initials.');
		  return;
		}
	  
        // Retrieve scores from local storage or initialize an empty array
        var scores = JSON.parse(localStorage.getItem('scores')) || [];
	  
		// Add current score to array
		scores.push({ initials: initials, score: timeLeft });
	  
		// Save updated scores array back to local storage
		localStorage.setItem('scores', JSON.stringify(scores));
	  
		// Display a confirmation message to the user
		alert('Score saved! Initials: ' + initials + ', Score: ' + timeLeft);
	  }
  });