// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

//var settings = new Store("settings", {
//     "aggressive": true
//});

allSites = ""


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("GOT REQ");
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });


function getLocation(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function loadData(url) {
    console.log("Requesting cash back data from giving assistant");
    var x = new XMLHttpRequest();
    x.onload = function () {
        console.log("Loaded cash back data from giving assistant");
        allSites = x.responseText; // <---- !!!
    };
    x.open('GET', url);
    x.send();
}

loadData('https://givingassistant.org/sitemap/cashback.xml');

function sendMessageToTab(tabId) {
    chrome.tabs.sendMessage(tabId, {msg: "showAlert", timeout: 5000});
}

chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status == "complete") {
        chrome.tabs.get(tabId, function (tab) {
            console.log(tab.url);
            var l = getLocation(tab.url);
            var h = l.hostname.replace('www.', '');
            console.debug(h);
            if(allSites.indexOf(h) != -1) {
                console.log("FOUND DOMAIN IN CASH BACK LIST");

                sendMessageToTab(tabId)
            } else {
                console.log("DOMAIN NOT IN CB LIST");
            }
        });
    }
});

