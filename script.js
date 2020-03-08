
let workMins = 0
let breakMins = 0 
let currentTime = workMins * 60
let maxRound = 0
let roundCount = 0
let type = 'WORK'
let running = true
let stopped = false
let countdown = null
const userClick = document.querySelectorAll('.btn')
const display = document.querySelector('#display')
const chooseTimes = document.querySelector('#start');

// display timers

let timerDisplay = document.createElement('p')
timerDisplay.classList.add('time-left')
wDisplay.appendChild(timerDisplay)

let breakDisplay = document.createElement('p')
breakDisplay.classList.add('time-left')
bDisplay.appendChild(breakDisplay)

let roundDisplay = document.createElement('p')
roundDisplay.classList.add('round')
rDisplay.appendChild(roundDisplay)

//initialise view
const initialiseDisplay  = () =>{
  timerDisplay.textContent = `${workMins}:${'00'}`
  breakDisplay.textContent = `${breakMins}:${'00'}`
  roundDisplay.textContent = roundCount
}

// required to move between clocks
const toggle = () => {
  if (type === 'WORK'){
    type = 'BREAK'
    currentTime = breakMins * 60
  } else {
    type = 'WORK'
    currentTime = workMins * 60
  }
  initialiseDisplay()
  startTimer()
};

// format time and display
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`
  //document.title = display
  if (type ==='WORK'){
    timerDisplay.textContent = display
  } else {
    breakDisplay.textContent = display
  }
};

// main timer function call
const startTimer = () => {
  if (running){
  countdown = setInterval(() => {
    currentTime--
    displayTimeLeft(currentTime)
    if (currentTime <=0){
      if (type ==='WORK'){
        roundCount++
        roundDisplay.textContent = roundCount
        let sound = new Audio("assets/watchalarm.mp3");
        sound.play();        
        roundEnd()
      }
      clearInterval(countdown)
      toggle() 
   }
  },1000);
}
};

// eventlisteners
userClick.forEach(button => {
  button.addEventListener('click', (e) => {
    userChoice = button.id

    if (userChoice == 'startPom') {
      clearInterval(countdown)
      running = true
      maxRound = 4
      workMins = 25
      breakMins = 5
      currentTime = workMins * 60
      initialiseDisplay()
      startTimer()
    } else if (userChoice == 'pause') {
      running = false
      pause()  
    } else if (userChoice == 'reset'){
      clearInterval(countdown)
      type = 'WORK'
      running = false
      stopped = true
      reset()  
    } else if (userChoice == 'restart'){
      running = true
      startTimer()
    }
  })
})

chooseTimes.addEventListener('click', (e) => {
  document.documentElement.style.overflow = 'auto'
  clearInterval(countdown)
  workMins = prompt('Enter work minutes: ')
  breakMins = prompt('Enter break minutes: ')
  maxRound = prompt('Enter number of rounds: ')
  timerDisplay.textContent = `${workMins}:${'00'}`
  breakDisplay.textContent = `${breakMins}:${'00'}`
  currentTime = workMins * 60
  roundCount = 0
  running = true
  startTimer() 
})

const pause = () =>{
  if (!running){
  clearInterval(countdown)
  }
};

const reset = () =>{
    clearInterval(countdown)
    workMins = breakMins = currentTime = 0
    roundCount = 0
    resetTimer()
    initialiseDisplay() 
};

const resetTimer = () =>{
  currentTime=workMins *60
}

const roundEnd = () =>{
  if (roundCount >= maxRound){
    running = false
    stopped = true
    clearInterval(countdown)
    workMins = breakMins = currentTime = 0
    roundCount = 0
    resetTimer()
    initialiseDisplay()         
  }
}

initialiseDisplay()
