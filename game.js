//Page elements
let def1Section = document.querySelector('#def1')
let def2Section = document.querySelector('#def2')
let userAnswerElement = document.querySelector('#user-answer')
let result = document.querySelector('#result')
let hintDiv = document.querySelector('#hint-div')
let scoreDiv = document.querySelector('#score')
let history = document.querySelector('#history')

//Buttons
let submitAnswerBtn = document.querySelector('#submit-answer')
let playAgainBtn = document.querySelector('#play-again-btn')
let hintBtn = document.querySelector('#hint-btn')

//Number of correct answers
let correctAnswers = 0

//Number of wrong answers
let wrongAnswers = 0

//Word history, to avoid repeat words
let previousWords = []

//Number of words the player has seen
let totalWords = previousWords.length

//Number of entries in dictionary
let entries = dictionary.length
    console.log(entries)

playAgainBtn.addEventListener('click', function() {
    //Reset the game
    result.innerHTML = ''
    hintDiv.innerHTML = ''
    userAnswerElement.value = ''
    playAgainBtn.innerHTML = 'Skip'
    hintBtn.disabled = false
    hintBtn.style.visibility="visible"
    submitAnswerBtn.disabled = false
    submitAnswerBtn.style.visibility="visible"

    //Update score
    totalWords++
    updateScore(correctAnswers, totalWords)

    //Play game again
    playGame(previousWords, entries)
})

document.addEventListener('keyup', function() {
    if (event.keyCode == 13) {
        submitAnswerBtn.click()
    }
})


playGame(previousWords, entries)


function playGame(previousWords, entries) {
    let totalWords = previousWords.length
    totalWords++

    let [word, def1, def2, hint] = lookup(previousWords, entries)

    previousWords.push(word)
    
    console.log(previousWords)

    def1Section.innerHTML = def1
    def2Section.innerHTML = def2

    submitAnswerBtn.addEventListener('click', function() {
        let userAnswer = userAnswerElement.value.trim()
        if (userAnswer.toUpperCase() === word.toUpperCase()) {
            submitAnswerBtn.disabled = true
            submitAnswerBtn.style.visibility="hidden"
            hintBtn.disabled = true
            hintBtn.style.visibility="hidden"
            result.innerHTML = `Correct! The word was <i>${word}!`
            playAgainBtn.innerHTML = 'More Words!'
            correctAnswers++
            updateScore(correctAnswers, totalWords)
        } else {
            result.innerHTML = `Not quite. Try again!`
        }
    })

    hintBtn.addEventListener('click', function() {
        hintDiv.innerHTML = `Hint: ${hint}`
        hintBtn.disabled = true
        hintBtn.style.visibility="hidden"
    })
}

function lookup(previousWords, entries) {
    let lookupLoop = true

    while (lookupLoop) {
        let randomEntry = dictionary[Math.floor(Math.random()*dictionary.length)]
                
        let word = randomEntry.word
        let def1 = randomEntry.def1
        let def2 = randomEntry.def2
        let hint = randomEntry.hint
        
        if (!previousWords.includes(word)) {
            return [word, def1, def2, hint]
            
        } else if (previousWords.length === entries) {
            result.innerHTML = `You've seen every word contained in this game! Touch some grass!`
            hintBtn.disabled = true
            hintBtn.style.visibility="hidden"
            submitAnswerBtn.disabled = true
            submitAnswerBtn.style.visibility="hidden"
            playAgainBtn.disabled = true
            playAgainBtn.style.visibility="hidden"
            return [word, def1, def2, hint]
        }
    }
}

function updateScore(correctAnswers, totalWords) {
    scoreDiv.innerHTML = `Score: ${correctAnswers} / ${totalWords}`
}
