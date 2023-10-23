chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getDOM') {
        const content = document.body.innerText;
        sendResponse(content);
    }
    });