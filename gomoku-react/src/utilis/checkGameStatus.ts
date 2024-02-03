type Move = {
    player: string;
    turn: number;
  
  }

export function checkGameStatus(board: Move[][], player:string): string{
    let emptyCube: number = 0;
    let height: number = board.length;
    let width: number= board[0].length;
    let result:boolean = false;


    for(let row:number = 0; row < height; row++) {
        for (let col: number = 0; col < width; col++){

            if(board[row][col]['turn'] === 0){emptyCube++;}
            // checking vertically
            if(row < height - 4){
                result = fiveInARow(board[row][col]['player'], board[row+1][col]['player'], 
                    board[row+2][col]['player'],board[row+3][col]['player'], board[row+4][col]['player']);
                if(result === true){return `${player[0].toUpperCase()}${player.substring(1)} is Winner`;}
            }
            // checking horizontally
            if(col < width - 4){
                result = fiveInARow(board[row][col]['player'], board[row][col+1]['player'], 
                    board[row][col+2]['player'], board[row][col+3]['player'], board[row][col+4]['player']);
                    if(result === true){return `${player[0].toUpperCase()}${player.substring(1)} is Winner`;}      
            }
            // checking diagonal right
            if(row < height - 4 && col < width - 4){
                result = fiveInARow(board[row][col]['player'], board[row+1][col+1]['player'],
                    board[row+2][col+2]['player'], board[row+3][col+3]['player'],board[row+4][col+4]['player']);
                    if(result === true){return `${player[0].toUpperCase()}${player.substring(1)} is Winner`;} 
            }
            // checking diagonal left
            if(row < height - 4 && col >= 4 ){
                result = fiveInARow(board[row][col]['player'], board[row+1][col-1]['player'],
                    board[row+2][col-2]['player'], board[row+3][col-3]['player'],board[row+4][col-4]['player']);
                    if(result === true){return `${player[0].toUpperCase()}${player.substring(1)} is Winner`;}
            }
        }
    }
    if(emptyCube === 0){
        return 'Game is a draw';
    }else{
        return 'continue';
    }  
}


/*
This is a helper function for determining if there are five
elements in a row are similar
params: first, second, third, fourth, fifth
return boolean
*/
function fiveInARow(first:string, second:string, 
    third:string, fourth:string, fifth:string):boolean{
        if(first && second && third && fourth && fifth){
            return (first !== "") && (first === second) && 
            (first===third) && (first===fourth) && (first===fifth);
        }else{
            return false;
        }
}