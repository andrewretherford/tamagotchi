// Tamagotchi Game
// Don't be the only one with a dead Tamagotchi!

// Constants
const MAX_HUNGER = 15
const MAX_FATIGUE = 20
const MAX_BOREDOM = 25
const MAX_AGE = 80
const STATS_INTERVAL = 3000
const AGE_INTERVAL = 5000

// State variables
let hungerValue, fatigueValue, boredomValue, ageValue, userMessage
let numAttributes, attributes
let statsInterval, ageInterval
let tamagotchi

class Tamagotchi {
    constructor() {
        this.hunger = 0
        this.boredom = 0
        this.fatigue = 0
        this.age = 0
    }
    // Methods

    feed() {
        if(this.hunger > 0) {
            this.hunger--
        }
        render()
    }
    
    play() {
        if(this.boredom > 0) {
            this.boredom--
        }
        render()
    }
    
    sleep() {
        if(this.fatigue > 0) {
            this.fatigue--
        }
        render()
    }
    
    isLiving() {
        if(this.hunger > MAX_HUNGER || this.fatigue > MAX_FATIGUE || this.boredom > MAX_BOREDOM || this.age > MAX_AGE) {
            userMessage = 'GAME OVER'
            clearInterval(statsInterval)
            clearInterval(ageInterval)
            return false
        } else {
            return true
        }
    }

    growOlder() {
        this.age++
    }
}

// DOM element assignment

//----- Buttons -----
const hunger = document.querySelector('.hunger')
const boredom = document.querySelector('.boredom')
const fatigue = document.querySelector('.fatigue')
const age = document.querySelector('.age')
const feed = document.querySelector('.feed')
const play = document.querySelector('.play')
const sleep = document.querySelector('.sleep')
const playNow = document.querySelector('.play-now')

//----- Containers -----
const title = document.querySelector('.title')
const statsContainer = document.querySelector('.stats-container')
const actionButtonContainer = document.querySelector('.action-button-container')
const playButtonContainer = document.querySelector('.play-button-container')
const messageBox = document.querySelector('.message-box')

//----- Elements -----
const message = document.querySelector('.message')

// Event handlers and listeners
function interactionHandler(e) {
    let target = e.target

    // if(target.tagName != 'button') {
    //     return
    // }
    // console.log(e.target)

    if(e.target.classList.contains('feed')) {
        tamagotchi.feed()
        console.log('clicked feed')
    } else if(e.target.classList.contains('play')) {
        tamagotchi.play()
        console.log('clicked play')
    } else if (e.target.classList.contains('sleep')) {
        tamagotchi.sleep()
        console.log('clicked sleep')
    } else {
        return
    }
}

function gameStartHandler() {
    showHide(title)
    showHide(playButtonContainer)
    showHide(actionButtonContainer)
    showHide(statsContainer)
    tamagotchi = init()
    render()
}

playNow.addEventListener('click', gameStartHandler)
actionButtonContainer.addEventListener('click', interactionHandler)

// General Functions

function entropy(currentPet) {
    numAttributes = Math.floor(Math.random() * 4)
    for(let i=0; i < numAttributes; i++) {
        switch(attributes[randomIndex()]) {
            case 'hunger':
                currentPet.hunger++
            case 'boredom':
                currentPet.boredom++
            case 'fatigue':
                currentPet.fatigue++
            default:
                break
        }
    }
    render()
}

function randomIndex() {
    return Math.floor(Math.random() *3)
}

function showHide(element) {
    element.classList.toggle('hide')
}

// Init function


function init() {
    attributes = ['hunger', 'boredom', 'fatigue']
    const newTamagotchi = new Tamagotchi()
    statsInterval = setInterval(entropy, STATS_INTERVAL, newTamagotchi)
    ageInterval = setInterval((currentPet) => currentPet.growOlder(), AGE_INTERVAL, newTamagotchi)
    userMessage = ''
    return newTamagotchi
}

// Render function

function render() {
    // check to see if it's alive
    if(!tamagotchi.isLiving()) {
        showHide(messageBox)
    }

    // update stats
    hunger.innerHTML = `Hunger: ${tamagotchi.hunger}`
    boredom.innerHTML = `Boredom: ${tamagotchi.boredom}`
    fatigue.innerHTML = `Fatigue: ${tamagotchi.fatigue}`
    age.innerHTML = `Age: ${tamagotchi.age}`

    // update message
    message.innerHTML = userMessage
}

