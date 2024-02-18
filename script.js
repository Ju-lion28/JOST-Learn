window.onload = function() {
    var links = document.querySelectorAll('.nav_link');
    var calculationsFinished = 0;

    // Calculate the width difference for each link
    links.forEach(function(link) {
        var rect = link.getBoundingClientRect();
        var initialWidth = rect.width;

        // Apply font-stretch: condensed;
        link.style.fontStretch = 'condensed';

        // Measure the width again after applying font-stretch
        rect = link.getBoundingClientRect();
        var finalWidth = rect.width;

        link.style.fontStretch = 'normal';

        // Calculate the difference in width and store it as a data attribute
        var widthDifference = Math.abs(finalWidth - initialWidth);
        console.log(widthDifference)
        link.setAttribute('data-width-difference', widthDifference);
        calculationsFinished++;

        // Check if all calculations are finished
        if (calculationsFinished === links.length) {
            // Apply transition to all links after width differences are calculated
            links.forEach(function(link) {
                link.style.transition = 'all 0.2s cubic-bezier(0.22, 0.61, 0.36, 1)';
            });
        }
    });

    // Event listener for link clicks
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            // Retrieve the width difference from the stored data attribute
            var newPadding = parseFloat(link.getAttribute('data-width-difference'));

            // Calculate the new padding based on the pre-calculated width difference
            link.style.fontStretch = 'condensed';
            link.style.paddingRight = newPadding + 'px';
        });
    });
};
