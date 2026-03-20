document.addEventListener("DOMContentLoaded", () => {
    const containerOfCircles = document.querySelector('[data-js = "second-circle-container"]');
    console.log(document.querySelector('[data-js="second-circle-container"]').getBoundingClientRect().width)
    function fillContainer() {
        let mobileScreen = false
        if (window.innerWidth < 1024) {
            mobileScreen = true
        } else {
            mobileScreen = false
        }

        let factor = mobileScreen ? 20 : 40
        let sizeCircle = containerOfCircles.getBoundingClientRect().width / factor;
        const gap = 0;
        const step = sizeCircle + gap;
        const width = containerOfCircles.clientWidth;
        const height = containerOfCircles.clientHeight;

        const cols = Math.ceil(width / step);
        const rows = Math.ceil(height / step);

        containerOfCircles.style.gridTemplateColumns = `repeat(auto-fit, ${sizeCircle}px)`;
        containerOfCircles.style.gridAutoRows = `${sizeCircle}px`;
        containerOfCircles.style.gap = `${gap}px`

        containerOfCircles.innerHTML = "";
        const total = cols * rows;
        for (let i = 0; i < total; i++) {
            const circle = document.createElement("div");
            circle.classList.add("circle");
            containerOfCircles.appendChild(circle);
        }
    }
    const circlesSC = document.getElementsByClassName('circle')
    function paintCircle() {
        if (circlesSC === 0) return;
        const randomIndex = Math.floor(Math.random() * circlesSC.length);
        const randomCircle = circlesSC[randomIndex];
        randomCircle.style.backgroundColor = 'black';
    }
    window.addEventListener('resize', () => {
        fillContainer();
    })
    fillContainer();
    setInterval(paintCircle, 500);

    const thirdContainerOfCircles = document.querySelector('[data-js = "third-circle-container"]');
    const sizeTC = 85;
    const intensity = 0.3;

    function generateCircles() {
        const widthTC = thirdContainerOfCircles.clientWidth;
        const heightTC = thirdContainerOfCircles.clientHeight;

        const containerArea = widthTC * heightTC;
        const circleArea = Math.PI * (sizeTC / 2) ** 2;

        const countTC = Math.floor((containerArea / circleArea) * intensity);
        for (let i = 0; i < countTC; i++) {
            const circleTC = document.createElement("div");
            circleTC.classList.add("circle-ts");

            const x = Math.random() * widthTC;
            const y = Math.random() * heightTC;

            circleTC.style.left = `${x}px`
            circleTC.style.top = `${y}px`
            thirdContainerOfCircles.appendChild(circleTC);
        }
    }
    generateCircles();



    const barcode = document.querySelector('[data-js = "barcode-container"]');
    let barCount = 40;
    const minWidth = 0.5;
    let maxWidth = 3;
    if (window.innerWidth < 1024) {
        maxWidth = 3;

    }
    let minGap = 5;
    let maxGap = 40;

    const MainWidth = window.innerWidth;
    if (MainWidth < 1920) {
        barCount = barCount - Math.ceil((1920 - MainWidth) / 100);
    }
    if (MainWidth < 1000) {
        barCount = barCount - Math.ceil((1920 - MainWidth) / 1000);
        minGap = 1;
        maxGap = 10;
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateBars() {
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            updateBar(bar);

            barcode.appendChild(bar);
        }
    }
    function updateBar(bar) {
        const widthBar = random(minWidth, maxWidth);
        const gapBar = random(minGap, maxGap);

        bar.style.width = `${widthBar}%`
    }
    function randomUpdate() {
        const bars = document.querySelectorAll(".bar");
        bars.forEach(bar => {
            const shouldChange = Math.random() > 0.3;
            if (shouldChange) {
                updateBar(bar);
            }
        })
    }
    generateBars();

    setInterval(() => {
        randomUpdate();
    }, 700);



    const snowContainer = document.querySelector('[data-js = "fallen-snow"]');
    const wheels = document.querySelectorAll('[data-js = "wheel"]');
    let shiftPressed = false;
    let special = false;
    const counterText = document.querySelector('[data-js = "counter-pack"]');
    let counter = 0;
    const qrcodes = document.querySelectorAll('[data-js = "qrcode"]');
    const speedCounter = document.querySelector('[data-js="speed-counter"]');
    let counterSPEED = 0;
    let interval = null;
    document.addEventListener("keydown", (e) => {
        if (e.key === 'Control') {
            shiftPressed = true;
            clearInterval(interval);

            wheels.forEach(wheel => {
                wheel.classList.add("spin-left");
            });
            interval = setInterval(() => {
                counterSPEED++;
                speedCounter.textContent = counterSPEED;
            }, 50);
        }
    });
    document.addEventListener("keyup", (e) => {
        if (e.key === 'Control') {
            shiftPressed = false;
            clearInterval(interval);
            wheels.forEach(wheel => {
                wheel.classList.remove("spin-left");
            });
            interval = setInterval(() => {
                counterSPEED--;
                if (counterSPEED <= 0) {
                    counterSPEED = 0;
                    clearInterval(interval)
                }
                speedCounter.textContent = counterSPEED;
            }, 50);
        }
    });
    let currentQrIndex = 0;
    function createSnow() {
        const snow = document.createElement("img");
        const isSpecial = Math.random() < 0.2 && !special;
        if (isSpecial) {
            snow.src = "assets/photo/pack.svg";
            snow.className = "snow";
            snow.style.cursor = "pointer";

            snow.addEventListener("click", () => {
                snow.remove();
                special = false;
                counter += 1
                counterText.textContent = counter;
                if (currentQrIndex < qrcodes.length) {
                    qrcodes[currentQrIndex].hidden = false;
                    currentQrIndex++;
                }
                if (counter >= 6) {
                    special = true;
                    counterText.textContent = 6;
                }
            })
        }
        else {
            snow.src = "assets/photo/snowPic.svg";
            snow.className = "snow";
        }
        const snowContainerWidth = snowContainer.offsetWidth;
        const snowContainerHeight = snowContainer.offsetHeight;
        let xSNOW = Math.random() * snowContainerWidth;
        let ySNOW = -30;
        snow.style.left = `${xSNOW}px`
        snow.style.top = `${ySNOW}px`
        const rotate = Math.random() * 360;
        snow.style.transform = `rotate(${rotate}deg)`
        snowContainer.appendChild(snow);
        let speedSNOW = 2 + Math.random() * 3;

        function fall() {
            let vx = shiftPressed ? speedSNOW : 0;
            let vy = speedSNOW;
            xSNOW += vx;
            ySNOW += vy;
            snow.style.left = `${xSNOW}px`
            snow.style.top = `${ySNOW}px`
            if (ySNOW > snowContainerHeight || xSNOW > snowContainerWidth) {
                snow.remove();
                return;
            }
            requestAnimationFrame(fall);
        }
        requestAnimationFrame(fall);
    }
    setInterval(createSnow, 600);

    const canvas = document.querySelector('[data-js="canvas"]');
    let drawing = false;
    let currentBrush = "";
    const brushes = document.querySelectorAll('[data-js="brush"]');
    const popbar = document.querySelectorAll('[data-js="popbar"]');

    brushes.forEach(brush => {
        brush.addEventListener("click", () => {
            brushes.forEach(b => {
                b.parentElement.style.backgroundColor = "";
                b.parentElement.style.border = "";
                popbar.hidden = true;
            });
            const rectBrush = brush.getBoundingClientRect();
            popbar.style.left = rectBrush.right + 10 + "px";
            popbar.style.top = rectBrush.top + "px";
            currentBrush = brush.src;
            brush.parentElement.style.backgroundColor = "#FFEE5A";
            brush.parentElement.style.border = "3px solid black";
        });
    });
    canvas.addEventListener("mouseleave", () => {
        drawing = false;
    });
    canvas.addEventListener("mousedown", () => {
        drawing = true;
    });
    canvas.addEventListener("mouseup", () => {
        drawing = false;
    });
    let moveCounter = 0;
    canvas.addEventListener("mousemove", (e) => {
        if (!drawing || !currentBrush) {
            return
        };
        moveCounter++;
        if (moveCounter % 3 !== 0) {
            return
        };
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const img = document.createElement("img");
        img.src = currentBrush;
        img.className = "stamp";
        img.style.left = (x - 20) + "px";
        img.style.top = (y - 20) + "px";
        canvas.appendChild(img);
    });

    const buttonsCalc = document.querySelectorAll('.calculator-first');
    const buttonZeroCalc = document.querySelector('.zero');
    const buttonInfoCalc = document.querySelector('[data-js="calc-info"]');

    buttonsCalc.forEach(buttonCalc => {
        buttonCalc.addEventListener("mousedown", () => {
            buttonCalc.style.backgroundColor = 'black';
            buttonCalc.style.color = 'white';
            buttonCalc.style.borderColor = 'white';
        })
        buttonCalc.addEventListener("mouseup", () => {
            buttonCalc.style.backgroundColor = 'white';
            buttonCalc.style.color = 'black';
            buttonCalc.style.borderColor = 'black';
        })

    })

    buttonZeroCalc.addEventListener("mousedown", () => {
        buttonZeroCalc.style.backgroundColor = 'black';
        buttonZeroCalc.style.color = 'white';
        buttonZeroCalc.style.borderColor = 'white';
    })
    buttonZeroCalc.addEventListener("mouseup", () => {
        buttonZeroCalc.style.backgroundColor = 'white';
        buttonZeroCalc.style.color = 'black';
        buttonZeroCalc.style.borderColor = 'black';
    })

    buttonInfoCalc.addEventListener("mousedown", () => {
        buttonInfoCalc.style.backgroundColor = 'white';
        buttonInfoCalc.style.color = 'black';
        buttonInfoCalc.style.borderColor = 'black';
    })
    buttonInfoCalc.addEventListener("mouseup", () => {
        buttonInfoCalc.style.backgroundColor = 'black';
        buttonInfoCalc.style.color = 'white';
        buttonInfoCalc.style.borderColor = 'white';
    })

    const waveRight = document.querySelector('[data-js="wave-right"]');
    const waveLeft = document.querySelector('[data-js="wave-left"]');
    document.addEventListener("click", () => {
        waveLeft.classList.add("hide")
        waveRight.classList.add("hide")
        setInterval(() => {
            waveLeft.classList.remove("hide")
            waveRight.classList.remove("hide")
        }, 10000)
    })
});