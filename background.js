'use strict';

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install' || details.reason === 'update') {
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome/welcome.html')
        });
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'welcome/welcome.html' });
  });
