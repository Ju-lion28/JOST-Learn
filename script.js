document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    var selectedLanguage = document.querySelector('input[name="language"]:checked').value;

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
