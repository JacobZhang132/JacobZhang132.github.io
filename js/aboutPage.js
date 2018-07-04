
document.getElementById("aboutA").addEventListener("click", function() {
    var letters = document.getElementById("vballLetters").getElementsByClassName("letter");

    for (var i = 0; i < letters.length; i++) {
        letters[i].classList.add("notransition");
        void letters[i].offsetWidth;
        letters[i].classList.remove("notransition");
    }
});