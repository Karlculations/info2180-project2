var shufflebutton;
var pieces;
var blink;
var timer;
var emptySpaceY;
var emptySpaceX;
//end of game alert was implemented
window.onload = function (){
    //var puzzlearea = document.getElementById('puzzlearea');
    
    pieces = $('#puzzlearea > div '); //puzzlearea.getElementsByTagName('div');

    for (var i=0; i<pieces.length; i++){
        pieces[i].style.backgroundImage="url('images.jpg')";
        pieces[i].className = 'puzzlepiece';		
        pieces[i].style.left = (i%4*100)+'px';
        pieces[i].style.top = (parseInt(i/4)*100) + 'px';
        pieces[i].style.backgroundPosition= '-' + pieces[i].style.left + ' ' + '-' + pieces[i].style.top;
		
        pieces[i].onmouseover = function(){
            if (checkCanMove(parseInt(this.innerHTML))){
                this.className = 'puzzlepiece movablepiece';
            }
        };
		
        pieces[i].onmouseout = function(){
            this.className = 'puzzlepiece';
        };

        pieces[i].onclick = function(){
            if (checkCanMove(parseInt(this.innerHTML))){
                switchTiles(this.innerHTML-1); //exchange tile with white space
                if (isFinish()){ //is the puzzle complete?
                    youWin(); //you won XD
                }
                return;
            }
        };
    }

    emptySpaceX = '300px';
    emptySpaceY = '300px';

    $('#shufflebutton').click( function(){
        for (var i=0; i<250; i++){
            var rand = parseInt(Math.random()* 100) %4;
            if (rand == 0){
                var tmp = tileAbove(emptySpaceX, emptySpaceY);
                if ( tmp != -1){
                    switchTiles(tmp);
                }
            }
            if (rand == 1){
                var tmp = tileBelow(emptySpaceX, emptySpaceY);
                if ( tmp != -1){
                    switchTiles(tmp);
                }
            }

            if (rand == 2){
                var tmp = tileLeft(emptySpaceX, emptySpaceY);
                if ( tmp != -1){
                    switchTiles(tmp);
                }
            }

            if (rand == 3)
            {
                var tmp = tileRight(emptySpaceX, emptySpaceY);
                if (tmp != -1)
                {
                    switchTiles(tmp);
                }
            }
        }
    });
};

function checkCanMove(pos){ //can the piece move?
    if (tileLeft(emptySpaceX, emptySpaceY) == (pos-1)){ //compare the tile to the left of the white space with the current tile (pos -1 because .innerHTML returns 1 to 15 and the for loop goes 0 to 14)
        return true; //yes it can
    }

    if (tileBelow(emptySpaceX, emptySpaceY) == (pos-1)){ //Is the current piece under the white space?
        return true; //yes it can
    }

    if (tileAbove(emptySpaceX, emptySpaceY) == (pos-1)){ //Is the current piece above the white space?
        return true; //yes it can
    }

    if (tileRight(emptySpaceX, emptySpaceY) == (pos-1)){ //Is the current piece to the right of the white space?
        return true; //yes it can
    }
}

function Blink(){ //end of game alert
    blink --;
    if (blink == 0){
        var body = $('body');
        body[0].style.backgroundColor = "#FFFFFF";
        alert('you win');
        return;
    }
    if (blink % 2){
        var body = $('body');
        body[0].style.backgroundColor = "#00FF00";    
    }
    else{
        var body = $('body');
        body[0].style.backgroundColor = "#FF0000";
    }
    timer = setTimeout(Blink, 100);
}

function youWin(){
    var body = $('body');
    body[0].style.backgroundColor = "#FF0000";
    blink = 10;
    timer = setTimeout(Blink, 100);
}

function isFinish(){
    var flag = true;
    for (var i = 0; i < pieces.length; i++) {
        var y = parseInt(pieces[i].style.top);
        var x = parseInt(pieces[i].style.left);

        if (x != (i%4*100) || y != parseInt(i/4)*100){ //check to see pieces are back into their original places
            flag = false;
            break;
        }
    }
    return flag;
}

function tileLeft(x, y){ //find the tile to the left of the white space
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0){
        for (var i = 0; i < pieces.length; i++){
            if (parseInt(pieces[i].style.left) + 100 == xx && parseInt(pieces[i].style.top) == yy){
                return i; //return the tile number
            } 
        }
    }
    else{
        return -1;
    }
}

function tileRight (x, y){ //find the tile to the right of the white space
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300){
        for (var i =0; i<pieces.length; i++){
            if (parseInt(pieces[i].style.left) - 100 == xx && parseInt(pieces[i].style.top) == yy){
                return i;
            }
        }
    }else{
        return -1;
    } 
}

function tileAbove (x, y){ //find the tile above the white space
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0){
        for (var i=0; i<pieces.length; i++){
            if (parseInt(pieces[i].style.top) + 100 == yy && parseInt(pieces[i].style.left) == xx){
                return i;
            }
        } 
    }
    else{
        return -1;
    }
}

function tileBelow (x, y){ //find the tile below the white space
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300){
        for (var i=0; i<pieces.length; i++){
            if (parseInt(pieces[i].style.top) - 100 == yy && parseInt(pieces[i].style.left) == xx){
                return i;
            }
        }
    }
    else{
        return -1;
    } 
}

function switchTiles (pos){
    var temp = pieces[pos].style.top;
    pieces[pos].style.top = emptySpaceY;
	
    emptySpaceY = temp;

    temp = pieces[pos].style.left;
    pieces[pos].style.left = emptySpaceX;
    emptySpaceX = temp;
}