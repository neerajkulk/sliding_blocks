const N = 4
const cells = document.querySelectorAll(".grid div");
const reset = document.getElementById('reset')

let emptyElem = document.querySelector('.empty') // current div corresponding to empty cell
let emptyLoc = getRowCol(emptyElem.id) // row column of empty cell

function unroll(idx) {
    return { r: Math.floor(idx / N), c: idx % N }
}

function roll(r, c) {
    return r * N + c
}

function checkUp(r, c) {
    return emptyLoc.r < r && emptyLoc.c === c
}

function checkDown(r, c) {
    return emptyLoc.r > r && emptyLoc.c === c
}

function checkLeft(r, c) {
    return emptyLoc.r === r && emptyLoc.c < c
}

function checkRight(r, c) {
    return emptyLoc.r === r && emptyLoc.c > c
}

function getRowCol(elemID) {
    const [r, c] = elemID.split(',')
    return { r: parseInt(r), c: parseInt(c) }
}

function resetEmptyCell(r, c) {
    emptyElem.classList.remove('empty')
    emptyElem.classList.add('block')
    emptyElem = cells[roll(r, c)]
    emptyElem.innerText = ''
    emptyElem.classList.remove('block')
    emptyElem.classList.add('empty')
    emptyLoc = { r: r, c: c }
}

function shiftDown(r, c) {
    if (!checkDown(r, c)) return false
    for (let nr = emptyLoc.r; nr > r; nr--) {
        const bottom = cells[roll(nr, c)]
        const top = cells[roll(nr - 1, c)]
        bottom.innerText = top.innerText
    }
    resetEmptyCell(r, c)
    return true
}

function shiftUp(r, c) {
    if (!checkUp(r, c)) return false
    for (let nr = emptyLoc.r; nr < r; nr++) {
        const top = cells[roll(nr, c)]
        const bottom = cells[roll(nr + 1, c)]
        top.innerText = bottom.innerText
    }
    resetEmptyCell(r, c)
    return true
}

function shiftRight(r, c) {
    if (!checkRight(r, c)) return false
    for (let nc = emptyLoc.c; nc > c; nc--) {
        const right = cells[roll(r, nc)]
        const left = cells[roll(r, nc - 1)]
        right.innerText = left.innerText
    }
    resetEmptyCell(r, c)
    return true
}

function shiftLeft(r, c) {
    if (!checkLeft(r, c)) return false
    for (let nc = emptyLoc.c; nc < c; nc++) {
        const left = cells[roll(r, nc)]
        const right = cells[roll(r, nc + 1)]
        left.innerText = right.innerText
    }
    resetEmptyCell(r, c)
    return true
}

function shift(r, c) {
    const shifts = [shiftUp, shiftDown, shiftLeft, shiftRight]
    for (let i = 0; i < shifts.length; i++) {
        const shift = shifts[i];
        if (shift(r, c)) break // break once we have shifted the board
    }
}

cells.forEach(function(elem) {
    elem.addEventListener('click', () => {
        const { r, c } = getRowCol(elem.id)
        shift(r, c)
    })
})

reset.addEventListener('click', () => {
    location.reload()
})