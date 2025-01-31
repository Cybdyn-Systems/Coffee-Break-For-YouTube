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
        const adBlockerMessage = document.querySelector('ytd-enforcement-message-view-model #container');
    
        if (adBlockerMessage) {
            chrome.runtime.sendMessage({ action: "unmuteTab" });
            window.location.href = window.location.href;
            return;
        }
        
        if (adContainer && video) {
            // Always mute and speed up if there's an ad
            if (!isAdPlaying) {
                isAdPlaying = true;
                adCount++;
            }
            setPlaybackSpeed(16);
            chrome.runtime.sendMessage({ action: "muteTab" });
        } else if (isAdPlaying) {
            isAdPlaying = false;
            adCount = 0;
            setPlaybackSpeed(userPlaybackRate);
            chrome.runtime.sendMessage({ action: "unmuteTab" });
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
