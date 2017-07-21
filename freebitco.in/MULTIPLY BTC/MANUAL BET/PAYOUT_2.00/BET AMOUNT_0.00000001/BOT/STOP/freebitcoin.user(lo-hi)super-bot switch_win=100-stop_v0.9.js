

var startValue = '0.00000001', 
        stopPercentage = 0.001,
        maxWait = 1.00000000, 
        stopped = false,
        stopBefore = 3;
 
var counterr = 0;
var numGames = 5;
var click = 0;
var $loButton = $('#double_your_btc_bet_lo_button');
                $hiButton = $('#double_your_btc_bet_hi_button');
 
function multiply(){
        var current = $('#double_your_btc_stake').val();
        var multiply = (current * 2).toFixed(8);
        $('#double_your_btc_stake').val(multiply);
}
 
function getRandomWait(){
        var wait = Math.floor(Math.random() * maxWait ) + 100;
 
        console.log('Waiting for ' + wait + 'ms before next bet.');
 
        return wait ;
}
 
function startGame(){
        console.log('Game started!');
        reset();
        $loButton.trigger('click');
}
 
function stopGame(){
        console.log('Game will stop soon! Let me finish.');
        stopped = true;
}
 
function reset(){
        $('#double_your_btc_stake').val(startValue);
}
 
// quick and dirty hack if you have very little bitcoins like 0.0000001
function deexponentize(number){
        return number * 1000000;
}
 
function iHaveEnoughMoni(){
        var balance = deexponentize(parseFloat($('#balance').text()));
        var current = deexponentize($('#double_your_btc_stake').val());
 
        return ((balance*2)/100) * (current*2) > stopPercentage/100;
}
 
function stopBeforeRedirect(){
        var minutes = parseInt($('title').text());
 
        if( minutes < stopBefore )
        {
                console.log('Approaching redirect! Stop the game so we don\'t get redirected while loosing.');
                stopGame();
 
                return true;
        } 
 
        return false;
}
 
// Unbind old shit
$('#double_your_btc_bet_lose').unbind();
$('#double_your_btc_bet_win').unbind();



 
// Loser
$('#double_your_btc_bet_lose').bind("DOMSubtreeModified",function(event){
        if( $(event.currentTarget).is(':contains("lose")') )
        {
                console.log('You LOST! Multiplying your bet and betting again.');
               
                multiply();
 
                setTimeout(function(){
                     click += 1;
                     if(click == 1){
                        $hiButton.trigger('click');
                        console.log("Hi");
                     }else if(click == 2){
                        $loButton.trigger('click');
                        console.log("Lo");
                     }
                        
                        console.log(click);
                        if(click == 2){
                           click -= 2;
                        }
                }, getRandomWait());
 
                //$loButton.trigger('click');
        }
});
 
// Winner
$('#double_your_btc_bet_win').bind("DOMSubtreeModified",function(event){
        if( $(event.currentTarget).is(':contains("win")') )
        {
                if( stopBeforeRedirect() )
                {
                        return;
                }
 
                if( iHaveEnoughMoni() )
                {
                        console.log('You WON! But don\'t be greedy. Restarting!');
 
                        reset();
 
                        if( stopped )
                        {
                                stopped = false;
                                return false;
                        }
                }
                else
                {
                        console.log('You WON! Betting again');
                }
              setTimeout(function(){
                     counterr += 1;
                     click += 1;
                     if(click == 1){
                        $hiButton.trigger('click');
                        console.log("Hi");
                     }else if(click == 2){
                        $loButton.trigger('click');
                        console.log("Lo");
                     }
                        
                        console.log(click);
                        if(click == 2){
                           click -= 2;
                        }
 
                   console.log(counterr+'/'+numGames);
                   if (counterr == numGames){
			stopGame();
                        console.log('Stop'); 
		} 
               
                }, getRandomWait());
        }
});

