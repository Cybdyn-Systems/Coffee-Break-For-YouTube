'use strict';

(function() {
    const CHECK_INTERVAL = 10; // Milliseconds
    let userPlaybackRate = 1;
    let isAdPlaying = false;
    let adCount = 0;
    let lastVideo = null;
    const overlayId = 'black-ad-overlay';

    function muteAndClampVideo(video) {
        if (!video) return;
        video.muted = true;
        video.playbackRate = 16;
        video.style.visibility = 'hidden';
        console.log('[AD BLOCK] Mute + clamp triggered on new video.');
    }

    function restoreVideo(video) {
        if (!video) return;
        video.muted = false;
        video.playbackRate = userPlaybackRate;
        video.style.visibility = 'visible';
    }

    function insertBlackOverlay(video) {
        if (!document.getElementById(overlayId)) {
            const overlay = document.createElement('div');
            overlay.id = overlayId;
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = video.offsetWidth + 'px';
            overlay.style.height = video.offsetHeight + 'px';
            overlay.style.background = 'black';
            overlay.style.zIndex = '9999';
            overlay.style.pointerEvents = 'none';

            video.parentElement.style.position = 'relative';
            video.parentElement.appendChild(overlay);
        }
    }

    function removeBlackOverlay() {
        const overlay = document.getElementById(overlayId);
        if (overlay) overlay.remove();
    }

    function monitorAds() {
        const adContainer = document.querySelector('.ad-showing');
        const video = document.querySelector('video');
        const adBlockerMessage = document.querySelector('ytd-enforcement-message-view-model #container');

        if (!video) return;

        if (adBlockerMessage) {
            chrome.runtime.sendMessage({ action: "unmuteTab" });
            window.location.href = window.location.href;
            return;
        }

        if (adContainer) {
            if (!isAdPlaying) {
                isAdPlaying = true;
                adCount++;
                userPlaybackRate = video.playbackRate;
                console.log("[AD BLOCK] Ad started — saved rate:", userPlaybackRate);
            }

            video.muted = true;
            video.playbackRate = 16;
            video.style.visibility = 'hidden';
            insertBlackOverlay(video);
        } else if (isAdPlaying) {
            isAdPlaying = false;
            adCount = 0;
            console.log("[AD BLOCK] Ad ended — restoring.");

            restoreVideo(video);
            removeBlackOverlay();

            chrome.runtime.sendMessage({ action: "unmuteTab" });
            chrome.runtime.sendMessage({ action: "incrementAdCount" });
        }
    }

    function initVideoWatcher() {
        const observer = new MutationObserver(() => {
            const video = document.querySelector('video');
            if (video && video !== lastVideo) {
                lastVideo = video;
                video.muted = true;
                console.log('[AD BLOCK] Muted new video element via observer.');

                // Safety: Listen for any "play" events to re-mute if needed
                video.addEventListener('play', () => {
                    if (!video.muted) {
                        video.muted = true;
                        console.log('[AD BLOCK] Re-muted during play.');
                    }
                }, true);
            }
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    function init() {
        userPlaybackRate = getUserPlaybackRate();
        initVideoWatcher();
        setInterval(monitorAds, CHECK_INTERVAL);
    }

    function getUserPlaybackRate() {
        const video = document.querySelector('video');
        return video ? video.playbackRate : 1;
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
