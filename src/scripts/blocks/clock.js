class Clock {
    constructor() {
        this.clock = document.querySelector('.clock');
        this.hourArrow = this.clock.querySelector('.clock__hour-arrow');
        this.minuteArrow = this.clock.querySelector('.clock__minute-arrow');
        this.secondsArrow = this.clock.querySelector('.clock__second-arrow');
        this.digitsContainer = this.clock.querySelector('.clock__digits');
        this.animateArrows = this.animateArrows.bind(this);
        this.animate = this.animate.bind(this);
        this.setDigitSize = this.setDigitSize.bind(this);

        window.requestAnimationFrame(this.animateArrows);
        this.setDigitSize();
    }

    setDigitSize() {
        const containerHeight = this.digitsContainer.getBoundingClientRect().height;
        const fontSize = Math.round(containerHeight*0.09);
        this.digitsContainer.style.fontSize = `${fontSize}px`;
    }

    animate() {
        const date = new Date;
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        hours = hours % 12;
        hours = hours ? hours : 12;
        const hourDegrees = 30 * hours;
        const minuteDegrees = 6 * minutes;
        const secondsDegrees = 6 * seconds;

        this.hourArrow.style.transform = `translateX(-50%) translateY(-50%) rotateZ(${hourDegrees}deg)`;
        this.minuteArrow.style.transform = `translateX(-50%) translateY(-50%) rotateZ(${minuteDegrees}deg)`;
        this.secondsArrow.style.transform = `translateX(-50%) translateY(-50%) rotateZ(${secondsDegrees}deg)`;
    }


    animateArrows() {
        const timestamp = Date.now();
        if (this.timestamp === timestamp) {
            return window.requestAnimationFrame(this.animateArrows);
        }
        this.animate();
        this.timestamp = timestamp;
        return window.requestAnimationFrame(this.animateArrows);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new Clock();
});
