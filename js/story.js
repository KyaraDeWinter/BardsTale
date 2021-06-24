const textElement = document.getElementById('text') // text div in index.html
const optionButtonsElement = document.getElementById('option-buttons') // option-buttons div in index.html

// 'inventory' state, now empty
let state = {}

// start game, check 'inventory' and go to first text
function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return optionButtonsElement.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}


// storyline
const textNodes = [
    {
        id: 1,
        text: 'This is a game where you walk through a storyline and make decisions that will effect the adverture, so try to choose wisely. I wish you luck, dear wanderer!',
        options: [
            {
                text: 'Start game',
                nextText: 2
            }
        ]
},
{
    id: 2,
    text: 'You wake up in an old, wooden shed and you see a strange bird at the other side of the room. It neither seems friendly nor agressive.',
    // in options, you list a few possible options that creates other branches
    options: [
        {
            text: 'Befriend strange bird',
            setState: { strangeBird: true },
            // nextText means you go to text with id: 2
            nextText: 3
        },
        {
            text: 'Ignore strange bird',
            nextText: 3
        }
    ]
},
{
    id: 3,
    text:'You explore the shed you woke up in further and find a little jar of glistening powder next to the fireplace. You might need the little jar later on.',
    options: [
        {
            text: 'Take the little jar',
            setState: { littleJar: true },
            nextText: 4
        },
        {
            text: 'Leave the little jar',
            nextText: 3
        }
    ]
},
{
    id: 4,
    text: 'After leaving the old shed and wandering thru the woods for a while, you come across a merchant who seems to be looking for some glistening mushrooms that are growing in the shadows. Luckily, you found the jar which contains the powder of the rare mushrooms.',
    options: [
        {
            text: 'Trade the little jar for a dagger',
            setState: { dagger: true },
            requiredState: (currentState) => currentState.littleJar,
            setState: {littleJar: false, dagger: true},
            nextText: 5
        },
        {
            text: 'Trade the little jar for an old grimoire',
            setState: { grimoire: true },
            requiredState: (currentState) => currentState.littleJar,
            setState: { littleJar: false, grimoire: true },
            nextText: 5
        },
        {
            text: 'Ignore the merchant',
            nextText: 5
        }
    ]
},
{
    id: 5,
    text: 'You start to get tired and find a way to leave the woods by following a narrow path. You stumble upon a small town. In the distance, an immense looking mountain lurks behind a large and dangerous forest.',
    options: [
        {
            text: 'Find a tavern to rest at',
            nextText: 6
        },
        {
            text: 'Find some hay in a stable to rest at',
            nextText: 7
        },
        {
            text: 'Explore the large forest',
            nextText: 8
        }
    ]
},
{
    id: 6,
    text: 'You open the door to the tavern and ask for a room to sleep in. It seems to be too expensive, you do not have enough coins at the moment.',
    options: [
        {
            text: 'Find somewhere else to rest',
            nextText: 5
        }
    ]
},
{
    id: 7,
    text: 'The hay is comfortable and you fall asleep right away. After a few hours of sleep you make new plans.',
    options: [
        {
            text: 'Look for a market to buy some food',
            nextText: 9
        },
        {
            text: 'Try to talk to the villagers in the town.',
            nextText: 10
        }
    ]
},
{
    id: 8,
    text: 'While yawning you slumber thru the eery forest full of weird noises. You take a nap against a mossy tree and in your sleep an unfamiliar monster kills you instantly.',
    options: [
        {
            text: 'Restart the game',
            // -1 means, you restart the game
            nextText: -1
        }
    ]
},
{
    id: 9,
    text: 'You walk from te stables back to the center of the town. The market in the town sells a lot of vegetables and freshly baked bread, it smells delicious.',
    options: [
        {
            text: 'Buy a loaf of bread with your coins',
            setState: { bread: true },
            nextText: 11
        },
        {
            text: 'Try to steal a loaf of bread',
            setState: { bread: true },
            nextText: 12
        }
    ]
},
{
    id: 10,
    text: 'A group of villagers are standing near a fountain. The water is green because of the algae.',
    options: [
        {
            text: 'Walk towards the villagers',
            nextText: 13
        },
        {
            text: 'Walk past the villagers and go to the market',
            nextText: 9
        }
    ]
},
{
    id: 11,
    text: 'You fill the rest of the day by eating a piece of the bread and clear your head with a small walk.',
    options: [
        {
            text: 'Here stops the storyline',
            nextText: -1
        }
    ]
},
{
    id: 12,
    text: 'You thought no one was looking.. In fact, the man selling apples caught you stealing the bread. For thiefs, there exist high consequences.',
    options: [
        {
            text: 'Restart the game',
            // -1 means, you restart the game
            nextText: -1
        }
    ]
},
{
    id: 13,
    text: 'You walk slowly towards the fountain, where the villagers are standing. You slightly smile to them but they do not want to start a conversation with you.',
    options: [
        {
            text: 'Here stops the storyline',
            nextText: -1
        }
    ]
},
]

startGame()
