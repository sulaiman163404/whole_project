// MOVE BLOCK
const childBlock = document.querySelector('.child_block')

let positionX = 0
let positionY = 0

const move = () => {
    if (positionX < 449 && positionY === 0) {
        positionX+=2
        childBlock.style.left = `${positionX}px`
        setTimeout(move, 10)
    } else if (positionX >= 449 && positionY < 449) {
        positionY+=2
        childBlock.style.top = `${positionY}px`
        setTimeout(move, 10)
    } else if (positionX > 0 && positionY > 0) {
        positionX-=2
        childBlock.style.left = `${positionX}px`
        setTimeout(move, 10)
    } else if (positionX === 0 && positionY > 0) {
        positionY-=2
        childBlock.style.top = `${positionY}px`
        setTimeout(move, 10)
    }
}

move()

// STOPWATCH
const minutesBlock = document.querySelector('#minutes'),
    secondsBlock = document.querySelector('#seconds'),
    mlSecondsBlock = document.querySelector('#ml-seconds'),
    startButton = document.querySelector('#start'),
    stopButton = document.querySelector('#stop'),
    resetButton = document.querySelector('#reset')

let interval
let minutes = 0
let seconds = 0
let mlSeconds = 0

const startTimer = () => {
    mlSeconds++
    mlSeconds <= 99 && (mlSecondsBlock.innerHTML = mlSeconds)
    mlSeconds == 100 && (mlSecondsBlock.innerHTML = '00')

    mlSecondsBlock.innerHTML = `0${mlSeconds}`
    mlSeconds > 9 && (mlSecondsBlock.innerHTML = mlSeconds)
    if (mlSeconds > 99) {
        seconds++
        secondsBlock.innerHTML = `0${seconds}`
        mlSeconds = 0
    }
    seconds > 9 && (secondsBlock.innerHTML = seconds)
    if (seconds > 59) {
        minutes++
        minutesBlock.innerHTML = `0${minutes}`
        seconds = 0
        secondsBlock.innerHTML = `0${seconds}`
    }
    minutes > 9 && (minutesBlock.innerHTML = minutes)
}

startButton.onclick = () => {
    clearInterval(interval)
    interval = setInterval(startTimer,  10)
}

stopButton.onclick = () => {
    clearInterval(interval)
}

resetButton.onclick = () => {
    clearInterval(interval)
    minutes = 0
    seconds = 0
    mlSeconds = 0
    minutesBlock.innerHTML = '00'
    secondsBlock.innerHTML = '00'
    mlSecondsBlock.innerHTML = '00'
}

///////////// converter ////////////

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');


const convert = (inputCurrency, targetCurrency1, targetCurrency2) => {
    inputCurrency.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../currency.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const response = JSON.parse(request.response);
            if (inputCurrency === som) {
                targetCurrency1.value = (inputCurrency.value / response.usd).toFixed(2);
                targetCurrency2.value = (inputCurrency.value / response.eur).toFixed(2);
            } else if (inputCurrency === usd) {
                targetCurrency1.value = (inputCurrency.value * response.usd).toFixed(2);
                targetCurrency2.value = (inputCurrency.value * response.usd / response.eur).toFixed(2);
            } else if (inputCurrency === eur) {
                targetCurrency1.value = (inputCurrency.value * response.eur).toFixed(2);
                targetCurrency2.value = (inputCurrency.value * response.eur / response.usd).toFixed(2);
            }
            inputCurrency.value === '' && (targetCurrency1.value = targetCurrency2.value = '');
        };
    };
};

convert(som, usd, eur);
convert(usd, som, eur);
convert(eur, som, usd);

const clearConverter = document.querySelector('#reset-converter')
clearConverter.addEventListener('click', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        input.value = '';
    })
})