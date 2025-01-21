'use strict';

const speedController = (function() {
    let vid = null;

    function initializeVideo() {
        if (!vid) {
            vid = document.querySelector('video');
            if (!vid) {
                console.log("No video element found");
                return false;
            }
        }
        return true;
    }

    function changeSpeed(newSpeed) {
        if (!initializeVideo()) return;
        console.log("Changing speed to:", newSpeed);
        try {
            vid.playbackRate = newSpeed;
        } catch (e) {
            console.error("Error changing speed:", e);
        }
    }

    // Make changeSpeed available globally
    window.changeSpeed = changeSpeed;
})();
