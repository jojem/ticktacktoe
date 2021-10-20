
let arr;
let count = 0;
let mainDiv = document.getElementById('mainDiv');
let winner = "none";
let menuVisibility = true;
let menu = document.getElementById('menu');



let btnStart =  document.createElement('button');
btnStart.innerText = "Start";
btnStart.className = "btnStart";
btnStart.onclick = function(){
    let n = document.getElementById('fieldSize').value;
    
    menu.style.visibility='hidden';
    setTimeout(() => 
                    {
                        startGame(n);
                    }, 500);
    
}
menu.append(btnStart);





function startGame(n){
    arr = [];
    count = 0;
    winner = "none";
    let wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    mainDiv.append(wrapper);

    let restart = document.createElement('button');
    restart.innerText = "restart";
    restart.onclick = function(){
        wrapper.remove();
        startGame(n);
    }
    
    let moveBack = document.createElement('button');
    moveBack.innerText = "back";
    moveBack.onclick = function(){
        wrapper.remove();
        menu.style.visibility='visible';
    }

    let currentPlayer = document.createElement('button');
    currentPlayer.innerText = "X";
    currentPlayer.className = "currentPlayer";

    wrapper.append(moveBack);
    wrapper.append(restart);
    wrapper.append(currentPlayer);


    for(let i =0; i<n; i++){
        arr.push([]);
        let divline = document.createElement('div');
        divline.className = `divline divline${i}`;
        for(let j =0; j<n; j++){
            arr[i].push(-99);
            let div = document.createElement('div');
            div.className = `box${j} box`;
            // div.innerHTML = `hello${j}`;
            divline.append(div);
            div.onclick = function(){
                if (arr[i][j]<0){
                    if (count%2==0){
                        count++;
                        this.innerHTML = 'X';
                        arr[i][j]=1;
                        check(arr, n);
                        currentPlayer.click();
                        currentPlayer.innerText = "O";

                    }
                    else{
                        count++;
                        this.innerHTML = 'O';
                        arr[i][j]=0;
                        check(arr, n);
                        currentPlayer.innerText = "X";

                    }

                    
                }
                if (winner!="none"){
                    setTimeout(() => 
                    {
                        alert(`${winner} выиграли`);
                        wrapper.remove();
                        menu.style.visibility='visible';
                    }, 300);
                    
                }
                
            }
            
        }
        wrapper.append(divline);
    }
}




function check(arrayt, n){
    let checkSumG = -99;
    let checkSumV = -99;
    let checkSumRD = -99;
    let checkSumD = -99;
    let checkSum = 0;
    
    let i = 0
    while (winner == "none" && i < n ){
        checkSumG = 0;
        checkSumV = 0;
        checkSumRD = 0;
        checkSumD = 0;
        for(let j =0; j<n; j++){
            checkSum += arrayt[i][j];
            checkSumG += arrayt[i][j];
            checkSumV += arrayt[j][i];
            checkSumRD += arrayt[j][n-1-j];
            checkSumD += arrayt[j][j];
        }
        


        if (checkSumG == n || 
            checkSumV == n ||
            checkSumRD == n ||
            checkSumD == n ){

            winner = "крестики";
        }
        else if (checkSumG == 0 || 
            checkSumV == 0 ||
            checkSumRD == 0 ||
            checkSumD == 0 ){

            winner = "нолики";
                
        }
        
        
        i++;
    }
    if (checkSum>0 && winner == "none"){
        winner = "ничья";
    }
    console.log(winner);

}
