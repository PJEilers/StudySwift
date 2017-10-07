document.addEventListener('DOMContentLoaded', function() {	
	setSummary();
	setGoBackButton();
});

document.addEventListener("unload", saveSummary);

function setGoBackButton() {
	var button = document.getElementById("goBack");
	button.onclick = function() {
		saveSummary();
		javascript:history.go(-1);
	}
}

function saveSummary() {
	var block = document.getElementById("summaryField");
	localStorage.studyswift = block.value;
}

function setSummary() {
	var block = document.getElementById("summaryField");
	block.value = localStorage.studyswift;
}