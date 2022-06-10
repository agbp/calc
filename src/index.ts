
enum operationId {
    plus = 10,
    minus = 20,
    multiply = 30,
    divide = 40,
    percent = 50,
    equal = 60,
    pow = 70,
    sqrt = 80,
    sin = 90,
    cos = 100,
    asin = 110,
    acos = 120,
    log = 130,
    oneDivX = 140,
};

interface operationInterface {
    id:operationId,
    arity:number,
    bittonId:string,
    representation:string,
    action:(...args:number[])=>number,
}

interface stackElement {
    operation: operationInterface,
    operands: number[],
    result: number,
}

interface calculatorInterface {
    inputElement:HTMLInputElement,
    historyDiv: HTMLDivElement,
    scientificDiv:HTMLDivElement,
    historyList:HTMLUListElement,
    historyListData:string[],
    stack:(number|operationId)[],
    operations:operationInterface[],
    waiting4NewNumber:boolean,
    historyOpened:boolean,
    scientificOpened:boolean,
    clearInput:()=>void,
    changeHistoryDisplay:()=>void,
    changeScientificDisplay:()=>void,
    addActionToButtonClick:(buttonId:string, action:()=>void)=>void,
    addInputToButtonClick:(buttonId:string,input:string | operationId)=>void,
    addEventsToDigitButtons:()=>void,
    addDigitOrOperation:(digit:string | operationId )=>void,
    initOperations:()=>void,
    addToHistoryList:(arg:string,initialization:boolean)=>void,
    getHistoryList:()=>void,
    saveHistoryList:()=>void,
    init:()=>void,
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name:string) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const calculator:calculatorInterface = {
    inputElement:document.getElementById('calc_input') as HTMLInputElement,
    historyDiv:document.getElementById('calc_history') as HTMLDivElement,
    scientificDiv:document.getElementById('calc_scientific') as HTMLDivElement,
    historyList:document.getElementById('calc_history_list') as HTMLUListElement,
    historyListData:[],
    stack:[],
    waiting4NewNumber:false,
    historyOpened: false,
    scientificOpened: false,
    operations:[],
    clearInput() 
    {
        this.inputElement.value = '0';
        this.stack.length = 0;
    },
    getHistoryList() {
        const historyFromCookie = getCookie('historyList');
        if(historyFromCookie) {
            this.historyListData = JSON.parse(historyFromCookie);
            this.historyListData.forEach((el:string) => {
                this.addToHistoryList.call(this,el,true);
            })
        }
    },
    saveHistoryList() {
        console.log(JSON.stringify(this.historyListData));
        document.cookie = `historyList=${JSON.stringify(this.historyListData)}`
    },
    addToHistoryList(arg,initialization = false) {
        const newLi = document.createElement("li");
        newLi.innerText = arg;
        this.historyList.appendChild(newLi);
        if(initialization) 
            return;
        this.historyListData.push(arg);
        this.saveHistoryList();
    },
    addDigitOrOperation(input:string | operationId ) {
        if(input in operationId) { // is operation button pressed ?
            const currOperation = this.operations.find((el:operationInterface) => el.id === input);
            let result:number = NaN;
            if(this.stack.length) { //there is data to be calculated
                const opId = this.stack.pop() as operationId;
                const operation = this.operations.find((el:operationInterface) => el.id === opId); 
                const operands:number[]=[];
                for(let i = 1;i<operation!.arity;i++) {
                    operands.push(this.stack.pop() as number);
                }
                operands.push(Number(this.inputElement.value));
                result = operation!.action.apply(null,operands); 
                this.inputElement.value = String(result);
                this.addToHistoryList(String(operands[0]) + 
                    operation!.representation + 
                    String(operands[1]) + 
                    '=' + this.inputElement.value);
            } else {
                result = Number(this.inputElement.value);
            }
            if(currOperation!.arity === 1) { // no need to push in stack, just calculate right now
                result = currOperation!.action(Number(this.inputElement.value));
                this.addToHistoryList(currOperation!.representation + 
                    '(' + this.inputElement.value + ')' +
                    '=' + String(result));
                this.inputElement.value = String(result); 
            } else 
                if(currOperation!.arity > 1) {
                    this.stack.push(result); 
                    this.stack.push(input as operationId); 
                }
            this.waiting4NewNumber = true;
        } else {  // not operation button preesed
            if (this.waiting4NewNumber && input!=='\b') { // start of input a new number
                this.inputElement.value = '';
                this.waiting4NewNumber = false;
            }
            if(input==='\b') { // backspace button pressed
                this.inputElement.value = this.inputElement.value.slice(0,-1);
                if(this.inputElement.value === '') this.inputElement.value = '0';
                this.waiting4NewNumber = false;
                return;
            }
            if(input === '.') { // decimal point button pressed
                if(this.inputElement.value.indexOf('.') !== -1) return;
                if(Number(this.inputElement.value) === 0) this.inputElement.value = '0'; 
            } else {
                if (input === '0')
                    if(this.inputElement.value === '0') return; // ignore input of 0 if current string value is 0 
                if(this.inputElement.value.indexOf('.') === -1 && Number(this.inputElement.value) === 0) 
                    this.inputElement.value=''; // there is no decimal point and last input is equal to 0, replace last input with new
            }
            this.inputElement.value = this.inputElement.value + input; // add next digit to current number input 
        }
    },
    changeHistoryDisplay() {
        this.historyOpened = !this.historyOpened;
        this.historyDiv.classList.toggle('hidden');
        this.historyDiv.classList.toggle('shown');
        document.cookie = `historyOpened=${this.historyOpened}`;
    },
    changeScientificDisplay() {
        this.scientificOpened = !this.scientificOpened;
        this.scientificDiv.classList.toggle('hidden');
        this.scientificDiv.classList.toggle('shown');
        document.cookie = `scientificOpened=${this.scientificOpened}`;
    },
    init() {
        const historyBtn = document.getElementById('btn_history') as HTMLButtonElement;
        historyBtn.addEventListener('click',this.changeHistoryDisplay.bind(this));
        const scientificBtn = document.getElementById('btn_scientific') as HTMLButtonElement;
        scientificBtn.addEventListener('click',this.changeScientificDisplay.bind(this));
        this.initOperations();
        this.clearInput();
        this.inputElement.addEventListener('input',(event:Event) => {
            const target = event.target as HTMLInputElement;
            console.log('value = ',target.value);
            if(target.value === '') {
                this.clearInput();
                return;
            }
        });
        this.addActionToButtonClick('btn_clear',this.clearInput.bind(this));
        this.addEventsToDigitButtons();
        this.addInputToButtonClick('btn_pt','.');
        this.addInputToButtonClick('btn_backspace','\b');
        const historyOpenedFromCookie = getCookie('historyOpened');
        if(historyOpenedFromCookie !== undefined) 
            if(String(this.historyOpened) !== historyOpenedFromCookie)
                this.changeHistoryDisplay();
        const scientificOpenedFromCookie = getCookie('scientificOpened');
        if(scientificOpenedFromCookie !== undefined) 
        if(String(this.scientificOpened) !== scientificOpenedFromCookie)
            this.changeScientificDisplay();
        this.getHistoryList();
        },
    addActionToButtonClick(buttonId, action) {
        const btn = document.getElementById(buttonId) as HTMLButtonElement;
        btn.addEventListener('click',action);
    },
    addInputToButtonClick(buttonId,input) {
        this.addActionToButtonClick(buttonId,() => {
            this.addDigitOrOperation(input);
        });
    },
    addEventsToDigitButtons() {
        for(let i=0;i<10;i++) {
            this.addInputToButtonClick(`btn_${i}`,String(i));
        }
    },
    initOperations() {
        this.operations.push({
            id: operationId.equal, 
            bittonId:'btn_equal', 
            arity:0, 
            action:(a:number,b:number) => NaN, 
            representation: '=' , 
        });
        this.operations.push({
            id: operationId.plus, 
            bittonId:'btn_plus', 
            arity:2, action:(a:number,b:number) => a+b, 
            representation: '+' ,
        });
        this.operations.push({
            id: operationId.minus, 
            bittonId:'btn_minus', 
            arity:2, 
            action:(a:number,b:number) => a-b, 
            representation: '-' ,
        });
        this.operations.push({
            id: operationId.multiply, 
            bittonId:'btn_multiply', 
            arity:2, action:(a:number,b:number) => a*b, 
            representation: '×' ,
        });
        this.operations.push({
            id: operationId.divide, 
            bittonId:'btn_divide', 
            arity:2, action:(a:number,b:number) => a/b, 
            representation: '/' ,
        });
        this.operations.push({
            id: operationId.pow, 
            bittonId:'btn_pow', 
            arity:2, action:(a:number,b:number) => Math.pow(a,b), 
            representation: '^' ,
        });
        this.operations.push({
            id: operationId.sqrt, 
            bittonId:'btn_sqrt', 
            arity:1, action:(a:number) => Math.sqrt(a), 
            representation: '√' ,
        });
        this.operations.push({
            id: operationId.percent, 
            bittonId:'btn_percent', 
            arity:1, action:(a:number) => (a/100), 
            representation: '%' ,
        });
        this.operations.push({
            id: operationId.sin, 
            bittonId:'btn_sin', 
            arity:1, action:(a:number) => Math.sin(a), 
            representation: 'sin' ,
        });
        this.operations.push({
            id: operationId.cos, 
            bittonId:'btn_cos', 
            arity:1, action:(a:number) => Math.cos(a), 
            representation: 'cos' ,
        });
        this.operations.push({
            id: operationId.asin, 
            bittonId:'btn_asin', 
            arity:1, action:(a:number) => Math.asin(a), 
            representation: 'asin' ,
        });
        this.operations.push({
            id: operationId.acos, 
            bittonId:'btn_acos', 
            arity:1, action:(a:number) => Math.acos(a), 
            representation: 'acos' ,
        });
        this.operations.push({
            id: operationId.log, 
            bittonId:'btn_log', 
            arity:1, action:(a:number) => Math.log(a), 
            representation: 'log' ,
        });
        this.operations.push({
            id: operationId.oneDivX, 
            bittonId:'btn_oneDivX', 
            arity:1, action:(a:number) => (1/a), 
            representation: '1/' ,
        });
        this.operations.forEach((el:operationInterface) => {
            this.addInputToButtonClick(el.bittonId,el.id);
        })
    }
}

calculator.init();


