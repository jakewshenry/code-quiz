// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {

	// Get the necessary HTML elements
	var highscoresList = document.getElementById('highscores');
	var clearBtn = document.getElementById('clear');

    var scores = JSON.parse(localStorage.getItem('scores')) || [];

    scores.sort(function (a, b) {
        return b.score - a.score;
    });

    scores.forEach(function (score) {
		var li = document.createElement('li');
		li.textContent = score.initials + ' ' + score.score;
		highscoresList.appendChild(li);
    });

    clearBtn.addEventListener('click', function (event) {

        highscoresList.innerHTML = '<p>High scores cleared!</p>';

        localStorage.removeItem('scores');
    });
});