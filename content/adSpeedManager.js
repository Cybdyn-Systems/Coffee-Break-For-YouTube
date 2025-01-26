'use strict';

(function() {
    const CHECK_INTERVAL = 250; // Milliseconds
    let userPlaybackRate = 1; // Default playback speed
    let isAdPlaying = false;
    let adCount = 0; // Track the current ad sequence number

    function getUserPlaybackRate() {
        const video = document.querySelector('video');
        return video ? video.playbackRate : 1;
    }

    function setPlaybackSpeed(speed) {
        const video = document.querySelector('video');
        if (video) {
            video.playbackRate = speed;
            console.log(`Playback speed set to ${speed}x`);
        }
    }

    function monitorAds() {
        const adContainer = document.querySelector('.ad-showing');
        const video = document.querySelector('video');
        
        if (adContainer) {
            if (!isAdPlaying || video.playbackRate !== 16) {
                // Either new ad sequence started or speed was reset during ad
                isAdPlaying = true;
                console.log(`Ad #${++adCount} detected. Speeding up playback.`);
                setPlaybackSpeed(16);
                // Send message to background script to mute tab
                chrome.runtime.sendMessage({ action: "muteTab" });
            }
        } else if (isAdPlaying) {
            // Ad finished
            isAdPlaying = false;
            adCount = 0; // Reset counter when ads finish
            console.log(`No ad detected. Restoring playback speed to ${userPlaybackRate}x.`);
            setPlaybackSpeed(userPlaybackRate);
            // Send message to background script to unmute tab
            chrome.runtime.sendMessage({ action: "unmuteTab" });
            
            // Send message to background script to increment counter
            chrome.runtime.sendMessage({ action: "incrementAdCount" });
        }
    }    

    function init() {
        userPlaybackRate = getUserPlaybackRate();
        console.log(`Initial user playback speed: ${userPlaybackRate}x`);
        setInterval(monitorAds, CHECK_INTERVAL);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
