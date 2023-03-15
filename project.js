// 1. Deposite some money 
// 2. Determine number of line
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check results
// 6. Give winnner 's money 
// 7. Play again 

const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}
const SYMBOLS_VALUES = {
    'A': 5,
    'B': 4,
    'C': 3,
    'D': 2

}
 const deposit = () => {
    while (true){
    const depositAmount = prompt('Enter a deposit Amount : ')
    const numberDepositeAmount = parseFloat(depositAmount); //conveert entered item to valid number

    if (isNaN(numberDepositeAmount) || numberDepositeAmount <=0) {
        console.log("Invalid deposit amount, try again");

    }
    else{
        return numberDepositeAmount;
    }
}
};
const line = () => {
    while (true) {
        const selectLine = prompt('Enter the no. of lines you want to bet on (1-3) : ')
        const numberLine = parseFloat(selectLine);

        if(isNaN(numberLine) || numberLine <=0 || numberLine > 3){
            console.log('Select valid number of lines (1-3) , try again ');
        }
        else {
            return numberLine;
        }
    }
};

const getBet = (balance,selectLine) => {
    while (true) {
        const selectBet = prompt('Enter total bet  per line : ');
        const betAmount = parseFloat(selectBet);
        
        if(isNaN(betAmount) || betAmount <=0 || betAmount > balance / selectLine ){
            console.log('Select valid amount, try again')
        }
        else{
            return betAmount;
        }
    }
};
    
const spin = () => {
    const symbols = [];
    for (const [symbol, count ] of Object.entries (SYMBOLS_COUNT)){
      for (let i=0; i<count;  i++){
            symbols.push(symbol);
        }

    }
    const reels = [];
    for (let i =0 ; i < COLS; i++){
        reels.push([]);
         const reelSymbols = [...symbols];
        for (let j=0; j<ROWS; j++){
            const randomIndex =Math.floor( Math.random() * reelSymbols.length);
            const selectedSymbol =  reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);

        }
    }
    return reels;
    
} ;

const transpose = (reels) => {
    const rows = [];

    for (let i=0; i <ROWS ; i++){
        rows.push([]);
        for (let j=0; j <COLS; j++){

            rows[i].push(reels[j][i])
        }
    }
    return rows
};
const printRows = (rows) =>{
    for(const row of rows){
        let rowString = '';
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOLS_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };

function game() {

    let balance = deposit();


    while (true) {
        console.log("You have a balance of $" + balance);
        const selectLine = line();
        const bet = getBet(balance, selectLine);
        balance -= bet * selectLine;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, selectLine);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log('You ran out of money!');
            break;
        }
        const playAgain = prompt('Do you want to play again (y/n)?');
        if (playAgain != 'y')
            break;
    }

}

game();