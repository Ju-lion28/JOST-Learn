document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(function (question) {
        const answer = question.querySelector(".answer");

        question.addEventListener("click", function () {
            answer.style.display = answer.style.display === "block" ? "none" : "block";
        });
    });
});


document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var address = document.getElementById('address').value;
    var message = document.getElementById('message').value;

    var selectedLanguageElement = document.querySelector('input[name="language"]:checked');
    var selectedLanguage = selectedLanguageElement ? selectedLanguageElement.value : '';
    
    var mailtoLink = "mailto:jostlearn@gmail.com" +
                      `?cc=${email}` +
                      `&subject=From: ${name} | ${subject}` +
                      ` (${selectedLanguage})` +
                      `&body=${address}\n\n${message}`;
    
    window.open(encodeURI(mailtoLink), '_blank');
});

var textarea = document.getElementById('message');
textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px'; 
});
