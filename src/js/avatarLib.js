var FileSaver = require('file-saver');
var AvatarTool = require('./AvatarTool.js');

//spécifique a cause de l'id du canvas xx
var canvas = document.getElementById("fullAvatar"), ctx = canvas.getContext("2d");

//spécifique a fond xx
var listeURL = [  
    "public/mayor/body/jacket.png",
    "public/mayor/body/skirt.png",
    "public/mayor/body/skin.png",
    "public/mayor/head/1.png",
    "public/mayor/face/1.png",
    "public/mayor/hairs/1.png",
    "public/mayor/stuff/1.png"
];
//spécifique (surtout a cause du nombre de dossiers (calques du canvas)) xx
var files =[
    1,1,1,1,1,1,1
]
//spécifique (nombre de fichiers par dossiers) xx
var nbImgByFile = [
    1,1,1,3,6,6,2
]
//spécifique (noms des dossiers) xx
var folders = [
    'jacket',
    'skirt',
    'skin',
    'head',
    'face',
    'hairs',
    'stuff'
]
//specifique xx
var listeImgVanilla = [];

//specifique xx
var listeImgColorised = [];

//spécifique (nombre de fichiers)
var listeRGB = [
    [200,100,50],
    [100,100,50],
    [250,200,125],
    [250,200,125],
    [150,100,50],
    [150,100,50],
    [200,0,50],
];

//specifique xx
document.getElementById('print').addEventListener('click', function () {
    canvas.toBlob(function(blob) {
      FileSaver.saveAs(blob, "pretty image.png");
    })
});

//spécifique  (a cause du système 'idTruc' et les ID des taquets RGB) xx
const changeColor = function(){
    let newRGB=[
        parseInt(document.getElementById('r').value),
        parseInt(document.getElementById('g').value),
        parseInt(document.getElementById('b').value)
    ];
    let idImg=document.getElementById('idTruc').value;
    listeRGB[idImg] = newRGB;
    if(idImg==2||idImg==3||idImg=="3"||idImg=="2"){
        listeRGB[2] = newRGB;
        listeRGB[3] = newRGB;
        listeImgColorised[2] = AvatarTool.coloriseCanvas(listeImgVanilla[2], listeRGB[2])
        listeImgColorised[3] = AvatarTool.coloriseCanvas(listeImgVanilla[3], listeRGB[3])
    }
    else {
        listeImgColorised[idImg] = AvatarTool.coloriseCanvas(listeImgVanilla[idImg], listeRGB[idImg])
    }
    AvatarTool.mergeCanvas(canvas,listeImgColorised)

    document.getElementById("r").style = "background : linear-gradient(to right, rgba(0,"+newRGB[1]+","+newRGB[2]+",1), rgba(127,"+newRGB[1]+","+newRGB[2]+",1), rgba(255,"+newRGB[1]+","+newRGB[2]+",1));";
    document.getElementById("g").style = "background : linear-gradient(to right, rgba("+newRGB[0]+",0,"+newRGB[2]+",1), rgba("+newRGB[0]+",127,"+newRGB[2]+",1), rgba("+newRGB[0]+",255,"+newRGB[2]+",1));";
    document.getElementById("b").style = "background : linear-gradient(to right, rgba("+newRGB[0]+","+newRGB[1]+", 0, 1), rgba("+newRGB[0]+","+newRGB[1]+", 127 ,1), rgba("+newRGB[0]+","+newRGB[1]+", 255,1));";
}

//spécifique  (a cause des ID des taquets RGB et des classes des boutons) xx
document.getElementById('r').addEventListener('input',changeColor);
document.getElementById('g').addEventListener('input',changeColor);
document.getElementById('b').addEventListener('input',changeColor);

let allItems = document.getElementsByClassName('item');
let leftArrows = document.getElementsByClassName('changeLookleft');
let rightArrows = document.getElementsByClassName('changeLookRight');

//spécifique partout xx
let colorPick = function(){
    let newRGB = [
        listeRGB[document.getElementById('idTruc').value][0],
        listeRGB[document.getElementById('idTruc').value][1],
        listeRGB[document.getElementById('idTruc').value][2]
    ]
    document.getElementById('r').value=newRGB[0];
    document.getElementById('g').value=newRGB[1];
    document.getElementById('b').value=newRGB[2];
    document.getElementById("r").style = "background : linear-gradient(to right, rgba(0,"+newRGB[1]+","+newRGB[2]+",1), rgba(127,"+newRGB[1]+","+newRGB[2]+",1), rgba(255,"+newRGB[1]+","+newRGB[2]+",1));";
    document.getElementById("g").style = "background : linear-gradient(to right, rgba("+newRGB[0]+",0,"+newRGB[2]+",1), rgba("+newRGB[0]+",127,"+newRGB[2]+",1), rgba("+newRGB[0]+",255,"+newRGB[2]+",1));";
    document.getElementById("b").style = "background : linear-gradient(to right, rgba("+newRGB[0]+","+newRGB[1]+", 0, 1), rgba("+newRGB[0]+","+newRGB[1]+", 127 ,1), rgba("+newRGB[0]+","+newRGB[1]+", 255,1));";
}

//spécifique avec les id et les classes
for (let i=0 ; i<allItems.length ; i++){
    let item = allItems[i];
    item.addEventListener('click',function () {
        document.getElementById('idTruc').value = item.dataset.avatar;
        for(let i = 0; i < leftArrows.length; i++){
            leftArrows[i].classList.add("hide");
        }
        for(let i = 0; i < rightArrows.length; i++){
            rightArrows[i].classList.add("hide");
        }
        for(let i = 0; i < allItems.length; i++){
            allItems[i].classList.remove("itemSelected");
        }
        item.classList.add("itemSelected");
        leftArrows[item.dataset.avatar].classList.remove("hide");
        rightArrows[item.dataset.avatar].classList.remove("hide");
        colorPick();
    });
}

//spécifique avec les id et les classes
document.getElementById('up').addEventListener('click', function () {
    let toint = document.getElementById('idTruc').value;
    if (toint>0){
        document.getElementById('idTruc').value = parseInt(toint) - 1;

        for(let i = 0; i < allItems.length; i++){
            allItems[i].classList.remove("itemSelected");
            leftArrows[i].classList.add("hide");
            rightArrows[i].classList.add("hide");

        }
        allItems[toint-1].classList.add("itemSelected");
        leftArrows[toint-1].classList.remove("hide");
        rightArrows[toint-1].classList.remove("hide");
        
    }
   
    colorPick();

});

//spécifique avec les id et les classes
document.getElementById('dwn').addEventListener('click', function () {
    let toint = document.getElementById('idTruc').value;
    if (toint<6){
        document.getElementById('idTruc').value = parseInt(toint) + 1;
        for(let i = 0; i < leftArrows.length; i++){
            leftArrows[i].classList.add("hide");
        }
        for(let i = 0; i < rightArrows.length; i++){
            rightArrows[i].classList.add("hide");
        }
        for(let i = 0; i < allItems.length; i++){
            allItems[i].classList.remove("itemSelected");
        }
        allItems[parseInt(toint)+1].classList.add("itemSelected");
        leftArrows[parseInt(toint)+1].classList.remove("hide");
        rightArrows[parseInt(toint)+1].classList.remove("hide");
    }
    colorPick();
});

//spécifique avec les id et les classes et la route des fichiers image
for (let i=0 ; i<listeURL.length ; i++){
    document.getElementById("right"+i).addEventListener('click',function () {
        if(files[i]<nbImgByFile[i]){
            files[i]+=1;
        }
        else{
            files[i]=1;
        }
        listeURL[i] = "public/mayor/"+folders[i]+"/"+files[i]+".png";
        init()
    });
    document.getElementById("left"+i).addEventListener('click',function () {
        if(files[i]>1){
            files[i]-=1;
        }
        else{
            files[i]=nbImgByFile[i];
        }
        listeURL[i] = "public/mayor/"+folders[i]+"/"+files[i]+".png";
        init()
    });
}

//specifique xx
const init = async function(){
    listeImgVanilla = await AvatarTool.allUrlToCanvas(listeURL,canvas.width,canvas.height)
    listeImgColorised = AvatarTool.coloriseAllCanvas(listeImgVanilla, listeRGB)
    AvatarTool.mergeCanvas(canvas,listeImgColorised)
    colorPick();
}
init()