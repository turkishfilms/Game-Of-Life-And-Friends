////
// const fs = require('fs');
// var files = fs.readdirSync('/RLE/RLEall/');
let path = `http://C:/Users/DR/Desktop/CODE/g/public/RLEall/zquadloaf.rle`


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
        clen = 0,
        delay = 1 / 2.8,
        tp = 0,
        typk,
        darkmode = 0,
        Xo = 0,
        Yo = 0,
        conlogv = 0,
        oldParse = 0,
        structList = fullRLEs


let types = structList.slice()

let s, n

function setup() {
        
        loadStrings(path,(a)=>console.log(a))
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
        // clen = 1
        let cs1 = darkmode ? [255, 255, 255] : [0, 0, 0]
        // cs.push(cs1)
        cs.push(cs1)
        // for (let c = 0; c < clen - 1; c++) cs.push([floor(random(255)), floor(random(255)), floor(random(255))])

        Xo = grid.length,
                Yo = grid[0].length

        if (!oldParse) typk = parseRLEData2(types[tp])
}


//////
////s/ WORKING HERE!! trying to return a bounding box from make() to update active by appending curret active with . doubel = sign was problem
function make(pos, type) {
        let x = pos[0],
                y = pos[1]
        let typ
        if (oldParse) typ = parseRLEData(types[type])
        else {
                typk = parseRLEData2(types[type])
                typ = typk[1]
        }

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
                // console.log("box", pos[0], pos[1], mpos[0], mpos[1])
                let poop = updateActive2(pos[0], pos[1], mpos[0], mpos[1])
                // console.log("Poop", poop)
                active.push(poop)
        }
        c++
}

function cellsToCheck2(wid, hei, ar) { // frame
        // active = cellsToCheck(Xo, Yo, active)
        let aC = []
        let arr = ar //should just be the active arr here idk why [0] is needed
        if (conlogv == -1) console.log('arr', arr)
        conlogv = 0
        // console.log("act1", arr)
        if (!arr) return []
        // console.log("act", arr.length)
        for (let i = 0; i < arr.length; i++) {
                // console.log("!?", arr[i])
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
                        // console.log("pppppppp",X,Y,x1,y1,x2,y2,i,j)
                        if (grid[i][j] == 1) {
                                for (let m = -1; m < 2; m++) {
                                        for (let k = -1; k < 2; k++) activ.push([(i + m + X) % X, (j + k + Y) % Y])
                                }
                        }
                }
        }
        return Array.from(new Set(activ.map(JSON.stringify)), JSON.parse);
}

function d() {
        // active = updateActive()
        // console.log("activea",active)
        // active = cellsToCheck2(Xo, Yo, active)ck
        show()
        next()
}

function next5() {
        // if (frameCount % 90 == 0) console.log("5br")
        // nGrid = JSON.parse(JSON.stringify(grid))
        nGrid = grid.slice()
        let X = Xo - 1,
                Y = Yo - 1

        // grid = JSON.parse(JSON.stringify(dGrid))

        for (let m = 0; m < active.length; m++) {
                let i = active[m][0],
                        j = active[m][1]
                let b = 0

                for (let n = -1; n < 2; n++)
                        for (let k = -1; k < 2; k++) b += (n == 0 && k == 0) ? 0 : nGrid[(i + n + X) % X][(j + k + Y) % Y]
                if (nGrid[i][j] == 0) grid[i][j] = born(b) ? 1 : 0 //bornorremain dead
                else grid[i][j] = survive(b) ? 1 : 0 //survive or nah
        }
}

function next5Copy() {
        // if (frameCount % 90 == 0) console.log("5br")
        nGrid = JSON.parse(JSON.stringify(grid))
        let X = Xo - 1,
                Y = Yo - 1

        // grid = JSON.parse(JSON.stringify(dGrid))

        for (let m = 0; m < active.length; m++) {
                let i = active[m][0],
                        j = active[m][1]
                let b = 0
                for (let n = -1; n < 2; n++) {
                        for (let k = -1; k < 2; k++) {
                                b += (n == 0 && k == 0) ? 0 : nGrid[(i + n + X) % X][(j + k + Y) % Y]

                        }
                }
                if (nGrid[i][j] == 0) grid[i][j] = born(b) ? 1 : 0 //bornorremain dead
                else grid[i][j] = survive(b) ? 1 : 0 //survive or nah
                // console.log('gcheck', m, g[i][j] == nGrid[i][j])
        }
        // console.log("ENDFRAME", "Gg", grid)
}

function show2() {
        // if (frameCount % 90 == 0) console.log("so2")
        for (let p = 0; p < active.length; p++) {
                if (s2) {
                        fill(255, 0, 0)
                        rect(active[p][0] * cellSize + offset2, active[p][1] * cellSize, cellSize)
                }
                if (grid[active[p][0]][active[p][1]] == 1) {
                        // fill(cs[floor(grid[i][j])][0], cs[floor(grid[i][j])][1], cs[floor(grid[i][j])][2])
                        fill(0)
                        rect(active[p][0] * cellSize + offset2, active[p][1] * cellSize, cellSize)
                }
                fill(255)
        }
}

function draw() {
        if (!p) return
        document.getElementById('l').innerHTML = `${c}` // Frame: ${frameCount}`
        document.getElementById('t').innerHTML = oldParse ? tp : typk[0]
        document.getElementById('h').innerHTML = `Rule: ${rs} ${frameRate().toPrecision(2)} ${frameCount}`
        let bg = darkmode ? 0 : 255
        background(bg)
        d()
}

/////////
////////

/////////
////////

function born(k) {
        return rules[0].includes(k)
}

function survive(k) {
        return rules[1].includes(k)
}

function cellsToCheck(wid, hei, arr) {
        // active = cellsToCheck(Xo, Yo, active)
        let aC = []
        for (let i = 0; i < arr.length; i++) {
                if (grid[arr[i][0]][arr[i][1]] == 1) {
                        for (let j = -1; j < 2; j++) {
                                for (let k = -1; k < 2; k++) {
                                        let cnt2 = 0
                                        for (let m = 0; m < aC.length; m++) {
                                                if ((arr[i][0] + j + wid) % wid == aC[m][0] && (arr[i][1] + k + hei) % hei == aC[m][1]) {
                                                        cnt2++
                                                        break
                                                }
                                        }
                                        if (cnt2 == 0) aC.push([(arr[i][0] + j + wid) % wid, (arr[i][1] + k + hei) % hei])
                                }
                        }
                }
        }
        // console.log(aC.length== Array.from(new Set(aC.map(JSON.stringify)), JSON.parse).length)
        return aC
        // Array.from(new Set(aC.map(JSON.stringify)), JSON.parse)
}

function updateActive() {
        let activ = []
        let X = Xo - 1,
                Y = Yo - 1
        for (let i = 0; i < X; i++) {
                for (let j = 0; j < Y; j++) {
                        if (grid[i][j] != 0) {
                                for (let m = -1; m < 2; m++) {
                                        for (let k = -1; k < 2; k++) activ.push([(i + k + X) % X, (j + m + Y) % Y])
                                }
                        }
                }
        }
        return Array.from(new Set(activ.map(JSON.stringify)), JSON.parse);
}

function show() {
        // if (t != 1 && frameCount % t == 0) p = (p + 1) % clen
        // if (frameCount % 90 == 0) console.log("so1")

        for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[0].length; j++) {
                        if (grid[i][j] != 0) {
                                // fill(cs[floor(grid[i][j])][0], cs[floor(grid[i][j])][1], cs[floor(grid[i][j])][2])
                                fill(0)
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

function next2() {
        let lookup = [ //[[0x,0y],[10x,10y]]
                [],
                []
        ]

        for (let i = 0; i < nGrid.length; i++) {
                if (nGrid[i].reduce((a, c) => a + c) > 0) {
                        lookup[0].push(i <= 10 ? 0 : i - 9)
                        break
                }
        }

        for (let i = nGrid.length - 1; i >= 0; i--) {
                if (nGrid[i].reduce((a, c) => a + c) > 0) {
                        lookup[1].push(i >= nGrid.length - 10 ? nGrid.length : i + 9)
                        break
                }
        }
        for (let i = 0; i < nGrid[0].length; i++) {
                for (let j = 0; j < nGrid.length; j++) {
                        if (nGrid[j][i] > 0) {
                                lookup[0].push(i <= 10 ? 0 : i - 9)
                                break
                        }
                }
        }

        for (let i = nGrid[0].length - 1; i >= 0; i--) {
                for (let j = nGrid.length - 1; j >= 0; j--) {
                        if (nGrid[j][i] > 0) {
                                lookup[1].push(i >= nGrid.length - 10 ? nGrid.length : i + 9)
                                break
                        }
                }
        }
        let X = nGrid.length //-1
        for (let i = 0; i < X; i++) {
                if (i < lookup[0][0] && i != 0 && i > lookup[1][0] && i != X + 1) continue
                grid[i] = []
                let Y = nGrid[0].length //-1
                for (let j = 0; j < Y; j++) {
                        if (i < lookup[0][1] && i != 0 && i > lookup[1][1] && i != Y + 1) continue
                        let k = (nGrid[(i - 1 + X) % X][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[i][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i - 1 + X) % X][j] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][j] == 0 ? 0 : 1) + (nGrid[(i - 1 + X) % X][(j + 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[i][(j + 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][(j + 1 + Y) % Y] == 0 ? 0 : 1)
                        if (nGrid[i][j] == 0) grid[i][j] = born(k) ? 1 : 0 //bornordie
                        else grid[i][j] = survive(k) ? nGrid[i][j] : 0 //survive or die
                }
        }

}
//the plan:
/*
active array stores location of active and active adjacent cells
next3 loops through active cells and does normal GOL stuff
active array is reestablsihed each round using previous state as seed
every time touchstarted active is rewritten
*/
function next3() {
        let X = Xo - 1,
                Y = Yo - 1
        console.log('a', active)
        active1 = cellsToCheck(Xo, Yo, active)
        console.log('ac', active, 'ac1', active1)
        active = active1.slice()

        for (let i = 0; i < Xo; i++) {
                for (let j = 0; j < Yo; j++) {
                        grid[i][j] = 0
                }

        }
        for (let m = 0; m < active.length; m++) {
                let i = active[m][0],
                        j = active[m][1]
                let k = (nGrid[(i - 1 + X) % X][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[i][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][(j - 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i - 1 + X) % X][j] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][j] == 0 ? 0 : 1) + (nGrid[(i - 1 + X) % X][(j + 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[i][(j + 1 + Y) % Y] == 0 ? 0 : 1) + (nGrid[(i + 1 + X) % X][(j + 1 + Y) % Y] == 0 ? 0 : 1)
                if (nGrid[i][j] == 0) grid[i][j] = born(k) ? 1 : 0 //bornordie
                else grid[i][j] = survive(k) ? nGrid[i][j] : 0 //survive or die
        }

}

function keyPressed() {
        if (key == 'f') {
                let bgc = darkmode ? 0 : 255
                background(bgc)
                d()
        }
        if (key == 'p') p = p == 1 ? 0 : 1
        if (key == 's') s2 = s2 == 1 ? 0 : 1
}

function next4() {
        nGrid = grid.slice()

        let X = Xo - 1,
                Y = Yo - 1

        for (let m = 0; m < active.length; m++) {
                let i = active[m][0],
                        j = active[m][1]

                let b = 0
                for (let n = -1; n < 2; n++) {
                        for (let k = -1; k < 2; k++) b += (n == 0 && k == 0) ? 0 : nGrid[(i + n + X) % X][(j + k + Y) % Y] == 0 ? 0 : 1
                } //calculating the same stuff loads of times.
                if (nGrid[i][j] == 0) grid[i][j] = born(b) ? 1 : 0 //bornordie
                else grid[i][j] = survive(b) ? 1 : 0 //survive or die
        }
}

function ranclr(ran) {
        grid = []
        for (let i = 0; i < floor(height / cellSize); i++) {
                grid.push([])
                for (let j = 0; j < floor(width / cellSize); j++) grid[i].push(ran == 1 ? floor(random(2)) : 0)
        }
        nGrid = grid.slice()
}

function cl(p, o) {
        console.log(o || '', JSON.stringify(p));
}



// pre setup
//let types = [[c],[[0,1],[0,-1],[-1,0],[1,-1]],[[0,1],[0,-1],[-1,-1],[-2,0]],[0],[0]] 

//next5
// console.log(nGrid[(i + n + X) % X][(j + k + Y) % Y]) 
// console.log(`i ${i}, j ${j}, n ${n}, k ${k}, ${[i+n,j+k]}, ${nGrid[(i + n + X) % X][(j + k + Y) % Y]}, bc ${bc}`)