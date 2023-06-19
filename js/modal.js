function showModal() {

    const modal = document.querySelector('.modal')
    const modalTrigger = document.querySelector('#btn-get')
    const closeModalButton = document.querySelector('.modal_close')

    const openModal = () => {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }

    modalTrigger.onclick = () => {
        openModal()
    }
    closeModalButton.onclick = () => {
        closeModal()
    }

    modal.onclick = (event) => {
        if (event.target === modal) {
            closeModal()
        }
    }


////////////////////// DZ-3  ////////////////////////////////////
    window.addEventListener('load', function() {
        setTimeout(openModal, 10000)
    })

    function isFooterVisible() {

        const footer = document.querySelector('.footer')
        const footerPosition = footer.getBoundingClientRect() //возвращает часть страницы котораю мы видим
        return footerPosition.top <= window.innerHeight
    }

    function handleScroll() {
        if (isFooterVisible()) {
            openModal();
            window.removeEventListener('scroll', handleScroll)
        }
    }

    window.addEventListener('scroll', handleScroll)
}

showModal()