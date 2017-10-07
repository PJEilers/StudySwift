
/*
 ** Returns the caret (cursor) position of the specified text field.
 ** Return value range is 0-oField.value.length.
 */
function doGetCaretPosition (oField) {
    // Initialize
    var iCaretPos = 0;
    // IE Support
    if (document.selection) {
        // Set focus on the element
        oField.focus();
        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();
        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);
        // The caret position is selection length
        iCaretPos = oSel.text.length;
    }
    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;
    // Return results
    return iCaretPos;
}


function findIndexOfDot(higherUp, startInd, text) {
    var char = text[startInd];
    var i = startInd;
    if (higherUp) {
        //TODO write better while condition
        while(i < text.length && char != '.' && char != '!' && char != '?') {
            i++;
            char = text[i];
        }
    } else {
        while(i > 0 && char != '.' && char != '!' && char != '?') {
            i--;
            char = text[i];
        }
    }
    return i;
}

function buildSentence(lower, higher, text) {
    if(lower != 0) {
        lower = lower + 2;
    }
    higher = Math.min(higher + 1, text.length - 1);
    return text.substring(lower, higher) + "\n\n";
}

$('#readField').on('click', function() {
    var readField = $('#readField');
    var text = readField.val();
    var clickedIndex = doGetCaretPosition(readField[0]);
    var lower = findIndexOfDot(false, clickedIndex, text);
    var higher = findIndexOfDot(true, clickedIndex, text);
    var newSentence = buildSentence(lower, higher, text);
    var summaryField = $('#summaryField');
    
    if(summaryField.val().trim() == "") {
        summaryField.val(newSentence);
    } else {
        summaryField.val(summaryField.val() + newSentence);
    }
});

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || text.innerText;  

    console.log(target); 
}, false);

