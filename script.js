
let workMins = 1 // document.getElementById("setForm").elements.namedItem("work").value
let breakMins = 2 //document.getElementById("setForm").elements.namedItem("work").value

let currentTime = workMins * 60

let roundCount = 0

let type = 'WORK'
let running = true
let stopped = false
let countdown = null

const userClick = document.querySelectorAll('.btn')
const display = document.querySelector('#display')


// display timers

let timerDisplay = document.createElement('p')
timerDisplay.classList.add('time-left')
wDisplay.appendChild(timerDisplay)

let breakDisplay = document.createElement('p')
breakDisplay.classList.add('time-left')
bDisplay.appendChild(breakDisplay)

let roundDisplay = document.createElement('p')
roundDisplay.classList.add('time-left')
rDisplay.appendChild(roundDisplay)


//initialise view
const initialiseDisplay  = () =>{
  timerDisplay.textContent = `${workMins}:${'00'}`
  breakDisplay.textContent = `${breakMins}:${'00'}`
  roundDisplay.textContent = 0
}

//const setTimes = () =>{
  //let currentTime = prompt('Input work minutes');
  //let breakmins = prompt('Input break minutes')
  //startTimer(currentTime)
//}

// required to move between clocks
const toggle = () => {
  if (type === 'WORK'){
    type = 'BREAK'
    currentTime = breakMins * 60
  } else {
    type = 'WORK'
    currentTime = workMins * 60
  }
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

    if (userChoice == 'start') {
      running = true
      startTimer()
    } else if (userChoice == 'pause') {
      running = false
      pause()  
    } else if (userChoice == 'reset'){
      type = 'WORK'
      running = false
      stopped = true
      reset()  
    }
  })
})

const pause = () =>{
  if (!running){
  clearInterval(countdown)
  }
};

const reset = () =>{
      clearInterval(countdown)
    resetTimer()
    initialiseDisplay() 
};

const resetTimer = () =>{
  currentTime=workMins *60
 }
 
initialiseDisplay()

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