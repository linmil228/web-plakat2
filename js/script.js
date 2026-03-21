document.addEventListener("DOMContentLoaded", () => {
    //кружки в 2 секции 1го экрана
    const containerOfCircles = document.querySelector('[data-js = "second-circle-container"]');
    let mouseInside = false;
    let intervalId = null;
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
            circle.addEventListener('mouseenter', function () {
                if (mouseInside) {
                    this.style.backgroundColor = 'black';
                }
            })
            containerOfCircles.appendChild(circle);
        }
    }

    function paintCircle() {
        const circlesSC = document.getElementsByClassName('circle')
        if (circlesSC === 0) return;
        const randomIndex = Math.floor(Math.random() * circlesSC.length);
        const randomCircle = circlesSC[randomIndex];
        randomCircle.style.backgroundColor = 'black';
    }
    function paintAllCircles(color) {
        const circlesSC = document.getElementsByClassName('circle');
        for (let i = 0; i < circlesSC.length; i++) {
            circlesSC[i].style.backgroundColor = color;
        }
    }
    function startPainting() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(paintCircle, 300);
    }
    function stopPainting() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    containerOfCircles.addEventListener('mouseenter', () => {
        mouseInside = true;
        stopPainting();
        paintAllCircles('#FFEE5A');
    })
    containerOfCircles.addEventListener('mouseleave', () => {
        mouseInside = false;
        paintAllCircles('');
        startPainting();
    });
    fillContainer();
    startPainting();
    window.addEventListener('resize', () => {
        const isMouseInside = mouseInside;
        if (isMouseInside) {
            mouseInside = false;
            stopPainting();
        }
        fillContainer();
        if (isMouseInside) {
            mouseInside = true;
            paintAllCircles('#FFEE5A');

        } else {
            startPainting();
        }
    })


    //кружки 3 секции 1го экрана
    const thirdContainerOfCircles = document.querySelector('[data-js = "third-circle-container"]');
    const sizeTC = 85;
    let intensity = 0.3;
    let mouseInsideThird = false;

    function generateCircles() {
        const widthTC = thirdContainerOfCircles.clientWidth;
        const heightTC = thirdContainerOfCircles.clientHeight;

        const containerArea = widthTC * heightTC;
        const circleArea = Math.PI * (sizeTC / 2) ** 2;
        if (heightTC<400){
            intensity = 2;
        }
        const countTC = Math.floor((containerArea / circleArea) * intensity);

        thirdContainerOfCircles.innerHTML = "";

        for (let i = 0; i < countTC; i++) {
            const circleTC = document.createElement("div");
            circleTC.classList.add("circle-ts");

            const x = Math.random() * widthTC;
            const y = Math.random() * heightTC;

            circleTC.style.left = `${x}px`;
            circleTC.style.top = `${y}px`;
            thirdContainerOfCircles.appendChild(circleTC);
        }
    }

    function createCircleAtMouse(x, y) {
        const circleTC = document.createElement("div");
        circleTC.classList.add("circle-ts");
        circleTC.style.left = `${x - sizeTC / 2}px`;
        circleTC.style.top = `${y - sizeTC / 2}px`;

        thirdContainerOfCircles.appendChild(circleTC);

    }

    thirdContainerOfCircles.addEventListener('mousemove', (e) => {
        if (!mouseInsideThird) return;

        const rect = thirdContainerOfCircles.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        createCircleAtMouse(mouseX, mouseY);
    });

    thirdContainerOfCircles.addEventListener('mouseenter', () => {
        mouseInsideThird = true;
    });

    thirdContainerOfCircles.addEventListener('mouseleave', () => {
        mouseInsideThird = false;
    });

    window.addEventListener('resize', () => {
        generateCircles();
    });

    generateCircles();


    //штрихкод-дождик
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


    //последний экран
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
    let modal = document.querySelector('[data-js="modal"]')
    let ok = document.querySelector('[data-js="ok-btn"]')
    modal.style.display = 'none';
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
                    modal.hidden = false;
                    modal.style.display = 'flex';
                    ok.addEventListener('click', () => {
                        modal.style.display = 'none';
                        modal.hidden = true;
                    })
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
        let speedSNOW = 2 + Math.random() * 2;

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
    setInterval(createSnow, 300);

    //рисовашка
    const canvas = document.querySelector('[data-js="canvas"]');
    let drawing = false;
    let currentBrush = "";
    let lastStampPoint = null;
    const brushes = document.querySelectorAll('[data-js="brush"]');
    const popbar = document.querySelector('[data-js="popbar"]');
    const stampSpacing = 36;
    const stampLifetime = 2400;

    function createStamp(clientX, clientY) {
        if (!currentBrush) {
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const img = document.createElement("img");
        img.src = currentBrush;
        img.className = "stamp";
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        canvas.appendChild(img);

        window.setTimeout(() => {
            img.remove();
        }, stampLifetime);
    }

    brushes.forEach(brush => {
        brush.addEventListener("click", () => {
            brushes.forEach(b => {
                b.parentElement.style.backgroundColor = "";
                b.parentElement.style.border = "";
            });
            popbar.hidden = false;
            popbar.textContent = brush.getAttribute('data-info');
            const rectBrush = brush;
            popbar.style.left = rectBrush.getBoundingClientRect().right + "px";
            // let diff = (popbar.getBoundingClientRect().bottom - rectBrush.getBoundingClientRect().bottom)
            popbar.style.top = rectBrush.getBoundingClientRect().top - document.querySelector('.third-screen').getBoundingClientRect().top + "px";
            // let diff = (popbar.getBoundingClientRect().bottom - rectBrush.getBoundingClientRect().bottom)
            popbar.style.top = popbar.getBoundingClientRect().top - diff + "px";
            currentBrush = brush.src;
            brush.parentElement.style.backgroundColor = "#FFEE5A";
            brush.parentElement.style.border = "3px solid black";
        });
    });
    canvas.addEventListener("pointerdown", (e) => {
        if (!currentBrush) {
            return;
        }

        drawing = true;
        lastStampPoint = { x: e.clientX, y: e.clientY };
        canvas.setPointerCapture(e.pointerId);
        createStamp(e.clientX, e.clientY);
    });
    canvas.addEventListener("pointermove", (e) => {
        if (!drawing || !currentBrush) {
            return;
        }

        if (!lastStampPoint) {
            lastStampPoint = { x: e.clientX, y: e.clientY };
            createStamp(e.clientX, e.clientY);
            return;
        }

        const deltaX = e.clientX - lastStampPoint.x;
        const deltaY = e.clientY - lastStampPoint.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance < stampSpacing) {
            return;
        }

        const steps = Math.floor(distance / stampSpacing);
        for (let i = 1; i <= steps; i++) {
            const progress = (i * stampSpacing) / distance;
            createStamp(
                lastStampPoint.x + deltaX * progress,
                lastStampPoint.y + deltaY * progress
            );
        }

        lastStampPoint = { x: e.clientX, y: e.clientY };
    });
    function stopDrawing(e) {
        drawing = false;
        lastStampPoint = null;

        if (e.pointerId !== undefined && canvas.hasPointerCapture(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId);
        }
    }
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointerleave", stopDrawing);
    canvas.addEventListener("pointercancel", stopDrawing);

    //калькулятор кнопки
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

    //волны первого экрана
    const waveRight = document.querySelector('[data-js="wave-right"]');
    const waveLeft = document.querySelector('[data-js="wave-left"]');
    let waves = [waveLeft, waveRight]
    let rightX = 0;
    let leftX = 0;
    let targetRightX = 0;
    let targetLeftX = 0;
    let animationId = null;
    function animate() {
        rightX += (targetRightX - rightX) * 0.1;
        leftX += (targetLeftX - leftX) * 0.1;
        if (waveRight) {
            waveRight.style.transform = `translateX(${rightX}px)`;
        }
        if (waveLeft) {
            waveLeft.style.transform = `translateX(${leftX}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }
    waves.forEach((wave) => {
        let originalPosition = wave.getBoundingClientRect().left;
        wave.addEventListener("pointerdown", () => {
            wave.classList.add("active");
            setTimeout(() => {
                wave.classList.remove("active");
            }, 10000)
        });
    })
    //кнопки первого экрана
    const mainButtons = document.querySelectorAll('[data-js="numberMainScreen"]');
    mainButtons.forEach(mainButton => {
        mainButton.addEventListener("mousedown", () => {
            mainButton.style.backgroundColor = 'white';
        })
        mainButton.addEventListener("mouseup", () => {
            mainButton.style.backgroundColor = '#FFEE5A';
        })
        let ifClick = false;
        let originalText = mainButton.textContent;
        mainButton.addEventListener("click", () => {
            if (ifClick) {
                mainButton.textContent = originalText;
                ifClick = false;
            } else {
                mainButton.textContent = "!";
                ifClick = true;
            }
        })
    })
});