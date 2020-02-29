var dOut = $('#date');
var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var start, stop, clock;

// Grab the necessary elements from the DOM
start = document.getElementById('start');
stop = document.getElementById('stop');
clock = document.getElementById('clock');
tab = document.getElementById('tab');

// Add event listeners to both buttons
start.addEventListener('click', function() {
    stopwatch('start');
});

stop.addEventListener('click', function() {
    stopwatch('stop');
});

// Define a timer ID for the setInterval function
timerId = null;

rest = false;
count = 0;
// Create the stopwatch
function stopwatch(command) {
    var hours = 0,
        minutes = 0,
        seconds = 0,
        display;

	if (rest && count % 4 == 0){
		minutes = 30;
	}
	else if (rest) {
        minutes = 5;
    } else {
        minutes = 25;
    }

	function makeTwoDigits(number) {
        // display double digits for numbers less than 10
        if (number < 10) {
            return '0' + number;
        }

        return number;
    }

    if (command === 'start') {
        timerId = setInterval(function() {
            seconds--;
            if (seconds === -1) {
                seconds = 59;
                minutes--;
            }

            if (minutes === -1) {
                minutes = 59;
                hours--;
            }

            display =
                makeTwoDigits(hours) + ':' + makeTwoDigits(minutes) + ':' + makeTwoDigits(seconds);
            clock.innerHTML = display;
			tab.innerHTML = display;
            console.log(display);
            if (seconds ==0 &&  minutes == 0 && hours == 0) {
                alert('Time ended!');
                clearInterval(timerId); // stop the timer
				rest = !rest;
				count++;
            }
        }, 1000);
    } else if (command === 'stop') {
        clearInterval(timerId);
    }
}

function update() {
    var date = new Date();
    var dayOfWeek = days[date.getDay()];
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var dateString = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;

    dOut.text(dateString);
}

update();
window.setInterval(update, 1000);