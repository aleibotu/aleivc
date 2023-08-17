'use client'
import {Radio} from "antd";
import {useLayoutEffect, useState} from "react"

export default function Page() {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas')
        const context = canvas.getContext('2d')
        context.strokeStyle = 'cyan'
        context.imageSmoothingEnabled = false

        const img = new Image()
        img.src = '/1.jpg'

        let isDragging = false
        let dragStartPosition = {x: 0, y: 0}
        let currentTransformedCursor

        img.onload = () => drawImageToCanvas()

        function drawImageToCanvas() {
            context.save()
            context.setTransform(1, 0, 0, 1, 0, 0)
            context.clearRect(0, 0, window.innerWidth, window.innerHeight)
            context.restore()

            context.drawImage(img, 10, 10)
        }

        function getTransformedPoint(x, y) {
            const originalPoint = new DOMPoint(x, y);
            return context.getTransform().invertSelf().transformPoint(originalPoint)
        }

        function onMouseDown(evt) {
            isDragging = true
            dragStartPosition = getTransformedPoint(evt.offsetX, evt.offsetY)
        }

        function onMouseMove(evt) {
            currentTransformedCursor = getTransformedPoint(evt.offsetX, evt.offsetY)
            const translatePos = {
                x: currentTransformedCursor.x - dragStartPosition.x,
                y: currentTransformedCursor.y - dragStartPosition.y
            }
            if (value === 2 && isDragging) {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight)
                drawImageToCanvas()
                context.strokeRect(dragStartPosition.x, dragStartPosition.y, translatePos.x, translatePos.y)
            }
            if (value !== 2 && isDragging) {
                context.translate(translatePos.x, translatePos.y)
                drawImageToCanvas()
            }
        }

        function onMouseUp() {
            isDragging = false
        }

        function onWheel(evt) {
            if (value === 2) return
            const zoom = evt.deltaY < 0 ? 1.1 : 0.9
            context.translate(currentTransformedCursor.x, currentTransformedCursor.y)
            context.scale(zoom, zoom)
            context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y)
            drawImageToCanvas()
            evt.preventDefault()
        }

        canvas.addEventListener('mousedown', onMouseDown)
        canvas.addEventListener('mousemove', onMouseMove)
        canvas.addEventListener('mouseup', onMouseUp)
        canvas.addEventListener('wheel', onWheel)

        return () => {
            canvas.removeEventListener('mousedown', onMouseDown)
            canvas.removeEventListener('mousemove', onMouseMove)
            canvas.removeEventListener('mouseup', onMouseUp)
            canvas.removeEventListener('wheel', onWheel)
        }
    }, [value])
    return (
        <>
            <div className="absolute top-16 left-0">
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>selection</Radio>
                    <Radio value={2}>rect</Radio>
                </Radio.Group>
            </div>
            <canvas
                id="canvas"
                className="w-full h-full bg-white"
                width={window.innerWidth}
                height={window.innerHeight - 64}
                style={{height: 'calc(100vh - 64px)'}}
            >
                please check your browser.
            </canvas>
        </>
    )
}