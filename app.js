// Tamagotchi Game
// Don't be the only one with a dead Tamagotchi!

// Constants
const MAX_HUNGER = 15
const MAX_FATIGUE = 20
const MAX_BOREDOM = 25
const MAX_AGE = 80
const INTERVAL = 2000

// State variables
let hungerValue, fatigueValue, boredomValue, ageValue
let numAttributes, attributes

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
    }
    
    play() {
        if(this.boredom > 0) {
            this.boredom--
        }
    }
    
    sleep() {
        if(this.fatigue > 0) {
            this.fatigue--
        }
    }
    
    isLiving() {
        if(this.hunger > MAX_HUNGER || this.fatigue > MAX_FATIGUE || this.boredom > MAX_BOREDOM || this.age > MAX_AGE) {
            return false
        } else {
            return true
        }
    }

    age() {
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
const statsContainer = document.querySelector('.stats-container')
const actionButtonContainer = document.querySelector('.action-button-container')
const playButtonContainer = document.querySelector('.play-button-container')

// Event handlers and listeners
function interactionHandler (e) {
    let target = e.target

    if(target.name != 'button') {
        return
    }

    if(e.target.classList.contains('feed')) {
        tamag.feed()
    } else if(e.target.classList.contains('play')) {
        tamag.play()
    } else if (e.target.classList.contains('sleep')) {
        tamag.sleep()
    } else {
        return
    }
}

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
}

function randomIndex() {
    return Math.floor(Math.random() *3)
}

// Init function


function init() {
    attributes = ['hunger', 'boredom', 'fatigue']
    const tamagotchi = new Tamagotchi()
    setInterval(entropy, INTERVAL, tamagotchi)
}

// Render function

function render() {

}

