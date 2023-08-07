import { useEffect, useState, useRef } from "react";


export function NavigationDashboard() {
    const [systems, setSystems] = useState();

    const canvasRef = useRef(null);

    useEffect(() => {
        fetch("/navigation/systems", {
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => setSystems(res as any))
            .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const viewportWidth = 1000;
        const viewportHeight = 1000;

        let viewportX = 0;
        let viewportY = 0;

        let isDragging = false;
        let lastMouseX: number;
        let lastMouseY: number;

        function drawMap() {
            console.log("Drawing map");
            context.fillStyle = 'green';
            context.fillRect(0, 200, 300, 300);
            context.fillStyle = 'purple'
            context.fillRect(800, 200, 300, 300);
        }


        context.fillStyle = 'black'
        context.fillRect(0, 0, 2000, 2000);

        function renderViewport() {
            // context.clearRect(0, 0, canvasWidth, canvasHeight);

            context.drawImage(canvas,
                viewportX, viewportY, viewportWidth, viewportHeight,
                0, 0, viewportWidth, viewportHeight);
        };

        function handleMouseDown(e: MouseEvent) {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }

        function handleMouseUp() {
            isDragging = false;
        }

        function handleMouseMove(e: MouseEvent) {
            console.log("HANDLE MOUSE MOVE", e);
            if (isDragging) {
                const deltaX = e.clientX - lastMouseX;
                const deltaY = e.clientY - lastMouseY;

                // Update the viewport position based on the drag amount
                viewportX -= deltaX;
                viewportY -= deltaY;

                // Constrain the viewport to stay within the canvas boundaries
                viewportX = Math.max(Math.min(viewportX, canvasWidth - viewportWidth), 0);
                viewportY = Math.max(Math.min(viewportY, canvasHeight - viewportHeight), 0);

                lastMouseX = e.clientX;
                lastMouseY = e.clientY;

                renderViewport();
            }
        }

        drawMap();

        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mouseup', handleMouseUp)
        canvas.addEventListener('mousemove', handleMouseMove)

    }, []);


    return (
        <div>
            <canvas className="cursor-grab" ref={canvasRef} width={3000} height={3000}></canvas>

        </div>
    );
};
