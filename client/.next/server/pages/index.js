module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/build-client.js":
/*!*****************************!*\
  !*** ./api/build-client.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n // namespace ingress-nginx\n// http://service.namespace.svc.cluster.local\n// http://ingress-nginx-cotroller.ingress-nginx.svc.cluster.local\n\nconst buildClient = ({\n  req\n}) => {\n  if (true) {\n    // server\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',\n      headers: req.headers\n    });\n  } else {}\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (buildClient);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvYnVpbGQtY2xpZW50LmpzP2UxOTYiXSwibmFtZXMiOlsiYnVpbGRDbGllbnQiLCJyZXEiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7Q0FFQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUEsV0FBVyxHQUFHLENBQUM7QUFBRUM7QUFBRixDQUFELEtBQWE7QUFDL0IsWUFBbUM7QUFDakM7QUFFQSxXQUFPQyw0Q0FBSyxDQUFDQyxNQUFOLENBQWE7QUFDbEJDLGFBQU8sRUFBRSxpRUFEUztBQUVsQkMsYUFBTyxFQUFFSixHQUFHLENBQUNJO0FBRkssS0FBYixDQUFQO0FBSUQsR0FQRCxNQU9PLEVBS047QUFDRixDQWREOztBQWdCZUwsMEVBQWYiLCJmaWxlIjoiLi9hcGkvYnVpbGQtY2xpZW50LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuLy8gbmFtZXNwYWNlIGluZ3Jlc3Mtbmdpbnhcbi8vIGh0dHA6Ly9zZXJ2aWNlLm5hbWVzcGFjZS5zdmMuY2x1c3Rlci5sb2NhbFxuLy8gaHR0cDovL2luZ3Jlc3MtbmdpbngtY290cm9sbGVyLmluZ3Jlc3Mtbmdpbnguc3ZjLmNsdXN0ZXIubG9jYWxcblxuY29uc3QgYnVpbGRDbGllbnQgPSAoeyByZXEgfSkgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBzZXJ2ZXJcblxuICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xuICAgICAgYmFzZVVSTDogJ2h0dHA6Ly9pbmdyZXNzLW5naW54LWNvbnRyb2xsZXIuaW5ncmVzcy1uZ2lueC5zdmMuY2x1c3Rlci5sb2NhbCcsXG4gICAgICBoZWFkZXJzOiByZXEuaGVhZGVyc1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXJcbiAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcbiAgICAgIGJhc2VVUkw6ICcvJ1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBidWlsZENsaWVudDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/build-client.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_build_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/build-client */ \"./api/build-client.js\");\nvar _jsxFileName = \"/Users/markyoung/code/udemy/microservices/ticketing/client/pages/index.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\nconst LandingPage = ({\n  currentUser\n}) => {\n  return currentUser ? __jsx(\"h1\", {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 5,\n      columnNumber: 6\n    }\n  }, \"You are signed in\") : __jsx(\"h1\", {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 6,\n      columnNumber: 6\n    }\n  }, \"You are not signed in\");\n};\n\nLandingPage.getInitialProps = async context => {\n  console.log(\"Landing Page\");\n  const client = Object(_api_build_client__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context);\n  const {\n    data\n  } = await client.get('/api/users/currentuser');\n  return data;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LandingPage);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbIkxhbmRpbmdQYWdlIiwiY3VycmVudFVzZXIiLCJnZXRJbml0aWFsUHJvcHMiLCJjb250ZXh0IiwiY29uc29sZSIsImxvZyIsImNsaWVudCIsImJ1aWxkQ2xpZW50IiwiZGF0YSIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBLE1BQU1BLFdBQVcsR0FBRyxDQUFDO0FBQUVDO0FBQUYsQ0FBRCxLQUFxQjtBQUN2QyxTQUFRQSxXQUFXLEdBQ2hCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRGdCLEdBRWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBRkg7QUFHRCxDQUpEOztBQU9BRCxXQUFXLENBQUNFLGVBQVosR0FBOEIsTUFBT0MsT0FBUCxJQUFtQjtBQUMvQ0MsU0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBLFFBQU1DLE1BQU0sR0FBR0MsaUVBQVcsQ0FBQ0osT0FBRCxDQUExQjtBQUNBLFFBQU07QUFBRUs7QUFBRixNQUFXLE1BQU1GLE1BQU0sQ0FBQ0csR0FBUCxDQUFXLHdCQUFYLENBQXZCO0FBQ0EsU0FBT0QsSUFBUDtBQUNELENBTEQ7O0FBT2VSLDBFQUFmIiwiZmlsZSI6Ii4vcGFnZXMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRDbGllbnQgZnJvbSAnLi4vYXBpL2J1aWxkLWNsaWVudCdcblxuY29uc3QgTGFuZGluZ1BhZ2UgPSAoeyBjdXJyZW50VXNlciB9KSA9PiB7XG4gIHJldHVybiAgY3VycmVudFVzZXIgP1xuICAgICg8aDE+WW91IGFyZSBzaWduZWQgaW48L2gxPikgOlxuICAgICg8aDE+WW91IGFyZSBub3Qgc2lnbmVkIGluPC9oMT4pO1xufVxuXG5cbkxhbmRpbmdQYWdlLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiTGFuZGluZyBQYWdlXCIpO1xuICBjb25zdCBjbGllbnQgPSBidWlsZENsaWVudChjb250ZXh0KTtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBjbGllbnQuZ2V0KCcvYXBpL3VzZXJzL2N1cnJlbnR1c2VyJyk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGFuZGluZ1BhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ })

/******/ });