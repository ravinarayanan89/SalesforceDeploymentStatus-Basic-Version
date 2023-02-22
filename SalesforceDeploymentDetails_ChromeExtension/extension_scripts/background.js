// Sending messages from background / event page
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete'){
        //Query for the active tab being opened
            chrome.tabs.query({ active: true }, function(tabs) {
                for(var tab of tabs){
                    if(tab.url  && tab.url.includes('/setup/DeployStatus')) {
                        var domainUrl = tab.url.split('.')[0];
                        domainUrl = domainUrl.replace('https://','');

                        domainUrlWithSandbox = domainUrl+'.sandbox.my.salesforce.com';
                        domainUrl = domainUrl+'.my.salesforce.com';

                        getSessionIdFromCookies(domainUrl,tab);
                        getSessionIdFromCookies(domainUrlWithSandbox,tab);
                    }
                }
        });
    }

    function getSessionIdFromCookies(domainUrl,tab){
            chrome.cookies.getAll({'domain':domainUrl},function(cookie){ 
                for(i=0;i<cookie.length;i++){
                    if(cookie[i].name=="sid"){
                        //Pass the Message to Content Script.js
                                chrome.tabs.sendMessage(tab.id, { "message": cookie[i].value,
                                            "domainurl" : domainUrl });
                    }
                }  
            }); 
    }
});



