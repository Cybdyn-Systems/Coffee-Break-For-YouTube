'use strict';

(function() {
    let vid = null;

    // Function to initialize the video element
    function initializeVideo() {
        vid = document.querySelector('video');
        if (vid) {
            console.log("Video element found:", vid);
            // Listen for changes to the playback rate
            vid.addEventListener('ratechange', onRateChange, true);
        } else {
            console.log("Video element not found, waiting for it to be added to the DOM...");
        }
    }

    // Callback function for when the playback rate changes
    function onRateChange() {
        console.log("Playback rate changed to:", vid.playbackRate);
    }

    // MutationObserver callback to detect when the video element is added or removed
    function onMutation(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Check if video element has been added
                if (!vid) {
                    initializeVideo();
                    if (vid) {
                        break;
                    }
                }
            }
        }
    }

    // Start observing the DOM for changes
    const observer = new MutationObserver(onMutation);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Initialize the video element if it's already present
    initializeVideo();

    // Function to change the playback speed
    function changeSpeed(newSpeed) {
        if (vid) {
            console.log("Changing speed to:", newSpeed);
            vid.playbackRate = newSpeed;
        } else {
            console.log("Video element not available to change speed.");
        }
    }

    // Expose changeSpeed globally so that other scripts can use it
    window.changeSpeed = changeSpeed;
})();
