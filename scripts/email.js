document.getElementById("requestForm").addEventListener("submit", function(event){
	event.preventDefault(); // Prevent the form from submitting
	
	// Collect form data
	var formData = new FormData(this);
	
	// Send data via AJAX
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/process_request", true); // Adjust URL as needed
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == XMLHttpRequest.DONE) {
		if (xhr.status == 200) {
		  alert("Request submitted successfully");
		  document.getElementById("requestForm").reset(); // Clear the form after successful submission
		} else {
		  alert("Error: " + xhr.responseText);
		}
	  }
	};
	xhr.send(formData);
  });