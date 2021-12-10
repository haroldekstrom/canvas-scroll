import React, { useEffect, useState, useRef } from "react"
import { useMeasure } from "react-use"
import "./App.css"

function App() {
  const IMAGE_WIDTH = 1000
  const IMAGE_HEIGHT = 10000

  const refCanvas = useRef(null)
  const [refScroller, { width, height }] = useMeasure(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!refCanvas.current) {
      return
    }

    const canvas = refCanvas.current
    const ctx = canvas.getContext("2d")

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"
    ctx.scale(dpr, dpr)

    //ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "hsl(218,22%,27%)"
    ctx.moveTo(0 - origin.x, IMAGE_HEIGHT / 2 - origin.y)
    ctx.lineTo(IMAGE_WIDTH - origin.x, IMAGE_HEIGHT / 2 - origin.y)
    ctx.stroke()

    ctx.strokeStyle = "hsl(218,22%,27%)"
    ctx.moveTo(IMAGE_WIDTH / 2 - origin.x, 0 - origin.y)
    ctx.lineTo(IMAGE_WIDTH / 2 - origin.x, IMAGE_HEIGHT - origin.y)
    ctx.stroke()

    ctx.fillStyle = "hsl(148,64%,52%)"
    ctx.fillRect(10 - origin.x, 10 - origin.y, IMAGE_WIDTH / 2 - 40, 100)

    ctx.fillStyle = "hsl(212,66%,60%)"
    ctx.fillRect(IMAGE_WIDTH / 2 - 20 - origin.x, 10 - origin.y, 40, IMAGE_HEIGHT - 20)

    ctx.fillStyle = "hsl(354,70%,54%)"
    ctx.fillRect(
      IMAGE_WIDTH / 2 + 30 - origin.x,
      IMAGE_HEIGHT - 100 - 10 - origin.y,
      IMAGE_WIDTH / 2 - 20,
      100
    )
  }, [width, height, origin])

  const onScroll = event => {
    const { clientWidth, clientHeight, scrollWidth, scrollHeight, scrollLeft, scrollTop } =
      event.currentTarget
    setOrigin(() => {
      // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
      const x = Math.max(0, Math.min(scrollLeft, scrollWidth - clientWidth))

      // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
      const y = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight))

      return { x, y }
    })
  }

  return (
    <div className="App">
      <div
        className="canvas-scroller"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={refCanvas}
          style={{
            position: "absolute",
          }}
        />
        <div
          ref={refScroller}
          className="scroll-container"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={onScroll}
        >
          <div
            className="scroll-proxy"
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              minWidth: "100%",
              minHeight: "100%",
              overflow: "hidden",
              opacity: 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
