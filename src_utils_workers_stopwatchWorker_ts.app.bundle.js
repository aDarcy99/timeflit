/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./src/utils/workers/stopwatchWorker.ts ***!
  \**********************************************/

var currentTime = Number(self.name) || 0;
self.postMessage({
    timeElapsed: currentTime
});
setInterval(function () {
    currentTime += 10;
    self.postMessage({
        timeElapsed: currentTime
    });
}, 100);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX3V0aWxzX3dvcmtlcnNfc3RvcHdhdGNoV29ya2VyX3RzLmFwcC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RpbWVmbGl0Ly4vc3JjL3V0aWxzL3dvcmtlcnMvc3RvcHdhdGNoV29ya2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIGN1cnJlbnRUaW1lID0gTnVtYmVyKHNlbGYubmFtZSkgfHwgMDtcbnNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgIHRpbWVFbGFwc2VkOiBjdXJyZW50VGltZVxufSk7XG5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgY3VycmVudFRpbWUgKz0gMTA7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICAgIHRpbWVFbGFwc2VkOiBjdXJyZW50VGltZVxuICAgIH0pO1xufSwgMTAwKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==