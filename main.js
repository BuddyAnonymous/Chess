function exitUpgradePawn(event){
    if(upgradePawnShown == true){
        if(starter.src.includes("/images/pawn_white.svg.png") || starter.src.includes("/images/pawn_black.svg.png")){
        document.getElementById(startPos).appendChild(starter)
        starter.style.left = document.getElementById(startPos).style.left
        starter.style.top = document.getElementById(startPos).style.top
        }
        if(event.target.classList.contains("pieces")){
            starter = event.target
            startPos = event.target.parentNode.id
        }
        else{
            starter = undefined
            startPos = undefined
        }
        upgradePawnShown = false
        try{
        document.getElementById("container").removeChild(upgradePawn)
        }
    catch{

    }
selected = false
}
}
function copyMatrix(matrix) {
    const newMatrix = new Array(matrix.length)
  
    for (let i = 0; i < matrix.length; i++) {
      const newRow = new Array(matrix[i].length)
      for (let j = 0; j < matrix[i].length; j++) {
        newRow[j] = matrix[i][j]
      }
      newMatrix[i] = newRow
    }
    return newMatrix
}
function checkIfCheck(newTable){
    let kingPosI
    let kingPosJ
    for(let i = 0;i < 8;i++){
        for(let j = 0;j < 8;j++){
            if(newTable[i][j] == "C" + potez.toString()){
                kingPosI = i
                kingPosJ = j
            }
        }
    }
    for(let i = 0;i < 8;i++){
        for(let j = 0;j < 8;j++){
            if(newTable[i][j] != "" && !newTable[i][j].includes(potez.toString())){
                if(movement(i,j,newTable[i][j])[kingPosI][kingPosJ] == "O"){
                    return true
                }
            }
        }
    }
    return false
}
function addHint(i,j,i1,j1,newTable){
    newTable[i1][j1] = newTable[i][j]
    newTable[i][j] = ""
    let spareTable = copyMatrix(table)
    table = newTable
    if(checkIfCheck(table)){
        table = copyMatrix(spareTable)
        return false
    }
    table = copyMatrix(spareTable)
    return true
}
function addPieceEventListener(piece){
    piece.addEventListener("mousedown", (event) => {
      listenerFunction(event, piece);
    });
  }
function listenerFunction(event,element){
    if(selected == true && table[convertID(startPos)[0]][convertID(startPos)[1]].includes(potez.toString())){
    hints = movement(convertID(startPos)[0], convertID(startPos)[1], table[convertID(startPos)[0]][convertID(startPos)[1]])     
    if(hints[convertID(event.target.parentNode.getAttribute("id"))[0]][convertID(event.target.parentNode.getAttribute("id"))[1]] == "O" && upgradePawnShown == false){
        return 0
    }
}
if(upgradePawnShown == true){
    exitUpgradePawn(event)
}
    startPos = element.parentNode.id
    starter = element
    selected = true
    element.style.position = "absolute"
    starter.style.left = `${event.clientX - 40}px`
    starter.style.top = `${event.clientY - 40}px`
    hints = movement(convertID(startPos)[0], convertID(startPos)[1], table[convertID(startPos)[0]][convertID(startPos)[1]])
    clearTableHints()
    if(table[convertID(startPos)[0]][convertID(startPos)[1]].includes(potez.toString())){
        addTableHints()
}
    element.style.zIndex = "1"
    document.addEventListener("mousemove", onDrag)

}
function upgradePawnPiece(piece){
    let newElement = document.getElementById("container")
    newElement.removeChild(upgradePawn)
    let newChild = document.getElementById(elId)
    if(newChild.children.length > 0){
    newChild.removeChild(newChild.children[0])
    }
    upgradePawnShown = false
    if(piece.src.includes("queen")){
        queen = queen.cloneNode(true)
        if(potez == 1){
            queen.src = "images/queen_white.svg.png"
        }
        else{
            queen.src = "images/queen_black.svg.png"
        }
        addPieceEventListener(queen)
        newChild.appendChild(queen)
        table[convertID(elId)[0]][convertID(elId)[1]] = "Q" + potez.toString()
        table[convertID(startPos)[0]][convertID(startPos)[1]] = ""
    }
    if(piece.src.includes("knight")){
        knight = knight.cloneNode(true)
        if(potez == 1){
            knight.src = "images/knight_white.svg.png"
        }
        else{
            knight.src = "images/knight_black.svg.png"
        }
        addPieceEventListener(knight)
        newChild.appendChild(knight)
        table[convertID(elId)[0]][convertID(elId)[1]] = "K" + potez.toString()
        table[convertID(startPos)[0]][convertID(startPos)[1]] = ""
    }
    if(piece.src.includes("rook")){
        rook = rook.cloneNode(true)
        if(potez == 1){
            rook.src = "images/rook_white.svg.png"
        }
        else{
            rook.src = "images/rook_black.svg.png"
        }
        addPieceEventListener(rook)
        newChild.appendChild(rook)
        table[convertID(elId)[0]][convertID(elId)[1]] = "R" + potez.toString()
        table[convertID(startPos)[0]][convertID(startPos)[1]] = ""
    }
    if(piece.src.includes("bishop")){
        bishop = bishop.cloneNode(true)
        if(potez == 1){
            bishop.src = "images/bishop_white.svg.png"
        }
        else{
            bishop.src = "images/bishop_black.svg.png"
        }
        addPieceEventListener(bishop)
        newChild.appendChild(bishop)
        table[convertID(elId)[0]][convertID(elId)[1]] = "B" + potez.toString()
        table[convertID(startPos)[0]][convertID(startPos)[1]] = ""
    }


    if(potez == 1){
        potez = 2
    }
    else{
        potez = 1
    }
    selected = false
    starter = undefined
    startPos = undefined
}
function clearTableHints(){
    for (let k of document.getElementsByClassName("grid-item")) {
        k.classList.remove("hint-black")
        k.classList.remove("hint-white")
        k.classList.remove("hint-eat")
    }
}
function addTableHints(){
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (hints[i][j] == "O") {
                hintElement = document.getElementById(`a${i*8 + j + 1}`)
                if(table[i][j] != ""){
                    hintElement.classList.add("hint-eat")
                }
                else{
                if (hintElement.classList.contains("black")) {
                    hintElement.classList.add("hint-black")
                } else {
                    hintElement.classList.add("hint-white")
                }
            }
            }
        }
    }
}
function checkForCastle(castleId,castleStartPos){
    if(table[convertID(castleId)[0]][convertID(castleId)[1]] == "C1"){
        castle[2] = 0
        castle[3] = 0
    }
    if((table[convertID(castleId)[0]][convertID(castleId)[1]].includes("R") && convertID(castleStartPos)[0] == 7 && convertID(castleStartPos)[1] == 7) || (convertID(castleId)[0] == 7 && convertID(castleId)[1] == 7)){
        castle[3] = 0
    }
    if((table[convertID(castleId)[0]][convertID(castleId)[1]].includes("R") && convertID(castleStartPos)[0] == 7 && convertID(castleStartPos)[1] == 0) || (convertID(castleId)[0] == 7 && convertID(castleId)[1] == 0)){
        castle[2] = 0
    }
    if(table[convertID(castleId)[0]][convertID(castleId)[1]] == "C2"){
        castle[0] = 0
        castle[1] = 0
    }
    if((table[convertID(castleId)[0]][convertID(castleId)[1]].includes("R") && convertID(castleStartPos)[0] == 0 && convertID(castleStartPos)[1] == 7) || (convertID(castleId)[0] == 0 && convertID(castleId)[1] == 7)){
        castle[1] = 0
    }
    if((table[convertID(castleId)[0]][convertID(castleId)[1]].includes("R") && convertID(castleStartPos)[0] == 0 && convertID(castleStartPos)[1] == 0) || (convertID(castleId)[0] == 0 && convertID(castleId)[1] == 0)){
        castle[0] = 0
    }
}
function checkIfEnd(){
    let tableEnd
    for(let i = 0;i < 8;i++){
        for(let j = 0;j < 8;j++){
            if(table[i][j].includes(potez.toString())){
                tableEnd = movement(i,j,table[i][j])
                for(let k = 0;k < 8;k++){
                    for(let m = 0;m < 8;m++){
                        if(tableEnd[k][m] == "O"){
                            availableMoves++
                        }
                    }
                }
            }
        }
    }
    return availableMoves
}
function checkIfDraw(){
    if(availableMoves == 0 && checkIfCheck(table) == false){
        return true
    }
    let pieceList = []
    let newPieceList = []
    for(let i = 0;i < 8;i++){
        for(let j = 0;j < 8;j++){
        if(table[i][j] != ""){
            pieceList.push(table[i][j])
        }
    }
    }
    console.log(pieceList)
    pieceList.splice(pieceList.indexOf("C1"),1)
    pieceList.splice(pieceList.indexOf("C2"),1)
    newPieceList = pieceList
    console.log(newPieceList)
    if(newPieceList.length == 0){
        console.log('usao1')
        return true
    }
    newPieceList = pieceList
    console.log(newPieceList)
    newPieceList.splice(newPieceList.indexOf("B1"),1)
    if(newPieceList.length == 0){
        console.log('usao2')
        return true
    }
    newPieceList = pieceList
    console.log(newPieceList)
    newPieceList.splice(newPieceList.indexOf("B2"),1)
    if(newPieceList.length == 0){
        console.log('usao3')
        return true
    }
    newPieceList = pieceList
    console.log(newPieceList)
    newPieceList.splice(newPieceList.indexOf("K1"),1)
    if(newPieceList.length == 0){
        console.log('usao4')
        return true
    }
    newPieceList = pieceList
    console.log(newPieceList)
    newPieceList.splice(newPieceList.indexOf("K2"),1)
    if(newPieceList.length == 0){
        console.log('usao5')
        return true
    }
    newPieceList = pieceList
    newPieceList.splice(newPieceList.indexOf("B1"),1)
    newPieceList.splice(newPieceList.indexOf("B2"),1)
    if(newPieceList.length == 0){
        console.log('usao6')
        return true
    }
    newPieceList = pieceList
    newPieceList.splice(newPieceList.indexOf("K1"),1)
    newPieceList.splice(newPieceList.indexOf("K2"),1)
    if(newPieceList.length == 0){
        console.log('usao7')
        return true
    }
    newPieceList = pieceList
    newPieceList.splice(newPieceList.indexOf("B1"),1)
    newPieceList.splice(newPieceList.indexOf("K2"),1)
    if(newPieceList.length == 0){
        console.log('usao8')
        return true
    }
    newPieceList = pieceList
    newPieceList.splice(newPieceList.indexOf("K1"),1)
    newPieceList.splice(newPieceList.indexOf("B2"),1)
    if(newPieceList.length == 0){
        console.log('usao9')
        return true
    }


    return false
}
let clearHints = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
]
let table = [
    ["R2", "K2", "B2", "Q2", "C2", "B2", "K2", "R2"],
    ["P2", "P2", "P2", "P2", "P2", "P2", "P2", "P2"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P1", "P1", "P1", "P1", "P1", "P1", "P1", "P1"],
    ["R1", "K1", "B1", "Q1", "C1", "B1", "K1", "R1"]
]
let positionsDict = {}
let availableMoves = 0
let castle = [1,1,1,1]
let potez = 1
let endGame = document.createElement("P")
endGame.style.width = "45%"
endGame.style.textAlign = "center"
endGame.style.fontSize = "65px"
endGame.style.position = "absolute"
endGame.style.alignSelf = "center"
endGame.style.paddingTop = "65px"
endGame.style.height = "200px"
endGame.style.color = "red"
endGame.style.backgroundColor = "rgba(0,0,0,0.5)"
endGame.setAttribute('class','googleFont')
let upgradePawnShown = false
let upgradePawn = document.createElement("div")
upgradePawn.style.height = "360px"
upgradePawn.style.width = "80px"
upgradePawn.style.position = "absolute"
upgradePawn.style.backgroundColor = "white"
upgradePawn.style.display = "flex"
upgradePawn.style.flexDirection = "column"
let pawnUpgradeImg = document.createElement("IMG")
pawnUpgradeImg.src = "images/queen_white.svg.png"
upgradePawn.appendChild(pawnUpgradeImg)
pawnUpgradeImg.addEventListener("mousedown", () => {
    upgradePawnPiece(upgradePawn.children[0])
})
pawnUpgradeImg = document.createElement("IMG")
pawnUpgradeImg.src = "images/knight_white.svg.png"
upgradePawn.appendChild(pawnUpgradeImg)
pawnUpgradeImg.addEventListener("mousedown", () => {
    upgradePawnPiece(upgradePawn.children[1])
})
pawnUpgradeImg = document.createElement("IMG")
pawnUpgradeImg.src = "images/rook_white.svg.png"
upgradePawn.appendChild(pawnUpgradeImg)
pawnUpgradeImg.addEventListener("mousedown", () => {
    upgradePawnPiece(upgradePawn.children[2])
})
pawnUpgradeImg = document.createElement("IMG")
pawnUpgradeImg.src = "images/bishop_white.svg.png"
upgradePawn.appendChild(pawnUpgradeImg)
pawnUpgradeImg.addEventListener("mousedown", () => {
    upgradePawnPiece(upgradePawn.children[3])
})
pawnUpgradeImg = document.createElement("IMG")
pawnUpgradeImg.src = "images/X.png"
pawnUpgradeImg.style.width = "80px"
pawnUpgradeImg.style.height = "40px"
pawnUpgradeImg.addEventListener("mousedown" , (event) => {
    exitUpgradePawn(event)
})
upgradePawn.appendChild(pawnUpgradeImg)
for(let k of upgradePawn.children){
    k.style.cursor = "pointer"
}
upgradePawn.style.top = document.getElementById("container").offsetTop
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        var img = document.createElement("img")
        var el = document.querySelectorAll(".grid-item")[i * 8 + j]
        el.setAttribute('id', `a${i * 8 + j + 1}`)
        if (table[i][j] != "") {
            img.src = checkPiece(i, j)
            img.style.width = "80px"
            img.style.height = "80px"
            img.style.cursor = "pointer"
            img.setAttribute('class', `pieces`)
            el.appendChild(img)
        }

    }
}

function onDrag({
    clientX,
    clientY
}) {
    let container = document.getElementById("container")
    let containerLeft = container.offsetLeft
    let containerTop = container.offsetTop
    if (clientX < containerLeft) {
        starter.style.left = `${containerLeft - 40}px`
    }
    if (clientY < containerTop) {
        starter.style.top = "30px"
    }
    if (clientY > containerTop + 640) {
        starter.style.top = "670px"

    } else if (clientY > containerTop) {
        starter.style.top = `${clientY - 40}px`
    }
    if (clientX > containerLeft + 640) {
        starter.style.left = `${containerLeft + 600}px`
    } else if (clientX > containerLeft) {
        starter.style.left = `${clientX - 36}px`
    }

}
let enPassant = false
let enPassantCord
let source = ""
let starter
let queen
let rook
let bishop
let knight
for (var elementTarget of document.querySelectorAll(".grid-item")) {
    if (elementTarget.children.length == 1) {
        if(elementTarget.children[0].src.includes("queen")){
            queen = elementTarget.children[0].cloneNode(true)
            queen.addEventListener("mousedown", (event) =>{
                listenerFunction(event,queen)
            })
        }
        if(elementTarget.children[0].src.includes("rook")){
            rook = elementTarget.children[0].cloneNode(true)
            rook.addEventListener("mousedown", (event) =>{
                listenerFunction(event,rook)
            })
        }
        if(elementTarget.children[0].src.includes("bishop")){
            bishop = elementTarget.children[0].cloneNode(true)
            bishop.addEventListener("mousedown", (event) =>{
                listenerFunction(event,bishop)
            })
        }
        if(elementTarget.children[0].src.includes("knight")){
            knight = elementTarget.children[0].cloneNode(true)
            knight.addEventListener("mousedown", (event) =>{
                listenerFunction(event,knight)
            })
        }
        elementTarget.children[0].addEventListener("mousedown", function (event) {
            if(selected == true && table[convertID(startPos)[0]][convertID(startPos)[1]].includes(potez.toString())){
            hints = movement(convertID(startPos)[0], convertID(startPos)[1], table[convertID(startPos)[0]][convertID(startPos)[1]])     
            if(hints[convertID(event.target.parentNode.getAttribute("id"))[0]][convertID(event.target.parentNode.getAttribute("id"))[1]] == "O" && upgradePawnShown == false){
                return 0
            }
        }
        if(upgradePawnShown == true){
            exitUpgradePawn(event)
        }
            startPos = this.parentNode.id
            starter = this
            selected = true
            this.style.position = "absolute"
            starter.style.left = `${event.clientX - 40}px`
            starter.style.top = `${event.clientY - 40}px`
            hints = movement(convertID(startPos)[0], convertID(startPos)[1], table[convertID(startPos)[0]][convertID(startPos)[1]])
            clearTableHints()
            if(table[convertID(startPos)[0]][convertID(startPos)[1]].includes(potez.toString())){
                addTableHints()
        }
            this.style.zIndex = "1"
            document.addEventListener("mousemove", onDrag)
        
    }

    )
    }
}
let selected = false
document.addEventListener("mousedown", (event) => {
    if(upgradePawnShown == true && event.target.parentNode != upgradePawn){
        exitUpgradePawn(event)
    }
    if (event.target.tagName == "DIV" && !event.target.classList.contains("hint-black") && !event.target.classList.contains("hint-white") && !event.target.classList.contains("hint-eat") || event.target.parentNode == upgradePawn) {
        selected = false
        clearTableHints()
    }
})
document.addEventListener("wheel",() =>{
    console.log(starter)
    console.log(elId)
    console.log(hints)
    console.log(table)
    console.log(queen)
    console.log(castle)

})
document.addEventListener("mouseup", (event) => {
    if (starter.tagName == "IMG") {
        starter.style.zIndex = "0"
        elId = closestGridItem(event)
        if (elId != 0 && table[convertID(startPos)[0]][convertID(startPos)[1]].includes(potez.toString())) {
            if(table[convertID(elId)[0]][convertID(elId)[1]].includes(potez == 1 ? "2" : "1") && hints[convertID(elId)[0]][convertID(elId)[1]] == "O"){
                if(table[convertID(startPos)[0]][convertID(startPos)[1]].includes("P") && (convertID(elId)[0] == 0 || convertID(elId)[0] == 7)){
                    if(convertID(elId)[0] == 0){
                        upgradePawn.style.left = `${document.getElementById("container").offsetLeft + convertID(elId)[1] * 80}px`
                        upgradePawn.style.top = `${document.getElementById("container").offsetTop}px`
                        upgradePawn.children[0].src = "images/queen_white.svg.png"
                        upgradePawn.children[1].src = "images/knight_white.svg.png"
                        upgradePawn.children[2].src = "images/rook_white.svg.png"
                        upgradePawn.children[3].src = "images/bishop_white.svg.png"
                        document.getElementById("container").appendChild(upgradePawn)
                        upgradePawnShown = true
                        document.getElementById(startPos).removeChild(document.getElementById(startPos).children[0])
                    }
                    else if(convertID(elId)[0] == 7){
                        upgradePawn.style.left = `${document.getElementById("container").offsetLeft + convertID(elId)[1] * 80}px`
                        upgradePawn.style.top = `${document.getElementById("container").offsetTop + 280}px`
                        upgradePawn.children[0].src = "images/queen_black.svg.png"
                        upgradePawn.children[1].src = "images/knight_black.svg.png"
                        upgradePawn.children[2].src = "images/rook_black.svg.png"
                        upgradePawn.children[3].src = "images/bishop_black.svg.png"
                        document.getElementById("container").appendChild(upgradePawn)
                        upgradePawnShown = true
                        document.getElementById(startPos).removeChild(document.getElementById(startPos).children[0])
                    }
                }
                else{
                spot = document.getElementById(startPos)
                newImg = spot.children[0]   
                spot.removeChild(spot.children[0])
                starter = document.getElementById(elId)
                starter.removeChild(starter.children[0])
                starter.appendChild(newImg)
                newImg.style.position = "relative"
                newImg.style.top = "0px"
                newImg.style.left = "0px"
                selected = false
                table[convertID(elId)[0]][convertID(elId)[1]] = table[convertID(startPos)[0]][convertID(startPos)[1]]
                table[convertID(startPos)[0]][convertID(startPos)[1]] = ""
                checkForCastle(elId,startPos)
                if (potez == 1)
                    potez = 2
                else
                    potez = 1
                }
                if(checkIfEnd() == 0 && checkIfCheck(table) == true){
                    endGame.innerText = `Pobedio je ${potez == 1? "Crni" : "Beli"}`
                    document.getElementById("container").appendChild(endGame)
                }
                if(positionsDict[table] == undefined){
                    positionsDict[table] = 1
                }
                else{
                    positionsDict[table]++
                    if(positionsDict[table] == 3 || checkIfDraw() == true){
                        endGame.innerText = `Izjednačeno`
                        document.getElementById("container").appendChild(endGame)
                    }
                }
                clearTableHints()
                availableMoves = 0
            }
            else if (selected == true && movement(convertID(startPos)[0], convertID(startPos)[1], table[convertID(startPos)[0]][convertID(startPos)[1]])[convertID(elId)[0]][convertID(elId)[1]] == 'O') {

                if(table[convertID(startPos)[0]][convertID(startPos)[1]].includes("P") && (convertID(elId)[0] == 0 || convertID(elId)[0] == 7)){
                    if(convertID(elId)[0] == 0){
                        upgradePawn.style.left = `${document.getElementById("container").offsetLeft + convertID(elId)[1] * 80}px`
                        upgradePawn.style.top = `${document.getElementById("container").offsetTop}px`
                        upgradePawn.children[0].src = "images/queen_white.svg.png"
                        upgradePawn.children[1].src = "images/knight_white.svg.png"
                        upgradePawn.children[2].src = "images/rook_white.svg.png"
                        upgradePawn.children[3].src = "images/bishop_white.svg.png"
                        document.getElementById("container").appendChild(upgradePawn)
                        upgradePawnShown = true
                        document.getElementById(startPos).removeChild(document.getElementById(startPos).children[0])
                    }
                    else if(convertID(elId)[0] == 7){
                        upgradePawn.style.left = `${document.getElementById("container").offsetLeft + convertID(elId)[1] * 80}px`
                        upgradePawn.style.top = `${document.getElementById("container").offsetTop + 280}px`
                        upgradePawn.children[0].src = "images/queen_black.svg.png"
                        upgradePawn.children[1].src = "images/knight_black.svg.png"
                        upgradePawn.children[2].src = "images/rook_black.svg.png"
                        upgradePawn.children[3].src = "images/bishop_black.svg.png"
                        document.getElementById("container").appendChild(upgradePawn)
                        upgradePawnShown = true
                        document.getElementById(startPos).removeChild(document.getElementById(startPos).children[0])
                    }
                }
                else{
                if(startPos == "a5" && castle[0] == 1 && elId == "a3"){
                    spot = document.getElementById("a1")
                    newImg = spot.children[0]
                    spot.removeChild(spot.children[0])
                    spot = document.getElementById("a4")
                    spot.appendChild(newImg)
                    castle[0] = 0
                    newImg.style.position = "relative"
                    newImg.style.top = "0px"
                    newImg.style.left = "0px"
                    table[0][0] = ""
                    table[0][3] = "R2"
                }
                if(startPos == "a5" && castle[1] == 1 && elId == "a7"){
                    spot = document.getElementById("a8")
                    newImg = spot.children[0]
                    spot.removeChild(spot.children[0])
                    spot = document.getElementById("a6")
                    spot.appendChild(newImg)
                    castle[1] = 0
                    newImg.style.position = "relative"
                    newImg.style.top = "0px"
                    newImg.style.left = "0px"
                    table[0][7] = ""
                    table[0][5] = "R2"
                }
                if(startPos == "a61" && castle[2] == 1 && elId == "a59"){
                    spot = document.getElementById("a57")
                    newImg = spot.children[0]
                    spot.removeChild(spot.children[0])
                    spot = document.getElementById("a60")
                    spot.appendChild(newImg)
                    castle[2] = 0
                    newImg.style.position = "relative"
                    newImg.style.top = "0px"
                    newImg.style.left = "0px"
                    table[7][0] = ""
                    table[7][3] = "R1"
                }
                if(startPos == "a61" && castle[3] == 1 && elId == "a63"){
                    spot = document.getElementById("a64")
                    newImg = spot.children[0]
                    spot.removeChild(spot.children[0])
                    spot = document.getElementById("a62")
                    spot.appendChild(newImg)
                    castle[3] = 0
                    newImg.style.position = "relative"
                    newImg.style.top = "0px"
                    newImg.style.left = "0px"
                    table[7][7] = ""
                    table[7][5] = "R1"
                }
                try {
                } catch (error) {
                    
                }
                if(enPassant == true && table[convertID(startPos)[0]][convertID(startPos)[1]].includes("P") && table[convertID(elId)[0]][convertID(elId)[1]] == "" && (enPassantCord[0] == convertID(elId)[0] + 1 || enPassantCord[0] == convertID(elId)[0] - 1) && enPassantCord[1] == convertID(elId)[1] && convertID(startPos)[0] == enPassantCord[0]){
                    enPassant = false
                    table[enPassantCord[0]][enPassantCord[1]] = ""
                    spot = document.getElementById(`a${enPassantCord[0] * 8 + enPassantCord[1] + 1}`)
                    spot.removeChild(spot.children[0])
                }
                if(table[convertID(startPos)[0]][convertID(startPos)[0]].includes("P") && (convertID(startPos)[0] == convertID(elId)[0] + 2 || convertID(startPos)[0] == convertID(elId)[0] - 2)){
                    enPassant = true
                    enPassantCord = convertID(elId)
                }
                else{
                    enPassant = false
                }
                spot = document.getElementById(startPos)
                newImg = spot.children[0]
                spot.removeChild(spot.children[0])
                spot = document.getElementById(elId)
                spot.appendChild(newImg)
                newImg.style.position = "relative"
                newImg.style.top = "0px"
                newImg.style.left = "0px"
                selected = false
                table[convertID(elId)[0]][convertID(elId)[1]] = table[convertID(startPos)[0]][convertID(startPos)[1]]
                table[convertID(startPos)[0]][convertID(startPos)[1]] = ""
                checkForCastle(elId,startPos)
                if (potez == 1)
                    potez = 2
                else
                    potez = 1
                }
                clearTableHints()
                if(checkIfEnd() == 0 && checkIfCheck(table) == true){
                    endGame.innerText = `Pobedio je ${potez == 1? "Crni" : "Beli"}`
                    document.getElementById("container").appendChild(endGame)
                }
                if(positionsDict[table] == undefined){
                    positionsDict[table] = 1
                }
                else{
                    positionsDict[table] += 1
                    if(positionsDict[table] == 3 || checkIfDraw() == true){
                        endGame.innerText = `Izjednačeno`
                        document.getElementById("container").appendChild(endGame)
                    }
                }
                availableMoves = 0
                console.log(positionsDict[table])
            } else {
                starter.style.left = document.getElementById(startPos).style.left
                starter.style.top = document.getElementById(startPos).style.top
                starter.style.position = "relative"
            }
        } else {
            starter.style.left = document.getElementById(startPos).style.left
            starter.style.top = document.getElementById(startPos).style.top
            starter.style.position = "relative"
        }

        for (var elementTarget of document.querySelectorAll(".grid-item")) {
            if (elementTarget.children.length == 1) {
                document.removeEventListener("mousemove", onDrag)
            }
        }
    }
})

function checkPiece(i, j) {
    switch (table[i][j]) {
        case "P2":
            return "images/pawn_black.svg.png"
        case "C2":
            return "images/king_black.svg.png"
        case "B2":
            return "images/bishop_black.svg.png"
        case "K2":
            return "images/knight_black.svg.png"
        case "R2":
            return "images/rook_black.svg.png"
        case "Q2":
            return "images/queen_black.svg.png"
        case "P1":
            return "images/pawn_white.svg.png"
        case "C1":
            return "images/king_white.svg.png"
        case "B1":
            return "images/bishop_white.svg.png"
        case "K1":
            return "images/knight_white.svg.png"
        case "R1":
            return "images/rook_white.svg.png"
        case "Q1":
            return "images/queen_white.svg.png"
    }
}

function movement(i, j, piece) {
    let p = piece
    let addToHintTable = (n,m) => {
        if(p[1] == potez.toString()){
            if(addHint(i,j,n,m,copyMatrix(table))){
                possibleMoves[n][m] = "O"
            }
        }
        else{
        possibleMoves[n][m] = "O"
        }
    }
    let possibleMoves = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
    ]
    let team = piece[1] == "1" ? "white" : "black"
    let i1 = i,
        j1 = j
    piece = piece[0]
    let bishopMove = () => {
        while (j1 > -1 && i1 > -1) {
            if ((table[i1][j1][1] != table[i][j][1] && (table[i1][j1][1] == "1" || table[i1][j1][1] == "2")) && i1 != i && j1 != j) {
                addToHintTable(i1,j1)
                break;
            }
            else if(table[i1][j1][1] == table[i][j][1] && (i1 != i || j1 != j)){
                break;
            }
            else if (i1 != i && j1 != j) {
                addToHintTable(i1,j1)
            }
            i1--
            j1--
        }
        i1 = i
        j1 = j
        while (j1 < 8 && i1 > -1) {
            if ((table[i1][j1][1] != table[i][j][1] && (table[i1][j1][1] == "1" || table[i1][j1][1] == "2")) && i1 != i && j1 != j) {
                addToHintTable(i1,j1)
                break;
            }
            else if(table[i1][j1][1] == table[i][j][1] && (i1 != i || j1 != j)){
                break;
            }
            else if (i1 != i && j1 != j) {
                addToHintTable(i1,j1)
            }
            i1--
            j1++
        }
        i1 = i
        j1 = j
        while (j1 < 8 && i1 < 8) {
            if ((table[i1][j1][1] != table[i][j][1] && (table[i1][j1][1] == "1" || table[i1][j1][1] == "2")) && i1 != i && j1 != j) {
                addToHintTable(i1,j1)
                break;
            }
            else if(table[i1][j1][1] == table[i][j][1] && (i1 != i || j1 != j)){
                break;
            }
            else if (i1 != i && j1 != j) {
                addToHintTable(i1,j1)
            }
            i1++
            j1++
        }
        i1 = i
        j1 = j
        while (j1 > -1 && i1 < 8) {
            if ((table[i1][j1][1] != table[i][j][1] && (table[i1][j1][1] == "1" || table[i1][j1][1] == "2")) && i1 != i && j1 != j) {
                addToHintTable(i1,j1)
                break;
            }
            else if(table[i1][j1][1] == table[i][j][1] && (i1 != i || j1 != j)){
                break;
            }
            else if (i1 != i && j1 != j) {
                addToHintTable(i1,j1)
            }
            i1++
            j1--
        }
    }
    let rookMove = () => {
        while (i1 > -1) {
            if ((table[i1][j1][1] != table[i][j][1] && (table[i1][j1][1] == "1" || table[i1][j1][1] == "2")) && (j1 != j || i1 != i)) {
                addToHintTable(i1,j1)
                break;
            }
            else if(table[i1][j1][1] == table[i][j][1] && (i1 != i || j1 != j)){
                break;
            }
            else if (j1 != j || i1 != i)
                addToHintTable(i1,j1)
            i1--
        }
        i1 = i
        j1 = j
        while (j1 > -1) {
            if ((table[i1][j1][1] != table[i][j][1] && (table[i1][j1][1] == "1" || table[i1][j1][1] == "2")) && (j1 != j || i1 != i)) {
                addToHintTable(i1,j1)
                break;
            }
            else if(table[i1][j1][1] == table[i][j][1] && (i1 != i || j1 != j)){
                break;
            }
            else if (j1 != j || i1 != i)
                addToHintTable(i1,j1)
            j1--
        }
        i1 = i
        j1 = j
        while (i1 < 8) {
            if ((table[i1][j1][1] != table[i][j][1] && (table[i1][j1][1] == "1" || table[i1][j1][1] == "2")) && (j1 != j || i1 != i)) {
                addToHintTable(i1,j1)
                break;
            }
            else if(table[i1][j1][1] == table[i][j][1] && (i1 != i || j1 != j)){
                break;
            }
            else if (j1 != j || i1 != i)
                addToHintTable(i1,j1)
            i1++
        }
        i1 = i
        j1 = j
        while (j1 < 8) {
            if ((table[i1][j1][1] != table[i][j][1] && (table[i1][j1][1] == "1" || table[i1][j1][1] == "2")) && (j1 != j || i1 != i)) {
                addToHintTable(i1,j1)
                break;
            }
            else if(table[i1][j1][1] == table[i][j][1] && (i1 != i || j1 != j)){
                break;
            }
            else if (j1 != j || i1 != i)
                addToHintTable(i1,j1)
            j1++
        }
        i1 = i
        j1 = j
    }

    switch (piece) {
        case "B":
            bishopMove()
            return possibleMoves
        case "P":
            if (team == "white") {
                if (i1 - 1 > -1 && j1 < 8 &&  j1 > -1 && table[i1 - 1][j1] == "") {
                    addToHintTable(i1 - 1,j1)
                    if (i1 == 6 && table[i1 - 2][j1] == "")
                        addToHintTable(i1 - 2,j1)
                }
                if(i1 - 1 > -1 && j1 + 1 < 8 && table[i1 - 1][j1 + 1][1] != table[i][j][1] && table[i1 - 1][j1 + 1] != ""){
                    addToHintTable(i1 - 1,j1 + 1)
                }
                if(i1 - 1 > -1 && j1 - 1 > -1 && table[i1 - 1][j1 - 1][1] != table[i][j][1] && table[i1 - 1][j1 - 1] != ""){
                    addToHintTable(i1 - 1,j1 - 1)
                }
                if(enPassant == true && j1 == enPassantCord[1] + 1 && i1 == enPassantCord[0]){
                    addToHintTable(i1 - 1,j1 - 1)
                }
                else if(enPassant == true && j1 == enPassantCord[1] - 1 && i1 == enPassantCord[0]){
                    addToHintTable(i1 - 1,j1 + 1)
                }
            }
            if (team == "black") {
                if (i1 + 1 < 8 && j1 < 8 && j1 > -1 && table[i1 + 1][j1] == "") {
                    addToHintTable(i1 + 1,j1)
                    if (i1 == 1 && table[i1 + 2][j1] == "")
                        addToHintTable(i1 + 2,j1)
                }
                if(i1 + 1 < 8 && j1 + 1 < 8 && table[i1 + 1][j1 + 1][1] != table[i][j][1] && table[i1 + 1][j1 + 1] != ""){
                    addToHintTable(i1 + 1,j1 + 1)
                }
                if(i1 + 1 < 8 && j1 - 1 > -1 && table[i1 + 1][j1 - 1][1] != table[i][j][1] && table[i1 + 1][j1 - 1] != ""){
                    addToHintTable(i1 + 1,j1 - 1)
                }
                if(enPassant == true && j1 == enPassantCord[1] + 1 && i1 == enPassantCord[0]){
                    addToHintTable(i1 + 1,j1 - 1)
                }
                else if(enPassant == true && j1 == enPassantCord[1] - 1 && i1 == enPassantCord[0]){
                    addToHintTable(i1 + 1,j1 + 1)
                }
            }
            return possibleMoves
        case "K":
            if (i1 + 2 < 8 && j1 + 1 < 8 && (document.getElementById(`a${(i1 + 2)*8 + j1 + 2}`).children.length == 0 || table[i1 + 2][j1 + 1][1] != table[i][j][1]))
                addToHintTable(i1 + 2,j1 + 1)
            if (i1 + 2 < 8 && j1 - 1 > -1 && (document.getElementById(`a${(i1 + 2)*8 + j1}`).children.length == 0 || table[i1 + 2][j1 - 1][1] != table[i][j][1]))
                addToHintTable(i1 + 2,j1 - 1)
            if (i1 - 2 > -1 && j1 + 1 < 8 && (document.getElementById(`a${(i1 - 2)*8 + j1 + 2}`).children.length == 0 ||  table[i1 - 2][j1 + 1][1] != table[i][j][1]))
                addToHintTable(i1 - 2,j1 + 1)
            if (i1 - 2 > -1 && j1 - 1 > -1 && (i1 - 2) * 8 + j1 > 0 && (document.getElementById(`a${(i1 - 2)*8 + j1}`).children.length == 0 || table[i1 - 2][j1 - 1][1] != table[i][j][1]))
                addToHintTable(i1 - 2,j1 - 1)
            if (i1 + 1 < 8 && j1 + 2 < 8 && (document.getElementById(`a${(i1 + 1)*8 + j1 + 3}`).children.length == 0 || table[i1 + 1][j1 + 2][1] != table[i][j][1]))
                addToHintTable(i1 + 1,j1 + 2)
            if (i1 + 1 < 8 && j1 - 2 > -1 && (i1 + 1) * 8 + j1 > 0 && (document.getElementById(`a${(i1 + 1)*8 + j1 - 1}`).children.length == 0 || table[i1 + 1][j1 - 2][1] != table[i][j][1]))
                addToHintTable(i1 + 1,j1 - 2)
            if (i1 - 1 > -1 && j1 + 2 < 8 && (i1 - 1) * 8 + j1 + 3 > 0 && (document.getElementById(`a${(i1 - 1)*8 + j1 + 3}`).children.length == 0 || table[i1 - 1][j1 + 2][1] != table[i][j][1]))
                addToHintTable(i1 - 1,j1 + 2)
            if (i1 - 1 > -1 && j1 - 2 > -1 && (i1 - 1) * 8 + j1 - 1 > 0 && (document.getElementById(`a${(i1 - 1)*8 + j1 - 1}`).children.length == 0 || table[i1 - 1][j1 - 2][1] != table[i][j][1]))
                addToHintTable(i1 - 1,j1 - 2)
            return possibleMoves
        case "R":
            rookMove()
            return possibleMoves

        case "Q":
            rookMove()
            bishopMove()
            return possibleMoves
        case "C":
            if(p == "C2" && p[1] == potez.toString() && castle[0] == 1 && table[0][1] == "" && table[0][2] == "" && table[0][3] == ""){
                if(checkIfCheck(table) == false){
                newTableCastle = copyMatrix(table)
                newTableCastle[0][2] = "C2"
                newTableCastle[0][4] = ""
                if(checkIfCheck(newTableCastle) == false){
                    newTableCastle[0][3] = "C2"
                    newTableCastle[0][2] = ""
                    if(checkIfCheck(newTableCastle) == false){
                        possibleMoves[0][2] = "O"
                    }
                }
            }
            }
            if(p == "C2" && p[1] == potez.toString() && castle[1] == 1 && table[0][5] == "" && table[0][6] == ""){
                if(checkIfCheck(table) == false){
                newTableCastle = copyMatrix(table)
                newTableCastle[0][5] = "C2"
                newTableCastle[0][4] = ""
                if(checkIfCheck(newTableCastle) == false){
                    newTableCastle[0][6] = "C2"
                    newTableCastle[0][5] = ""
                    if(checkIfCheck(newTableCastle) == false){
                        possibleMoves[0][6] = "O"
                    }
                }
            }
            }
            if(p == "C1" && p[1] == potez.toString() && castle[2] == 1 && table[7][1] == "" && table[7][2] == "" && table[7][3] == ""){
                if(checkIfCheck(table) == false){
                newTableCastle = copyMatrix(table)
                newTableCastle[7][3] = "C1"
                newTableCastle[7][4] = ""
                if(checkIfCheck(newTableCastle) == false){
                    newTableCastle[7][2] = "C1"
                    newTableCastle[7][3] = ""
                    if(checkIfCheck(newTableCastle) == false){
                        possibleMoves[7][2] = "O"
                    }
                }
            }
            }
            if(p == "C1" && p[1] == potez.toString() && castle[3] == 1 && table[7][5] == "" && table[7][6] == ""){
                if(checkIfCheck(table) == false){
                newTableCastle = copyMatrix(table)
                newTableCastle[7][5] = "C1"
                newTableCastle[7][4] = ""
                if(checkIfCheck(newTableCastle) == false){
                    newTableCastle[7][6] = "C1"
                    newTableCastle[7][5] = ""
                    if(checkIfCheck(newTableCastle) == false){
                        possibleMoves[7][6] = "O"
                    }
                }
            }
            } 
            if (j1 + 1 < 8 && table[i1][j1 + 1][1] != table[i1][j1][1]) {
                addToHintTable(i1,j1 + 1)
            }
            if (j1 - 1 > -1 && table[i1][j1 - 1][1] != table[i1][j1][1]) {
                addToHintTable(i1,j1 - 1)
            }
            if (i1 + 1 < 8 && table[i1 + 1][j1][1] != table[i1][j1][1]) {
                addToHintTable(i1 + 1,j1)
            }
            if (i1 - 1 > -1 && (i1 - 1) * 8 + j1 + 1 > 0 && table[i1 - 1][j1][1] != table[i1][j1][1]) {
                addToHintTable(i1 - 1,j1)
            }
            if (i1 + 1 < 8 && j1 + 1 < 8 && table[i1 + 1][j1 + 1][1] != table[i1][j1][1]) {
                addToHintTable(i1 + 1,j1 + 1)
            }
            if (i1 - 1 > -1 && j1 + 1 < 8 && table[i1 - 1][j1 + 1][1] != table[i1][j1][1]) {
                addToHintTable(i1 - 1,j1 + 1)
            }
            if (i1 + 1 < 8 && j1 - 1 > -1 && table[i1 + 1][j1 - 1][1] != table[i1][j1][1]) {
                addToHintTable(i1 + 1,j1 - 1)
            }
            if (i1 - 1 > -1 && j1 - 1 > -1 && table[i1 - 1][j1 - 1][1] != table[i1][j1][1]) {
                addToHintTable(i1 - 1,j1 - 1)
            }
            return possibleMoves


    }

}

function convertID(id) {
    let i
    let j
    if (id.length == 3) {
        i = id.slice(-2)
        j = id.slice(-2)
    } else {
        i = id[1]
        j = id[1]
    }
    i = parseInt(i) - 1
    i = Math.floor(i / 8)
    j = parseInt(j) - 1
    j = j % 8

    return [i, j]
}

function closestGridItem({
    clientX,
    clientY
}) {

    let container = document.getElementById("container")
    let containerLeft = container.offsetLeft
    let containerTop = container.offsetTop
    let gridLeft = clientX - containerLeft
    let gridTop = clientY - containerTop
    if (gridLeft < 0 || gridTop < 0 || gridLeft > 639 || gridTop > 639)
        return 0

    else {
        let j = Math.floor(gridLeft / 80)
        let i = Math.floor(gridTop / 80)
        return `a${i*8 + j + 1}`
    }
}