chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == "showAlert") {
            ele = document.createElement("div");
            ele.style.width = "400px";
            ele.style.height = "200px";
            ele.style.backgroundColor = "blue";
            ele.style.color = "white";
            ele.style.textAlign = "center";
            ele.style.position = "fixed";
            ele.style.top = 0;
            ele.style.left = 0;
            ele.style.zIndex = 50000;
            ele.style.fontSize = "25px";
            ele.style.lineHeight = "50px";
            ele.innerHTML = "Cash Back is Available from <a style='color: white' href='http://givingassistant.org'>GivingAssistant.org</a>!";
            document.body.appendChild(ele);
            setTimeout(function() {
                ele.remove()
            }, request.timeout)
        }
    });