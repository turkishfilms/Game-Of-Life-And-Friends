//the plan:
/*
active array stores location of active and active adjacent cells
next3 loops through active cells and does normal GOL stuff
active array is reestablsihed each round using previous state as seed
every time touchstarted active is rewritten
*/

const cellSize = 3,
        offset = 10,
        offset2 = 30,
        fr = 60,
        seed = 2,
        cs = [],
        t = 0,
        cnt = 1

let rs = 0

let rules = parseRules(rrog[0])

let grid = [],
        nGrid = [],
        dGrid = [],
        active = [],
        p = 1,
        c = 1,
        s2 = 1,
        clen = 12,
        delay = 1 / 2.8,
        tp = 0,
        typk,
        Xo = 0,
        Yo = 0,
        structList = rlees


let types = structList.slice()

let s, n

function setup() {
        
        // createCanvas(windowWidth, windowHeight * 2); //900,800
        createCanvas(1400, 1400)
        noStroke()
        // background(100, 101, 134);
        frameRate(fr)
        for (let i = 0; i < floor(height / cellSize); i++) {
                grid.push([])
                for (let j = 0; j < floor(width / cellSize); j++) grid[i].push(0)
        }
        dGrid = JSON.parse(JSON.stringify(grid))
        cs.push([255,255,255])
        for (let c = 0; c < clen - 1; c++) cs.push([floor(random(255)), floor(random(255)), floor(random(255))])

        Xo = grid.length,
                Yo = grid[0].length

}


function draw() {
        if (!p) return
        document.getElementById('l').innerHTML = `${c}` // Frame: ${frameCount}`
        document.getElementById('t').innerHTML = typk[0]
        document.getElementById('h').innerHTML = `Rule: ${rs} ${frameRate().toPrecision(2)} ${frameCount}`
        background(255)
          // active = updateActive()
        // console.log("activea",active)
        // active = cellsToCheck2(Xo, Yo, active)ck
        show()
        next()
}

function show() {
        // if (t != 1 && frameCount % t == 0) p = (p + 1) % clen
        for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[0].length; j++) {
                        if (grid[i][j] != 0) {
                                fill(cs[floor(grid[i][j])][0], cs[floor(grid[i][j])][1], cs[floor(grid[i][j])][2])
                                // fill(0)
                                rect(i * cellSize + 30, j * cellSize, cellSize, cellSize)
                        }
                }
        }
}


function next() {
        // if (frameCount % 90 == 0) console.log("ogN")
        nGrid = grid.slice()
        let X = nGrid.length - 1
        for (let i = 0; i < X + 1; i++) {
                grid[i] = []
                let Y = nGrid[i].length - 1
                for (let j = 0; j < Y + 1; j++) {
                        let k = (nGrid[(i - 1 + X) % X][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[i][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i - 1 + X) % X][j] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][j] == 0 ? 0 : 1) + (nGrid[(i - 1 + X) % X][(j + 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[i][(j + 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][(j + 1 + Y) % Y] == 0 ? 0 : 1)
                        if (nGrid[i][j] == 0) grid[i][j] = born(k) ? 1 : 0 //bornordie
                        else grid[i][j] = survive(k) ? ((nGrid[i][j] + delay) % clen) : 0 //survive or die
                }
        }
}

//////
////s/ WORKING HERE!! trying to return a bounding box from make() to update active by appending curret active with . doubel = sign was problem
function make(pos, type) {
        let x = pos[0],
                y = pos[1]
        let typ
                typk = parseRLEData2(types[type])
                typ = typk[1]

        let maxJ = 0
        for (let i = 0; i < typ.length; i++) { // i = rows or y
                if (typ[i].length > maxJ) maxJ = typ[i].length
                for (let j = 0; j < typ[i].length; j++) grid[x + j][y + i] = typ[i][j]
        }
        return [maxJ, typ.length]
}

function touchStarted() {
        let pos = [floor((mouseX - offset) / cellSize), floor((mouseY - offset) / cellSize)]
        if (pos[0] >= 0 && pos[1] >= 0) {
                let mpos = make(pos, tp)
                let poop = updateActive2(pos[0], pos[1], mpos[0], mpos[1])
                active.push(poop)
        }
        c++
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
        let X = Xo - 1,
                Y = Yo - 1
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

const born = (neighborCount) => {return rules[0].includes(neighborCount)}
const survive = (neighborCount) => {return rules[1].includes(neighborCount)}


function keyPressed() {
        if (key == 'f') {
                background(255)
                d()
        }
        if (key == 'p') p = p == 1 ? 0 : 1
        if (key == 's') s2 = s2 == 1 ? 0 : 1
}

function ranclr(ran) {
        grid = []
        for (let i = 0; i < floor(height / cellSize); i++) {
                grid.push([])
                for (let j = 0; j < floor(width / cellSize); j++) grid[i].push(ran == 1 ? floor(random(2)) : 0)
        }
        nGrid = grid.slice()
}



// pre setup
//let types = [[c],[[0,1],[0,-1],[-1,0],[1,-1]],[[0,1],[0,-1],[-1,-1],[-2,0]],[0],[0]] 

//next5
// console.log(nGrid[(i + n + X) % X][(j + k + Y) % Y]) 
// console.log(`i ${i}, j ${j}, n ${n}, k ${k}, ${[i+n,j+k]}, ${nGrid[(i + n + X) % X][(j + k + Y) % Y]}, bc ${bc}`)