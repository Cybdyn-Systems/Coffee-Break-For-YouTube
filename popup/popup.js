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

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatTimeRange(minHours, maxHours) {
    const formatTime = (hours) => {
        if (hours < 1) {
            // Less than an hour - show minutes
            return (hours * 60).toFixed(1) + 'm';
        } else if (hours < 24) {
            // Less than a day - show hours
            return hours.toFixed(1) + 'h';
        } else if (hours < 168) {
            // Less than a week - show days
            return (hours / 24).toFixed(1) + 'd';
        } else if (hours < 720) {
            // Less than a month - show weeks
            return (hours / 168).toFixed(1) + 'w';
        } else {
            // Show months
            return (hours / 720).toFixed(1) + 'mo';
        }
    };

    const minFormatted = formatTime(minHours);
    const maxFormatted = formatTime(maxHours);

    return `${minFormatted}-${maxFormatted}`;
}

function updateAdsSkippedCount() {
    chrome.storage.sync.get("adsSkipped", function(items) {
        const count = items.adsSkipped || 0;
        const minCount = count;
        const maxCount = count * 2;

        // Format ads skipped count
        const countString = `${formatNumber(maxCount)}`;
        document.getElementById('adsSkipped').textContent = countString;

        // Calculate and format time saved (5 seconds minimum, 15 seconds maximum per ad)
        const minHoursSaved = (minCount * 5) / 3600; // Convert seconds to hours using minimum time
        const maxHoursSaved = (maxCount * 15) / 3600; // Convert seconds to hours using maximum time
        
        const timeString = formatTimeRange(minHoursSaved, maxHoursSaved);
        document.getElementById('timeSaved').textContent = timeString;
    });
}

// Listen for storage changes to update the counter in real-time
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync' && changes.adsSkipped) {
        updateAdsSkippedCount();
    }
});
