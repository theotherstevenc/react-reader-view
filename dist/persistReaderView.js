(()=>{"use strict";const e=function(e,t,r){for(var o=[],n='\n    .readerView.readerView * {\n      all: revert\n    }\n    .readerView.readerView [date-hidden]{\n      display:none !important\n    }\n    .readerView.readerView img{max-width:100%}\n    .readerView.readerView table {display:block;}\n    .readerView.readerView table:not([role="table"]):not([role="grid"]) :where(tbody, thead, tfoot, th, td){\n      display:contents;\n      font-weight:unset;\n    }\n    .readerView.readerView table:not([role="table"]):not([role="grid"]) > * > tr{\n      display:block;\n      margin:1em 0;\n    }\n    .readerView.readerView table:not([role="presentation"]):not([role="none"]):is(\n      :has(>thead ~ tbody),\n      :has(>tbody ~ tfoot),\n      :has(>tbody>tr>th[scope]),\n      :has(>tbody>tr>th+td):has(>tbody>tr+tr),\n      :has(>tbody>tr>th):has(>tbody>tr>td + td)\n    ),\n    .readerView.readerView table:not([role="presentation"]):not([role="none"]):is(\n      :has(>thead ~ tbody),\n      :has(>tbody ~ tfoot),\n      :has(>tbody>tr>th[scope]),\n      :has(>tbody>tr>th+td):has(>tbody>tr+tr),\n      :has(>tbody>tr>th):has(>tbody>tr>td + td)\n    ) :where(tbody, thead, tfoot, tbody > tr, thead > tr, tfoot > tr,  tbody > tr > td,  tbody > tr > th,   thead > tr > th, thead > tr > td, tfoot > tr > th, tfoot > tr > td){\n      display:revert;\n      width:revert;\n      border:1px solid;\n      border-spacing:.2em;\n      padding:.2em;\n      word-break: normal;\n      font-weight:revert;\n    }\n    .readerView.readerView thead::after,\n    .readerView.readerView tfoot::before{\n      content:\'\';\n      display:block;\n      height:.4em;\n    }\n    .readerView.readerView .blockedImage:not(:empty){\n      border: 1px dashed;\n      padding: 1em;\n      display:inline-block;\n      overflow-wrap: anywhere;\n    }\n    .readerView.readerView .blockedImage + img {\n        display: none;\n    }\n    .readerView[data-readerviewprofile="A"]{\n      background:'.concat(e[0].backgroundColor,";\n      color: ").concat(e[0].color,';\n    }\n    .readerView[data-readerviewprofile="A"] :is(a, a *) {\n        text-decoration: underline;\n        color:').concat(e[0].linkColor,';\n    }\n    .readerView[data-readerviewprofile="B"]{\n      background:').concat(e[1].backgroundColor,";\n      color: ").concat(e[1].color,';\n    }\n    .readerView[data-readerviewprofile="B"] :is(a, a *) {\n        text-decoration: underline;\n        color:').concat(e[1].linkColor,';\n    }\n    .readerView[data-readerviewprofile="C"]{\n      background:').concat(e[2].backgroundColor,";\n      color: ").concat(e[2].color,';\n    }\n    .readerView[data-readerviewprofile="C"] :is(a, a *) {\n        text-decoration: underline;\n        color:').concat(e[2].linkColor,";\n    }\n    .readerView.readerView {\n      text-align:").concat(t.textAlign,";\n      font-family:").concat(t.fontFamily,";\n      font-size:").concat(t.fontSize,"rem;\n      line-height:").concat(t.lineHeight,";\n      word-spacing:").concat(t.wordSpacing,"em;\n      letter-spacing:").concat(t.letterSpacing,"em;\n      max-width: ").concat(t.maxWidth,"em;\n      margin: 0 auto;\n      overflow: auto; /* For when things can't collapse far enough */\n      padding: 1em !important; /* override yahoo */\n    }\n    .readerView.readerView *{\n      text-align:").concat(t.textAlign,";\n    }\n  .readerView.readerView button{display:none} /* Outlook zoom button */\n  "),a=document.querySelectorAll(".blockedImage"),i=0,d=Array.from(a);i<d.length;i++){d[i].remove()}if("mail.google.com"===window.location.hostname){var l=window.location.search;o="lg"===new URLSearchParams(l).get("view")?Array.from(document.querySelectorAll("table.message > tbody > tr > td > table > tbody > tr:last-of-type > td > div")):Array.from(document.querySelectorAll(".a3s"))}if("outlook.live.com"===window.location.hostname&&(o=Array.from(document.querySelectorAll("[aria-label='Message body']"))),"mail.yahoo.com"===window.location.hostname&&(o=Array.from(document.querySelectorAll(".msg-body"))),"mail.aol.com"===window.location.hostname&&(o=Array.from(document.querySelectorAll(".AOLWebSuite > div[id], .msg-body"))),!document.querySelector("#ervStyleElement")){var c=document.createElement("style");c.setAttribute("id","ervStyleElement"),o[0].parentElement.prepend(c)}for(var s=0,m=Array.from(o);s<m.length;s++){var b=m[s];if(null!==b.querySelector("iframe")){alert("Reader view does not yet support AMP email");break}b.classList.add("readerView"),b.setAttribute("data-readerViewProfile",r),document.querySelector("#ervStyleElement").replaceChildren(n)}for(var g=Array.from(document.querySelectorAll(".readerView *")),h=function(){var e=w[u];if("none"===window.getComputedStyle(e).display&&e.setAttribute("date-hidden",""),"true"==e.getAttribute("aria-hidden")&&e.setAttribute("date-hidden",""),e.hasAttribute("data-erv-emoji")&&e.remove(),e.hasAttribute("data-emoji")&&0==t.blockImages){var r=e.getAttribute("alt");e.insertAdjacentHTML("beforebegin","<span data-erv-emoji>"+r+"</span>"),e.setAttribute("date-hidden","")}if(t.blockImages&&"IMG"==e.tagName&&!e.hasAttribute("hidden")){var o=e.getAttribute("alt");null!=o&&""!=o.trim()||(o="");var n=document.createElement("span");"A"==e.parentNode.tagName&&"1"==e.parentNode.children.length&&""==e.parentNode.textContent.trim()&&""==o&&(o=e.parentNode.getAttribute("href")),n.innerText=o.trim(),n.classList.add("blockedImage"),e.insertAdjacentHTML("beforebegin",n.outerHTML)}if("A"==e.tagName&&""==e.innerHTML.trim()){var a=e.getAttribute("href");e.insertAdjacentHTML("afterbegin",a)}function i(t){if(e.hasAttribute(t)){var r=e.getAttribute(t),o="data-removed"+t;e.setAttribute(o,r),e.removeAttribute(t)}}"&nbsp;"==e.innerHTML.trim()&&(e.innerHTML=""),i("style"),i("class"),i("id"),i("align"),i("color"),i("background"),i("bgcolor"),i("width"),i("height")},u=0,w=g;u<w.length;u++)h()};chrome.runtime.onMessage.addListener((function(t){var r=t.profiles,o=t.settings,n=t.currentProfile,a=t.toggleButton;localStorage.setItem("localProfiles",JSON.stringify(r)),localStorage.setItem("localSettings",JSON.stringify(o)),localStorage.setItem("currentProfile",n),localStorage.setItem("toggleButton",a);for(var i=0,d=Array.from(document.querySelectorAll("tr.zA.yO"));i<d.length;i++){d[i].addEventListener("click",(function(t){JSON.parse(localStorage.getItem("toggleButton"))&&setTimeout((function(){e(r,o,n)}),250)}))}}))})();