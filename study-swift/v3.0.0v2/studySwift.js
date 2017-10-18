
document.addEventListener('DOMContentLoaded', function() {	
	addTurnOffOnButton();
	addToSummaryButton();
});

document.addEventListener('click', updateSummary(), false) 

function updateSummary() {
    var block = document.getElementById("summary");
    block.value = localStorage.studyswift;
}

function addToSummaryButton() {
	var toolbar = document.getElementById('toolbarViewerLeft');
	var button = document.createElement("button");
	button.innerText = "To Summary";
	button.style.fontSize = "12px";
	button.style.width = "82px";
	button.style.height = "25px";
	button.style.margin = "3px";
	button.className += " toolbarButton";
	button.onclick = function() {
		window.location.href = "./summary.html"
	}
	toolbar.append(button)
}

function addTurnOffOnButton() {
	var toolbar = document.getElementById('toolbarViewerLeft');
	var button = document.createElement("button");
	button.innerText = "Turn On Summarizing";
	button.style.fontSize = "12px";
	button.style.width = "135px";
	button.style.height = "25px";
	button.style.margin = "3px";
	button.className += " toolbarButton";
	button.onclick = function() {
		var text = button.innerText;
		if (text == "Turn On Summarizing") {
			document.addEventListener('click', getSentenceOnClick, false);
			button.innerText = "Turn Off Summarizing";
		} else {
			document.removeEventListener('click', getSentenceOnClick, false)
			button.innerText = "Turn On Summarizing";
		}
	}
	toolbar.append(button)
}

function getSentenceOnClick(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.className != "") {
    	return;
    }
    var sentence = buildTextBlock(target);
    var clickedIndex = getCaretCharacterOffsetWithin(target);
    sentence = trimSentence(sentence, target, clickedIndex);
    if(sentence != undefined) {
    	window.localStorage.studyswift += sentence;
        var block = document.getElementById("summary");
        block.value+=sentence;
    }
    console.log(sentence);
}

function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    if (typeof window.getSelection != "undefined") {
        var range = window.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
        var textRange = document.selection.createRange();
        var preCaretTextRange = document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function buildTextBlock(target){
	var sentence = target.innerText;
	var next = target, 
		prev = target;
	do {
		prev = prev.previousSibling;
		if (prev != null && prev.style.fontSize == target.style.fontSize ) {
			//&& prev.style.transform == target.style.transform) {
			sentence = prependSentence(sentence, prev.innerText);
		} else { break; }
	} while(!containsSentenceEnding(prev.innerText))
	do {	
		next = next.nextSibling;
		if (next != null && next.style.fontSize == target.style.fontSize) {
			//&& next.style.transform == target.style.transform) {
			sentence = appendSentence(sentence, next.innerText);
		} else { break; }
	} while(!containsSentenceEnding(next.innerText)) 
	return sentence;
}

function containsSentenceEnding(text) {
	var dot = text.indexOf('.') === -1;
	var questionmark = text.indexOf('?') === -1;
	var exclamationmark = text.indexOf('!') === -1;
	return !(dot && questionmark && exclamationmark);
}

function findIndexOfEnding(higherUp, startInd, text) {
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
    higher = Math.min(higher + 1, text.length);
    var sentence = text.substring(lower, higher);
    sentence = sentence.trim();
    return  sentence + "\n\n";
}

function trimSentence(block, target, original_index) {
	var ind = block.indexOf(target.innerText);
	var lowerBound = findIndexOfEnding(false, ind + original_index, block);
	var upperBound = findIndexOfEnding(true, ind + original_index, block);
	return buildSentence(lowerBound, upperBound, block);
}

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

function appendSentence(sentence, nextSegment) {
 	if (sentence[sentence.length - 1] == '-' || !isLetter(nextSegment[0])) {
		sentence = sentence.substring(0, sentence.length-1) + nextSegment;
	} else {
		sentence = sentence + " " + nextSegment;
	}
	return sentence;
}

function prependSentence(sentence, prevSegment) {
 	if (prevSegment[prevSegment.length - 1] == '-' || !isLetter(sentence[0])) {
		sentence = prevSegment.substring(0, prevSegment.length-1) + sentence;
	} else {
		sentence = prevSegment + " " + sentence;
	}
	return sentence;
}
