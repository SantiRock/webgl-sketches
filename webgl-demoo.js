import { initBuffers } from "./init-bufferss.js";
import { drawScene } from "./draw-scenee.js";

let cubeRotation = 0.0;
let deltaTime = 0;

main();

function main() {
    const canvas = document.querySelector("#glcanvas1");
    const gl = canvas.getContext("webgl");
  
    if (gl === null) {
        alert("WebGL is not available");
        return;
    }

    gl.clearColor(0.05, 0.05, 0.05, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main (void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
    }`;

    const fsSource = `
    varying lowp vec4 vColor;
    
    void main(void) {
        gl_FragColor = vColor;
    }`;
    
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        }, 
    };

    const buffers = initBuffers(gl);
 
    let then = 0;
    function render(now) {
        now *= 0.001;
        deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buffers, cubeRotation);
        cubeRotation += deltaTime;
        
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}


// Callbacks -------

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Pailader: unable to initialize the shader program");
        return null;
    }
    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('Error compiling the shaders');
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}
