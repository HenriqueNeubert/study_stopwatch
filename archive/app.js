// const { cleanData } = require("jquery")

const form = document.getElementById('form') 

const timer = document.getElementById('timer') 
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

display(timer, 'none')
display(inputStop, 'none')
display(inputStop, 'none')
display(inputStart, 'flex')
display(inputReset, 'none')
display(inputSubmit, 'none')
display(inputResume, 'none')
display(inputNewTime, 'none')

// FUNCTIONS

function HandleSubmit(event)
{
  event.preventDefault(); //? para o reload
  handleShowTime()
  handleStop()
  const data = handleData(); //? pega dados name/time (object)
  handleInsertDadaBase(data); //? envia o (object)

  display(inputReset, 'none')
  display(inputSubmit, 'none')
  display(inputResume, 'none')
  display(inputNewTime, 'flex')
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

function cleanTodo()
{
  const tbody = document.getElementById('tbody');
  tbody.innerText = ''
}

handleShowTime()
function handleShowTime()
{
  const data = handleGetDataBase();
  
  cleanTodo()
  data.forEach(function(item, index) {
    showTime(item, index)   
  });
}

function showTime(item, index)
{   
  const tbody = document.getElementById('tbody');//? cria div
  const tr = document.createElement('tr');//? cria div
  const th = document.createElement('th');//? cria title
  const tdA = document.createElement('td');//? cria title
  const hourB = item.time.horas
  const minuteB = item.time.minutos
  const secondB = item.time.segundos
  const millisecondB = item.time.millisegundos
  const tdB = document.createElement('td');//? cria title

  tr.classList.add('item'); //? adiciona classe .todo
  th.innerText = index; //? valor recebido do imputCreate
  tr.appendChild(th); //? diz: title fica dentro de todo
  tdA.innerText = item.name; //? valor recebido do imputCreate
  tr.appendChild(tdA); //? diz: title fica dentro de todo  
  tdB.innerText = hourB + ':' + minuteB + ':' + secondB + ':' + millisecondB
  tr.appendChild(tdB);
  tr.appendChild(tdB); //? diz: title fica dentro de todo

  tbody.appendChild(tr);
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
  const nameData = inputName.value //? texto do input

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

function handleNewTime()
{
  display(timer, 'none')
  display(boxInputName, 'block')
  display(inputStart, 'flex')
  display(inputNewTime, 'none')

  inputName.value = '';
}

function handleStart() //? inicia timer
{
  if(validation() === true){ //? valida o que foi digitado  
    //? manda salvar o nome    
    display(boxInputName, 'none')
    display(inputStart, 'none') 
    //? reseta o timer
    handleResetTime()     
    display(timer, 'flex')
    display(inputStart, 'flex')      
  }else{
    handleStop()
  }  
  display(boxInputName, 'none')  
  display(reset, 'flex')
  display(timer, 'flex')
  display(inputStop, 'flex')
  display(inputSubmit, 'flex')
  display(inputStart, 'none')
  display(inputResume, 'none')

  //? ajuste para não travar o navegador
  //? setInterval = a cada 10 milissegundos(
  //? pois a cada 1 milissegundo trava dependendo do navegador).
  //? chama função handleTimer() e atualiza timer a cada 10ms
  cron = setInterval(() => { handleTimer(); }, 10)
}

function handleStop() //? para o timer
{
  display(inputStop, 'none')
  display(inputResume, "flex")
  display(inputSubmit, "flex")
  //? para não termos vários timers funcionando ao fundo
  clearInterval(cron); //? função padrão do js que para o tempo
}

function handleResetTime()//? reseta timer
{  
  display(inputStart, 'flex')
  display(inputResume, 'none')

  timeHour = 0;
  timeMinute = 0;
  timeSecond = 0;
  timeMillisecond = 0;

  timeHourElem.innerHTML = '00';
  timeMinuteElem.innerHTML = '00';
  timeSecondElem.innerHTML = '00';
  timeMillisecondElem.innerHTML = '000';

  handleStop()

  display(submit, 'none')
  display(inputStop, 'none')
  display(inputReset, 'none')
  display(inputResume, 'none')
}

function display(el,status) //? altera display dos elementos
{
  el.style.display = status;   
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

inputStart.addEventListener('click', handleStart)
inputStop.addEventListener('click', handleStop)
inputStart.addEventListener('click', handleStart)
inputResume.addEventListener('click', handleStart)
form.addEventListener('submit', HandleSubmit, false)
inputNewTime.addEventListener('click', handleNewTime)
inputReset.addEventListener('click', handleResetTime)