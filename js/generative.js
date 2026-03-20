// p5.js sketch: glyph made of white circles with hover repulsion

/** @typedef {{ base: p5.Vector, pos: p5.Vector, vel: p5.Vector }} Dot */

let glyph = "$0";
let dots = /** @type {Dot[]} */ ([]);

let rotateRad = -0.18;
let dotSpacing = 14;
let dotRadius = 5.0;
let glyphScale = 0.9;

let depthLayers = 3;
let depthOffset = { x: 2.0, y: 1.6 };

let hoverRadius = 90;
let repelStrength = 2.2;
let springK = 0.08;
let damping = 0.80;

let pg;


function calculateDotSize(containerWidth) {
    if (containerWidth < 360) {
        return 2.0;
    } else if (containerWidth < 400) {
        return 3.0;
    } else if (containerWidth < 800) {
        return 4.0;
    } else {
        return 5.0;
    }
}


function calculateSpacing(containerWidth) {
    if (containerWidth < 400) {
        return 6;
    } else if (containerWidth < 800) {
        return 12;
    } else {
        return 15;
    }
}

function createCanvasInDollarsContainer() {
    return function (p) {
        p.setup = function () {
            const container = document.querySelector('[data-js="dollars-container"]');

            // Устанавливаем размеры в зависимости от контейнера
            dotSpacing = calculateSpacing(container.clientWidth);
            dotRadius = calculateDotSize(container.clientWidth);

            const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
            canvas.parent(container);
            canvas.style('display', 'block');
            p.pixelDensity(1);

            p.clear();

            depthOffset = p.createVector(depthOffset.x, depthOffset.y);
            pg = p.createGraphics(container.clientWidth, container.clientHeight);
            pg.pixelDensity(1);
            pg.clear();

            generateDots.call(p);
        };

        p.windowResized = function () {
            const container = document.querySelector('[data-js="dollars-container"]');
            if (container.clientWidth > 0 && container.clientHeight > 0) {

                // Пересчитываем размеры кружков при изменении размера окна
                dotSpacing = calculateSpacing(container.clientWidth);
                dotRadius = calculateDotSize(container.clientWidth);

                p.resizeCanvas(container.clientWidth, container.clientHeight);
                pg = p.createGraphics(container.clientWidth, container.clientHeight);
                pg.pixelDensity(1);
                pg.clear();
                generateDots.call(p);
            }
        };

        p.draw = function () {
            p.clear();

            const center = p.createVector(p.width * 0.5, p.height * 0.5);
            const localMouse = screenToLocal.call(p,
                p.createVector(p.mouseX, p.mouseY),
                center,
                rotateRad
            );

            for (const d of dots) {
                const toDot = p5.Vector.sub(d.pos, localMouse);
                const dist = toDot.mag();
                if (dist > 0.0001 && dist < hoverRadius) {
                    const t = (hoverRadius - dist) / hoverRadius;
                    const push = toDot.copy().normalize().mult(t * t * repelStrength);
                    d.vel.add(push);
                }

                const spring = p5.Vector.sub(d.base, d.pos).mult(springK);
                d.vel.add(spring);
                d.vel.mult(damping);
                d.pos.add(d.vel);
            }

            p.push();
            p.translate(center.x, center.y);
            p.rotate(rotateRad);
            p.translate(-center.x, -center.y);

            for (let layer = depthLayers - 1; layer >= 0; layer--) {
                const ox = depthOffset.x * layer;
                const oy = depthOffset.y * layer;
                const alpha = p.map(layer, 0, depthLayers - 1, 220, 40);
                p.stroke(10, 10, 10, alpha);
                p.fill(255, 255, 255, 255);

                for (const d of dots) {
                    p.circle(d.pos.x + ox, d.pos.y + oy, dotRadius * 2);
                }
            }
            p.pop();
        };

        function generateDots() {
            dots = [];

            pg.clear();
            pg.fill(255);
            pg.noStroke();
            pg.textAlign(p.CENTER, p.CENTER);
            pg.textStyle(p.NORMAL);

            let ts = Math.min(p.width, p.height) * glyphScale;

            for (let i = 0; i < 5; i++) {
                pg.textSize(ts);
                const tw = Math.max(1, pg.textWidth(glyph));
                const th = Math.max(1, pg.textAscent() + pg.textDescent());
                const scale = Math.min((p.width * 0.8) / tw, (p.height * 0.8) / th);
                ts *= scale;
            }
            pg.textSize(ts);

            const cx = p.width * 0.5;
            const cy = p.height * 0.50;
            pg.text(glyph, cx, cy);
            pg.loadPixels();

            // Используем актуальный dotRadius, а не вычисляем из spacing
            // dotRadius уже установлен в setup или windowResized

            const stepX = dotSpacing;
            const stepY = dotSpacing * 0.86;
            const threshold = 10;

            let row = 0;
            for (let y = dotSpacing; y < p.height - dotSpacing; y += stepY) {
                const xOffset = (row % 2) * (stepX * 0.5);
                for (let x = dotSpacing + xOffset; x < p.width - dotSpacing; x += stepX) {
                    const xi = p.constrain(Math.floor(x), 0, p.width - 1);
                    const yi = p.constrain(Math.floor(y), 0, p.height - 1);
                    const idx = 4 * (xi + yi * p.width);
                    const brightness = pg.pixels[idx];
                    if (brightness > threshold) {
                        const base = p.createVector(x, y);
                        dots.push({
                            base,
                            pos: base.copy(),
                            vel: p.createVector(0, 0),
                        });
                    }
                }
                row++;
            }
        }

        function screenToLocal(p_local, center, rot) {
            const v = p5.Vector.sub(p_local, center);
            const c = Math.cos(-rot);
            const s = Math.sin(-rot);
            const x = v.x * c - v.y * s;
            const y = v.x * s + v.y * c;
            return p.createVector(x + center.x, y + center.y);
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    new p5(createCanvasInDollarsContainer());
});

function setGlyphSize(size) {
    glyphScale = size;
    if (pg && pg._p5Instance) {
        generateDots.call(pg._p5Instance);
    }
}