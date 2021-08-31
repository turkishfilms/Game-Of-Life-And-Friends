let structs = ['19b2o10bo21b2o15b$b3o7bo18b2o9b3o14bo11b$b2o2bob2ob2o5b2o2bo6b5o7bo10b2o2bo2b3o7bob$3b3o4bo5bo10bo6bo3b2o4bo5bo6bobo2bobob2o2b$bo2bobo3bo4b2o4b3o3bobo2b2o4b3o3bobo2b2o4b2o2bobo2bo3b2o$o4bo4bo3bo2bo3b2o4bo5bo10bo6bo3b3o2b3o7b$o4bo4bo12bo10b2o2bo6b5o10bo9b$bo2bobo3bo13b3o20b2o21b$3b3o4bo25b2o10bo21b$b2o2bob2ob2o58b$b3o7bo!','24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!','1bo$2bo$3o!','3b3o12b$3bo2b3o9b$4bobo11b$2o7bo8b$obo4bo2bo7b$o8b2o7b$b2o15b$bo2bo5bob2o4b$bo9b2obo3b$3bobo6b2o2bob$4b2obo4b2o3bo$8bo7bob$7b4o3bobob$7bob2o3b4o$8bo3b2obo2b$13b2o3b$9bob3o4b$10bo2bo!','939bo$938bobo$938b2o16$925bo$924bobo$923bobo$923b2o3$925b2o$925bobo!']

let caRules = ['','']

let rule = `B1357/S1357 B1357/S02468 B2/S B2/S0 B3/S012345678 B3/S12 B3/S1234 B3/S12345 B3/S23 B36/S125 B36/S23 B368/S245 B3678/S34678 B37/S23 B38/S23`

let ruleog = `B1357/S1357
B1357/S02468
B2/S
B2/S0
B3/S012345678
B3/S12
B3/S1234
B3/S12345
B3/S23
B36/S125
B36/S23
B368/S245
B3678/S34678
B37/S23
B38/S23`


function parseRLEData(str){
        let rs = str.match(/[0-9]*[bo\$\!]?/g)
        let rr = []
        let pp = []
        for (let i = 0; i < rs.length; i++){
                if(rs[i] == "!") {
                        rr.push(pp)
                        pp=[]
                        break
                }
                if(rs[i] == "$") {
                        rr.push(pp)
                        pp=[]
                        continue
                }
                if(rs[i].length>1){
                        let rep = rs[i].match(/[0-9]*/) * 1
                        let cell = rs[i][rs[i].length-1] == "b"?0:1
                        for(let k = 0; k < rep; k++) pp.push(cell) //20
                }else pp.push(rs[i]=="b"?0:1)
        }
        return rr
}

function parseRules(rulestr){

}

//939bo$938bobo$938b2o16$925bo$924bobo$923bobo$923b2o3$925b2o$925bobo$
