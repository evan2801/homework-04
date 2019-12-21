var $startBtn = document.querySelector('#start-btn');
var $timeLeft = document.querySelector('#time-left');
var $mainContentContainer = document.querySelector('#main-content');

var timerId;

function startBtnHandler() {
  // prevent a timer running twice
  clearInterval(timerId);
  // reset time
  var secondsLeft = 120;
  // write to page
  $timeLeft.textContent = secondsLeft;

  // set interval and save it to `timerId`
  timerId = setInterval(function() {
    secondsLeft--;
    $timeLeft.textContent = secondsLeft;

    if (secondsLeft === 0) {
      printEndScreen();
    }
  }, 1000);

  // start it at 0 for contactList[0]
  printContactCard(0);
}

function printContactCard(contactIndex) {
  if (contactIndex === contactList.length) {
    alert('out of cards to show!');
    return printEndScreen();
  }

  // get contact card info
  var currentContact = contactList[contactIndex];

  var $containerDiv = document.createElement('div');
  $containerDiv.classList.add('card');
  $containerDiv.setAttribute('data-contact-index', contactIndex);

  var $h2Name = document.createElement('h2');
  $h2Name.textContent = currentContact.question;

  var $h3Answer1 = document.createElement('h3');
  $h3Answer1.textContent = currentContact.answer1;

  var $h3Answer2 = document.createElement('h3');
  $h3Answer2.textContent = currentContact.answer2;

  var $nextButton = document.createElement('button');
  $nextButton.textContent = 'Click to see next contact!';
  $nextButton.classList.add('btn');

  $containerDiv.append($h2Name, $h3Answer1, $h3Answer2, $nextButton);

  $mainContentContainer.textContent = '';
  $mainContentContainer.append($containerDiv);
}



function printEndScreen() {
  // stop timer
  clearInterval(timerId);

  var $containerDiv = document.createElement('div');
  $containerDiv.classList.add('card');

  var $h2 = document.createElement('h2');
  $h2.textContent = 'This is the end screen! Put any other content here.';

  
  $containerDiv.append($h2);

  $mainContentContainer.textContent = '';
  $mainContentContainer.append($containerDiv);
}

function mainContentClickHandler(event) {
  // if HTML element clicked is NOT an element with a class of 'btn', get out of the function
  if (!event.target.matches('.btn')) {
    return false;
  }

  // read textContent from button clicked (i.e. choice selected in a quiz!)
  var buttonClickedText = event.target.textContent;
  console.log(buttonClickedText);

  // get parent element
  var contactCard = event.target.parentNode;
  // get contact card index form data attribute
  var contactCardIndex = parseInt(contactCard.getAttribute('data-contact-index'));
  // get next card's index
  var nextCard = contactCardIndex + 1;
  // print next contact card
  printContactCard(nextCard);
}

$startBtn.addEventListener('click', startBtnHandler);
$mainContentContainer.addEventListener('click', mainContentClickHandler);