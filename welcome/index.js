document.addEventListener('DOMContentLoaded', () => {
    // Support button
    const supportBtn = document.querySelector('.support-btn');
    supportBtn.addEventListener('click', () => {
        window.open('https://www.buymeacoffee.com/samueltinnerholm', '_blank');
    });

    // Rate button
    const rateBtn = document.querySelector('.action-btn:nth-child(1)');
    rateBtn.addEventListener('click', () => {
        window.open('https://chromewebstore.google.com/');
    });

    // Report Bug button
    const reportBugBtn = document.querySelector('.action-btn:nth-child(2)');
    reportBugBtn.addEventListener('click', () => {
        window.open('mailto:samuel.tinnerholm@rosenblattlabs.com');
    });
});
