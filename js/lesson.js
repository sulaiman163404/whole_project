// REG EXP
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
const tabContent = document.querySelectorAll('.tab_content_block')
let index = 0

const hideTabContent = () => {
    tabContent.forEach(item => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

let tab = 0
const switchTab = () => {
    hideTabContent()
    showTabContent(tab)
    tab = (tab + 1) % tabs.length
}

const autoTab = setInterval(switchTab, 5000)

hideTabContent()
showTabContent(tab)
switchTab()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (event.target === item) {
                // clearInterval(autoTab)
                hideTabContent()
                showTabContent(i)
            }
        })
    }
}

////////////////////////DZ-3 автослайдер //////////////////////

const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabContent.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)
        clearInterval(autoTab)
    }, 3000)
}
autoSlider()


const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const apiKey = 'e417df62e04d3b1b111abeab19cea714'


const citySearch = () => {
    const cityName = document.querySelector('.cityName')
    cityName.oninput = (event) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                city.innerHTML = data?.name || 'Город не найден...'
                // console.log(data)
                temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '.....'

            })
    }

}

citySearch()