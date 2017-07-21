

var rStartValue = ['0.00000001','0.00000002','0.00000003','0.00000004','0.00000005','0.00000006','0.00000007','0.00000008','0.00000009','0.00000010','0.00000011','0.00000012','0.00000001','0.00000013','0.00000014','0.00000015','0.00000016','0.00000017','0.00000018','0.00000019','0.00000020'];
var startValue = rStartValue[Math.floor(Math.random()*rStartValue.length)];
      var  stopPercentage = 0.001,
        maxWait = 1.00000000,
        stopped = false,
        stopBefore = 3;
console.log('startValue:'+startValue);

var iRandom = [0, 1];
var aRandom = iRandom[Math.floor(Math.random() * iRandom.length)];
if (aRandom == 0) {
        $('#double_your_btc_bet_lo_button').click();
} else {
        $('#double_your_btc_bet_hi_button').click();
}

var $loButton = $('#double_your_btc_bet_lo_button');
                $hiButton = $('#double_your_btc_bet_hi_button');

function multiply(){
        var current = ['0.00000001','0.00000002','0.00000003','0.00000004','0.00000005','0.00000006','0.00000007','0.00000008','0.00000009','0.00000010','0.00000011','0.00000012'];
        var multiply = current[Math.floor(Math.random()*current.length)];
        $('#double_your_btc_stake').val(multiply);
        console.log('multiply:'+multiply);
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

        return ((balance*1)/100) * (current*1) > stopPercentage/100;
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
                console.log('You LOST!');
                var rYourBtcPayout = [2.00,2.50,2.50,2.50,2.50,2.50,3.06];
                var yourBtcPayout = rYourBtcPayout[Math.floor(Math.random()*rYourBtcPayout.length)];
                 $('#double_your_btc_payout_multiplier').val(yourBtcPayout);
                 console.log('yourBtcPayout:'+yourBtcPayout);

var randomStartValue = rStartValue[Math.floor(Math.random()*rStartValue.length)];

                multiply();

                setTimeout(function(){
                    var iRandom = [0,1];
                    var aRandom = iRandom[Math.floor(Math.random()*iRandom.length)];
                     if(aRandom == 0){
                        $hiButton.trigger('click');
                        console.log('Hi');
                     }else if(aRandom == 1){
                        $loButton.trigger('click');
                        console.log('Lo');
                     }
                }, getRandomWait());


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

                var rYourBtcPayout = [2.00,2.50,2.50,2.50,2.50,2.50,3.06];
                var yourBtcPayout = rYourBtcPayout[Math.floor(Math.random()*rYourBtcPayout.length)];
                 $('#double_your_btc_payout_multiplier').val(yourBtcPayout);
                 console.log('yourBtcPayout:'+yourBtcPayout);

                 var randomStartValue = rStartValue[Math.floor(Math.random()*rStartValue.length)];

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
                        console.log('You WON!');
                }

                setTimeout(function(){
                    var iRandom = [0,1];
                    var aRandom = iRandom[Math.floor(Math.random()*iRandom.length)];
                     if(aRandom == 0){
                        $hiButton.trigger('click');
                        console.log('Hi');
                     }else if(aRandom == 1){
                        $loButton.trigger('click');
                        console.log('Lo');
                     }
                }, getRandomWait());
        }
});
