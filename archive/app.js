const form = document.getElementById('form') 

const timer = document.getElementById('timer') 
const inputNext = document.getElementById('next') 
const inputName = document.getElementById('name')
const inputStop = document.getElementById('stop') 
const inputReset = document.getElementById('reset') 
const showName = document.getElementById('showName')
const inputSubmit = document.getElementById('submit') 
const inputResume = document.getElementById('resume') 
const inputStart = document.getElementById('initial')
const inputNewTime = document.getElementById('newTime') 

const nameData = inputName.value 
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

// FUNCTIONS

function HandleSubmit(event)
{
  event.preventDefault(); //? para o reload
  handleStop()
  const data = handleData(); //? pega dados name/time (object)
  handleInsertDadaBase(data); //? envia o (object)
  hide(inputReset)
  hide(inputSubmit)
  hide(inputResume)
  show(inputNewTime)
}

function handleInsertDadaBase(data)
{
  const arr = handleGetDataBase(); //? pega os dados do banco
  arr.push(data); //? add o (object) e junta ao array que veio do banco

  //? cria um novo array e transf em string
  const newData = JSON.stringify(arr);
  //? envia esses dados para o banco, na tabela atletas 
  localStorage.setItem('Atletas', newData) 
}

function handleGetDataBase()
{
  const data = localStorage.getItem('Atletas'); //? pega dados do banco
  if(data){ //? se tiver dados, retorna eles
    return JSON.parse(data);
  }
  //? se não, retorna array vazio
  return []
} 

function handleData()
{
  //? cria um objeto
  const objItem = new Object();
  //? dentro do objeto cria um name e time
  objItem.name = saveDataName(); //? add name
  objItem.time = saveDataTime(); //? add time
  
  return objItem
}

function saveDataTime() //? guarda dados de Tempo
{    
  return{ //? retorna o seguinte objeto
    horas: timeHourElem.innerText,  
    minutos: timeMinuteElem.innerText,
    segundos: timeSecondElem.innerText,
    millisegundos: timeMillisecondElem.innerText,
  }  
}

function saveDataName() //? pega nome digitado 
{    
  showName.innerText = nameData //? texto do input
  return nameData 
}

function handleTimer() //? função do tempo
{//! ESTUDAR
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
    //? Altera o texto para o que for enviado aqui
    //? conforme os intervalos de tempo
    timeHourElem.innerText = returnData(timeHour);
    timeMinuteElem.innerText = returnData(timeMinute);
    timeSecondElem.innerText = returnData(timeSecond);
    timeMillisecondElem.innerText = returnData(timeMillisecond);
  }
  
  function returnData(input) { //! ESTUDAR
    return input >= 10 ? input : `0${input}`
}

function handleNext() //? botão de próximo
{     
  if(validation() === true){ //? valida o que foi digitado  
    //? manda salvar o nome
    saveDataName() 
    hide(boxInputName)
    hide(inputNext) 
    //? reseta o timer
    handleResetTime()     
    show(timer)
    show(inputStart)      
  }  
}

function handleNewTime()
{
  
}

function handleStart() //? inicia timer
{
  show(reset)
  show(inputStop)
  show(inputSubmit)
  hide(inputStart)
  hide(inputResume)
  //? ajuste para não travar o navegador
  //? setInterval = a cada 10 milissegundos(
  //? pois a cada 1 milissegundo trava dependendo do navegador).
  //? chama função handleTimer() e atualiza timer a cada 10ms
  cron = setInterval(() => { handleTimer(); }, 10)
}

function handleStop() //? para o timer
{
  hide(inputStop)
  show(inputResume)
  show(inputSubmit)
  //? para não termos vários timers funcionando ao fundo
  clearInterval(cron); //? função padrão do js que para o tempo
}

function handleResetTime()//? reseta timer
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

  handleStop()
  hide(submit)
  hide(inputStop)
  hide(inputReset)
  hide(inputResume)
}

function hide(el)
{
  el.style.display = 'none';   
}

function show(el)
{
  el.style.display = 'flex';  
}

function validation() //? valida os dados
{
  //? se não digitar / ou se digitos forem menor que 2
  if(inputName.value == '' || inputName.value.length <= 2){  
    //? retorna o erro e false
    alert('Digite seu Nome')
    return false
  }
  //? se não continua
  return true
}

// EVENTS

inputNext.addEventListener('click', handleNext)
inputStop.addEventListener('click', handleStop)
inputStart.addEventListener('click', handleStart)
inputResume.addEventListener('click', handleStart)
form.addEventListener('submit', HandleSubmit, false)
inputNewTime.addEventListener('click', handleNewTime)
inputReset.addEventListener('click', handleResetTime)