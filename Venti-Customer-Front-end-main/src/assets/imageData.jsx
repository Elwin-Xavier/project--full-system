import login from './images/hobby.jpg'

const imageData = (img) => {
    const images = {
        login,
    }
    return images[img]
}

export default imageData