const inputName = document.getElementById('name')
const inputStart = document.getElementById('initial')
const inputStop = document.getElementById('stop') 
const inputResume = document.getElementById('resume') 
const inputNewTime = document.getElementById('newTime') 
const inputNext = document.getElementById('next') 
const inputReset = document.getElementById('reset') 
const inputSubmit = document.getElementById('submit') 

const boxInputName = document.getElementById('boxInputName') 

let cron
let timeHour = document.getElementById('hour') 
let timeMinute = document.getElementById('minute') 
let timeSecond = document.getElementById('second') 
let timeMillisecond = document.getElementById('millisecond') 

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
    document.getElementById('hour').innerText = returnData(timeHour);
    document.getElementById('minute').innerText = returnData(timeMinute);
    document.getElementById('second').innerText = returnData(timeSecond);
    document.getElementById('millisecond').innerText = returnData(timeMillisecond);
  }
  
  function returnData(input) {
    return input >= 10 ? input : `0${input}`
}

function handleBottons($el)
{
  if($el === 'next'){
    if(validation() === true){      
      saveDataName() 
      none(inputNext)
      none(boxInputName)
      flex(inputSubmit)
      flex(inputStop)
      flex(inputStart)            
    }      
  }
}

function handleReload(el)
{
  el.preventDefault()
}

function handleStart()
{
  handlePause();
  //? setInterval = a cada 10 milissegundos(
  //? pois a cada 1 milissegundo trava dependendo do navegador).
  cron = setInterval(() => { handleTimer(); }, 10)
}

function handlePause()
{
  //? para não termos vários timers funcionando ao fundo
  clearInterval(cron); 
}

function handleResetTime()
{  
  timeHour = 0;
  timeMinute = 0;
  timeSecond = 0;
  timeMillisecond = 0;
  document.getElementById('hour').innerHTML = '00';
  document.getElementById('minute').innerHTML = '00';
  document.getElementById('second').innerHTML = '00';
  document.getElementById('millisecond').innerHTML = '000';
}

//*SAVE DATA
function saveDataName()
{  
  let nameData = inputName.value
  
}
//*SAVE DATA

//* SHOW OR NO
function flex(el)
{
  el.style.display = 'none';    
  return false   
}

function none(el)
{
  el.style.display = 'none';    
  return false   
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

inputStart.addEventListener('click', handleStart)
inputNext.addEventListener('click', function(){
  handleBottons('next')
})
// inputNext.addEventListener('submit', handleReload, false)
inputStop.addEventListener('click', handlePause)
inputReset.addEventListener('click', handleResetTime)
