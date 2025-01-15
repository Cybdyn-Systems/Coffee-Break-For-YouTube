'use strict';

let player = null;
let vid = null;

// configure the video player
function configure() {
    if (player && vid) return true;

    try {
        player = document.querySelector('#movie_player');
        vid = player.querySelector('video');
        if (!vid || !player) return false;
        return true;
    } catch (error) {
        console.error("Configuration error:", error);
        return false;
    }
}

// Try to configure periodically until successful
const configureInterval = setInterval(() => {
    if (configure()) {
        clearInterval(configureInterval);
        console.log("Video player configured successfully");
    }
}, 250);
