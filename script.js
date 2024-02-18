window.onload = function() {
	var activeLinks = document.querySelectorAll('.nav_link');

	activeLinks.forEach(function(link) {
		link.addEventListener('click', function() {
			// Adjust padding when the link is clicked
			var initialWidth = link.offsetWidth; // Initial width before font-stretch

			// Apply font-stretch: condensed;
			link.style.fontStretch = 'condensed';

			var finalWidth = link.offsetWidth; // Width after font-stretch

			// Calculate the difference in width
			var widthDifference = finalWidth - initialWidth;

			// Example: Adjust right padding to counteract the change in width
			link.style.paddingRight = (parseInt(link.style.paddingRight || 0) + widthDifference) + 'px';
		});
	});
};