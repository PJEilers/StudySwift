document.addEventListener('DOMContentLoaded', function() {	
	setSummary();
	setGoBackButton();
	setFeedbackButton();
});

document.addEventListener("unload", saveSummary);

function setGoBackButton() {
	var button = document.getElementById("goBack");
	button.onclick = function() {
		saveSummary();
		javascript:history.go(-1);
	}
}

function setFeedbackButton() {
	var button = document.getElementById("feedback");
	button.onclick = function() {
	window.location = "http://docs.google.com/forms/d/1F8rH-Asad3nH6BwZnDI356d44FjzTxtnnQwnfq3HNIQ"}
}

function saveSummary() {
	var block = document.getElementById("summaryField");
	localStorage.studyswift = block.value;
}

function setSummary() {
	var block = document.getElementById("summaryField");
	block.value = localStorage.studyswift;
}