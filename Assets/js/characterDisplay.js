var charactersCount = document.getElementById("select-char-number");
var characterForm = document.getElementById("characters");
var useExistingbtn = document.getElementById("use-existing");

charactersCount.addEventListener("change", function () {
  const selectedValue = this.value;
  console.log(characterForm);
  if (selectedValue != null) {
    let charDiv = document.createElement("div");
    characterForm.innerHTML = "";
    charDiv.setAttribute("id", "char-container");
    for (let i = 0; i < selectedValue; i++) {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", `character-${i}`);
      input.setAttribute("name", `character-${i}`);
      input.setAttribute("placeholder", "Enter Character");
      charDiv.appendChild(input);
    }
    let button = document.createElement("a");
    button.innerHTML = "Add Charcters";
    button.setAttribute("href", "/character");
    charDiv.appendChild(button);
    characterForm.appendChild(charDiv);
    characterForm.style.display = "block";
  }

  // Perform additional actions with the selected value
});

useExistingbtn.addEventListener("click", function () {
  document.getElementById("characters").style.display = "none";
  document.getElementById("select-char-number").style.display = "none";
});
