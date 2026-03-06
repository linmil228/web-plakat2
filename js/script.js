document.addEventListener("DOMContentLoaded", () => {
    const containerOfCircles = document.querySelector('[data-js = "second-circle-container"]');
    const sizeCircle = 37;
    const gap = 2;
    const step = sizeCircle + gap;
    function fillContainer(){
        const width = containerOfCircles.clientWidth;
        const height = containerOfCircles.clientHeight;

        const cols = Math.ceil(width/step);
        const rows = Math.ceil(height/step);

        containerOfCircles.style.gridTemplateColumns = `repeat(${cols}, ${sizeCircle}px)`;
        containerOfCircles.style.gridAutoRows = `${sizeCircle}px`;
        containerOfCircles.style.gap = `${gap}px`

        containerOfCircles.innerHTML = "";
        const total = cols * rows;
        for (let i = 0; i<total; i++){
            const circle = document.createElement("div");
            circle.classList.add("circle");
            containerOfCircles.appendChild(circle);
        }
    }
    const circlesSC = document.getElementsByClassName('circle')
    function paintCircle(){
        if(circlesSC === 0) return;
        const randomIndex = Math.floor(Math.random()*circlesSC.length);
        const randomCircle = circlesSC[randomIndex];
        randomCircle.style.backgroundColor = 'black';
    }
    fillContainer();
    setInterval(paintCircle,500);

    const thirdContainerOfCircles = document.querySelector('[data-js = "third-circle-container"]');
    const sizeTC = 85;
    const intensity = 0.3;

    function generateCircles(){
        const widthTC = thirdContainerOfCircles.clientWidth;
        const heightTC = thirdContainerOfCircles.clientHeight;

        const containerArea = widthTC * heightTC;
        const circleArea = Math.PI * (sizeTC/2)**2;

        const countTC = Math.floor((containerArea/circleArea)*intensity);
        for (let i=0; i<countTC; i++){
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

    const fourthContainerOfCircles = document.querySelector('[data-js = "fourth-circle-container"]');
    const sizeFC = 13;
    const stepFC = 38;

    function generateSmallCircles(){
        const widthFC = fourthContainerOfCircles.clientWidth;
        const heightFC = fourthContainerOfCircles.clientHeight;

        const chessRows = Math.ceil(heightFC/stepFC);
        const chessCols = Math.ceil(widthFC/stepFC);

        for (let row = 0; row<chessRows; row++){
            for (let col=0; col<chessCols;col++){
                const circleFC = document.createElement("div");
                circleFC.classList.add("small-circle");
                const offsetX = (row%2===0) ? 0 : stepFC / 2;
                const x = col*stepFC+offsetX;
                const y = row*step;
                circleFC.style.left = `${x-sizeFC/2}px`
                circleFC.style.top = `${y-sizeFC/2}px`
                fourthContainerOfCircles.appendChild(circleFC);
            }
        }
    }
    generateSmallCircles();

    const barcode = document.querySelector('[data-js = "barcode-container"]');   
    const barCount = 40;
    const minWidth = 3;
    const maxWidth = 130; 
    const minGap = 5;
    const maxGap = 40;

    function random(min, max){
        return Math.floor(Math.random()*(max-min+1))+min;
    }

    function generateBars(){
        for(let i = 0; i<barCount;i++){
            const bar = document.createElement("div");
            bar.classList.add("bar");
            updateBar(bar);

            barcode.appendChild(bar);
        }
    }
    function updateBar(bar){
        const widthBar = random(minWidth,maxWidth);
        const gapBar = random(minGap, maxGap);

        bar.style.width = `${widthBar}px`
        bar.style.marginRight = `${gapBar}px`
    }
    function randomUpdate(){
        const bars = document.querySelectorAll(".bar");
        bars.forEach(bar =>{
            const shouldChange = Math.random()>0.3;
            if (shouldChange){
                updateBar(bar);
            }
        })
    }
    generateBars();
    
    setInterval(() => {
        randomUpdate();
    }, 700);

    const ContainerOfCircles = document.querySelector('[data-js = "numbers-container"]');
    const sizeNC = 9;
    const stepNC = 25;

    function generateSmallCirclesNC(){
        const widthNC = ContainerOfCircles.clientWidth;
        const heightNC = ContainerOfCircles.clientHeight;

        const chessRowsNC = Math.ceil(heightNC/stepNC);
        const chessColsNC = Math.ceil(widthNC/stepNC);

        for (let rowNC = 0; rowNC<chessRowsNC; rowNC++){
            for (let colNC=0; colNC<chessColsNC;colNC++){
                const circleNC = document.createElement("div");
                circleNC.classList.add("small-circle-NC");
                const offsetXNC = (rowNC%2===0) ? 0 : stepNC / 2;
                const xNC = colNC*stepNC+offsetXNC;
                const yNC = rowNC*stepNC;
                circleNC.style.left = `${xNC-sizeNC/2}px`
                circleNC.style.top = `${yNC-sizeNC/2}px`
                ContainerOfCircles.appendChild(circleNC);
            }
        }
    }
    generateSmallCirclesNC();

    const snowContainer = document.querySelector('[data-js = "fallen-snow"]');
    const wheels = document.querySelectorAll('[data-js = "wheel"]');
    let shiftPressed = false;
    document.addEventListener("keydown", (e) => {
        if(e.key === 'Control'){
            shiftPressed = true;

            wheels.forEach(wheel => {
                wheel.classList.add("spin-left");
            });
        }
    });
    document.addEventListener("keyup", (e) => {
        if(e.key === 'Control'){
            shiftPressed = false;

            wheels.forEach(wheel => {
                wheel.classList.remove("spin-left");
            });
        }
    });
    function createSnow() {
        const snow = document.createElement("img");
        snow.src="assets/photo/snowPic.svg";
        snow.className = "snow";
        const snowContainerWidth = snowContainer.offsetWidth;
        const snowContainerHeight = snowContainer.offsetHeight;
        let xSNOW = Math.random()* snowContainerWidth;
        let ySNOW = -30;
        snow.style.left = `${xSNOW}px`
        snow.style.top = `${ySNOW}px`
        const rotate = Math.random()*360;
        snow.style.transform = `rotate(${rotate}deg)`
        snowContainer.appendChild(snow);
        let speedSNOW = 2 + Math.random()*2;
        // let angle = shiftPressed ? -45 : 90;
        // let vx = Math.cos(angle*Math.PI/180)*speedSNOW;
        // let vy = Math.sin(angle*Math.PI/180)*speedSNOW;

        function fall(){
            let vx = shiftPressed ? speedSNOW : 0;
            let vy = speedSNOW;
            xSNOW+=vx;
            ySNOW+=vy;
            snow.style.left = `${xSNOW}px`
            snow.style.top = `${ySNOW}px`
            if (ySNOW > snowContainerHeight || xSNOW>snowContainerWidth){
                snow.remove();
                return;
            }
            requestAnimationFrame(fall);
        }
        requestAnimationFrame(fall);
    }
    setInterval(createSnow, 300);
});