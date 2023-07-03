/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/enableReaderView.js":
/*!***************************************!*\
  !*** ./src/utils/enableReaderView.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var enableReaderView = function enableReaderView(profile, settings, currentProfile) {
  var wrappers = [];
  var styleSheet = "\n    .readerView.readerView * {\n      all: revert\n    }\n    .readerView.readerView [date-hidden]{\n      display:none !important\n    }\n    .readerView.readerView img{max-width:100%}\n    .readerView.readerView table {display:block;}\n    .readerView.readerView table:not([role=\"table\"]):not([role=\"grid\"]) :where(tbody, thead, tfoot, th, td){\n      display:contents;\n      font-weight:unset;\n    }\n    .readerView.readerView table:not([role=\"table\"]):not([role=\"grid\"]) > * > tr{\n      display:block;\n      margin:1em 0;\n    }\n    .readerView.readerView table:not([role=\"presentation\"]):not([role=\"none\"]):is(\n      :has(>thead ~ tbody),\n      :has(>tbody ~ tfoot),\n      :has(>tbody>tr>th[scope]),\n      :has(>tbody>tr>th+td):has(>tbody>tr+tr),\n      :has(>tbody>tr>th):has(>tbody>tr>td + td)\n    ),\n    .readerView.readerView table:not([role=\"presentation\"]):not([role=\"none\"]):is(\n      :has(>thead ~ tbody),\n      :has(>tbody ~ tfoot),\n      :has(>tbody>tr>th[scope]),\n      :has(>tbody>tr>th+td):has(>tbody>tr+tr),\n      :has(>tbody>tr>th):has(>tbody>tr>td + td)\n    ) :where(tbody, thead, tfoot, tbody > tr, thead > tr, tfoot > tr,  tbody > tr > td,  tbody > tr > th,   thead > tr > th, thead > tr > td, tfoot > tr > th, tfoot > tr > td){\n      display:revert;\n      width:revert;\n      border:1px solid;\n      border-spacing:.2em;\n      padding:.2em;\n      word-break: normal;\n      font-weight:revert;\n    }\n    .readerView.readerView thead::after,\n    .readerView.readerView tfoot::before{\n      content:'';\n      display:block;\n      height:.4em;\n    }\n    .readerView.readerView .blockedImage:not(:empty){\n      border: 1px dashed;\n      padding: 1em;\n      display:inline-block;\n      overflow-wrap: anywhere;\n    }\n    .readerView.readerView .blockedImage + img {\n        display: none;\n    }\n    .readerView[data-readerviewprofile=\"A\"]{\n      background:".concat(profile[0].backgroundColor, ";\n      color: ").concat(profile[0].color, ";\n    }\n    .readerView[data-readerviewprofile=\"A\"] :is(a, a *) {\n        text-decoration: underline;\n        color:").concat(profile[0].linkColor, ";\n    }\n    .readerView[data-readerviewprofile=\"B\"]{\n      background:").concat(profile[1].backgroundColor, ";\n      color: ").concat(profile[1].color, ";\n    }\n    .readerView[data-readerviewprofile=\"B\"] :is(a, a *) {\n        text-decoration: underline;\n        color:").concat(profile[1].linkColor, ";\n    }\n    .readerView[data-readerviewprofile=\"C\"]{\n      background:").concat(profile[2].backgroundColor, ";\n      color: ").concat(profile[2].color, ";\n    }\n    .readerView[data-readerviewprofile=\"C\"] :is(a, a *) {\n        text-decoration: underline;\n        color:").concat(profile[2].linkColor, ";\n    }\n    .readerView.readerView {\n      text-align:").concat(settings.textAlign, ";\n      font-family:").concat(settings.fontFamily, ";\n      font-size:").concat(settings.fontSize, "rem;\n      line-height:").concat(settings.lineHeight, ";\n      word-spacing:").concat(settings.wordSpacing, "em;\n      letter-spacing:").concat(settings.letterSpacing, "em;\n      max-width: ").concat(settings.maxWidth, "em;\n      margin: 0 auto;\n      overflow: auto; /* For when things can't collapse far enough */\n      padding: 1em !important; /* override yahoo */\n    }\n    .readerView.readerView *{\n      text-align:").concat(settings.textAlign, ";\n    }\n  .readerView.readerView button{display:none} /* Outlook zoom button */\n  ");
  var style = document.querySelectorAll('.blockedImage');
  for (var _i = 0, _Array$from = Array.from(style); _i < _Array$from.length; _i++) {
    var item = _Array$from[_i];
    item.remove();
  }
  if (window.location.hostname === 'mail.google.com') {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var view = urlParams.get('view');
    if (view === 'lg') {
      wrappers = Array.from(document.querySelectorAll('table.message > tbody > tr > td > table > tbody > tr:last-of-type > td > div'));
    } else {
      wrappers = Array.from(document.querySelectorAll('.a3s'));
    }
  }
  if (window.location.hostname === 'outlook.live.com') {
    wrappers = Array.from(document.querySelectorAll("[aria-label='Message body']"));
  }
  if (window.location.hostname === 'mail.yahoo.com') {
    wrappers = Array.from(document.querySelectorAll('.msg-body'));
  }
  if (window.location.hostname === 'mail.aol.com') {
    wrappers = Array.from(document.querySelectorAll('.AOLWebSuite > div[id], .msg-body'));
  }
  if (!document.querySelector('#ervStyleElement')) {
    var ervStyleElement = document.createElement('style');
    ervStyleElement.setAttribute('id', 'ervStyleElement');
    wrappers[0].parentElement.prepend(ervStyleElement);
  }
  for (var _i2 = 0, _Array$from2 = Array.from(wrappers); _i2 < _Array$from2.length; _i2++) {
    var wrapper = _Array$from2[_i2];
    var iframe = wrapper.querySelector('iframe');
    if (iframe === null) {
      wrapper.classList.add('readerView');
      wrapper.setAttribute('data-readerViewProfile', currentProfile);
      document.querySelector('#ervStyleElement').replaceChildren(styleSheet);
    } else {
      alert('Reader view does not yet support AMP email');
      break;
    }
  }
  var emails = Array.from(document.querySelectorAll('.readerView *'));
  var _loop = function _loop() {
    var item = _emails[_i3];
    var style = window.getComputedStyle(item);
    if (style.display === 'none') {
      item.setAttribute('date-hidden', '');
    }
    if (item.getAttribute('aria-hidden') == 'true') {
      item.setAttribute('date-hidden', '');
    }
    if (item.hasAttribute('data-erv-emoji')) {
      item.remove();
    }
    if (item.hasAttribute('data-emoji') && settings.blockImages == false) {
      var alt = item.getAttribute('alt');
      item.insertAdjacentHTML('beforebegin', '<span data-erv-emoji>' + alt + '</span>');
      item.setAttribute('date-hidden', '');
    }
    if (settings.blockImages) {
      if (item.tagName == 'IMG' && !item.hasAttribute('hidden')) {
        var _alt = item.getAttribute('alt');
        if (_alt == null || _alt.trim() == '') {
          _alt = '';
        }
        var fauxImg = document.createElement('span');
        if (item.parentNode.tagName == 'A' && item.parentNode.children.length == '1' && item.parentNode.textContent.trim() == '') {
          if (_alt == '') {
            _alt = item.parentNode.getAttribute('href');
          }
        }
        fauxImg.innerText = _alt.trim();
        fauxImg.classList.add('blockedImage');
        item.insertAdjacentHTML('beforebegin', fauxImg.outerHTML);
      }
    }
    if (item.tagName == 'A' && item.innerHTML.trim() == '') {
      var href = item.getAttribute('href');
      item.insertAdjacentHTML('afterbegin', href);
    }
    if (item.innerHTML.trim() == '&nbsp;') {
      item.innerHTML = '';
    }
    replaceAttribute('style');
    replaceAttribute('class');
    replaceAttribute('id');
    replaceAttribute('align');
    replaceAttribute('color');
    replaceAttribute('background');
    replaceAttribute('bgcolor');
    replaceAttribute('width');
    replaceAttribute('height');
    function replaceAttribute(attribute) {
      if (item.hasAttribute(attribute)) {
        var attributeValue = item.getAttribute(attribute);
        var attributeName = 'data-removed' + attribute;
        item.setAttribute(attributeName, attributeValue);
        item.removeAttribute(attribute);
      }
    }
  };
  for (var _i3 = 0, _emails = emails; _i3 < _emails.length; _i3++) {
    _loop();
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enableReaderView);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************!*\
  !*** ./src/persistReaderView.jsx ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_enableReaderView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/enableReaderView */ "./src/utils/enableReaderView.js");
/*
WORK IN PROGRESS:
experimenting with a feature which will persist the reader view settings while navigating between emails in the inbox.
it's buggy and not ready for prime time, but I'm leaving it in the codebase for now.
TLDR:
  - this is Gmail only for now.
  - popup.js sends the necessary settings to the content-script.js
  - content-script stores them in local storage.
  - if the reader view is enabled when the user clicks on an email in the inbox, the content script will wait 250ms then apply the reader view to the email.
TODO: 
  - look for a better way to do this, or just remove it entirely.
  - also take into account reading pane settings.
  - utilize react if necessary or advantageous.  
*/


chrome.runtime.onMessage.addListener(function (_ref) {
  var profiles = _ref.profiles,
    settings = _ref.settings,
    currentProfile = _ref.currentProfile,
    toggleButton = _ref.toggleButton;
  localStorage.setItem('localProfiles', JSON.stringify(profiles));
  localStorage.setItem('localSettings', JSON.stringify(settings));
  localStorage.setItem('currentProfile', currentProfile);
  localStorage.setItem('toggleButton', toggleButton);
  var inboxPreviews = Array.from(document.querySelectorAll('tr.zA.yO'));
  for (var _i = 0, _inboxPreviews = inboxPreviews; _i < _inboxPreviews.length; _i++) {
    var inboxPreview = _inboxPreviews[_i];
    inboxPreview.addEventListener('click', function (e) {
      if (JSON.parse(localStorage.getItem('toggleButton'))) {
        setTimeout(function () {
          (0,_utils_enableReaderView__WEBPACK_IMPORTED_MODULE_0__["default"])(profiles, settings, currentProfile);
        }, 250);
      }
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXBFLEVBQUE7SUFDbkJxRSxZQUFZLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDQyxDQUFDLEVBQUs7TUFDNUMsSUFBSU4sSUFBSSxDQUFDTyxLQUFLLENBQUNULFlBQVksQ0FBQ1UsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7UUFDcERDLFVBQVUsQ0FBQyxZQUFNO1VBQ2Y5RixtRUFBZ0IsQ0FBQ2lGLFFBQVEsRUFBRS9FLFFBQVEsRUFBRUMsY0FBYyxDQUFDO1FBQ3RELENBQUMsRUFBRSxHQUFHLENBQUM7TUFDVDtJQUNGLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1yZWFkZXItdmlldy1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL2VuYWJsZVJlYWRlclZpZXcuanMiLCJ3ZWJwYWNrOi8vcmVhY3QtcmVhZGVyLXZpZXctY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZWFjdC1yZWFkZXItdmlldy1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZWFjdC1yZWFkZXItdmlldy1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVhY3QtcmVhZGVyLXZpZXctY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JlYWN0LXJlYWRlci12aWV3LWNocm9tZS1leHRlbnNpb24vLi9zcmMvcGVyc2lzdFJlYWRlclZpZXcuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGVuYWJsZVJlYWRlclZpZXcgPSAocHJvZmlsZSwgc2V0dGluZ3MsIGN1cnJlbnRQcm9maWxlKSA9PiB7XG4gIGxldCB3cmFwcGVycyA9IFtdXG5cbiAgY29uc3Qgc3R5bGVTaGVldCA9IGBcbiAgICAucmVhZGVyVmlldy5yZWFkZXJWaWV3ICoge1xuICAgICAgYWxsOiByZXZlcnRcbiAgICB9XG4gICAgLnJlYWRlclZpZXcucmVhZGVyVmlldyBbZGF0ZS1oaWRkZW5de1xuICAgICAgZGlzcGxheTpub25lICFpbXBvcnRhbnRcbiAgICB9XG4gICAgLnJlYWRlclZpZXcucmVhZGVyVmlldyBpbWd7bWF4LXdpZHRoOjEwMCV9XG4gICAgLnJlYWRlclZpZXcucmVhZGVyVmlldyB0YWJsZSB7ZGlzcGxheTpibG9jazt9XG4gICAgLnJlYWRlclZpZXcucmVhZGVyVmlldyB0YWJsZTpub3QoW3JvbGU9XCJ0YWJsZVwiXSk6bm90KFtyb2xlPVwiZ3JpZFwiXSkgOndoZXJlKHRib2R5LCB0aGVhZCwgdGZvb3QsIHRoLCB0ZCl7XG4gICAgICBkaXNwbGF5OmNvbnRlbnRzO1xuICAgICAgZm9udC13ZWlnaHQ6dW5zZXQ7XG4gICAgfVxuICAgIC5yZWFkZXJWaWV3LnJlYWRlclZpZXcgdGFibGU6bm90KFtyb2xlPVwidGFibGVcIl0pOm5vdChbcm9sZT1cImdyaWRcIl0pID4gKiA+IHRye1xuICAgICAgZGlzcGxheTpibG9jaztcbiAgICAgIG1hcmdpbjoxZW0gMDtcbiAgICB9XG4gICAgLnJlYWRlclZpZXcucmVhZGVyVmlldyB0YWJsZTpub3QoW3JvbGU9XCJwcmVzZW50YXRpb25cIl0pOm5vdChbcm9sZT1cIm5vbmVcIl0pOmlzKFxuICAgICAgOmhhcyg+dGhlYWQgfiB0Ym9keSksXG4gICAgICA6aGFzKD50Ym9keSB+IHRmb290KSxcbiAgICAgIDpoYXMoPnRib2R5PnRyPnRoW3Njb3BlXSksXG4gICAgICA6aGFzKD50Ym9keT50cj50aCt0ZCk6aGFzKD50Ym9keT50cit0ciksXG4gICAgICA6aGFzKD50Ym9keT50cj50aCk6aGFzKD50Ym9keT50cj50ZCArIHRkKVxuICAgICksXG4gICAgLnJlYWRlclZpZXcucmVhZGVyVmlldyB0YWJsZTpub3QoW3JvbGU9XCJwcmVzZW50YXRpb25cIl0pOm5vdChbcm9sZT1cIm5vbmVcIl0pOmlzKFxuICAgICAgOmhhcyg+dGhlYWQgfiB0Ym9keSksXG4gICAgICA6aGFzKD50Ym9keSB+IHRmb290KSxcbiAgICAgIDpoYXMoPnRib2R5PnRyPnRoW3Njb3BlXSksXG4gICAgICA6aGFzKD50Ym9keT50cj50aCt0ZCk6aGFzKD50Ym9keT50cit0ciksXG4gICAgICA6aGFzKD50Ym9keT50cj50aCk6aGFzKD50Ym9keT50cj50ZCArIHRkKVxuICAgICkgOndoZXJlKHRib2R5LCB0aGVhZCwgdGZvb3QsIHRib2R5ID4gdHIsIHRoZWFkID4gdHIsIHRmb290ID4gdHIsICB0Ym9keSA+IHRyID4gdGQsICB0Ym9keSA+IHRyID4gdGgsICAgdGhlYWQgPiB0ciA+IHRoLCB0aGVhZCA+IHRyID4gdGQsIHRmb290ID4gdHIgPiB0aCwgdGZvb3QgPiB0ciA+IHRkKXtcbiAgICAgIGRpc3BsYXk6cmV2ZXJ0O1xuICAgICAgd2lkdGg6cmV2ZXJ0O1xuICAgICAgYm9yZGVyOjFweCBzb2xpZDtcbiAgICAgIGJvcmRlci1zcGFjaW5nOi4yZW07XG4gICAgICBwYWRkaW5nOi4yZW07XG4gICAgICB3b3JkLWJyZWFrOiBub3JtYWw7XG4gICAgICBmb250LXdlaWdodDpyZXZlcnQ7XG4gICAgfVxuICAgIC5yZWFkZXJWaWV3LnJlYWRlclZpZXcgdGhlYWQ6OmFmdGVyLFxuICAgIC5yZWFkZXJWaWV3LnJlYWRlclZpZXcgdGZvb3Q6OmJlZm9yZXtcbiAgICAgIGNvbnRlbnQ6Jyc7XG4gICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgaGVpZ2h0Oi40ZW07XG4gICAgfVxuICAgIC5yZWFkZXJWaWV3LnJlYWRlclZpZXcgLmJsb2NrZWRJbWFnZTpub3QoOmVtcHR5KXtcbiAgICAgIGJvcmRlcjogMXB4IGRhc2hlZDtcbiAgICAgIHBhZGRpbmc6IDFlbTtcbiAgICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrO1xuICAgICAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG4gICAgfVxuICAgIC5yZWFkZXJWaWV3LnJlYWRlclZpZXcgLmJsb2NrZWRJbWFnZSArIGltZyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC5yZWFkZXJWaWV3W2RhdGEtcmVhZGVydmlld3Byb2ZpbGU9XCJBXCJde1xuICAgICAgYmFja2dyb3VuZDoke3Byb2ZpbGVbMF0uYmFja2dyb3VuZENvbG9yfTtcbiAgICAgIGNvbG9yOiAke3Byb2ZpbGVbMF0uY29sb3J9O1xuICAgIH1cbiAgICAucmVhZGVyVmlld1tkYXRhLXJlYWRlcnZpZXdwcm9maWxlPVwiQVwiXSA6aXMoYSwgYSAqKSB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgICBjb2xvcjoke3Byb2ZpbGVbMF0ubGlua0NvbG9yfTtcbiAgICB9XG4gICAgLnJlYWRlclZpZXdbZGF0YS1yZWFkZXJ2aWV3cHJvZmlsZT1cIkJcIl17XG4gICAgICBiYWNrZ3JvdW5kOiR7cHJvZmlsZVsxXS5iYWNrZ3JvdW5kQ29sb3J9O1xuICAgICAgY29sb3I6ICR7cHJvZmlsZVsxXS5jb2xvcn07XG4gICAgfVxuICAgIC5yZWFkZXJWaWV3W2RhdGEtcmVhZGVydmlld3Byb2ZpbGU9XCJCXCJdIDppcyhhLCBhICopIHtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICAgIGNvbG9yOiR7cHJvZmlsZVsxXS5saW5rQ29sb3J9O1xuICAgIH1cbiAgICAucmVhZGVyVmlld1tkYXRhLXJlYWRlcnZpZXdwcm9maWxlPVwiQ1wiXXtcbiAgICAgIGJhY2tncm91bmQ6JHtwcm9maWxlWzJdLmJhY2tncm91bmRDb2xvcn07XG4gICAgICBjb2xvcjogJHtwcm9maWxlWzJdLmNvbG9yfTtcbiAgICB9XG4gICAgLnJlYWRlclZpZXdbZGF0YS1yZWFkZXJ2aWV3cHJvZmlsZT1cIkNcIl0gOmlzKGEsIGEgKikge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgICAgY29sb3I6JHtwcm9maWxlWzJdLmxpbmtDb2xvcn07XG4gICAgfVxuICAgIC5yZWFkZXJWaWV3LnJlYWRlclZpZXcge1xuICAgICAgdGV4dC1hbGlnbjoke3NldHRpbmdzLnRleHRBbGlnbn07XG4gICAgICBmb250LWZhbWlseToke3NldHRpbmdzLmZvbnRGYW1pbHl9O1xuICAgICAgZm9udC1zaXplOiR7c2V0dGluZ3MuZm9udFNpemV9cmVtO1xuICAgICAgbGluZS1oZWlnaHQ6JHtzZXR0aW5ncy5saW5lSGVpZ2h0fTtcbiAgICAgIHdvcmQtc3BhY2luZzoke3NldHRpbmdzLndvcmRTcGFjaW5nfWVtO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6JHtzZXR0aW5ncy5sZXR0ZXJTcGFjaW5nfWVtO1xuICAgICAgbWF4LXdpZHRoOiAke3NldHRpbmdzLm1heFdpZHRofWVtO1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICBvdmVyZmxvdzogYXV0bzsgLyogRm9yIHdoZW4gdGhpbmdzIGNhbid0IGNvbGxhcHNlIGZhciBlbm91Z2ggKi9cbiAgICAgIHBhZGRpbmc6IDFlbSAhaW1wb3J0YW50OyAvKiBvdmVycmlkZSB5YWhvbyAqL1xuICAgIH1cbiAgICAucmVhZGVyVmlldy5yZWFkZXJWaWV3ICp7XG4gICAgICB0ZXh0LWFsaWduOiR7c2V0dGluZ3MudGV4dEFsaWdufTtcbiAgICB9XG4gIC5yZWFkZXJWaWV3LnJlYWRlclZpZXcgYnV0dG9ue2Rpc3BsYXk6bm9uZX0gLyogT3V0bG9vayB6b29tIGJ1dHRvbiAqL1xuICBgXG4gIGxldCBzdHlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9ja2VkSW1hZ2UnKVxuICBmb3IgKGxldCBpdGVtIG9mIEFycmF5LmZyb20oc3R5bGUpKSB7XG4gICAgaXRlbS5yZW1vdmUoKVxuICB9XG5cbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ21haWwuZ29vZ2xlLmNvbScpIHtcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2hcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5U3RyaW5nKVxuICAgIGNvbnN0IHZpZXcgPSB1cmxQYXJhbXMuZ2V0KCd2aWV3JylcbiAgICBpZiAodmlldyA9PT0gJ2xnJykge1xuICAgICAgd3JhcHBlcnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlLm1lc3NhZ2UgPiB0Ym9keSA+IHRyID4gdGQgPiB0YWJsZSA+IHRib2R5ID4gdHI6bGFzdC1vZi10eXBlID4gdGQgPiBkaXYnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlcnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hM3MnKSlcbiAgICB9XG4gIH1cblxuICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnb3V0bG9vay5saXZlLmNvbScpIHtcbiAgICB3cmFwcGVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlthcmlhLWxhYmVsPSdNZXNzYWdlIGJvZHknXVwiKSlcbiAgfVxuXG4gIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICdtYWlsLnlhaG9vLmNvbScpIHtcbiAgICB3cmFwcGVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1zZy1ib2R5JykpXG4gIH1cblxuICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbWFpbC5hb2wuY29tJykge1xuICAgIHdyYXBwZXJzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuQU9MV2ViU3VpdGUgPiBkaXZbaWRdLCAubXNnLWJvZHknKSlcbiAgfVxuXG4gIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VydlN0eWxlRWxlbWVudCcpKSB7XG4gICAgY29uc3QgZXJ2U3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgIGVydlN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2VydlN0eWxlRWxlbWVudCcpXG4gICAgd3JhcHBlcnNbMF0ucGFyZW50RWxlbWVudC5wcmVwZW5kKGVydlN0eWxlRWxlbWVudClcbiAgfVxuXG4gIGZvciAobGV0IHdyYXBwZXIgb2YgQXJyYXkuZnJvbSh3cmFwcGVycykpIHtcbiAgICBjb25zdCBpZnJhbWUgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpXG4gICAgaWYgKGlmcmFtZSA9PT0gbnVsbCkge1xuICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdyZWFkZXJWaWV3JylcbiAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdkYXRhLXJlYWRlclZpZXdQcm9maWxlJywgY3VycmVudFByb2ZpbGUpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJ2U3R5bGVFbGVtZW50JykucmVwbGFjZUNoaWxkcmVuKHN0eWxlU2hlZXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KCdSZWFkZXIgdmlldyBkb2VzIG5vdCB5ZXQgc3VwcG9ydCBBTVAgZW1haWwnKVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBjb25zdCBlbWFpbHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZWFkZXJWaWV3IConKSlcblxuICBmb3IgKGxldCBpdGVtIG9mIGVtYWlscykge1xuICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGl0ZW0pXG4gICAgaWYgKHN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGUtaGlkZGVuJywgJycpXG4gICAgfVxuXG4gICAgaWYgKGl0ZW0uZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpID09ICd0cnVlJykge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGUtaGlkZGVuJywgJycpXG4gICAgfVxuXG4gICAgaWYgKGl0ZW0uaGFzQXR0cmlidXRlKCdkYXRhLWVydi1lbW9qaScpKSB7XG4gICAgICBpdGVtLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgaWYgKGl0ZW0uaGFzQXR0cmlidXRlKCdkYXRhLWVtb2ppJykgJiYgc2V0dGluZ3MuYmxvY2tJbWFnZXMgPT0gZmFsc2UpIHtcbiAgICAgIGxldCBhbHQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnYWx0JylcbiAgICAgIGl0ZW0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsICc8c3BhbiBkYXRhLWVydi1lbW9qaT4nICsgYWx0ICsgJzwvc3Bhbj4nKVxuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGUtaGlkZGVuJywgJycpXG4gICAgfVxuXG4gICAgaWYgKHNldHRpbmdzLmJsb2NrSW1hZ2VzKSB7XG4gICAgICBpZiAoaXRlbS50YWdOYW1lID09ICdJTUcnICYmICFpdGVtLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpIHtcbiAgICAgICAgbGV0IGFsdCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdhbHQnKVxuICAgICAgICBpZiAoYWx0ID09IG51bGwgfHwgYWx0LnRyaW0oKSA9PSAnJykge1xuICAgICAgICAgIGFsdCA9ICcnXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZhdXhJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcblxuICAgICAgICBpZiAoaXRlbS5wYXJlbnROb2RlLnRhZ05hbWUgPT0gJ0EnICYmIGl0ZW0ucGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGggPT0gJzEnICYmIGl0ZW0ucGFyZW50Tm9kZS50ZXh0Q29udGVudC50cmltKCkgPT0gJycpIHtcbiAgICAgICAgICBpZiAoYWx0ID09ICcnKSB7XG4gICAgICAgICAgICBhbHQgPSBpdGVtLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmF1eEltZy5pbm5lclRleHQgPSBhbHQudHJpbSgpXG4gICAgICAgIGZhdXhJbWcuY2xhc3NMaXN0LmFkZCgnYmxvY2tlZEltYWdlJylcbiAgICAgICAgaXRlbS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgZmF1eEltZy5vdXRlckhUTUwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGl0ZW0udGFnTmFtZSA9PSAnQScgJiYgaXRlbS5pbm5lckhUTUwudHJpbSgpID09ICcnKSB7XG4gICAgICBsZXQgaHJlZiA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICAgIGl0ZW0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaHJlZilcbiAgICB9XG5cbiAgICBpZiAoaXRlbS5pbm5lckhUTUwudHJpbSgpID09ICcmbmJzcDsnKSB7XG4gICAgICBpdGVtLmlubmVySFRNTCA9ICcnXG4gICAgfVxuXG4gICAgcmVwbGFjZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICAgIHJlcGxhY2VBdHRyaWJ1dGUoJ2NsYXNzJylcbiAgICByZXBsYWNlQXR0cmlidXRlKCdpZCcpXG4gICAgcmVwbGFjZUF0dHJpYnV0ZSgnYWxpZ24nKVxuICAgIHJlcGxhY2VBdHRyaWJ1dGUoJ2NvbG9yJylcbiAgICByZXBsYWNlQXR0cmlidXRlKCdiYWNrZ3JvdW5kJylcbiAgICByZXBsYWNlQXR0cmlidXRlKCdiZ2NvbG9yJylcbiAgICByZXBsYWNlQXR0cmlidXRlKCd3aWR0aCcpXG4gICAgcmVwbGFjZUF0dHJpYnV0ZSgnaGVpZ2h0JylcbiAgICBmdW5jdGlvbiByZXBsYWNlQXR0cmlidXRlKGF0dHJpYnV0ZSkge1xuICAgICAgaWYgKGl0ZW0uaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZVZhbHVlID0gaXRlbS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKVxuICAgICAgICBsZXQgYXR0cmlidXRlTmFtZSA9ICdkYXRhLXJlbW92ZWQnICsgYXR0cmlidXRlXG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKVxuICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBlbmFibGVSZWFkZXJWaWV3XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG5XT1JLIElOIFBST0dSRVNTOlxuZXhwZXJpbWVudGluZyB3aXRoIGEgZmVhdHVyZSB3aGljaCB3aWxsIHBlcnNpc3QgdGhlIHJlYWRlciB2aWV3IHNldHRpbmdzIHdoaWxlIG5hdmlnYXRpbmcgYmV0d2VlbiBlbWFpbHMgaW4gdGhlIGluYm94LlxuaXQncyBidWdneSBhbmQgbm90IHJlYWR5IGZvciBwcmltZSB0aW1lLCBidXQgSSdtIGxlYXZpbmcgaXQgaW4gdGhlIGNvZGViYXNlIGZvciBub3cuXG5UTERSOlxuICAtIHRoaXMgaXMgR21haWwgb25seSBmb3Igbm93LlxuICAtIHBvcHVwLmpzIHNlbmRzIHRoZSBuZWNlc3Nhcnkgc2V0dGluZ3MgdG8gdGhlIGNvbnRlbnQtc2NyaXB0LmpzXG4gIC0gY29udGVudC1zY3JpcHQgc3RvcmVzIHRoZW0gaW4gbG9jYWwgc3RvcmFnZS5cbiAgLSBpZiB0aGUgcmVhZGVyIHZpZXcgaXMgZW5hYmxlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiBhbiBlbWFpbCBpbiB0aGUgaW5ib3gsIHRoZSBjb250ZW50IHNjcmlwdCB3aWxsIHdhaXQgMjUwbXMgdGhlbiBhcHBseSB0aGUgcmVhZGVyIHZpZXcgdG8gdGhlIGVtYWlsLlxuVE9ETzogXG4gIC0gbG9vayBmb3IgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMsIG9yIGp1c3QgcmVtb3ZlIGl0IGVudGlyZWx5LlxuICAtIGFsc28gdGFrZSBpbnRvIGFjY291bnQgcmVhZGluZyBwYW5lIHNldHRpbmdzLlxuICAtIHV0aWxpemUgcmVhY3QgaWYgbmVjZXNzYXJ5IG9yIGFkdmFudGFnZW91cy4gIFxuKi9cblxuaW1wb3J0IGVuYWJsZVJlYWRlclZpZXcgZnJvbSAnLi91dGlscy9lbmFibGVSZWFkZXJWaWV3J1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHsgcHJvZmlsZXMsIHNldHRpbmdzLCBjdXJyZW50UHJvZmlsZSwgdG9nZ2xlQnV0dG9uIH0pID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvY2FsUHJvZmlsZXMnLCBKU09OLnN0cmluZ2lmeShwcm9maWxlcykpXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2NhbFNldHRpbmdzJywgSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpKVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2ZpbGUnLCBjdXJyZW50UHJvZmlsZSlcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZ2dsZUJ1dHRvbicsIHRvZ2dsZUJ1dHRvbilcblxuICBjb25zdCBpbmJveFByZXZpZXdzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ci56QS55TycpKVxuXG4gIGZvciAobGV0IGluYm94UHJldmlldyBvZiBpbmJveFByZXZpZXdzKSB7XG4gICAgaW5ib3hQcmV2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2dnbGVCdXR0b24nKSkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZW5hYmxlUmVhZGVyVmlldyhwcm9maWxlcywgc2V0dGluZ3MsIGN1cnJlbnRQcm9maWxlKVxuICAgICAgICB9LCAyNTApXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJlbmFibGVSZWFkZXJWaWV3IiwicHJvZmlsZSIsInNldHRpbmdzIiwiY3VycmVudFByb2ZpbGUiLCJ3cmFwcGVycyIsInN0eWxlU2hlZXQiLCJjb25jYXQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsImxpbmtDb2xvciIsInRleHRBbGlnbiIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJ3b3JkU3BhY2luZyIsImxldHRlclNwYWNpbmciLCJtYXhXaWR0aCIsInN0eWxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiX2kiLCJfQXJyYXkkZnJvbSIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIml0ZW0iLCJyZW1vdmUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwicXVlcnlTdHJpbmciLCJzZWFyY2giLCJ1cmxQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJ2aWV3IiwiZ2V0IiwicXVlcnlTZWxlY3RvciIsImVydlN0eWxlRWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJwYXJlbnRFbGVtZW50IiwicHJlcGVuZCIsIl9pMiIsIl9BcnJheSRmcm9tMiIsIndyYXBwZXIiLCJpZnJhbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZXBsYWNlQ2hpbGRyZW4iLCJhbGVydCIsImVtYWlscyIsIl9sb29wIiwiX2VtYWlscyIsIl9pMyIsImdldENvbXB1dGVkU3R5bGUiLCJkaXNwbGF5IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiYmxvY2tJbWFnZXMiLCJhbHQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJ0YWdOYW1lIiwidHJpbSIsImZhdXhJbWciLCJwYXJlbnROb2RlIiwiY2hpbGRyZW4iLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsIm91dGVySFRNTCIsImlubmVySFRNTCIsImhyZWYiLCJyZXBsYWNlQXR0cmlidXRlIiwiYXR0cmlidXRlIiwiYXR0cmlidXRlVmFsdWUiLCJhdHRyaWJ1dGVOYW1lIiwicmVtb3ZlQXR0cmlidXRlIiwiY2hyb21lIiwicnVudGltZSIsIm9uTWVzc2FnZSIsImFkZExpc3RlbmVyIiwiX3JlZiIsInByb2ZpbGVzIiwidG9nZ2xlQnV0dG9uIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbmJveFByZXZpZXdzIiwiX2luYm94UHJldmlld3MiLCJpbmJveFByZXZpZXciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInBhcnNlIiwiZ2V0SXRlbSIsInNldFRpbWVvdXQiXSwic291cmNlUm9vdCI6IiJ9