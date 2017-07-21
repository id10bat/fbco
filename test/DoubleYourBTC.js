function DoubleYourBTC(mode) {
  $('#double_your_btc_digits').show();
  var intervalID = setInterval(function() {
    $('#multiplier_first_digit').html(Math.floor(Math.random() * 10));
    $('#multiplier_second_digit').html(Math.floor(Math.random() * 10));
    $('#multiplier_third_digit').html(Math.floor(Math.random() * 10));
    $('#multiplier_fourth_digit').html(Math.floor(Math.random() * 10));
    $('#multiplier_fifth_digit').html(Math.floor(Math.random() * 10));
  }, 1); console.log('intervalID:'+intervalID);
  $('#double_your_btc_bet_hi_button').attr('disabled', true);
  $('#double_your_btc_bet_lo_button').attr('disabled', true);
  var bet = $('#double_your_btc_stake').val(); console.log('bet:'+bet);
  var jackpot = 0; console.log('jackpot:'+jackpot);
  var jackpot_arr = $('.play_jackpot:checkbox:checked').map(function() {
    return this.value;
  }).get(); console.log('jackpot_arr:'+jackpot_arr);
  if (jackpot_arr.length > 0) {
    jackpot = jackpot_arr.toString();
  }
  var client_seed = $('#next_client_seed').val(); console.log('client_seed:'+client_seed);
  $.get('/cgi-bin/bet.pl?m=' + mode + '&client_seed=' + client_seed + '&jackpot=' + jackpot + '&stake=' + bet + '&multiplier=' + $('#double_your_btc_payout_multiplier').val() + '&rand=' + Math.random(), function(data) {
    var result = data.split(':'); console.log('result:'+result);
    $('#double_your_btc_error').html('');
    $('#double_your_btc_error').hide();
    $('#double_your_btc_stake').removeClass('input-error');
    $('#double_your_btc_bet_win').html('');
    $('#double_your_btc_bet_lose').html('');
    $('#double_your_btc_bet_win').hide();
    $('#double_your_btc_bet_lose').hide();
    $('#jackpot_message').removeClass('green');
    $('#jackpot_message').removeClass('red');
    $('#jackpot_message').html('');
    $('#jackpot_message').hide();
    $('#double_your_btc_result').show();
    if (result[0] == 's1') {
      var number = result[2]; console.log('number:'+number);
      var single_digit = number.split(''); console.log('single_digit:'+single_digit);
      if (number.toString().length < 6) {
        var remaining = 5 - number.toString().length; console.log('single_digit:'+single_digit);
        for (var i = 0; i < remaining; i++) {
          single_digit.unshift('0');
        }
      }
      clearInterval(intervalID);
      $('#multiplier_first_digit').html(single_digit[0]);
      $('#multiplier_second_digit').html(single_digit[1]);
      $('#multiplier_third_digit').html(single_digit[2]);
      $('#multiplier_fourth_digit').html(single_digit[3]);
      $('#multiplier_fifth_digit').html(single_digit[4]);
      $('#balance').html(result[3]);
      max_deposit_bonus = parseFloat(result[18]).toFixed(8); console.log('max_deposit_bonus:'+max_deposit_bonus);
      balanceChanged();
      $('#balance_usd').html(result[5]);
      $('#next_server_seed_hash').val(result[6]);
      $('#next_nonce').html(result[8]);
      $('.previous_server_seed').html(result[9]);
      $('.previous_server_seed').val(result[9]);
      $('#previous_server_seed_hash').val(result[10]);
      $('.previous_client_seed').html(result[11]);
      $('.previous_client_seed').val(result[11]);
      $('.previous_nonce').html(result[12]);
      $('#previous_roll').html(result[2]);
      $('#no_previous_rolls_msg').hide();
      $('#previous_rolls_table').show();
      $('#previous_roll_strings').show();
      $('#bonus_account_balance').html(result[16] + ' BTC');
      $('#bonus_account_wager').html(result[17] + ' BTC');
      if ((parseFloat(result[16]) <= 0 || parseFloat(result[17]) <= 0) && bonus_table_closed == 0) {
        setTimeout(function() {
          $('#bonus_account_table').hide();
          bonus_table_closed = 1;
        }, 5000);
      }
      if (max_deposit_bonus >= parseFloat(min_bonus_amount) && bonus_table_closed == 1) {
        $('#bonus_eligible_msg').show();
      }
      if (parseFloat(result[19]) > 0 && parseFloat(result[19]) < 100) {
        $('.multiply_max_bet').html(result[19] + ' BTC');
        $('.multiply_max_bet').val(result[19]);
        max_win_amount = parseFloat(result[19]);
      }
      $('#verify_rolls_link').attr('href', 'https://s3.amazonaws.com/roll-verifier/verify.html?server_seed=' + result[9] + '&client_seed=' + result[11] + '&server_seed_hash=' + result[10] + '&nonce=' + result[12]);
      var capsmode = mode.toUpperCase(); console.log('capsmode:'+capsmode);
      console.log('Your:'+result[1]);
      if (result[1] == 'w') {
        $('#double_your_btc_bet_win').show();
        $('#double_your_btc_bet_win').html('You BET ' + capsmode + ' so you win ' + result[4] + ' BTC!'); console.log('Get BTC:'+result[4]);
        if ($('#manual_enable_sounds').is(':checked')) {
          $.ionSound.play('bell_ring');
        }
      }
      if (result[1] == 'l') {
        $('#double_your_btc_bet_lose').show();
        $('#double_your_btc_bet_lose').html('You BET ' + capsmode + ' so you lose ' + result[4] + ' BTC');
        if ($('#manual_enable_sounds').is(':checked')) {
          $.ionSound.play('tap');
        }
      }
      if (jackpot != 0) {
        $('#jackpot_message').show();
        if (result[13] == '1') {
          $('#jackpot_message').addClass('green');
          $('#jackpot_message').html('Congratulations! You have won the jackpot of ' + result[15] + ' BTC');
        } else {
          $('#jackpot_message').addClass('red');
          $('#jackpot_message').html('Sorry, you did not win the jackpot.');
        }
      }
      $('#double_your_btc_bet_hi_button').attr('disabled', false);
      $('#double_your_btc_bet_lo_button').attr('disabled', false);
      insertIntoBetHistory(result[1], result[4], result[2], result[9], result[11], result[10], result[12], 'DICE', mode, jackpot, bet, $('#double_your_btc_payout_multiplier').val());
    } else {
      $('#double_your_btc_error').show();
      $('#double_your_btc_digits').hide();
      if (parseFloat(result[1]) > 0 && parseFloat(result[1]) < 100) {
        $('.multiply_max_bet').html(result[1] + ' BTC');
        $('.multiply_max_bet').val(result[1]);
        max_win_amount = parseFloat(result[1]);
      }
      BetErrors(result[0]);
      clearInterval(intervalID);
      $('#multiplier_first_digit').html(0);
      $('#multiplier_second_digit').html(0);
      $('#multiplier_third_digit').html(0);
      $('#multiplier_fourth_digit').html(0);
      $('#multiplier_fifth_digit').html(0);
      if (result[0] == 'e6') {
        $('#double_your_btc_bet_hi_button').attr('disabled', true);
        $('#double_your_btc_bet_lo_button').attr('disabled', true);
      } else {
        $('#double_your_btc_bet_hi_button').attr('disabled', false);
        $('#double_your_btc_bet_lo_button').attr('disabled', false);
      }
    }
  }).fail(function() {
    $('#double_your_btc_result').show();
    $('#double_your_btc_error').show();
    $('#double_your_btc_digits').hide();
    $('#double_your_btc_error').html('Request timed out. Please try again.');
    clearInterval(intervalID);
    $('#double_your_btc_bet_hi_button').attr('disabled', false);
    $('#double_your_btc_bet_lo_button').attr('disabled', false);
  });
}
