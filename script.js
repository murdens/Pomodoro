let countdown
let roundCount = 0

let round
let workMins = 25 // document.getElementById("setForm").elements.namedItem("work").value
let breakMins = 5 //document.getElementById("setForm").elements.namedItem("work").value

let currentTime = workMins * 60

let type = 'work'
let running = true

const userClick = document.querySelectorAll('.btn')
const display = document.querySelector('#display')


// display timers
let timerDisplay = document.createElement('h1')
timerDisplay.classList.add('time-left')
display.appendChild(timerDisplay)

let breakDisplay = document.createElement('h1')
breakDisplay.classList.add('time-left')
display.appendChild(breakDisplay)

let timerLabel = document.createElement('p')
timerLabel.classList.add('timerLabel')
display.appendChild(timerLabel)

let roundDisplay = document.createElement('h2')
roundDisplay.classList.add('time-left')
display.appendChild(roundDisplay)


//initialise view
const initialiseDisplay  = () =>{
 
  timerDisplay.textContent = `${workMins}:${'00'}`
  breakDisplay.textContent = `${breakMins}:${'00'}`
  roundDisplay.textContent = 0
}

// required to move between clocks
const toggle = () => {
  if (type === 'work'){
    type = 'break'
    currentTime = breakMins * 60
    console.log(currentTime)
    console.log(type)
  } else {
    type = 'work'
    currentTime = workMins * 60
    console.log(currentTime)
    console.log(type)
  }
  startTimer()
}

// format time and display
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`
  //document.title = display
  if (type ==='work'){
    timerDisplay.textContent = display
    timerLabel.textContent = 'WORK'
  } else {
    breakDisplay.textContent = display
    timerLabel.textContent = type
  }
}

// main timer function call
const startTimer = () => {
  clearInterval(countdown)
  countdown = setInterval(() => {
    currentTime--
    displayTimeLeft(currentTime)
    if (currentTime <=0){
      clearInterval(countdown)
      toggle()  
    }
  },1000)
}
/*
document.setForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const workMins = this.work.value;
  const breakMins = this.break.value;
  const round = this.round.value;
  timer(mins * 60);
  this.reset();
});
*/
// eventlisteners
userClick.forEach(button => {
  button.addEventListener('click', (e) => {
    userChoice = button.id
    console.log(userChoice)

    if (userChoice == 'start') {
      startTimer()
    } else if (userChoice == 'stop') {
      pause()  
    } else if (userChoice == 'reset'){
      reset()
    }
  })
})

// button functions
function pause(){
  clearInterval(countdown)
}

function reset(){
  initialiseDisplay()
  clearInterval(countdown)
}

initialiseDisplay()
//initialiseButtons()