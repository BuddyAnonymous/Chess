let table = [["R2","K2","B2","Q2","C2","B2","K2","R2"],
             ["P2","P2","P2","P2","P2","P2","P2","P2"],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             ["P1","P1","P1","P1","P1","P1","P1","P1"],
             ["R1","K1","B1","Q1","C1","B1","K1","R1"]
            ]
for(let i = 0;i < 8;i++){
    for(let j = 0;j < 8 ;j++){
        var img = document.createElement("img")
        var el = document.querySelectorAll(".grid-item")[i*8 + j]
        el.setAttribute('id',`a${i * 8 + j + 1}`)
        if(table[i][j] != ""){
        img.src = checkPiece(i,j)
        img.style.width = "80px"
        img.style.height = "80px"
        img.style.cursor = "pointer"
        img.draggable = true
        console.log(el.id)
        el.appendChild(img)
        }
        
    }
}
let source = ""
let starter
for(var elementTarget of document.querySelectorAll(".grid-item")){
    if(document.querySelectorAll(".grid-item"))
elementTarget.addEventListener("dragstart",function(event){
    event.dataTransfer.setData("text/plain",event.target.id)
    source = this.children[0].src
    starter = this
    console.log('k')
    event.target.style.opacity = 1;
})

elementTarget.addEventListener("dragover",function(event){
    event.preventDefault()
})

elementTarget.addEventListener("drop",function(event){
    event.preventDefault()
    console.log(starter.id)
    if(movement(convertID(starter.id)[0],convertID(starter.id)[1],table[convertID(starter.id)[0]][convertID(starter.id)[1]])[convertID(event.target.id)[0]][convertID(event.target.id)[1]] == "O"){
    var img = document.createElement("img")
    img.src = source
    img.style.width = "80px"
    img.style.height = "80px"
    img.style.cursor = "pointer"
    img.draggable = true
    event.target.appendChild(img)
    starter.removeChild(starter.children[0])
    table[convertID(event.target.id)[0]][convertID(event.target.id)[1]] = table[convertID(starter.id)[0]][convertID(starter.id)[1]]
    table[convertID(starter.id)[0]][convertID(starter.id)[1]] = ""
    console.log(table)
    }

})
}


function checkPiece(i,j){
switch(table[i][j]){
    case "P2" : return "images/pawn_black.svg.png"
    case "C2" : return "images/king_black.svg.png"
    case "B2" : return "images/bishop_black.svg.png"
    case "K2" : return "images/knight_black.svg.png"
    case "R2" : return "images/rook_black.svg.png"
    case "Q2" : return "images/queen_black.svg.png"
    case "P1" : return "images/pawn_white.svg.png"
    case "C1" : return "images/king_white.svg.png"
    case "B1" : return "images/bishop_white.svg.png"
    case "K1" : return "images/knight_white.svg.png"
    case "R1" : return "images/rook_white.svg.png"
    case "Q1" : return "images/queen_white.svg.png"
}
}

function movement(i,j,piece){
    let table = [
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ],
             [ "" , "" , "" , "" , "" , "" , "" , "" ]
            ]
    let team = piece[1] == "1" ? "white" : "black" 
    let i1 = i,j1 = j
    piece = piece[0]
    console.log(piece)
    switch(piece){
        case "B": while(j1 > -1 && i1 > -1){
            if(document.getElementById(`a${i1*8 + j1 + 1}`).children.length == 1 && i1 != i && j1 != j){
                console.log(`a${i1*8 + j1 + 1}`)
                break;
            }
            table[i1][j1] = "O"
            i1--
            j1--
        }
        i1 = i
        j1 = j
        while(j1 < 8 && i1 > -1){
            if(document.getElementById(`a${i1*8 + j1 + 1}`).children.length == 1 && i1 != i && j1 != j){
                break;
            }
            table[i1][j1] = "O"
            i1--
            j1++
        }
        i1 = i
        j1 = j
        while(j1 < 8 && i1 < 8){
            console.log((document.getElementById(`a${i*8 + j + 1}`).children).length)
            if(document.getElementById(`a${i1*8 + j1 + 1}`).children.length == 1 && i1 != i && j1 != j){
                console.log(`a${i1*8 + j1 + 1}`)
                break;
            }
            table[i1][j1] = "O"
            i1++
            j1++
        }
        i1 = i
        j1 = j
        while(j1 > -1 && i1 < 8){
            if(document.getElementById(`a${i1*8 + j1 + 1}`).children.length == 1 && i1 != i && j1 != j){
                break;
            }
            table[i1][j1] = "O"
            i1++
            j1--
        }
        console.log(table)
        return table
        case "P":
            if(team == "white"){
                table[i1 - 1][j1] = "O"
                if(i1 == 6)
                table[i1 - 2][j1] = "O"
            }
            if(team == "black"){
                table[i1 + 1][j1] = "O"
                if(i1 == 1)
                table[i1 + 2][j1] = "O"
            }
            return table
    }

}

function convertID(id){
    let i
    let j
    if(id.length == 3)
    {
    i = id.slice(-2)
    j = id.slice(-2)
    }
    else {
    i = id[1]
    j = id[1]
    }
    i = parseInt(i) - 1
    i = Math.floor(i / 8)
    j = parseInt(j) - 1
    j = j % 8

    return [i,j]
}