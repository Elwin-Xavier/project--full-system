import login from './images/hobby.webp'
import pple from './images/people.jpg'

const imageData = (img) => {
    const images = {
        login,
        pple
    }
    return images[img]
}

export default imageData