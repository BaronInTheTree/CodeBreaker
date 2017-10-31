let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    // initialize the game
    if (answer.value == ""|| attempt.value == 0){
    	setHiddenFields();
    }
    // validate user input
    if (validateInput(input.value)){
    	attempt.value++;
    }
    else return false;

    if (getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    }
    else if (attempt.value >= 10) {
    	setMessage("You Lose! :(");
    	showAnswer(false);
    	showReplay();
    }
    else setMessage("Incorrect, try again.");
}

//set all hidden values at the start of the game
function setHiddenFields(){
	answer.value = Math.floor(Math.random()*10000).toString();
	while (answer.value.length < 4){
		answer.value = "0" + answer.value;
	}
	attempt.value = 0;
}

// set message label
function setMessage(message){
	document.getElementById('message').innerHTML = message;
}

// validate input length and send a warning message if input length not equal to 4
function validateInput(input){
	if (input.length == 4) return true;
	else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

// compare input with answer and generate hints 
function getResults(input){
	var result = '<div class = "row"><span class = "col-md-6">'
			 + input + '</span><div class = "col-md-6">';
	let count = 0;

	for (var i = 0; i < input.length; i++){
		if (input.charAt(i)==answer.value.charAt(i)){
			result += '<span class="glyphicon glyphicon-ok"></span>';
			count++;
		}
		else if (answer.value.indexOf(input.charAt(i)) != -1){
			result += '<span class="glyphicon glyphicon-transfer"></span>';
		}
		else{
			result += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	result += '</div>';
	document.getElementById('results').innerHTML += result;
	if (count == 4) return true;
	else return false;
}

// Show the Answer
function showAnswer(success){
	let code = document.getElementById('code');
	code.innerHTML = answer.value;
	if (success){
		code.className += " success";
	}
	else {
		code.className += " failure";
	}
}

// Replay the game
function showReplay(){
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.dislay = "block";
}













