(function() {
  function getCardsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cards")) || [];
  }

  function removeChildren(id) {
    var node = document.getElementById(id);
    if (node) {
      while (node.children.length > 1) {
        node.removeChild(node.children[1]);
      }
    }
  }

  function getTermElement() {
    return document.getElementById("term");
  }

  function getElementByClassName(element, className) {
    const foundElements = element.getElementsByClassName(className);
    if (!foundElements || foundElements.length === 0) {
      throw new Error(`Kein Element mit der Klasse '${className}' gefunden.`);
    }
    if (foundElements.length > 1) {
      throw new Error(
        `Mehrere Elemente mit der Klasse '${className}' gefunden.`
      );
    }
    return foundElements[0];
  }

  function handleFlipCard() {
		var element = getTermElement();
		if (element.classList.contains('flipped')) {
			element.classList.remove('flipped');
		} else {
			element.classList.add('flipped');
		}
  }

  function renderCard(index) {
    var cards = getCardsFromLocalStorage();
    console.log(cards);
    var element = getTermElement();

    if (index >= 0 && cards.length > index) {
			var card = cards[index];
			element.dataset.index = index;
			element.classList.remove('flipped');
      getElementByClassName(element, "text").innerText = card.text;
      getElementByClassName(element, "emojis").innerText = card.emojis;
      getElementByClassName(element, "flip").removeEventListener("click", handleFlipCard);
      getElementByClassName(element, "flip").addEventListener("click", handleFlipCard);
    }
	}
	
	function renderPrevCard() {
		var element = getTermElement();
		var nextIndex = Number.parseInt(element.dataset.index) - 1;
		renderCard(nextIndex);
	}

	function renderNextCard() {
		var element = getTermElement();
		var nextIndex = Number.parseInt(element.dataset.index) + 1;
		renderCard(nextIndex);
	}

	window.renderPrevCard = renderPrevCard;
	window.renderNextCard = renderNextCard;

  window.addEventListener("load", function() {
		renderCard(0);
  });
})();
