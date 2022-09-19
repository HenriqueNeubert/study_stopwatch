const form = document.getElementById('form') 

const timer = document.getElementById('timer') 
const inputNext = document.getElementById('next') 
const inputName = document.getElementById('name')
const inputStop = document.getElementById('stop') 
const inputReset = document.getElementById('reset') 
const inputSubmit = document.getElementById('submit') 
const inputResume = document.getElementById('resume') 
const inputStart = document.getElementById('initial')
const inputNewTime = document.getElementById('newTime') 

const boxInputName = document.getElementById('boxInputName') 

let cron
const timeHourElem = document.getElementById('hour') 
const timeMinuteElem = document.getElementById('minute')
const timeSecondElem = document.getElementById('second') 
const timeMillisecondElem = document.getElementById('millisecond') 

let timeHour = 0
let timeMinute = 0
let timeSecond = 0
let timeMillisecond = 0

hide(timer)
hide(inputStop)
hide(inputStop)
hide(inputStart)
hide(inputReset)
hide(inputSubmit)
hide(inputResume)
hide(inputNewTime)

function HandleSubmit(event)
{
  event.preventDefault();
  const data = handleData();  
  handleInsertDadaBase(data);  
  hide(inputReset)
  hide(inputSubmit)
  hide(inputResume)
  show(inputNewTime)
}

function handleInsertDadaBase(data)
{
  const arr = handleGetDataBase();
  arr.push(data);

  const newData = JSON.stringify(arr);
  localStorage.setItem('Atletas', newData)  
}

function handleGetDataBase()
{
  const data = localStorage.getItem('Atletas');
  if(data){
    return JSON.parse(data);
  }

  return []
} 

function handleData()
{
  const objItem = new Object();
  objItem.name = saveDataName();
  objItem.time = saveDataTime();
  
  return objItem
}

//*SAVE DATA
function saveDataTime()
{    
  return{
    horas: timeHourElem.innerText,  
    minutos: timeMinuteElem.innerText,
    segundos: timeSecondElem.innerText,
    millisegundos: timeMillisecondElem.innerText,
  }  
}

function saveDataName()
{  
  let nameData = inputName.value  
  document.getElementById('showName').innerText = nameData //!provisorio
  return nameData
}
//*SAVE DATA

//* FOR TIMER --- START
function handleTimer()
{
    if ((timeMillisecond += 10) == 1000) {
      timeMillisecond = 0;
      timeSecond++;
    }
    if (timeSecond == 60) {
      timeSecond = 0;
      timeMinute++;
    }
    if (timeMinute == 60) {
      timeMinute = 0;
      timeHour++;
    }
    timeHourElem.innerText = returnData(timeHour);
    timeMinuteElem.innerText = returnData(timeMinute);
    timeSecondElem.innerText = returnData(timeSecond);
    timeMillisecondElem.innerText = returnData(timeMillisecond);
  }
  
  function returnData(input) {
    return input >= 10 ? input : `0${input}`
}
//* FOR TIMER --- END

//* FOR BOTTONS --- START
function handleNext()
{     
  if(validation() === true){  
    saveDataName() 
    hide(boxInputName)
    hide(inputNext)
    handleResetTime()     
    show(timer)
    show(inputStart)      
  }  
}

function handleNewTime()
{
  
}

function handleStart()
{
  show(reset)
  show(inputStop)
  hide(inputStart)
  // handlePause();///!IMPORTANTE
  hide(inputResume)
  //? setInterval = a cada 10 milissegundos(
  //? pois a cada 1 milissegundo trava dependendo do navegador).
  cron = setInterval(() => { handleTimer(); }, 10)
}

function handlePause()
{
  hide(inputStop)
  show(inputResume)
  show(inputSubmit)
  //? para não termos vários timers funcionando ao fundo
  clearInterval(cron); 
}

function handleResetTime()
{  
  show(inputStart)
  hide(inputResume)

  timeHour = 0;
  timeMinute = 0;
  timeSecond = 0;
  timeMillisecond = 0;

  timeHourElem.innerHTML = '00';
  timeMinuteElem.innerHTML = '00';
  timeSecondElem.innerHTML = '00';
  timeMillisecondElem.innerHTML = '000';

  handlePause()
  hide(submit)
  hide(inputStop)
  hide(inputReset)
  hide(inputResume)
}
//* FOR BOTTONS --- END

//* SHOW OR NO
function hide(el)
{
  el.style.display = 'none';   
}
function show(el)
{
  el.style.display = 'flex';  
}
//* SHOW OR NO

//*VALIDACOES
function validation()
{
  if(inputName.value == '' || inputName.value.length <= 2){    
    console.log(inputName.value);    
    alert('Digite seu Nome')
    return false
  }
  return true
}
//*VALIDACOES

inputNext.addEventListener('click', handleNext)
inputStop.addEventListener('click', handlePause)
inputStart.addEventListener('click', handleStart)
inputResume.addEventListener('click', handleStart)
form.addEventListener('submit', HandleSubmit, false)
inputNewTime.addEventListener('click', handleNewTime)
inputReset.addEventListener('click', handleResetTime)