import React, { useEffect, useState, useRef } from "react"
import { useMeasure } from "react-use"
import "./App.css"

const dpr = window.devicePixelRatio || 1
const pxAlign = dpr - Math.floor(dpr) === 0 ? 0.5 : 0
const pxRound = (px: number) => Math.floor(px) + pxAlign
const IMAGE_WIDTH = 1000
const IMAGE_HEIGHT = 10000
const arrowHeadLen = 7
const arrowNotchLen = 5
const arrowHeadAngle = (30 * Math.PI) / 180
const arrowHeadHypLen = Math.abs(arrowHeadLen / Math.cos(arrowHeadAngle))

function App() {
  const refCanvas = useRef(null)
  const [refScroller, { width, height }] = useMeasure(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!refCanvas.current) {
      return
    }

    const canvas = refCanvas.current
    const ctx = canvas.getContext("2d")

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"
    ctx.scale(dpr, dpr)
    ctx.translate(-origin.x, -origin.y)

    const arrow1 = (x1, y1, x2, y2, color) => {
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = 1 / dpr
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      const lineAngle = Math.PI + Math.atan2(y2 - y1, x2 - x1)
      const angle1 = lineAngle + arrowHeadAngle
      const angle2 = lineAngle - arrowHeadAngle

      // Alternative approach: create a Path2D from an SVG path and transform.
      ctx.beginPath()
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2 + Math.cos(angle1) * arrowHeadHypLen, y2 + Math.sin(angle1) * arrowHeadHypLen)
      ctx.lineTo(x2 + Math.cos(angle2) * arrowHeadHypLen, y2 + Math.sin(angle2) * arrowHeadHypLen)
      ctx.closePath()
      ctx.fill()
    }

    const arrow2 = (x1, y1, x2, y2, color) => {
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = 1 / dpr
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      const lineAngle = Math.PI + Math.atan2(y2 - y1, x2 - x1)
      const angle1 = lineAngle + arrowHeadAngle
      const angle2 = lineAngle - arrowHeadAngle

      ctx.beginPath()
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2 + Math.cos(angle1) * arrowHeadHypLen, y2 + Math.sin(angle1) * arrowHeadHypLen)
      ctx.lineTo(x2 + Math.cos(lineAngle) * arrowNotchLen, y2 + Math.sin(lineAngle) * arrowNotchLen)
      ctx.lineTo(x2 + Math.cos(angle2) * arrowHeadHypLen, y2 + Math.sin(angle2) * arrowHeadHypLen)
      ctx.closePath()
      ctx.fill()
    }

    const arrowHeadPath = new Path2D("M -7 -4 L 0 0 L -7 4 L -5 0 z")
    const arrow3 = (x1, y1, x2, y2, color) => {
      ctx.save()
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = 1 / dpr
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.translate(x2, y2)
      ctx.rotate(Math.atan2(y2 - y1, x2 - x1))
      ctx.fill(arrowHeadPath)
      ctx.restore()
    }

    ctx.lineWidth = 1 / dpr

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "hsl(218,22%,27%)"
    ctx.beginPath()
    ctx.moveTo(0, pxRound(IMAGE_HEIGHT / 2))
    ctx.lineTo(IMAGE_WIDTH, pxRound(IMAGE_HEIGHT / 2))
    ctx.stroke()

    ctx.strokeStyle = "hsl(218,22%,27%)"
    ctx.beginPath()
    ctx.moveTo(pxRound(IMAGE_WIDTH / 2), 0)
    ctx.lineTo(pxRound(IMAGE_WIDTH / 2), IMAGE_HEIGHT)
    ctx.stroke()

    ctx.fillStyle = "hsl(148,64%,52%)"
    ctx.fillRect(10, 10, IMAGE_WIDTH / 2 - 40, 100)

    ctx.fillStyle = "hsl(212,66%,60%)"
    ctx.fillRect(IMAGE_WIDTH / 2 - 20, 10, 40, IMAGE_HEIGHT - 20)

    ctx.fillStyle = "hsl(354,70%,54%)"
    ctx.fillRect(IMAGE_WIDTH / 2 + 30, IMAGE_HEIGHT - 100 - 10, IMAGE_WIDTH / 2 - 20, 100)

    arrow1(10, pxRound(140), 200, pxRound(140), "darkRed")
    arrow2(10, pxRound(150), 200, pxRound(150), "darkGreen")
    arrow3(10, pxRound(160), 200, pxRound(160), "purple")

    ctx.strokeStyle = "hsl(218,22%,88%)"
    ctx.beginPath()
    ctx.moveTo(20, pxRound(200))
    ctx.lineTo(400, pxRound(200))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(20, pxRound(300))
    ctx.lineTo(400, pxRound(300))
    ctx.stroke()

    const reps = 1
    let t1 = performance.now()
    for (let i = 0; i < reps; i++) {
      arrow1(pxRound(50), pxRound(200), pxRound(50), pxRound(300), "darkRed")
      arrow1(pxRound(100), pxRound(300), pxRound(80), pxRound(200), "darkRed")
      arrow1(pxRound(110), 300, pxRound(90), 200, "darkRed")
      arrow1(120, 300, 100, 200, "darkRed")
    }
    let t2 = performance.now()
    console.log(`arrow1: ${t2 - t1} ms`)

    t1 = performance.now()
    for (let i = 0; i < reps; i++) {
      arrow2(pxRound(200), pxRound(300), pxRound(120), pxRound(200), "darkGreen")
      arrow2(pxRound(210), pxRound(300), pxRound(190), pxRound(200), "darkGreen")
      arrow2(pxRound(220), 300, pxRound(200), 200, "darkGreen")
      arrow2(230, 300, 210, 200, "darkGreen")
    }
    t2 = performance.now()
    console.log(`arrow2: ${t2 - t1} ms`)

    t1 = performance.now()
    for (let i = 0; i < reps; i++) {
      arrow3(pxRound(260), pxRound(200), pxRound(250), pxRound(300), "purple")
      arrow3(pxRound(270), 200, pxRound(260), 300, "purple")
      arrow3(280, 200, 270, 300, "purple")
      arrow3(pxRound(360), pxRound(200), pxRound(280), pxRound(300), "purple")
    }
    t2 = performance.now()
    console.log(`arrow3: ${t2 - t1} ms`)
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
