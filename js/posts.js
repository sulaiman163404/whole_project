const card = document.querySelector('.card')
const cardImage = document.querySelector('.card-image')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

let count = 1
const totalImages = 6 // Total number of available images
const fetchData = async (title) => {
    try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${title}`)
        const postData = await postResponse.json()

        const imageIndex = (title - 1) % totalImages + 1 // Calculate the index of the image to display based on the title count

        const imageURL = `../img/online_item_${imageIndex}.jpg`

        card.innerHTML = `
            <h3>${postData.title}</h3>
            <span>${postData.body}</span>
        `
        cardImage.setAttribute('src', imageURL)
    } catch (error) {
        console.error('ERROR', error)
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


