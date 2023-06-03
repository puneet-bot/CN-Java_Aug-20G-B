var charactersCount = document.getElementById("select-char-number");
var characterForm = document.getElementById("characters");
var useExistingbtn = document.getElementById("use-existing");

charactersCount.addEventListener("change", function () {
  const selectedValue = this.value;
  console.log(characterForm);
  if (selectedValue != null) {
    let charDiv = document.createElement("form");
    characterForm.innerHTML = "";
    charDiv.setAttribute("id", "char-container");
    charDiv.setAttribute("method", "POST");
    charDiv.setAttribute("action", "/create/characters");
    for (let i = 0; i < selectedValue; i++) {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", `character-${i}`);
      input.setAttribute("name", `character-${i}`);
      input.setAttribute("placeholder", "Enter Character");
      charDiv.appendChild(input);
    }
    let button = document.createElement("button");
    button.innerHTML = "Add Charcters";
    charDiv.appendChild(button);
    characterForm.appendChild(charDiv);
    characterForm.style.display = "block";
  }

  // Perform additional actions with the selected value
});

if(useExistingbtn.value=='True'){
  console.log('Yessss');
}

useExistingbtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("characters").style.display = "none";
  document.getElementById("select-char-number").style.display = "none";
  document.getElementById("Joke-form-content").style.display="block";
});
