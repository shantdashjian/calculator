var main = function(){
  buildCalculator();
  assignListenersToButtons();
  enableKeyboardInput();
}

var buildCalculator = function(){
  var $table = $('<table name="table" class="table table-bordered">');
  var $tBody = $('<tbody>');
  var $1stRow = $('<tr>');
  var $display = $('<td colspan="4" id="display"></td>');
  $1stRow.append($display);
  $tBody.append($1stRow);

  var $2ndRow = $('<tr>');
  var $clear = $('<td colspan="3" id="clear">C</td>');
  var $divide = $('<td colspan="1" id="divide" class="operator">/</td>')
  $2ndRow.append($clear);
  $2ndRow.append($divide);
  $tBody.append($2ndRow);

  var $3rdRow = $('<tr>');
  var $7 = $('<td colspan="1" id="7" class="number">7</td>');
  var $8 = $('<td colspan="1" id="8" class="number">8</td>');
  var $9 = $('<td colspan="1" id="9" class="number">9</td>');
  var $multiply = $('<td colspan="1" id="multiply" class="operator">*</td>')
  $3rdRow.append($7);
  $3rdRow.append($8);
  $3rdRow.append($9);
  $3rdRow.append($multiply);
  $tBody.append($3rdRow);

  var $4thRow = $('<tr>');
  var $4 = $('<td colspan="1" id="4" class="number">4</td>');
  var $5 = $('<td colspan="1" id="5" class="number">5</td>');
  var $6 = $('<td colspan="1" id="6" class="number">6</td>');
  var $subtract = $('<td colspan="1" id="subtract" class="operator">-</td>')
  $4thRow.append($4);
  $4thRow.append($5);
  $4thRow.append($6);
  $4thRow.append($subtract);
  $tBody.append($4thRow);

  var $5thRow = $('<tr>');
  var $1 = $('<td colspan="1" id="1" class="number">1</td>');
  var $2 = $('<td colspan="1" id="2" class="number">2</td>');
  var $3 = $('<td colspan="1" id="3" class="number">3</td>');
  var $add = $('<td colspan="1" id="add" class="operator">+</td>')
  $5thRow.append($1);
  $5thRow.append($2);
  $5thRow.append($3);
  $5thRow.append($add);
  $tBody.append($5thRow);

  var $6thRow = $('<tr>');
  var $0 = $('<td colspan="2" id="0" class="number">0</td>');
  var $dot = $('<td colspan="1" id="dot">.</td>');
  var $sum = $('<td colspan="1" id="sum">=</td>')
  $6thRow.append($0);
  $6thRow.append($dot);
  $6thRow.append($sum);
  $tBody.append($6thRow);

  $table.append($tBody);

  $('.container').append($table);
  $($table).wrap('<div class="col-md-6 offset-md-3" id="mainColumn"></div>');
  $('#mainColumn').wrap('<div class="row"></div>');

}

var assignListenersToButtons = function(){
  assignListenersByClass('click', updateDisplayWithNumber, '.number');
  assignListenersByClass('click', updateDisplayWithOperator, '.operator');
  assignListenersByClass('click', clearDisplay, '#clear');
  assignListenersByClass('click', evaluate, '#sum');
  assignListenersByClass('click', addDot, '#dot');


}

var assignListenersByClass = function(eventName, callback, selector){
  var $elements = $(selector);
  $elements.each(function(){
    $(this).on(eventName, function(){
      callback($(this));
    });
  })
}

var updateDisplayWithNumber = function(element){
  if ($('#display').text() === '0') {
    var text = element.text();
  } else {
    var text = $('#display').text() + element.text();
  }
  $('#display').text(text);

}
var updateDisplayWithOperator = function(element){
  var tokens = splitIntoTokens($('#display').text());
  if (tokens[tokens.length-1] !== '') {
    var text = $('#display').text() + element.text();
  } else {
    var text = $('#display').text();
  }
  $('#display').text(text);
}
var clearDisplay = function(element){
  var text = '';
  $('#display').text(text);
}
var evaluate = function(element){
  var text = eval($('#display').text());
  $('#display').text(text);
}
var addDot = function(element){
  var tokens = splitIntoTokens($('#display').text());
  if (!tokens[tokens.length-1].includes('.')
      && tokens[tokens.length-1] !== '') {
    var text = $('#display').text() + element.text();
  } else {
    var text = $('#display').text();
  }
  $('#display').text(text);
}
var splitIntoTokens = function(dislayString) {
  var tokens = dislayString.split(/[\/+*-]/);
  return tokens;
}

var enableKeyboardInput = function(){
  $('body').keydown(function(e){
    var $element = $('<td>');
    $element.text(e.key);
    if ((!e.shiftKey)&&(e.keyCode >= 48 && e.keyCode <= 57) // numbers on keyboard
      || (e.keyCode >= 96 && e.keyCode <= 105) // numbers on numpad
    ){
      updateDisplayWithNumber($element);
    }
    if ( (e.keyCode === 106) || (e.keyCode === 56 && e.shiftKey) // *
      || e.keyCode === 107 || (e.keyCode === 187 && e.shiftKey) // +
      || e.keyCode === 109  || (e.keyCode === 189 && !e.shiftKey)// -
      || e.keyCode === 111 || (e.keyCode === 191 && !e.shiftKey)// /
    ) {
      updateDisplayWithOperator($element);
    }
    if(e.keyCode === 110 // decimal
      || e.KeyCode === 190 ) // period
    {
      addDot($element);
    }
    if(e.keyCode === 32) // (space) for clear
    {
      clearDisplay($element);
    }

    if (e.keyCode === 8) { // backspace
      var entireText = $('#display').text();
      $('#display').text(entireText.substring(0,entireText.length-1));
    }
    if ((e.keyCode === 187 && !e.shiftKey) || e.keyCode === 13 ){ // = or enter
      evaluate($element);
    }
  })
}
