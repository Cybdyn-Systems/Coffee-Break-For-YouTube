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

    /**
     * Monitors for ads and manages playback speed accordingly.
     */
    function monitorAds() {
        const adContainer = document.querySelector('.ad-showing');

        if (adContainer) {
            // Ad is playing
            console.log("Ad detected. Speeding up playback.");

            // Speed up the ad
            setPlaybackSpeed(16);
        } else {
            // No ad is playing
            const currentUserSpeed = getUserPlaybackRate();
            if (currentUserSpeed !== userPlaybackRate) {
                userPlaybackRate = currentUserSpeed;
                console.log(`No ad detected. Restoring playback speed to ${userPlaybackRate}x.`);
                setPlaybackSpeed(userPlaybackRate);
            }
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
