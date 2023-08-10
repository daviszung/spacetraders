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

            context.strokeStyle = 'blue'
            context.lineWidth = 5;
            context.strokeRect(0, 0, canvasWidth, canvasHeight)

            context.fillStyle = 'green';
            context.fillRect(0, 200, 300, 300);
            context.fillStyle = 'purple'
            context.fillRect(800, 200, 300, 300);

            
        }

        function renderViewport() {
            context.fillStyle = 'black';
            context.fillRect(0, 0, viewportWidth, viewportHeight);

            // Save the current state before rendering the viewport
            context.save();

            // Translate the canvas to the viewport position
            context.translate(-viewportX, -viewportY);

            // Draw the map in the translated canvas space
            drawMap();

            // Restore the original state
            context.restore();
        }
        


        // function renderViewport() {
        //     context.clearRect(0, 0, viewportWidth, viewportHeight);

        //     context.fillStyle = 'black'
        //     context.fillRect(0, 0, viewportWidth, viewportHeight);
        //     context.drawImage(canvas,
        //         viewportX, viewportY, viewportWidth, viewportHeight,
        //         0, 0, viewportWidth, viewportHeight);
        // };

        function handleMouseDown(e: MouseEvent) {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }

        function handleMouseUp() {
            isDragging = false;
        }

        function handleMouseMove(e: MouseEvent) {
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
        renderViewport();

        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mouseup', handleMouseUp)
        canvas.addEventListener('mousemove', handleMouseMove)

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mouseup', handleMouseUp)
            canvas.removeEventListener('mousemove', handleMouseMove)
        }
    }, []);


    return (
        <div>
            <canvas className="cursor-grab" ref={canvasRef} width={2000} height={2000}></canvas>

        </div>
    );
};
