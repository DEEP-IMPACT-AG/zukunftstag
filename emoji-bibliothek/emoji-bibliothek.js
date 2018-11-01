(function() {
  function fetchEmojis(query) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        `https://www.emojidex.com/api/v1/search/emoji?code_cont=${query}`,
        true
      );

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          resolve(JSON.parse(request.responseText));
        } else {
          console.log("reached emojidex, but API returned an error");
          reject(request);
        }
      };

      request.onerror = function() {
        reject();
        console.log("connection error");
      };

      request.send();
    });
  }

  function removeChildren(id) {
    var node = document.getElementById(id);
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function getContainer() {
		removeChildren("emoji-search-results");
    return document.getElementById("emoji-search-results");
  }

  function renderEmojis(emojis) {
    console.log(emojis);
    var emojiResultsContainer = getContainer();
    var actualEmojis = emojis.filter(
      emoji =>
        emoji.moji && (!emoji.unicode || emoji.unicode.indexOf("-") === -1)
    );
    if (actualEmojis.length !== 0) {
      actualEmojis.forEach(emoji => {
        var element = document.createElement("div");
        element.className = "emoji";
				element.innerText = emoji.moji;
				element.title = emoji.code;
        emojiResultsContainer.appendChild(element);
      });
		} else {
			renderNoResults();
		}
  }

  function renderLoader() {
    var emojiResultsContainer = getContainer();
    var element = document.createElement("div");
    element.className = "emoji-loading";
    emojiResultsContainer.appendChild(element);
  }

  function renderNoResults() {
    var emojiResultsContainer = getContainer();
    var element = document.createElement("div");
    element.className = "emoji-empty alert alert-warning";
    element.innerText = "Keine Emojis zu diesem Begriff gefunden.";
    emojiResultsContainer.appendChild(element);
  }

  function handleSearchEmoji() {
    var emojiTextField = document.getElementById("emoji-query");
    if (emojiTextField.value) {
      renderLoader();
      fetchEmojis(emojiTextField.value)
        .then(result => renderEmojis(result.emoji))
        .catch(function() {});
    }
  }

  function handleSearchKeyPress(event) {
  	if (event.key ==='Enter') {
  		handleSearchEmoji();
  	}
  }

  window.addEventListener("load", function() {
    var emojiSearchButton = document.getElementById("emoji-search");
    emojiSearchButton.addEventListener("click", handleSearchEmoji);

    var emojiTextField = document.getElementById("emoji-query");
    emojiTextField.addEventListener("keypress", handleSearchKeyPress);
  });
})();
