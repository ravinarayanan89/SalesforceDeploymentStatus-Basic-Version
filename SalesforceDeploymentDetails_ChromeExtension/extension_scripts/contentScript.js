var element;
let timerFn;



// Listening to messages in Context Script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('received message: ' + request);
	receiveMessage(request.message);
	return true;
})


function xpath(xpathToExecute,sid) {
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        result.push(nodesSnapshot.snapshotItem(i));
	}

	if(result.length > 0){
		stopJSIntervalFn();
		element = result[0];
		stopJSIntervalFn();
		processSalesforceAPiCalls(sid);
	} 

}

function stopJSIntervalFn() {
	clearInterval(timerFn);
}

function processSalesforceAPiCalls(sid){
	//Hide the existing deployment status screen
	element.style.display="none";

	var domainUrl = window.location.href.split('.')[0];
	domainUrl = domainUrl.replace('https://','');
	domainUrl += '.my.salesforce.com';
	var iFrame  = document.createElement ("iframe");
	
	iFrame.id = 'deploymentstatus';
	var chsrc = chrome.runtime.getURL("src/html/main.html");
	chsrc += "?deploymentId="+getQueryVariable("asyncId");
	chsrc += "&domain="+domainUrl;
  	chsrc += "&sid="+sid;
	iFrame.src = chsrc;
	iFrame.style="border-width:0px;height:100%;width:100%;";
	
	document.getElementsByClassName('setupcontent')[0].childNodes[0].childNodes[1] = '';
	document.getElementsByClassName('setupcontent')[0].childNodes[0].childNodes[1].appendChild(iFrame);
}


function getQueryVariable(variable) {
	var query = decodeURIComponent(window.location.href);
	var vars = query.split("?");
	for (var i=0;i<vars.length;i++) {
	  var pair = vars[i].split("=");
	  if (pair[0] == variable) {
		return pair[1];
	  }
	} 
}


const receiveMessage = (sid) => {
	var currentPage = window.location.href;
	if(currentPage.includes('DeployStatus') && currentPage.includes('asyncId')){
			clearInterval(timerFn);
			timerFn= setInterval(function() {
				xpath(".//div[@class='content iframe-parent']",sid);
			},1000);
	}

}; 



