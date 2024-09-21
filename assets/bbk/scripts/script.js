var ytLink = "https://www.youtube.com/channel/UC-KLEozPWQPxLn3aMmcTdEA";

document.addEventListener("keypress",
    function (e) {
        if (e.key == "b") {
            window.open(ytLink);
        }
    })

document.addEventListener('DOMContentLoaded', () => {
    logoBoucyThingy();
    particles();
})

let bbkLogoPos = [0, 0];

function logoBoucyThingy() {

    const logo = document.getElementById('theLogo');
    const container = document.querySelector('.logo');

    let posX = Math.random() * (window.innerWidth - 100);
    let posY = Math.random() * (window.innerHeight - 100);

    let speedX = 1;
    let speedY = 1;

    function animate() {
        posX += speedX;
        posY += speedY;

        bbkLogoPos = [posX + 75, posY + 30];

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
}

function particles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = 'rgba(255, 255, 255, 0.8)';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.05;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        getDistanceTo(x, y) {
            let dx = x - this.x;
            let dy = y - this.y;
            let dPos = Math.hypot(dx, dy);
            return dPos;
        }

        getDistanceToParticle(particle) {
            return this.getDistanceTo(particle.x, particle.y);
        }
    }

    function init() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 0.25;
        ctx.strokeStyle = 'rgba(255, 255, 255, 127)';
        ctx.stroke();
        ctx.closePath();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            
            particles.forEach((p) => {
                if (particle != p && particle.getDistanceToParticle(p) <= 100) {
                    drawLine(particle.x, particle.y, p.x, p.y);
                }
            });

            if (particle.getDistanceTo(bbkLogoPos[0], bbkLogoPos[1]) <= 150) {
                drawLine(particle.x, particle.y, bbkLogoPos[0], bbkLogoPos[1]);
            }

            particle.draw();
            if (particle.size <= 0.2) {
                particles.splice(index, 1);
                particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        });

        requestAnimationFrame(animate);
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (event) => {
        let dMX = event.clientX - mouseX;
        let dMY = event.clientY - mouseY;

        if (Math.hypot(dMX, dMY) != 0) {
            particles.forEach(p => {
                let distToMouse = p.getDistanceTo(mouseX, mouseY);

                p.x += dMX * Math.pow(distToMouse, -2.5) * 1000;
                p.y += dMY * Math.pow(distToMouse, -2.5) * 1000;
            });
        }

        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animate();
}

document.addEventListener('mousemove',(event) => {
    xOffset = (event.clientX / window.innerWidth - .5)* 10;
    yOffset = (event.clientY / window.innerHeight - .5) * 10;

    document.getElementById('bg-img').style.backgroundPosition = `${xOffset}px ${yOffset}px`;
});