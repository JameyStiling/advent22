var fs = require('fs');
var input = fs.readFileSync('day2.txt').toString().split("\n");

const shapes = {
    X: {
        score: 1,
        beats: 'Z',
        losesTo: 'Y',
        elfOverride: 0
    },
    Y: {
        score: 2,
        beats: 'X',
        losesTo: 'Z',
        elfOverride: 3
    },
    Z: {
        score: 3,
        beats: 'Y',
        losesTo: 'X',
        elfOverride: 6
    }
}

const comeAtMeElf = (input) => {
    return input.reduce((score,match) => {
        const [preNormalizedYou, me] = match.split(' ')
        const you = preNormalizedYou === 'A' ? 'X' : preNormalizedYou === 'B' ? 'Y' : 'Z'
        const winScore = me === you ? 3 : shapes[me].beats === you ? 6 : 0
        const shapescore = shapes[me].score
        const elfscore = me === 'X' ? shapes[shapes[you].beats].score : me === 'Y' ? shapes[you].score : shapes[shapes[you].losesTo].score 
        return {
            realScore: score.realScore + winScore + shapescore,
            elfOverride: score.elfOverride + shapes[me].elfOverride + elfscore
        }
    }, {realScore: 0, elfOverride: 0})
}
console.log(comeAtMeElf(input))