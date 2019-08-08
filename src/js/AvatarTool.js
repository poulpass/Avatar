let AvatarTool = {
    //generique xx
    urlToImg : function(url){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.addEventListener('load', e => resolve(img));
            img.addEventListener('error', () => {
                reject(new Error(`Failed to load image's URL: ${url}`));
            });
            img.src = url;
        });
    },
    //generique xx
    allUrlToImg : function(allUrl){
        let allImg = [];
        for(let i = 0; i < allUrl.length; i++){
            allImg.push(AvatarTool.urlToImg(allUrl[i]));
        }
        return allImg;
    },
    // Même chose qu'au dessus (allUrlToImg) avec le .map  xx
    allUrlToImgMapVersion : function(allUrl){
        return allUrl.map(AvatarTool.urlToImg);
    },

    //Générique xx
    imgToCanvas : function(img,width,height){
        let theCanvas = document.createElement("canvas");
        let ctx = theCanvas.getContext("2d");
        theCanvas.width  = width;
        theCanvas.height = height;
        ctx.drawImage(img, 0, 0);
        return theCanvas;
    },
    //generique xx
    allImgToCanvas : function(allImg,width,height){
        return allImg.map(img => AvatarTool.imgToCanvas(img,width,height));
    },
    //generique xx
    allUrlToCanvas : async function(allUrl,width,height){
        let allImg = await Promise.all(AvatarTool.allUrlToImg(allUrl))
        return AvatarTool.allImgToCanvas(allImg,width,height);
    },
    //generique xx
    coloriseCanvas : function(canvas, rgb){
        let colorisedCanvas = document.createElement("canvas");
        colorisedCanvas.width  = canvas.width;
        colorisedCanvas.height = canvas.height;
        let ctx = colorisedCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0); //copy of vanilla canvas into colorized canvas
        
        let newRed = rgb[0];
        let newGreen = rgb[1];
        let newBlue = rgb[2];

        var imageData = ctx.getImageData(0, 0, colorisedCanvas.width, colorisedCanvas.height);

        // examine every pixel, 
        // change any old rgb to the new-rgb
        for (var i=0;i<imageData.data.length;i+=4)
        {
            // is this pixel the old rgb?
            if(imageData.data[i]==255 &&
                imageData.data[i+1]==255 &&
                imageData.data[i+2]==255
            ){
                // change to your new rgb
                imageData.data[i]=newRed;
                imageData.data[i+1]=newGreen;
                imageData.data[i+2]=newBlue;
            }
        }
        // put the altered data back on the canvas  
        ctx.putImageData(imageData,0,0);
        return colorisedCanvas;
    },
    //generique xx
    coloriseAllCanvas : function(allCanvas, listeRGB){
        return allCanvas.map(function(canvas, i){
            return AvatarTool.coloriseCanvas(canvas, listeRGB[i]);
        });
    },
    //generique xx
    mergeCanvas : function(mainCanvas,listeImgColorised){
        ctx = mainCanvas.getContext("2d");
        ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        for(i = 0; i < listeImgColorised.length; i++){
            ctx.drawImage(listeImgColorised[i], 0, 0);
        }
    }
}

module.exports = AvatarTool