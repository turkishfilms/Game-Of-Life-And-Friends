
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
