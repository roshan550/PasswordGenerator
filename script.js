const inputSlider=document.querySelector("[datalength-slider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[password-display]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copymsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generate");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
 const symbols='!@#$%^&*()_+~`/>|<}[]:+=.,""\'';

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();

setIndicator("#ccc");

function handleSlider(){
  inputSlider.value=passwordLength;
  lengthDisplay.innerText=passwordLength;
  const min=inputSlider.min;
  const max=inputSlider.max;
  inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)+"% 100%")
}

function setIndicator(color){
  indicator.style.backgroundColor = color;
   indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRndInteger(min,max){
  return Math.floor( Math.random()*(max-min))+min;
}

function genrateRandomNumber(){
    return getRndInteger(0,9);

}
function genrateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
    
}
function genrateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
    
}

function generateSymbol(){
     const ranNum=getRndInteger(0,symbols.length);
     return symbols.charAt(ranNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((e)=>(str+=e));
    return str;
}
async function copyContent(){
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";

    }
    catch(e){
        copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active")
    setTimeout(()=>{
         copyMsg.classList.remove("active")
    },2000); 
}
function handleCheckBoxChange(){
      checkCount=0;
      allCheckBox.forEach((checkbox)=>{
         if(checkbox.checked)
            checkCount++;
         
      });

      if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
      }

}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})



inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
}) 
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
         copyContent();
    }
})


generateBtn.addEventListener('click',()=>{
 if(checkCount==0)return;
 if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();  
 }

console.log("Starting here");
password="";


//  if(uppercaseCheck.checked){
//     password=genrateUpperCase();
//  }
//  if(lowercaseCheck.checked){
//     password=genrateLowerCase();
//  }
//  if(numbersCheck.checked){
//     password=genrateRandomNumber();
//  }
//  if(symbolCheck.checked){
//     password=generateSymbol();
//  }
let funArr=[];
if(uppercaseCheck.checked){
    console.log("its passed");
     funArr.push(genrateUpperCase);

}
console.log("uppercase generated");

if(lowercaseCheck.checked)
     funArr.push(genrateLowerCase);
if(numbersCheck.checked)
     funArr.push(genrateRandomNumber);
if(symbolCheck.checked)
     funArr.push(generateSymbol);
//compulsory addition
 for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
 }
 
  //remaining addition



for(let i=0;i<passwordLength-funArr.length;i++){
    let randIndex=getRndInteger(0,funArr.length);
    password+=funArr[randIndex]();
}

//shuffel password
password=shufflePassword(Array.from(password));
console.log("shuffle password done");
//show in UI
passwordDisplay.value=password;
console.log("UI display done");
calcStrength();

})