import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener('click', renderCat)
memeModalCloseBtn.addEventListener('click', closeModal)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

/* 
     let memeArr = getFilteredArray()
    let html = ""
    if(memeArr.length === 1){
        html = `<img src="${memeArr[0].src}" alt="${memeArr[0].alt}" class="Meme-img"></img>`
    }else{
        for(let meme of memeArr){
            html +=`<img src="${meme.src}" alt="${meme.alt}" class="Meme-img"></img>`
        }
    }
    memeContainer.innerHTML = html
*/

function renderCat(){
    let catArr = getMatchingCatsArray()
    let html = ""
    if (catArr.length === 1){
        html = `<img src="./images/${catArr[0].image}" alt="${catArr[0].alt}" class="cat-img"></img>`
    } else {
        for (let cat of catArr){
            html += `<img src="./images/${cat.image}" alt="${cat.alt}" class="cat-img"></img>`
        }
    }
    memeModalInner.innerHTML = html
    memeModal.style.display = 'flex'
    
    setTimeout(() => {
        document.querySelector('main').addEventListener('click', closeModal, { once: true })
        document.querySelector('header').addEventListener('click', closeModal, { once: true })
    }, 0)
}

/*

function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
    
    setTimeout(() => {
        document.querySelector('main').addEventListener('click', closeModal, { once: true })
        document.querySelector('header').addEventListener('click', closeModal, { once: true })
    }, 0)
}

*/

/* 

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{        
    const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

*/

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        let matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)





