'use strict';

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install' || details.reason === 'update') {
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome/welcome.html')
        });
    }
});

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
        chrome.storage.sync.set({ "adsSkipped": 0 }, function(){
            //  A data saved callback omg so fancy
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "incrementAdCount") {
        chrome.storage.sync.get("adsSkipped", function(items) {
            const currentCount = items.adsSkipped || 0;
            console.log('skipped n ads:', currentCount + 1);
            chrome.storage.sync.set({ 
                "adsSkipped": currentCount + 1 
            }, function() {
                console.log(`Ads skipped: ${currentCount + 1}`);
            });
        });
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'welcome/welcome.html' });
  });
