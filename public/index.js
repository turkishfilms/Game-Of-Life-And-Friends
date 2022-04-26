const cellSize = 3,
    colors = []

let grid = [],
    nGrid = [],
    active = [],
    paused = 0,
    clen = 1,
    delay = 1 / 2.8,
    rules = parseRules(rrog[0]),
    types = rlees,
    problemTypes = [1537,627,824],
    currentTypeIndex = 0,
    currentType,
    darkMode = 0

function setup() {
    createCanvas(1800, 1800)
    noStroke()
    frameRate(60)
    for (let i = 0; i < floor(height / cellSize); i++) {
        grid.push([])
        for (let j = 0; j < floor(width / cellSize); j++) grid[i].push(0)
    }
    colors.push([0, 0, 0])
    colors.push([0, 0, 0])
    for (let c = 0; c < clen - 1; c++) colors.push([floor(random(255)), floor(random(255)), floor(random(255))])

    currentType = parseRLEData2(types[currentTypeIndex])
}

const changeTypeInfo = (currentTypeIndex) => {
    const currentType = parseRLEData2(types[currentTypeIndex])
    const { rleLength: x, rleHeight: y } = rleBox(currentType[1])
    document.getElementById('t').innerHTML = currentType[0] + `:  ${x} ${y}`
}


function draw() {
    if (paused) return
    document.getElementById('l').innerHTML = `${frameCount}: type:${currentTypeIndex}` // Frame: ${frameCount}`
    document.getElementById('h').innerHTML = `Rule: ${mouseX.toPrecision(3)},${ mouseY.toPrecision(3)} ` //${frameRate().toPrecision(2)} ${frameCount}`
    background(darkMode?0:255)
    // background(30,10,128)

    show(grid, colors, cellSize)
    next()
}

const show = (grid, colors, cellSize) => {
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                if(darkMode) fill(255)
                else fill(colors[floor(cell)][0], colors[floor(cell)][1], colors[floor(cell)][2])
                rect(i * cellSize + 30, j * cellSize, cellSize, cellSize)
            }
        });
    });
}

function next() {
    nGrid = grid.slice()
    const X = nGrid.length - 1,
        Y = nGrid[0].length - 1
    for (let i = 0; i < X + 1; i++) {
        grid[i] = []
        for (let j = 0; j < Y + 1; j++) {
            let numOfNeighbors = 0
            for (let l = -1; l <= 1; l++) {
                for (let m = -1; m <= 1; m++) {
                    if (l == 0 && m == 0) continue
                    numOfNeighbors += nGrid[(i + m + X) % X][(j + l + Y) % Y] == 0 ? 0 : 1
                }
            }
            if (nGrid[i][j] == 0) grid[i][j] = born(numOfNeighbors) ? 1 : 0 //born or die
            else grid[i][j] = survive(numOfNeighbors) ? ((nGrid[i][j] + delay) % clen) : 0 //survive or die
        }
    }
}

const born = (neighborCount) => { return rules[0].includes(neighborCount) }
const survive = (neighborCount) => { return rules[1].includes(neighborCount) }

function keyPressed() {
    if (key == 'o') upClrMake(1)
    if (key == 'i') upClrMake(-1)
    if (key == 'c') grid = clrGrid(grid)
    if (key == 'a') grid = ranGrid(grid)
    if (key == 'd') darkMode = darkMode ? 0 : 1

    if (key == 'f') {
        background(255)
        show(grid, colors, cellSize)
        next()
    }
    if (key == 'p') paused = paused == 1 ? 0 : 1
    if (key == '-') updateCurrentTypeIndex((currentTypeIndex - 1 + types.length) % types.length)
    if (key == '=') updateCurrentTypeIndex((currentTypeIndex + 1 + types.length) % types.length)
}

function touchStarted() {
    let pos = [floor(mouseX / cellSize), floor(mouseY / cellSize)]
    if (pos[0] >= 0 && pos[1] >= 0) make(pos, currentTypeIndex)
}

function make(pos, type) {
    let x = pos[0],
        y = pos[1]

    currentType = parseRLEData2(types[type])
    let instructs = currentType[1]

    for (let i = 0; i < instructs.length; i++) { // i = rows or y
        if (!instructs[i].length) continue
        for (let j = 0; j < instructs[i].length; j++) {
            grid[x + i][y + j] = instructs[i][j]
        } //swapped
    }
}

const rleBox = (type) => {
    let rleLength = 0,
        rleHeight = type.length
    type.forEach(row => {
        if (row.length > rleLength) rleLength = row.length
    })
    return { rleLength, rleHeight }
}

function cellsToCheck2(wid, hei, ar) { // frame
    // active = cellsToCheck(Xo, Yo, active)
    let aC = []
    let arr = ar //should just be the active arr here idk why [0] is needed
    if (!arr) return []
    for (let i = 0; i < arr.length; i++) {
        if (grid[arr[i][0]][arr[i][1]] == 1) {
            for (let j = -1; j < 2; j++) {
                for (let k = -1; k < 2; k++) aC.push([(arr[i][0] + j + wid) % wid, (arr[i][1] + k + hei) % hei])
            }
        }
    }
    return Array.from(new Set(aC.map(JSON.stringify)), JSON.parse);
}

function updateActive2(x1, y1, x2, y2) { //touch
    let activ = []
    let X = grid.length - 1,
        Y = grid[0].length - 1
    for (let i = x1; i < x1 + x2; i++) {
        for (let j = y1; j < y1 + y2; j++) {
            if (grid[i][j] == 1) {
                for (let m = -1; m < 2; m++) {
                    for (let k = -1; k < 2; k++) activ.push([(i + m + X) % X, (j + k + Y) % Y])
                }
            }
        }
    }
    return Array.from(new Set(activ.map(JSON.stringify)), JSON.parse);
}


const ranGrid = (grid) => {
    const randomGrid = []
    grid.forEach(row => {
        const tempArray = []
        row.forEach(cell => tempArray.push(floor(random(2))))
        randomGrid.push(tempArray)
    })
    return randomGrid
}

const clrGrid = (grid) => {
    const clearGrid = []
    grid.forEach((row) => {
        const tempArray = []
        row.forEach(cell => tempArray.push(0))
        clearGrid.push(tempArray)
    })
    return clearGrid
}

const upClrMake = (num) => {
    updateCurrentTypeIndex((currentTypeIndex + num + types.length) % types.length)
    grid = clrGrid(grid)
    make([10,10], currentTypeIndex)
}
const htmlalterations = (rlees, currentTypeIndex, elementId) => {
    let startings = []
    rlees.forEach(rle => startings.push(rle[rle.search(/[^#N ]/)]))
    let chars = [...new Set(startings)]

    chars.forEach(start => {
        const searchBtn = document.createElement('p')
        searchBtn.className = "searchbtn"
        searchBtn.id = start + "btn"
        searchBtn.textContent = start
        searchBtn.style = "display:inline;"
        searchBtn.onclick = () => updateCurrentTypeIndex(firstTypeWStart(start))
        const actionBar = document.getElementById(elementId)
        actionBar.appendChild(searchBtn)
    })
}

const updateCurrentTypeIndex = (num) => {
    currentTypeIndex = num
    changeTypeInfo(currentTypeIndex)
}

const firstTypeWStart = (start) => {
    console.log("ftws:", start);
    for (let i = 0; i < types.length; i++) {
        if (types[i][types[i].search(/[^#N ]/g)] == start) return i
    }
    console.log("oops found nothing");
}