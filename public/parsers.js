
function parseRLEData2(str) {
    //full rle stuff 
    let str2 = str.split(/(\r\n|\n|\r)/g)
    let ns
    str2.forEach((e) => {
            if (e[0] == "x") ns = [str2.splice(str2.indexOf(e) + 2).join('').replace(/(\r\n|\n|\r)/g, ''), str2.join('').replace(/(\r\n|\n|\r)/g, '').split("#")[1]]
    })
    //struct stuff

    let instructs = ns[0].match(/[0-9]*[bo\$\!]?/g) //split into individual instrcution

    let final = []
    let rows = []
    for (let i = 0; i < instructs.length; i++) {

            if (instructs[i] == "!") {
                    final.push(rows)
                    rows = []
                    break
            }
            if (instructs[i] == "$") {
                    final.push(rows)
                    rows = []

                    continue
            }
            if (instructs[i].length > 1) {
                    let rep = instructs[i].match(/[0-9]*/) * 1
                    // if(rep == 32)5(rep)
                    if (instructs[i].includes("$")) {
                            final.push(rows)
                            rows = []
                            for (let i = 0; i < rep - 1; i++) final.push([])
                            continue
                    }
                    let cell = instructs[i][instructs[i].length - 1] == "b" ? 0 : 1
                    for (let k = 0; k < rep; k++) rows.push(cell) //20
            } else rows.push(instructs[i] == "b" ? 0 : 1)
    }
    return [ns[1], final] // [name,struct]



    //         let str20 = str22.split(/(\r\n|\n|\r)/g)


    //       let ns; str20.forEach((e) =>{  if (e[0] == "x") ns = [str20.splice(str20.indexOf(e) + 2).join('').replace(/(\r\n|\n|\r)/g, ''), str20.join('').replace(/(\r\n|\n|\r)/g, '').split("#")[1]]
    //                                    })
}


let ruleog = `B3/S23
B3/S12345
B1357/S1357
B1357/S02468
B2/S
B2/S0
B3/S012345678
B3/S12
B3/S1234
B36/S125
B36/S23
B368/S245
B3678/S34678
B37/S23
B38/S23`

let rrog = ruleog.split('\n') //list

function parseRules(rulestr) {
    let str = rulestr.match(/[BSbs][0-9]*/g)
    let B = str[0].length == 1 ? [] : str[0].split('').splice(1),
            S = str[1].length == 1 ? [] : str[1].split('').splice(1)
    B.forEach((v, i, a) => a[i] = v *= 1)
    S.forEach((v, i, a) => a[i] = v *= 1)

    return [B, S]
    // return [str[0].length == 1 ? [] : str[0].split('').splice(1).toString().replaceAll(',','') * 1, str[1].length == 1 ? [] : str[1].split('').splice(1).toString().replaceAll(',','') * 1]
    // return [str[0].length == 1 ? [] : (str[0].replace(/[Bb]/g,'')*1).split(''), str[1].length == 1 ? [] : (str[1].replace(/[Ss]/g,'')*1).split('')]
}


function fixTrailingLetter(str) {
    let str2 = str
    let pqq = str.match(/[bo][0-9]+\$/g)
    if (pqq == null) return str2

    for (let i = 0; i < pqq.length; i++) str2 = str2.replace(pqq[i], `${pqq[i].split('').slice(0,-1).toString().replace(',','')}${pqq[i][0] == "o"?"b":"o"}$`)
    return str2
}