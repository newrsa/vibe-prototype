import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TitleBar } from './TitleBar'

// ============================================================
// AppLayout — 1440×900 fixed Figma canvas with JS auto-scaler
// pw:1 in sheet-data.json
// ============================================================
export function AppLayout() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function scaleDesign() {
      const baseWidth  = 1440
      const baseHeight = 900
      const scaleX = window.innerWidth  / baseWidth
      const scaleY = window.innerHeight / baseHeight
      const scale  = Math.min(scaleX, scaleY)

      // Expand the canvas size so that after scaling, it exactly fills the screen
      const dynamicWidth = window.innerWidth / scale
      const dynamicHeight = window.innerHeight / scale

      if (canvasRef.current) {
        canvasRef.current.style.width = `${dynamicWidth}px`
        canvasRef.current.style.height = `${dynamicHeight}px`
        canvasRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`
      }
    }
    window.addEventListener('resize', scaleDesign)
    scaleDesign()
    return () => window.removeEventListener('resize', scaleDesign)
  }, [])

  return (
    <div className="app-viewport">
      {/* pw:1 — 1440×900 canvas */}
      <div
        id="pw-1"
        ref={canvasRef}
        style={{
          position:        'absolute',
          left:            '50%',
          top:             '50%',
          width:           1440,
          height:          900,
          transformOrigin: 'center center',
          transform:       'translate(-50%, -50%) scale(1)',
          background:      '#000',
          borderRadius:    12,
          overflow:        'hidden',
        }}
      >
        {/* pw:2 — Sidebar */}
        <Sidebar />

        {/* pw:19 — Title Bar */}
        <TitleBar />

        {/* Main content area: right of sidebar, below title bar */}
        {/* x=115, y=67, w=1325, h=833 */}
        <div
          id="main-content"
          style={{
            position: 'absolute',
            left:     115,
            top:      67,
            width:    'calc(100% - 115px)',
            height:   'calc(100% - 67px)',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}
