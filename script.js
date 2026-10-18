// Developer: Your Name - CodeAlpha Task 2 Calculator

let mainDisplayScreen = document.getElementById("mainDisplayScreen");
let calculationHistory = document.getElementById("calculationHistory");
let currentInputValue = "";

function appendToDisplay(inputChar){
    const operatorList = ["+", "-", "*", "/", "%"];
    let lastEnteredChar = currentInputValue.slice(-1);

    if(inputChar === "."){
        let lastNumberPart = currentInputValue.split(/[\+\-\*\/\%]/).pop();
        if(lastNumberPart.includes(".")) return;
        if(currentInputValue === "" || operatorList.includes(lastEnteredChar)){
            currentInputValue += "0";
        }
    }

    if(operatorList.includes(inputChar)){
        if(currentInputValue === "") return;
        if(operatorList.includes(lastEnteredChar)){
            currentInputValue = currentInputValue.slice(0, -1);
        }
    }

    currentInputValue += inputChar;
    mainDisplayScreen.value = currentInputValue;
}

function clearDisplayScreen(){
    currentInputValue = "";
    mainDisplayScreen.value = "";
    calculationHistory.innerText = "";
}

function deleteLastCharacter(){
    currentInputValue = currentInputValue.slice(0, -1);
    mainDisplayScreen.value = currentInputValue;
}

function calculateFinalResult(){
    if(currentInputValue === "") return;
    try{
        if(["+", "-", "*", "/", "%"].includes(currentInputValue.slice(-1))){
            currentInputValue = currentInputValue.slice(0, -1);
        }
        let expressionToCalculate = currentInputValue.replace(/%/g, "/100");
        let finalResult = Function("return " + expressionToCalculate)();
        if(!isFinite(finalResult)) throw new Error();
        calculationHistory.innerText = currentInputValue + " =";
        finalResult = parseFloat(finalResult.toFixed(8));
        mainDisplayScreen.value = finalResult;
        currentInputValue = finalResult.toString();
    }
    catch{
        mainDisplayScreen.value = "Error";
        currentInputValue = "";
    }
}

document.addEventListener("keydown", (e) => {
    if("0123456789+-*/.%".includes(e.key)) appendToDisplay(e.key);
    if(e.key === "Enter") calculateFinalResult();
    if(e.key === "Backspace") deleteLastCharacter();
    if(e.key === "Escape") clearDisplayScreen();
});