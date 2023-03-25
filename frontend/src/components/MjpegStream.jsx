import React, { useState, useEffect } from "react";

function MJPEGViewer() {

    return (
        <iframe
            src={'http://localhost:8080/bgr'}
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            width="1920"
            height="1080"
            >
        </iframe>
    );
}

export default MJPEGViewer;
