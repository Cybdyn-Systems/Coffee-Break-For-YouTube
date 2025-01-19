document.addEventListener('DOMContentLoaded', function() {
    // Update the ads skipped count when popup opens
    updateAdsSkippedCount();

    // Add click listeners
    document.querySelector('.support-btn').addEventListener('click', () => {
        window.open('https://www.buymeacoffee.com/samueltinnerholm', '_blank');
    });

    document.querySelector('.action-btn:nth-child(1)').addEventListener('click', () => {
        window.open('https://chromewebstore.google.com/', '_blank');
    });

    document.querySelector('.action-btn:nth-child(2)').addEventListener('click', () => {
        window.open('mailto:samuel.tinnerholm@rosenblattlabs.com');
    });
});

function updateAdsSkippedCount() {
    chrome.storage.sync.get("adsSkipped", function(items) {
        const count = items.adsSkipped || 0;
        document.getElementById('adsSkipped').textContent = count;
    });
}

// Listen for storage changes to update the counter in real-time
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync' && changes.adsSkipped) {
        document.getElementById('adsSkipped').textContent = changes.adsSkipped.newValue || 0;
    }
});
