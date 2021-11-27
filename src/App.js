import React, { useEffect, useState, useRef } from "react"
import "./App.css"

function App() {
  const WIDTH = 400
  const HEIGHT = 200

  const IMAGE_WIDTH = 1000
  const IMAGE_HEIGHT = 10000

  const pixelRatio = window.devicePixelRatio || 1

  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  const refCanvas = useRef(null)

  useEffect(() => {
    if (!refCanvas.current) {
      return
    }

    const ctx = refCanvas.current.getContext("2d")

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = "green"
    ctx.fillRect(10 - origin.x, 10 - origin.y, 150, 100)
  }, [origin])

  const onScroll = event => {
    const { clientWidth, clientHeight, scrollWidth, scrollHeight, scrollLeft, scrollTop } =
      event.currentTarget
    setOrigin(prevState => {
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
        }}
      >
        <canvas
          ref={refCanvas}
          width={WIDTH * pixelRatio}
          height={HEIGHT * pixelRatio}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          className="scroll-container"
          style={{
            width: WIDTH,
            height: HEIGHT,
            position: "relative",
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
