var ytLink = "https://www.youtube.com/channel/UC-KLEozPWQPxLn3aMmcTdEA";

document.addEventListener("keypress", 
function(e) {
    if(e.key == "b") {
           window.open(ytLink);
       }
})

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('theLogo');
    const container = document.querySelector('.logo');

    let posX = Math.random() * (window.innerWidth - 100);
    let posY = Math.random() * (window.innerHeight - 100);
    let speedX = 2;
    let speedY = 2;

    function animate() {
        posX += speedX;
        posY += speedY;

        const logoW = logo.clientWidth;
        const logoH = logo.clientHeight;

        if (posX + logoW - 80 >= window.innerWidth || posX - 60 <= 0) {
            speedX = -speedX;
        }

        if (posY + logoH - 25 >= window.innerHeight || posY + 25 <= 0) {
            speedY = -speedY;
        }

        logo.style.left = posX + 'px';
        logo.style.top = posY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
});
