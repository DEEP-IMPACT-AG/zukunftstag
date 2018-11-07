(function() {
  function getCardsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cards")) || [];
  }
  function setCardsToLocalStorage(cards) {
    return localStorage.setItem("cards", JSON.stringify(cards));
  }

  function removeChildren(id) {
    var node = document.getElementById(id);
    if (node) {
      while (node.children.length > 1) {
        node.removeChild(node.children[1]);
      }
    }
  }

  function getEmptyCardsContainer() {
    removeChildren("term-container");
    return document.getElementById("term-container");
	}

	function getExampleCardHtml() {
		var copy = document.getElementById("term-example").cloneNode(true);
		copy.removeAttribute('id');
		return copy;
	}

	function getElementByClassName(element, className) {
		const foundElements = element.getElementsByClassName(className);
		if (!foundElements || foundElements.length === 0) {
			throw new Error(`Kein Element mit der Klasse '${className}' gefunden.`);
		}
		if (foundElements.length > 1) {
			throw new Error(`Mehrere Elemente mit der Klasse '${className}' gefunden.`);
		}
		return foundElements[0];
	}

  function renderCards() {
		var cards = getCardsFromLocalStorage();
    console.log(cards);
		var exampleHtml = getExampleCardHtml();
		var cardsContainer = getEmptyCardsContainer();
		
    if (cards.length !== 0) {
      cards.forEach(card => {
				var element = exampleHtml.cloneNode(true);
				getElementByClassName(element, 'text').innerText = card.text;
				getElementByClassName(element, 'emojis').innerText = card.emojis;
				getElementByClassName(element, 'delete').addEventListener("click", () => deleteCard(card.id));

        cardsContainer.appendChild(element);
      });
    }
  }
	
	function deleteCard(id) {
		var cards = getCardsFromLocalStorage();
		var updatedCards = cards.filter(card => card.id !== id);
		setCardsToLocalStorage(updatedCards);
		renderCards();
	}

  function saveNewCard() {
    var cardTextField = document.getElementById("card-text");
    var emojiTextField = document.getElementById("card-emojis");
    if (cardTextField.value && emojiTextField.value) {
      var cards = getCardsFromLocalStorage();
      cards.push({
        id: Math.random()
          .toString(36)
          .substring(7),
        text: cardTextField.value,
        emojis: emojiTextField.value
      });
			setCardsToLocalStorage(cards);
			renderCards();
    }
	}
	
	window.saveNewCard = saveNewCard;

	window.addEventListener("load", function() {
    renderCards();
  });
})();
