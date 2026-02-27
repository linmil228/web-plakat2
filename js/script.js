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
});