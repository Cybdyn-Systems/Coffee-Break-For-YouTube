'use strict';

(function() {
    const CHECK_INTERVAL = 250; // Milliseconds
    let userPlaybackRate = 1; // Default playback speed

    /**
     * Retrieves the current playback rate set by the user.
     * @returns {number} The current playback rate.
     */
    function getUserPlaybackRate() {
        const video = document.querySelector('video');
        return video ? video.playbackRate : 1;
    }

    /**
     * Sets the playback rate of the video element.
     * @param {number} speed - The desired playback speed.
     */
    function setPlaybackSpeed(speed) {
        const video = document.querySelector('video');
        if (video) {
            video.playbackRate = speed;
            console.log(`Playback speed set to ${speed}x`);
        }
    }

    let isAdPlaying = false;

    /**
     * Monitors for ads and manages playback speed accordingly.
     */
    function monitorAds() {
        const adContainer = document.querySelector('.ad-showing');
    
        if (adContainer && !isAdPlaying) {
            // New ad detected
            isAdPlaying = true;
            console.log("Ad detected. Speeding up playback.");
            setPlaybackSpeed(16);
        } else if (!adContainer && isAdPlaying) {
            // Ad finished
            isAdPlaying = false;
            console.log(`No ad detected. Restoring playback speed to ${userPlaybackRate}x.`);
            setPlaybackSpeed(userPlaybackRate);
                
            // Send message to background script to increment counter
            chrome.runtime.sendMessage({ action: "incrementAdCount" });
        }
    }

    /**
     * Initializes the extension by setting up the interval to monitor ads.
     */
    function init() {
        // Initialize user's playback rate
        userPlaybackRate = getUserPlaybackRate();
        console.log(`Initial user playback speed: ${userPlaybackRate}x`);

        // Set an interval to check for ads periodically
        setInterval(monitorAds, CHECK_INTERVAL);
    }

    // Wait for the DOM to fully load before initializing
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
