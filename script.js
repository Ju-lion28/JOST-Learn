// document.addEventListener("DOMContentLoaded", function () {

//     let storedTheme = localStorage.getItem("theme") || "light";
//     document.documentElement.setAttribute("data-theme", storedTheme);

//     // let themeToggleButton = document.getElementById("themeToggleButton");
//     // let themeIcon = document.getElementById("themeIcon");


//     updateTheme(storedTheme);

//     // themeToggleButton.addEventListener("click", () => {
//     //     storedTheme = storedTheme === "light" ? "dark" : "light";
//     //     updateTheme(storedTheme);
//     // });
// });

// function updateTheme(newTheme) {
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);

//     // themeIcon.src = `../assets/icons/theme/${newTheme}.svg`;
// }

document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    var selectedLanguageElement = document.querySelector('input[name="language"]:checked');
    var selectedLanguage = selectedLanguageElement ? selectedLanguageElement.value : '';
    
    var mailtoLink = "mailto:jostlearn@gmail.com" +
                      `?cc=${email}` +
                      `&subject=From: ${encodeURIComponent(name)} | ${encodeURIComponent(subject)}` +
                      ` (${encodeURIComponent(selectedLanguage)})` +
                      `&body=${encodeURIComponent(message)}`;
    
    window.open(mailtoLink, '_blank');
});

var textarea = document.getElementById('message');
textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px'; 
});
