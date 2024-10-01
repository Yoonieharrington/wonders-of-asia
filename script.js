function toggleInfo(infoId) {
  const infoDiv = document.getElementById(infoId);

  // Toggle visibility
  if (infoDiv.style.display === "none" || infoDiv.style.display === "") {
    infoDiv.style.display = "block";
  } else {
    infoDiv.style.display = "none"; // Hide if already visible
  }
}

function searchSuggestions() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const suggestionsContainer = document.getElementById("suggestions");
  suggestionsContainer.innerHTML = ""; // Clear previous suggestions

  const cards = document.querySelectorAll(".card");
  let matches = 0;

  cards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const country = card.getAttribute("data-country").toLowerCase();

    // If the input matches part of the title or country
    if (title.includes(input) || country.includes(input)) {
      matches++;

      // Create a suggestion item
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      function capitalizeWords(str) {
        return str
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
          )
          .join(" ");
      }

      // ...

      suggestionItem.innerText =
        capitalizeWords(title) +
        " (" +
        country.charAt(0).toUpperCase() +
        country.substring(1).toLowerCase() +
        ")";
      // Add click event to show the corresponding card when selected
      suggestionItem.onclick = () => {
        // Hide all cards initially
        cards.forEach((card) => {
          card.style.display = "none";
        });

        // Show the selected card
        card.style.display = "flex";
        suggestionsContainer.innerHTML = ""; // Clear suggestions after selection
        document.getElementById("searchInput").value = ""; // Clear search input
      };

      // Append suggestion item to the suggestions container
      suggestionsContainer.appendChild(suggestionItem);
    }
  });

  // Show 'No results found' if no matches are found
  if (matches === 0 && input !== "") {
    const noResultItem = document.createElement("div");
    noResultItem.classList.add("suggestion-item");
    noResultItem.innerText = "No results found";
    suggestionsContainer.appendChild(noResultItem);
  }
}

// Hide dropdown when clicking outside the search bar or suggestions container
document.addEventListener("click", function (event) {
  const suggestionsContainer = document.getElementById("suggestions");
  const searchInput = document.getElementById("searchInput");

  if (
    !searchInput.contains(event.target) &&
    !suggestionsContainer.contains(event.target)
  ) {
    suggestionsContainer.innerHTML = ""; // Clear suggestions if clicked outside
  }
});
