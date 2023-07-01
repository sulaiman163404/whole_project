fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => console.log(data))

const card = document.querySelector('.card')
const cardImage = document.querySelector('.card-image')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

let count = 1
const fetchData = async (title) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${title}`)
        const data = await response.json()

        card.innerHTML = `
                <h3>${data.title}</h3>
                <span>${data.body}</span>
                `
    } catch (e) {
        return console.error('ERROR', e)
    }
}

btnNext.onclick = () => {
    count++
    fetchData(count)
}

btnPrev.onclick = () => {
    if (count > 1) {
        count--
        fetchData(count)
    }
}

fetchData(count)


