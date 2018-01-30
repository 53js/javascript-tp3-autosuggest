'use strict';
console.log('AutoSuggest exo');

const url = 'http://localhost:9000/dico';

let xhr = new XMLHttpRequest();


// elements
let search = document.querySelector('#search');
let suggestDiv = document.querySelector('#suggestionDiv');
let suggestUL = document.querySelector('#suggestionDiv ul');

// A tester input, keydown
search.addEventListener('input', getSuggestion);

function getSuggestion() {
	console.log(this.value);
	let inputValue = this.value;
	inputValue = inputValue.trim();
	// if (inputValue.length === 0 ) {
	// 	return;
	// }

	// xhr.onload = handleDicoRequest;
	// xhr.open('POST', url);
	// xhr.setRequestHeader('Content-Type',
	// 	'application/x-www-form-urlencoded; charset=utf-8');
	// xhr.send("qValue=" + inputValue);

	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: {
			qValue: inputValue
		},
		success: handleDicoRequest,
		error: function() {
			alert('HTTP error');
		}
	});
}

function handleDicoRequest(result) {
	const words = result;
	if (words.length === 0) {
		hideSuggestDiv();
	} else {
		addWordsToHTML(words);
	}
}

function hideSuggestDiv() {
	suggestDiv.style.display = 'none';
}

function addWordsToHTML(words) {
	let inputValue = document.querySelector('#search').value.trim();
	let len = inputValue.length;

	suggestUL = suggestUL.cloneNode(false);
	suggestDiv.replaceChild(suggestUL, suggestDiv.firstChild);
/*
	suggestDiv.removeChild(suggestDiv.firstChild);
	suggestUL = document.createElement('ul');
	suggestDiv.appendChild(suggestUL);
*/

	suggestDiv.style.display ='block';

	words.forEach(function(word) {
		let liNode = document.createElement('li');
		// to
		// tomato
		let startWord = word.substr(0, len); // to
		let endWord = word.substr(len, word.length); // mato
		liNode.innerHTML = startWord + '<span>' + endWord + '</span>';

		suggestUL.appendChild(liNode);
	});
}
