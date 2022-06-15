/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");

var operationId;
(function (operationId) {
    operationId[operationId["plus"] = 10] = "plus";
    operationId[operationId["minus"] = 20] = "minus";
    operationId[operationId["multiply"] = 30] = "multiply";
    operationId[operationId["divide"] = 40] = "divide";
    operationId[operationId["percent"] = 50] = "percent";
    operationId[operationId["equal"] = 60] = "equal";
    operationId[operationId["pow"] = 70] = "pow";
    operationId[operationId["sqrt"] = 80] = "sqrt";
    operationId[operationId["sin"] = 90] = "sin";
    operationId[operationId["cos"] = 100] = "cos";
    operationId[operationId["asin"] = 110] = "asin";
    operationId[operationId["acos"] = 120] = "acos";
    operationId[operationId["log"] = 130] = "log";
    operationId[operationId["oneDivX"] = 140] = "oneDivX";
})(operationId || (operationId = {}));
;
// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
var calculator = {
    inputElement: document.getElementById('calc_input'),
    historyDiv: document.getElementById('calc_history'),
    scientificDiv: document.getElementById('calc_scientific'),
    historyList: document.getElementById('calc_history_list'),
    historyListData: [],
    stack: [],
    waiting4NewNumber: false,
    historyOpened: false,
    scientificOpened: false,
    operations: [],
    clearInput: function () {
        this.inputElement.value = '0';
        this.stack.length = 0;
    },
    getHistoryList: function () {
        var _this = this;
        var historyFromCookie = getCookie('historyList');
        if (historyFromCookie) {
            this.historyListData = JSON.parse(historyFromCookie);
            this.historyListData.forEach(function (el) {
                _this.addToHistoryList.call(_this, el, true);
            });
        }
    },
    saveHistoryList: function () {
        console.log(JSON.stringify(this.historyListData));
        document.cookie = "historyList=".concat(JSON.stringify(this.historyListData));
    },
    addToHistoryList: function (arg, initialization) {
        if (initialization === void 0) { initialization = false; }
        var newLi = document.createElement("li");
        newLi.innerText = arg;
        this.historyList.appendChild(newLi);
        if (initialization)
            return;
        this.historyListData.push(arg);
        this.saveHistoryList();
    },
    addDigitOrOperation: function (input) {
        if (input in operationId) { // is operation button pressed ?
            var currOperation = this.operations.find(function (el) { return el.id === input; });
            var result = NaN;
            if (this.stack.length) { //there is data to be calculated
                var opId_1 = this.stack.pop();
                var operation = this.operations.find(function (el) { return el.id === opId_1; });
                var operands = [];
                for (var i = 1; i < operation.arity; i++) {
                    operands.push(this.stack.pop());
                }
                operands.push(Number(this.inputElement.value));
                result = operation.action.apply(null, operands);
                this.inputElement.value = String(result);
                this.addToHistoryList(String(operands[0]) +
                    operation.representation +
                    String(operands[1]) +
                    '=' + this.inputElement.value);
            }
            else {
                result = Number(this.inputElement.value);
            }
            if (currOperation.arity === 1) { // no need to push in stack, just calculate right now
                result = currOperation.action(Number(this.inputElement.value));
                this.addToHistoryList(currOperation.representation +
                    '(' + this.inputElement.value + ')' +
                    '=' + String(result));
                this.inputElement.value = String(result);
            }
            else if (currOperation.arity > 1) {
                this.stack.push(result);
                this.stack.push(input);
            }
            this.waiting4NewNumber = true;
        }
        else { // not operation button preesed
            if (this.waiting4NewNumber && input !== '\b') { // start of input a new number
                this.inputElement.value = '';
                this.waiting4NewNumber = false;
            }
            if (input === '\b') { // backspace button pressed
                this.inputElement.value = this.inputElement.value.slice(0, -1);
                if (this.inputElement.value === '')
                    this.inputElement.value = '0';
                this.waiting4NewNumber = false;
                return;
            }
            if (input === '.') { // decimal point button pressed
                if (this.inputElement.value.indexOf('.') !== -1)
                    return;
                if (Number(this.inputElement.value) === 0)
                    this.inputElement.value = '0';
            }
            else {
                if (input === '0')
                    if (this.inputElement.value === '0')
                        return; // ignore input of 0 if current string value is 0 
                if (this.inputElement.value.indexOf('.') === -1 && Number(this.inputElement.value) === 0)
                    this.inputElement.value = ''; // there is no decimal point and last input is equal to 0, replace last input with new
            }
            this.inputElement.value = this.inputElement.value + input; // add next digit to current number input 
        }
    },
    changeHistoryDisplay: function () {
        this.historyOpened = !this.historyOpened;
        this.historyDiv.classList.toggle('hidden');
        this.historyDiv.classList.toggle('shown');
        document.cookie = "historyOpened=".concat(this.historyOpened);
    },
    changeScientificDisplay: function () {
        this.scientificOpened = !this.scientificOpened;
        this.scientificDiv.classList.toggle('hidden');
        this.scientificDiv.classList.toggle('shown');
        document.cookie = "scientificOpened=".concat(this.scientificOpened);
    },
    init: function () {
        var _this = this;
        var historyBtn = document.getElementById('btn_history');
        historyBtn.addEventListener('click', this.changeHistoryDisplay.bind(this));
        var scientificBtn = document.getElementById('btn_scientific');
        scientificBtn.addEventListener('click', this.changeScientificDisplay.bind(this));
        this.initOperations();
        this.clearInput();
        this.inputElement.addEventListener('input', function (event) {
            var target = event.target;
            console.log('value = ', target.value);
            if (target.value === '') {
                _this.clearInput();
                return;
            }
        });
        this.addActionToButtonClick('btn_clear', this.clearInput.bind(this));
        this.addEventsToDigitButtons();
        this.addInputToButtonClick('btn_pt', '.');
        this.addInputToButtonClick('btn_backspace', '\b');
        document.addEventListener("keydown", function (event) {
            console.log('key pressed : ', event.key, ' key code = ', event.keyCode);
            switch (event.key) {
                case '.':
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '0':
                    _this.addDigitOrOperation(event.key);
                    break;
                case '+':
                    _this.addDigitOrOperation(operationId.plus);
                    break;
                case '-':
                    _this.addDigitOrOperation(operationId.minus);
                    break;
                case '*':
                    _this.addDigitOrOperation(operationId.multiply);
                    break;
                case '/':
                    _this.addDigitOrOperation(operationId.divide);
                    break;
                case '/':
                    _this.addDigitOrOperation(operationId.divide);
                    break;
                case '=':
                    _this.addDigitOrOperation(operationId.equal);
                    break;
                case '%':
                    _this.addDigitOrOperation(operationId.percent);
                    break;
                default:
                    switch (event.keyCode) {
                        case 67:
                            _this.clearInput();
                            break;
                        case 8:
                            _this.addDigitOrOperation('\b');
                            break;
                        case 72:
                            _this.changeHistoryDisplay();
                            break;
                        case 83:
                            _this.changeScientificDisplay();
                            break;
                        case 38: //ArrowUp
                        case 40: //ArrowDown
                    }
            }
        });
        var historyOpenedFromCookie = getCookie('historyOpened');
        if (historyOpenedFromCookie !== undefined)
            if (String(this.historyOpened) !== historyOpenedFromCookie)
                this.changeHistoryDisplay();
        var scientificOpenedFromCookie = getCookie('scientificOpened');
        if (scientificOpenedFromCookie !== undefined)
            if (String(this.scientificOpened) !== scientificOpenedFromCookie)
                this.changeScientificDisplay();
        this.getHistoryList();
    },
    addActionToButtonClick: function (buttonId, action) {
        var btn = document.getElementById(buttonId);
        btn.addEventListener('click', action);
    },
    addInputToButtonClick: function (buttonId, input) {
        var _this = this;
        this.addActionToButtonClick(buttonId, function () {
            _this.addDigitOrOperation(input);
        });
    },
    addEventsToDigitButtons: function () {
        for (var i = 0; i < 10; i++) {
            this.addInputToButtonClick("btn_".concat(i), String(i));
        }
    },
    initOperations: function () {
        var _this = this;
        this.operations.push({
            id: operationId.equal,
            bittonId: 'btn_equal',
            arity: 0,
            action: function (a, b) { return NaN; },
            representation: '=',
        });
        this.operations.push({
            id: operationId.plus,
            bittonId: 'btn_plus',
            arity: 2, action: function (a, b) { return a + b; },
            representation: '+',
        });
        this.operations.push({
            id: operationId.minus,
            bittonId: 'btn_minus',
            arity: 2,
            action: function (a, b) { return a - b; },
            representation: '-',
        });
        this.operations.push({
            id: operationId.multiply,
            bittonId: 'btn_multiply',
            arity: 2, action: function (a, b) { return a * b; },
            representation: '×',
        });
        this.operations.push({
            id: operationId.divide,
            bittonId: 'btn_divide',
            arity: 2, action: function (a, b) { return a / b; },
            representation: '/',
        });
        this.operations.push({
            id: operationId.pow,
            bittonId: 'btn_pow',
            arity: 2, action: function (a, b) { return Math.pow(a, b); },
            representation: '^',
        });
        this.operations.push({
            id: operationId.sqrt,
            bittonId: 'btn_sqrt',
            arity: 1, action: function (a) { return Math.sqrt(a); },
            representation: '√',
        });
        this.operations.push({
            id: operationId.percent,
            bittonId: 'btn_percent',
            arity: 1, action: function (a) { return (a / 100); },
            representation: '%',
        });
        this.operations.push({
            id: operationId.sin,
            bittonId: 'btn_sin',
            arity: 1, action: function (a) { return Math.sin(a); },
            representation: 'sin',
        });
        this.operations.push({
            id: operationId.cos,
            bittonId: 'btn_cos',
            arity: 1, action: function (a) { return Math.cos(a); },
            representation: 'cos',
        });
        this.operations.push({
            id: operationId.asin,
            bittonId: 'btn_asin',
            arity: 1, action: function (a) { return Math.asin(a); },
            representation: 'asin',
        });
        this.operations.push({
            id: operationId.acos,
            bittonId: 'btn_acos',
            arity: 1, action: function (a) { return Math.acos(a); },
            representation: 'acos',
        });
        this.operations.push({
            id: operationId.log,
            bittonId: 'btn_log',
            arity: 1, action: function (a) { return Math.log(a); },
            representation: 'log',
        });
        this.operations.push({
            id: operationId.oneDivX,
            bittonId: 'btn_oneDivX',
            arity: 1, action: function (a) { return (1 / a); },
            representation: '1/',
        });
        this.operations.forEach(function (el) {
            _this.addInputToButtonClick(el.bittonId, el.id);
        });
    }
};
calculator.init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RSxRQUFRLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BDLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzNDLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQy9DLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxtQkFBbUIsQ0FB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Oi8vMjItMDYtMDgtY2FsYzIvLi9zcmMvc3R5bGVzL2luZGV4LnNjc3M/MzhhNSIsIndlYnBhY2s6Ly8yMi0wNi0wOC1jYWxjMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8yMi0wNi0wOC1jYWxjMi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzIyLTA2LTA4LWNhbGMyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcclxuaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcclxuXHJcbmVudW0gb3BlcmF0aW9uSWQge1xyXG4gICAgcGx1cyA9IDEwLFxyXG4gICAgbWludXMgPSAyMCxcclxuICAgIG11bHRpcGx5ID0gMzAsXHJcbiAgICBkaXZpZGUgPSA0MCxcclxuICAgIHBlcmNlbnQgPSA1MCxcclxuICAgIGVxdWFsID0gNjAsXHJcbiAgICBwb3cgPSA3MCxcclxuICAgIHNxcnQgPSA4MCxcclxuICAgIHNpbiA9IDkwLFxyXG4gICAgY29zID0gMTAwLFxyXG4gICAgYXNpbiA9IDExMCxcclxuICAgIGFjb3MgPSAxMjAsXHJcbiAgICBsb2cgPSAxMzAsXHJcbiAgICBvbmVEaXZYID0gMTQwLFxyXG59O1xyXG5cclxuaW50ZXJmYWNlIG9wZXJhdGlvbkludGVyZmFjZSB7XHJcbiAgICBpZDpvcGVyYXRpb25JZCxcclxuICAgIGFyaXR5Om51bWJlcixcclxuICAgIGJpdHRvbklkOnN0cmluZyxcclxuICAgIHJlcHJlc2VudGF0aW9uOnN0cmluZyxcclxuICAgIGFjdGlvbjooLi4uYXJnczpudW1iZXJbXSk9Pm51bWJlcixcclxufVxyXG5cclxuaW50ZXJmYWNlIHN0YWNrRWxlbWVudCB7XHJcbiAgICBvcGVyYXRpb246IG9wZXJhdGlvbkludGVyZmFjZSxcclxuICAgIG9wZXJhbmRzOiBudW1iZXJbXSxcclxuICAgIHJlc3VsdDogbnVtYmVyLFxyXG59XHJcblxyXG5pbnRlcmZhY2UgY2FsY3VsYXRvckludGVyZmFjZSB7XHJcbiAgICBpbnB1dEVsZW1lbnQ6SFRNTElucHV0RWxlbWVudCxcclxuICAgIGhpc3RvcnlEaXY6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgc2NpZW50aWZpY0RpdjpIVE1MRGl2RWxlbWVudCxcclxuICAgIGhpc3RvcnlMaXN0OkhUTUxVTGlzdEVsZW1lbnQsXHJcbiAgICBoaXN0b3J5TGlzdERhdGE6c3RyaW5nW10sXHJcbiAgICBzdGFjazoobnVtYmVyfG9wZXJhdGlvbklkKVtdLFxyXG4gICAgb3BlcmF0aW9uczpvcGVyYXRpb25JbnRlcmZhY2VbXSxcclxuICAgIHdhaXRpbmc0TmV3TnVtYmVyOmJvb2xlYW4sXHJcbiAgICBoaXN0b3J5T3BlbmVkOmJvb2xlYW4sXHJcbiAgICBzY2llbnRpZmljT3BlbmVkOmJvb2xlYW4sXHJcbiAgICBjbGVhcklucHV0OigpPT52b2lkLFxyXG4gICAgY2hhbmdlSGlzdG9yeURpc3BsYXk6KCk9PnZvaWQsXHJcbiAgICBjaGFuZ2VTY2llbnRpZmljRGlzcGxheTooKT0+dm9pZCxcclxuICAgIGFkZEFjdGlvblRvQnV0dG9uQ2xpY2s6KGJ1dHRvbklkOnN0cmluZywgYWN0aW9uOigpPT52b2lkKT0+dm9pZCxcclxuICAgIGFkZElucHV0VG9CdXR0b25DbGljazooYnV0dG9uSWQ6c3RyaW5nLGlucHV0OnN0cmluZyB8IG9wZXJhdGlvbklkKT0+dm9pZCxcclxuICAgIGFkZEV2ZW50c1RvRGlnaXRCdXR0b25zOigpPT52b2lkLFxyXG4gICAgYWRkRGlnaXRPck9wZXJhdGlvbjooZGlnaXQ6c3RyaW5nIHwgb3BlcmF0aW9uSWQgKT0+dm9pZCxcclxuICAgIGluaXRPcGVyYXRpb25zOigpPT52b2lkLFxyXG4gICAgYWRkVG9IaXN0b3J5TGlzdDooYXJnOnN0cmluZyxpbml0aWFsaXphdGlvbjpib29sZWFuKT0+dm9pZCxcclxuICAgIGdldEhpc3RvcnlMaXN0OigpPT52b2lkLFxyXG4gICAgc2F2ZUhpc3RvcnlMaXN0OigpPT52b2lkLFxyXG4gICAgaW5pdDooKT0+dm9pZCxcclxufVxyXG5cclxuLy8g0LLQvtC30LLRgNCw0YnQsNC10YIg0LrRg9C60Lgg0YEg0YPQutCw0LfQsNC90L3Ri9C8IG5hbWUsXHJcbi8vINC40LvQuCB1bmRlZmluZWQsINC10YHQu9C4INC90LjRh9C10LPQviDQvdC1INC90LDQudC00LXQvdC+XHJcbmZ1bmN0aW9uIGdldENvb2tpZShuYW1lOnN0cmluZykge1xyXG4gICAgbGV0IG1hdGNoZXMgPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cChcclxuICAgICAgXCIoPzpefDsgKVwiICsgbmFtZS5yZXBsYWNlKC8oW1xcLiQ/Knx7fVxcKFxcKVxcW1xcXVxcXFxcXC9cXCteXSkvZywgJ1xcXFwkMScpICsgXCI9KFteO10qKVwiXHJcbiAgICApKTtcclxuICAgIHJldHVybiBtYXRjaGVzID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoZXNbMV0pIDogdW5kZWZpbmVkO1xyXG59XHJcblxyXG5jb25zdCBjYWxjdWxhdG9yOmNhbGN1bGF0b3JJbnRlcmZhY2UgPSB7XHJcbiAgICBpbnB1dEVsZW1lbnQ6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGNfaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxyXG4gICAgaGlzdG9yeURpdjpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY19oaXN0b3J5JykgYXMgSFRNTERpdkVsZW1lbnQsXHJcbiAgICBzY2llbnRpZmljRGl2OmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjX3NjaWVudGlmaWMnKSBhcyBIVE1MRGl2RWxlbWVudCxcclxuICAgIGhpc3RvcnlMaXN0OmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjX2hpc3RvcnlfbGlzdCcpIGFzIEhUTUxVTGlzdEVsZW1lbnQsXHJcbiAgICBoaXN0b3J5TGlzdERhdGE6W10sXHJcbiAgICBzdGFjazpbXSxcclxuICAgIHdhaXRpbmc0TmV3TnVtYmVyOmZhbHNlLFxyXG4gICAgaGlzdG9yeU9wZW5lZDogZmFsc2UsXHJcbiAgICBzY2llbnRpZmljT3BlbmVkOiBmYWxzZSxcclxuICAgIG9wZXJhdGlvbnM6W10sXHJcbiAgICBjbGVhcklucHV0KCkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgPSAnMCc7XHJcbiAgICAgICAgdGhpcy5zdGFjay5sZW5ndGggPSAwO1xyXG4gICAgfSxcclxuICAgIGdldEhpc3RvcnlMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnlGcm9tQ29va2llID0gZ2V0Q29va2llKCdoaXN0b3J5TGlzdCcpO1xyXG4gICAgICAgIGlmKGhpc3RvcnlGcm9tQ29va2llKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUxpc3REYXRhID0gSlNPTi5wYXJzZShoaXN0b3J5RnJvbUNvb2tpZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUxpc3REYXRhLmZvckVhY2goKGVsOnN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0hpc3RvcnlMaXN0LmNhbGwodGhpcyxlbCx0cnVlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2F2ZUhpc3RvcnlMaXN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuaGlzdG9yeUxpc3REYXRhKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYGhpc3RvcnlMaXN0PSR7SlNPTi5zdHJpbmdpZnkodGhpcy5oaXN0b3J5TGlzdERhdGEpfWBcclxuICAgIH0sXHJcbiAgICBhZGRUb0hpc3RvcnlMaXN0KGFyZyxpbml0aWFsaXphdGlvbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgICAgbmV3TGkuaW5uZXJUZXh0ID0gYXJnO1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeUxpc3QuYXBwZW5kQ2hpbGQobmV3TGkpO1xyXG4gICAgICAgIGlmKGluaXRpYWxpemF0aW9uKSBcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeUxpc3REYXRhLnB1c2goYXJnKTtcclxuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5TGlzdCgpO1xyXG4gICAgfSxcclxuICAgIGFkZERpZ2l0T3JPcGVyYXRpb24oaW5wdXQ6c3RyaW5nIHwgb3BlcmF0aW9uSWQgKSB7XHJcbiAgICAgICAgaWYoaW5wdXQgaW4gb3BlcmF0aW9uSWQpIHsgLy8gaXMgb3BlcmF0aW9uIGJ1dHRvbiBwcmVzc2VkID9cclxuICAgICAgICAgICAgY29uc3QgY3Vyck9wZXJhdGlvbiA9IHRoaXMub3BlcmF0aW9ucy5maW5kKChlbDpvcGVyYXRpb25JbnRlcmZhY2UpID0+IGVsLmlkID09PSBpbnB1dCk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6bnVtYmVyID0gTmFOO1xyXG4gICAgICAgICAgICBpZih0aGlzLnN0YWNrLmxlbmd0aCkgeyAvL3RoZXJlIGlzIGRhdGEgdG8gYmUgY2FsY3VsYXRlZFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3BJZCA9IHRoaXMuc3RhY2sucG9wKCkgYXMgb3BlcmF0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcGVyYXRpb24gPSB0aGlzLm9wZXJhdGlvbnMuZmluZCgoZWw6b3BlcmF0aW9uSW50ZXJmYWNlKSA9PiBlbC5pZCA9PT0gb3BJZCk7IFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3BlcmFuZHM6bnVtYmVyW109W107XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxO2k8b3BlcmF0aW9uIS5hcml0eTtpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVyYW5kcy5wdXNoKHRoaXMuc3RhY2sucG9wKCkgYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wZXJhbmRzLnB1c2goTnVtYmVyKHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvcGVyYXRpb24hLmFjdGlvbi5hcHBseShudWxsLG9wZXJhbmRzKTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9IFN0cmluZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0hpc3RvcnlMaXN0KFN0cmluZyhvcGVyYW5kc1swXSkgKyBcclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24hLnJlcHJlc2VudGF0aW9uICsgXHJcbiAgICAgICAgICAgICAgICAgICAgU3RyaW5nKG9wZXJhbmRzWzFdKSArIFxyXG4gICAgICAgICAgICAgICAgICAgICc9JyArIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE51bWJlcih0aGlzLmlucHV0RWxlbWVudC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY3Vyck9wZXJhdGlvbiEuYXJpdHkgPT09IDEpIHsgLy8gbm8gbmVlZCB0byBwdXNoIGluIHN0YWNrLCBqdXN0IGNhbGN1bGF0ZSByaWdodCBub3dcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGN1cnJPcGVyYXRpb24hLmFjdGlvbihOdW1iZXIodGhpcy5pbnB1dEVsZW1lbnQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9IaXN0b3J5TGlzdChjdXJyT3BlcmF0aW9uIS5yZXByZXNlbnRhdGlvbiArIFxyXG4gICAgICAgICAgICAgICAgICAgICcoJyArIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlICsgJyknICtcclxuICAgICAgICAgICAgICAgICAgICAnPScgKyBTdHJpbmcocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9IFN0cmluZyhyZXN1bHQpOyBcclxuICAgICAgICAgICAgfSBlbHNlIFxyXG4gICAgICAgICAgICAgICAgaWYoY3Vyck9wZXJhdGlvbiEuYXJpdHkgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJlc3VsdCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChpbnB1dCBhcyBvcGVyYXRpb25JZCk7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmc0TmV3TnVtYmVyID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgeyAgLy8gbm90IG9wZXJhdGlvbiBidXR0b24gcHJlZXNlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy53YWl0aW5nNE5ld051bWJlciAmJiBpbnB1dCE9PSdcXGInKSB7IC8vIHN0YXJ0IG9mIGlucHV0IGEgbmV3IG51bWJlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZzROZXdOdW1iZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpbnB1dD09PSdcXGInKSB7IC8vIGJhY2tzcGFjZSBidXR0b24gcHJlc3NlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLmlucHV0RWxlbWVudC52YWx1ZS5zbGljZSgwLC0xKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID09PSAnJykgdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgPSAnMCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmc0TmV3TnVtYmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaW5wdXQgPT09ICcuJykgeyAvLyBkZWNpbWFsIHBvaW50IGJ1dHRvbiBwcmVzc2VkXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlucHV0RWxlbWVudC52YWx1ZS5pbmRleE9mKCcuJykgIT09IC0xKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZihOdW1iZXIodGhpcy5pbnB1dEVsZW1lbnQudmFsdWUpID09PSAwKSB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9ICcwJzsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQgPT09ICcwJylcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9PT0gJzAnKSByZXR1cm47IC8vIGlnbm9yZSBpbnB1dCBvZiAwIGlmIGN1cnJlbnQgc3RyaW5nIHZhbHVlIGlzIDAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlucHV0RWxlbWVudC52YWx1ZS5pbmRleE9mKCcuJykgPT09IC0xICYmIE51bWJlcih0aGlzLmlucHV0RWxlbWVudC52YWx1ZSkgPT09IDApIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlPScnOyAvLyB0aGVyZSBpcyBubyBkZWNpbWFsIHBvaW50IGFuZCBsYXN0IGlucHV0IGlzIGVxdWFsIHRvIDAsIHJlcGxhY2UgbGFzdCBpbnB1dCB3aXRoIG5ld1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID0gdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgKyBpbnB1dDsgLy8gYWRkIG5leHQgZGlnaXQgdG8gY3VycmVudCBudW1iZXIgaW5wdXQgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNoYW5nZUhpc3RvcnlEaXNwbGF5KCkge1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeU9wZW5lZCA9ICF0aGlzLmhpc3RvcnlPcGVuZWQ7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5RGl2LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeURpdi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93bicpO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGBoaXN0b3J5T3BlbmVkPSR7dGhpcy5oaXN0b3J5T3BlbmVkfWA7XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlU2NpZW50aWZpY0Rpc3BsYXkoKSB7XHJcbiAgICAgICAgdGhpcy5zY2llbnRpZmljT3BlbmVkID0gIXRoaXMuc2NpZW50aWZpY09wZW5lZDtcclxuICAgICAgICB0aGlzLnNjaWVudGlmaWNEaXYuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgdGhpcy5zY2llbnRpZmljRGl2LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3duJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYHNjaWVudGlmaWNPcGVuZWQ9JHt0aGlzLnNjaWVudGlmaWNPcGVuZWR9YDtcclxuICAgIH0sXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuX2hpc3RvcnknKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICBoaXN0b3J5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyx0aGlzLmNoYW5nZUhpc3RvcnlEaXNwbGF5LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGNvbnN0IHNjaWVudGlmaWNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuX3NjaWVudGlmaWMnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICBzY2llbnRpZmljQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyx0aGlzLmNoYW5nZVNjaWVudGlmaWNEaXNwbGF5LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuaW5pdE9wZXJhdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmNsZWFySW5wdXQoKTtcclxuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsKGV2ZW50OkV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndmFsdWUgPSAnLHRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmKHRhcmdldC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hZGRBY3Rpb25Ub0J1dHRvbkNsaWNrKCdidG5fY2xlYXInLHRoaXMuY2xlYXJJbnB1dC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50c1RvRGlnaXRCdXR0b25zKCk7XHJcbiAgICAgICAgdGhpcy5hZGRJbnB1dFRvQnV0dG9uQ2xpY2soJ2J0bl9wdCcsJy4nKTtcclxuICAgICAgICB0aGlzLmFkZElucHV0VG9CdXR0b25DbGljaygnYnRuX2JhY2tzcGFjZScsJ1xcYicpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudDpLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdrZXkgcHJlc3NlZCA6ICcsIGV2ZW50LmtleSwgJyBrZXkgY29kZSA9ICcsIGV2ZW50LmtleUNvZGUpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnLic6XHJcbiAgICAgICAgICAgICAgICBjYXNlICcwJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnMic6XHJcbiAgICAgICAgICAgICAgICBjYXNlICczJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJzQnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnNSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICc2JzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJzcnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnOCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICc5JzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJzAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGlnaXRPck9wZXJhdGlvbihldmVudC5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnKyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREaWdpdE9yT3BlcmF0aW9uKG9wZXJhdGlvbklkLnBsdXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnLSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREaWdpdE9yT3BlcmF0aW9uKG9wZXJhdGlvbklkLm1pbnVzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJyonOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGlnaXRPck9wZXJhdGlvbihvcGVyYXRpb25JZC5tdWx0aXBseSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERpZ2l0T3JPcGVyYXRpb24ob3BlcmF0aW9uSWQuZGl2aWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJy8nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGlnaXRPck9wZXJhdGlvbihvcGVyYXRpb25JZC5kaXZpZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnPSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREaWdpdE9yT3BlcmF0aW9uKG9wZXJhdGlvbklkLmVxdWFsKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJyUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGlnaXRPck9wZXJhdGlvbihvcGVyYXRpb25JZC5wZXJjZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFySW5wdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERpZ2l0T3JPcGVyYXRpb24oJ1xcYicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUhpc3RvcnlEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4MzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NpZW50aWZpY0Rpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OiAvL0Fycm93VXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDogLy9BcnJvd0Rvd25cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBoaXN0b3J5T3BlbmVkRnJvbUNvb2tpZSA9IGdldENvb2tpZSgnaGlzdG9yeU9wZW5lZCcpO1xyXG4gICAgICAgIGlmIChoaXN0b3J5T3BlbmVkRnJvbUNvb2tpZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBpZiAoU3RyaW5nKHRoaXMuaGlzdG9yeU9wZW5lZCkgIT09IGhpc3RvcnlPcGVuZWRGcm9tQ29va2llKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VIaXN0b3J5RGlzcGxheSgpO1xyXG4gICAgICAgIHZhciBzY2llbnRpZmljT3BlbmVkRnJvbUNvb2tpZSA9IGdldENvb2tpZSgnc2NpZW50aWZpY09wZW5lZCcpO1xyXG4gICAgICAgIGlmIChzY2llbnRpZmljT3BlbmVkRnJvbUNvb2tpZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBpZiAoU3RyaW5nKHRoaXMuc2NpZW50aWZpY09wZW5lZCkgIT09IHNjaWVudGlmaWNPcGVuZWRGcm9tQ29va2llKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY2llbnRpZmljRGlzcGxheSgpO1xyXG5cclxuICAgICAgICB0aGlzLmdldEhpc3RvcnlMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgIGFkZEFjdGlvblRvQnV0dG9uQ2xpY2soYnV0dG9uSWQsIGFjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGFjdGlvbik7XHJcbiAgICB9LFxyXG4gICAgYWRkSW5wdXRUb0J1dHRvbkNsaWNrKGJ1dHRvbklkLGlucHV0KSB7XHJcbiAgICAgICAgdGhpcy5hZGRBY3Rpb25Ub0J1dHRvbkNsaWNrKGJ1dHRvbklkLCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZGREaWdpdE9yT3BlcmF0aW9uKGlucHV0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBhZGRFdmVudHNUb0RpZ2l0QnV0dG9ucygpIHtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPDEwO2krKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZElucHV0VG9CdXR0b25DbGljayhgYnRuXyR7aX1gLFN0cmluZyhpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluaXRPcGVyYXRpb25zKCkge1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IG9wZXJhdGlvbklkLmVxdWFsLCBcclxuICAgICAgICAgICAgYml0dG9uSWQ6J2J0bl9lcXVhbCcsIFxyXG4gICAgICAgICAgICBhcml0eTowLCBcclxuICAgICAgICAgICAgYWN0aW9uOihhOm51bWJlcixiOm51bWJlcikgPT4gTmFOLCBcclxuICAgICAgICAgICAgcmVwcmVzZW50YXRpb246ICc9JyAsIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IG9wZXJhdGlvbklkLnBsdXMsIFxyXG4gICAgICAgICAgICBiaXR0b25JZDonYnRuX3BsdXMnLCBcclxuICAgICAgICAgICAgYXJpdHk6MiwgYWN0aW9uOihhOm51bWJlcixiOm51bWJlcikgPT4gYStiLCBcclxuICAgICAgICAgICAgcmVwcmVzZW50YXRpb246ICcrJyAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogb3BlcmF0aW9uSWQubWludXMsIFxyXG4gICAgICAgICAgICBiaXR0b25JZDonYnRuX21pbnVzJywgXHJcbiAgICAgICAgICAgIGFyaXR5OjIsIFxyXG4gICAgICAgICAgICBhY3Rpb246KGE6bnVtYmVyLGI6bnVtYmVyKSA9PiBhLWIsIFxyXG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbjogJy0nICxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9wZXJhdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBvcGVyYXRpb25JZC5tdWx0aXBseSwgXHJcbiAgICAgICAgICAgIGJpdHRvbklkOididG5fbXVsdGlwbHknLCBcclxuICAgICAgICAgICAgYXJpdHk6MiwgYWN0aW9uOihhOm51bWJlcixiOm51bWJlcikgPT4gYSpiLCBcclxuICAgICAgICAgICAgcmVwcmVzZW50YXRpb246ICfDlycgLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IG9wZXJhdGlvbklkLmRpdmlkZSwgXHJcbiAgICAgICAgICAgIGJpdHRvbklkOididG5fZGl2aWRlJywgXHJcbiAgICAgICAgICAgIGFyaXR5OjIsIGFjdGlvbjooYTpudW1iZXIsYjpudW1iZXIpID0+IGEvYiwgXHJcbiAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uOiAnLycgLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IG9wZXJhdGlvbklkLnBvdywgXHJcbiAgICAgICAgICAgIGJpdHRvbklkOididG5fcG93JywgXHJcbiAgICAgICAgICAgIGFyaXR5OjIsIGFjdGlvbjooYTpudW1iZXIsYjpudW1iZXIpID0+IE1hdGgucG93KGEsYiksIFxyXG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbjogJ14nICxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9wZXJhdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBvcGVyYXRpb25JZC5zcXJ0LCBcclxuICAgICAgICAgICAgYml0dG9uSWQ6J2J0bl9zcXJ0JywgXHJcbiAgICAgICAgICAgIGFyaXR5OjEsIGFjdGlvbjooYTpudW1iZXIpID0+IE1hdGguc3FydChhKSwgXHJcbiAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uOiAn4oiaJyAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogb3BlcmF0aW9uSWQucGVyY2VudCwgXHJcbiAgICAgICAgICAgIGJpdHRvbklkOididG5fcGVyY2VudCcsIFxyXG4gICAgICAgICAgICBhcml0eToxLCBhY3Rpb246KGE6bnVtYmVyKSA9PiAoYS8xMDApLCBcclxuICAgICAgICAgICAgcmVwcmVzZW50YXRpb246ICclJyAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogb3BlcmF0aW9uSWQuc2luLCBcclxuICAgICAgICAgICAgYml0dG9uSWQ6J2J0bl9zaW4nLCBcclxuICAgICAgICAgICAgYXJpdHk6MSwgYWN0aW9uOihhOm51bWJlcikgPT4gTWF0aC5zaW4oYSksIFxyXG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbjogJ3NpbicgLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IG9wZXJhdGlvbklkLmNvcywgXHJcbiAgICAgICAgICAgIGJpdHRvbklkOididG5fY29zJywgXHJcbiAgICAgICAgICAgIGFyaXR5OjEsIGFjdGlvbjooYTpudW1iZXIpID0+IE1hdGguY29zKGEpLCBcclxuICAgICAgICAgICAgcmVwcmVzZW50YXRpb246ICdjb3MnICxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9wZXJhdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBvcGVyYXRpb25JZC5hc2luLCBcclxuICAgICAgICAgICAgYml0dG9uSWQ6J2J0bl9hc2luJywgXHJcbiAgICAgICAgICAgIGFyaXR5OjEsIGFjdGlvbjooYTpudW1iZXIpID0+IE1hdGguYXNpbihhKSwgXHJcbiAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uOiAnYXNpbicgLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IG9wZXJhdGlvbklkLmFjb3MsIFxyXG4gICAgICAgICAgICBiaXR0b25JZDonYnRuX2Fjb3MnLCBcclxuICAgICAgICAgICAgYXJpdHk6MSwgYWN0aW9uOihhOm51bWJlcikgPT4gTWF0aC5hY29zKGEpLCBcclxuICAgICAgICAgICAgcmVwcmVzZW50YXRpb246ICdhY29zJyAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogb3BlcmF0aW9uSWQubG9nLCBcclxuICAgICAgICAgICAgYml0dG9uSWQ6J2J0bl9sb2cnLCBcclxuICAgICAgICAgICAgYXJpdHk6MSwgYWN0aW9uOihhOm51bWJlcikgPT4gTWF0aC5sb2coYSksIFxyXG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbjogJ2xvZycgLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IG9wZXJhdGlvbklkLm9uZURpdlgsIFxyXG4gICAgICAgICAgICBiaXR0b25JZDonYnRuX29uZURpdlgnLCBcclxuICAgICAgICAgICAgYXJpdHk6MSwgYWN0aW9uOihhOm51bWJlcikgPT4gKDEvYSksIFxyXG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbjogJzEvJyAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zLmZvckVhY2goKGVsOm9wZXJhdGlvbkludGVyZmFjZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZElucHV0VG9CdXR0b25DbGljayhlbC5iaXR0b25JZCxlbC5pZCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuY2FsY3VsYXRvci5pbml0KCk7XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9