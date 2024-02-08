const doc = document;
const canvas = doc.querySelector(".drawing_canvas");
const numAlp = doc.querySelector(".num-alp");
const numAlpTitle = doc.querySelector(".num-alp-title");
const numAlpBody = doc.querySelector(".num-alp-body");
const specChar = doc.querySelector(".spec-char");
const specCharTitle = doc.querySelector(".spec-char-title");
const specCharBody = doc.querySelector(".spec-char-body");
let init = true;

let AZlist = undefined;
let MNlist = undefined;
let selectAZMN = undefined;

//console.log(canvas.getBoundingClientRect().left,canvas.getBoundingClientRect().top)
//console.log(canvas);
const xml = new XMLHttpRequest();
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const out = doc.querySelector(".rec_num");

window.onload = () => {
  console.log(canvas.clientHeight)
  numAlpTitle.style.height = numAlp.clientWidth / 5 + "px";
  numAlpBody.style.fontSize = numAlp.clientWidth / 10 + "px";
  specChar.style.fontSize = specChar.clientWidth / 5 + "px";
  specCharTitle.style.height = specChar.clientWidth / 5 + "px";
  specCharBody.style.fontSize = specChar.clientWidth / 10 + "px";
  numAlpTitle.style.fontSize = numAlp.clientWidth / 8 + "px";
  //numAlp.style.backgroundColor = "green";
    //console.log(screen.width, screen.height);
    if (window.visualViewport.width < window.visualViewport.height){
        canvas.style.height = "50%";
        canvas.style.width = "50%";
        //numAlp.style.height = "30%";
        numAlp.style.width = "20%";
        numAlp.style.marginLeft = "0%";
        //specChar.style.height = "30%";
        specChar.style.width = "20%";
        specChar.style.marginLeft = "80%";
        numAlpTitle.style.fontSize = numAlp.clientWidth / 10 + "px";
    }
    numAlp.style.height = canvas.clientHeight + "px";
    specChar.style.height = canvas.clientHeight + "px";
    //numAlp.innerHTML = window.visualViewport.width + " " + window.visualViewport.height;
}

window.onresize = () => {
  //numAlp.style.backgroundColor = "green";
    //console.log(screen.width, screen.height);
    if (window.visualViewport.width < window.visualViewport.height){
        canvas.style.height = "50%";
        canvas.style.width = "50%";
        numAlp.style.height = "30%";
        numAlp.style.width = "20%";
        numAlp.style.marginLeft = "0%";
        specChar.style.height = "30%";
        specChar.style.width = "20%";
        specChar.style.marginLeft = "80%";
        numAlpTitle.style.fontSize = numAlp.clientWidth / 10 + "px";
    }
    else {
      canvas.style.height = "20%";
        canvas.style.width = "20%";
        numAlp.style.height = "39%";
        numAlp.style.width = "15%";
        numAlp.style.marginLeft = "15%";
        specChar.style.height = "39%";
        specChar.style.width = "15%";
        specChar.style.marginLeft = "70%";
        numAlpTitle.style.fontSize = numAlp.clientWidth / 8 + "px";
    }
  numAlpTitle.style.height = numAlp.clientWidth / 5 + "px";
  numAlpBody.style.fontSize = numAlp.clientWidth / 10 + "px";
  specChar.style.fontSize = specChar.clientWidth / 5 + "px";
  specCharTitle.style.height = specChar.clientWidth / 5 + "px";
  specCharBody.style.fontSize = specChar.clientWidth / 10 + "px";
  numAlp.style.height = canvas.clientHeight + "px";
  specChar.style.height = canvas.clientHeight + "px";
}

let isDrawing = false;
ctx.strokeStyle = "white";
let lineW = 1.5;
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave",stopDrawing)
canvas.addEventListener('contextmenu', event => event.preventDefault());
canvas.addEventListener('touchstart',context);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener('contextmenu', event => event.preventDefault());

function context(event){
  //console.log((event.clientX - canvas.getBoundingClientRect().left)/(canvas.clientWidth/28), (event.clientY - canvas.getBoundingClientRect().top)/(canvas.clientHeight/28))
  //console.log((event.touches[0].clientX - canvas.getBoundingClientRect().left)/(canvas.clientWidth/28), (event.touches[0].clientY - canvas.getBoundingClientRect().top)/(canvas.clientHeight/28));
}

//console.log("boundry",canvas.getBoundingClientRect().left,canvas.getBoundingClientRect().top)
function startDrawing(event) {
  //console.log("boundry",canvas.getBoundingClientRect().left,canvas.getBoundingClientRect().top)
  isDrawing = true;
  ctx.beginPath();
  if (event.button == 0){
    ctx.strokeStyle = "white";
    ctx.lineWidth = lineW;
  }
  else if (event.button == 2){
    ctx.strokeStyle = "black";
    ctx.lineWidth = lineW * 2;
  }
  let touchClickX,touchClickY;
    let mouseClickX = (event.clientX - canvas.getBoundingClientRect().left)/(canvas.clientWidth/28);
  let mouseClickY = (event.clientY - canvas.getBoundingClientRect().top)/(canvas.clientHeight/28);
  try{
  touchClickX = (event.touches[0].clientX - canvas.getBoundingClientRect().left)/(canvas.clientWidth/28);
  touchClickY = (event.touches[0].clientY - canvas.getBoundingClientRect().top)/(canvas.clientHeight/28);
  ctx.strokeStyle = "white";
}
catch{}

  if (mouseClickX){
    ctx.moveTo(mouseClickX, mouseClickY);
  }
  else {
    ctx.moveTo(touchClickX,touchClickY);
  }
}
  
function draw(event) {
  if (isDrawing) {
    let touchClickX,touchClickY;
    let mouseClickX = (event.clientX - canvas.getBoundingClientRect().left)/(canvas.clientWidth/28);
  let mouseClickY = (event.clientY - canvas.getBoundingClientRect().top)/(canvas.clientHeight/28);
  try{
    event.preventDefault();
  touchClickX = (event.touches[0].clientX - canvas.getBoundingClientRect().left)/(canvas.clientWidth/28);
  touchClickY = (event.touches[0].clientY - canvas.getBoundingClientRect().top)/(canvas.clientHeight/28);
  ctx.strokeStyle = "white";
}
catch{}
  //console.log(mouseClickX, mouseClickY, touchClickX,touchClickY)

  if (mouseClickX){
    ctx.lineTo(mouseClickX, mouseClickY);
  }
  else {
    ctx.lineTo(touchClickX,touchClickY);
  }
    ctx.stroke();
    //console.log(event.clientX,event.clientY)
  }
}

function getValues(list){
  retList = []
  valList = list.split(" ");
  valList = valList.filter(
    item => item !== ""
  )
  //console.log(valList);
  valList.forEach(element => {
    retElem = "";
    for (let pos of element){
      if (Number.isInteger(parseInt(pos)) || pos == "." || pos == "-"){
        retElem += pos;
      }
      else if (pos == "e"){
        //console.log("Happens")
        retElem += "E";
      }
    }
    retList.push(Number(retElem));
    }
  );
  retList = retList.filter(
    item => item !== ""
  )
  //console.log(retList);
  return retList;
}

function stopDrawing(event) {
  isDrawing = false;
}
  
function getImage(){
  numAlp.style.visibility = "visible";
  specChar.style.visibility = "visible";
    out.innerHTML = "...";
    let imgList =[]
    let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    //console.log(imgData.data)
    let forI = imgData.width * imgData.height * 4
    for (rep = 1;rep<forI;rep+=4){
      imgList.push(imgData.data[rep]);
    }
    sendList(imgList);
}

function sendList(imgList){
  let data = JSON.stringify(imgList);
  xml.open("POST","/",true);
    xml.setRequestHeader("Content-type","application/json");
    xml.onload = function (){
      resp = this.responseText.split(",");
        out.innerHTML = `${resp[0]}`;
        numAlpBody.innerHTML = `<br> Is Alphabetical: <br> ${(resp[1]*100).toFixed(2)}% <br> Is Numerical: <br> ${(resp[2]*100).toFixed(2)}%`;
        //console.log(resp[3],resp[4])
        AZlist = getValues(resp[3]);
        MNlist = getValues(resp[4]);
        if (resp[1]>=resp[2]){
          selectAZMN = "AZ";
            selecAlp.style.backgroundColor = "rgb(60,60,160)"
            selecNum.style.backgroundColor = "rgb(9,9,60)"
        }
        else {
          selectAZMN = "MN";
            selecNum.style.backgroundColor = "rgb(60,60,160)"
            selecAlp.style.backgroundColor = "rgb(9,9,60)"
        }
        //console.log(selectAZMN,AZlist,MNlist);
        setInfo(selectAZMN,AZlist,MNlist);
    };
    xml.send(data);
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

const list_alp = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",]

function Alp(rep){
  return list_alp[rep].toUpperCase()
}

function setInfo(choice,AZ,MN){
  specCharBody.innerHTML = "";
  if (choice == "AZ"){
    let rep = 0
    let suc = 0;
    let cont = true;
    AZ.forEach(per => {
      if (suc > 6 && cont == true){
        specCharBody.innerHTML += "..."
        cont = false;
      }
      if (parseFloat(per*100) > 1 && cont == true){
        suc += 1;
      specCharBody.innerHTML += Alp(rep) + " - " + parseFloat(per*100).toFixed(2) + "%<br>";
      }
      rep += 1;
    });
  }
  else if (choice == "MN"){
    let rep = 0
    let cont = true;
    let suc = 0;
    MN.forEach(per => {
      if (suc > 6 && cont == true){
        specCharBody.innerHTML += "..."
        cont = false;
      }
      if (parseFloat(per*100) > 1 && cont == true){
        suc += 1;
      specCharBody.innerHTML += rep + " - " + parseFloat(per*100).toFixed(2) + "%<br>";
      }
      rep += 1;
    });
  }
}

let selecAlp = doc.querySelector(".selec-alp");
let selecNum = doc.querySelector(".selec-num");

selecAlp.addEventListener("click", e => {setInfo("AZ",AZlist,MNlist);selecAlp.style.backgroundColor = "rgb(60,60,160)";selecNum.style.backgroundColor = "rgb(9,9,60)"})
selecNum.addEventListener("click", e => {setInfo("MN",AZlist,MNlist);selecAlp.style.backgroundColor = "rgb(9,9,60)";selecNum.style.backgroundColor = "rgb(60,60,160)"})
