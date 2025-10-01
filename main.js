function setlaptopPhoto(){
    document.getElementById("hero-img").src= "assets/laptop.svg";
    setTimeout(setcrossarmsPhoto, 4000);
}

function setcrossarmsPhoto(){
    document.getElementById("hero-img").src= "assets/crossarms.svg";
     setTimeout(setsmilePhoto, 4000);
}

function setsmilePhoto(){
    document.getElementById("hero-img").src= "assets/smile.svg";
    setTimeout(setlaptopPhoto, 4000);
}
