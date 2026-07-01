const photo =
document.getElementById("photo");

let dragging = false;

let startX = 0;

let startY = 0;

let photoX = 0;

let photoY = 0;

photo.addEventListener(
"pointerdown",
startDrag
);

function startDrag(e){

    dragging = true;

    startX = e.clientX;

    startY = e.clientY;

}

document.addEventListener(
"pointermove",
movePhoto
);

function movePhoto(e){

    if(!dragging) return;

    const dx = e.clientX - startX;

    const dy = e.clientY - startY;

    photo.style.left =
        photoX + dx + "px";

    photo.style.top =
        photoY + dy + "px";

}

document.addEventListener(
"pointerup",
stopDrag
);

function stopDrag(){

    if(!dragging) return;

    dragging = false;

    photoX = parseFloat(photo.style.left);

    photoY = parseFloat(photo.style.top);

}

let scale = 1;

photo.addEventListener(
"wheel",
(e)=>{

e.preventDefault();

if(e.deltaY < 0){

scale += 0.1;

}else{

scale -= 0.1;

}

if(scale < 0.3){

scale = 0.3;

}

photo.style.transform =
`scale(${scale})`;

});


