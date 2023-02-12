function initColorBuffer(gl) {
    const colors = [
        0.9, 0.9, 0.3, 1.0,
        0.8, 0.3, 0.3, 1.0,
        0.2, 0.9, 0.3, 1.0,
        0.2, 0.2, 0.9, 1.0,
    ];

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    return colorBuffer;
}

// Buffer -------

function initBuffers(gl) {
    const positionBuffer = initPositionBuffer(gl);
    const colorBuffer = initColorBuffer(gl);
    return { 
        position: positionBuffer,
        color: colorBuffer,
    };
}

function initPositionBuffer(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [1.0, 1.0, -1, 1.0, 1.0, -1.0, -1.0, -1,0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
}

export { initBuffers };



