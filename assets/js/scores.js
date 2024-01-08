// Execute code after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

	// Create vars from associated HTML elements
	var highscoresList = document.getElementById('highscores');
	var clearBtn = document.getElementById('clear');

    // Retrieve scores from local storage or initialize an empty array
    var scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Sort scores in descending order
    scores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Iterate through scores and display on the highscores list
    scores.forEach(function (score) {
		var li = document.createElement('li');
		li.textContent = score.initials + ' ' + score.score;
		highscoresList.appendChild(li);
    });

    // Event listener for the clear button
    clearBtn.addEventListener('click', function (event) {

        // Clear the highscores list on the page
        highscoresList.innerHTML = '<p>High scores have been wiped!</p>';

        // Remove scores from local storage
        localStorage.removeItem('scores');
    });
});