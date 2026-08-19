# Responsive Design Rule for Figma Conversions

When converting fixed-size Figma designs (typically 1440x900) to HTML/CSS, you must ensure that the output is responsive, maintains its original 1:1 aspect ratio scaling, BUT expands to fill 100vw and 100vh without leaving any letterbox margins (black space) on the sides or top/bottom.

Because Figma data usually provides absolute coordinates (`left`, `top`, `width`, `height` in pixels), standard responsive CSS can be difficult to map directly.

## The Dynamic Auto-Scaler Solution (Margin-Free)

Instead of hardcoding `1440px` and `900px` and accepting margins on different aspect ratio screens (like 16:9), we scale the canvas proportionally (`scale = Math.min(scaleX, scaleY)`) but ALSO expand the canvas's explicit dimensions to perfectly fill the screen (`100vw / scale` and `100vh / scale`). 

### Implementation Guide

1. **The Wrapper (Viewport)**
   Create a full-screen wrapper that hides overflow and centers the content.
   ```css
   body, html {
     margin: 0;
     padding: 0;
     width: 100vw;
     height: 100vh;
     overflow: hidden;
     background-color: #000;
   }
   .app-viewport {
     position: relative;
     width: 100vw;
     height: 100vh;
     overflow: hidden;
   }
   ```

2. **The JavaScript Auto-Scaler (AppLayout)**
   Add this script to calculate the scale factor AND expand the canvas size dynamically.
   ```javascript
   function scaleDesign() {
     const baseWidth = 1440;
     const baseHeight = 900;
     
     // 1. Calculate how much we need to scale to fit the base design
     const scaleX = window.innerWidth / baseWidth;
     const scaleY = window.innerHeight / baseHeight;
     
     // 2. Use Math.min to ensure the base 1440x900 is never cropped
     const scale = Math.min(scaleX, scaleY);
     
     // 3. Expand the canvas size so that after scaling, it exactly fills the screen
     const dynamicWidth = window.innerWidth / scale;
     const dynamicHeight = window.innerHeight / scale;

     if (canvasRef.current) {
       // Set dynamic dimensions to fill empty margin space
       canvasRef.current.style.width = `${dynamicWidth}px`;
       canvasRef.current.style.height = `${dynamicHeight}px`;
       
       // Center and scale it back
       canvasRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
     }
   }
   ```

3. **Adapting Child Components (Relative Width/Height)**
   Since the canvas width and height are now dynamic (larger than 1440x900), absolute positioning must adapt:
   - **Full height Sidebars**: Use `height: '100%'` instead of fixed `900px`.
   - **Right-aligned Elements (TitleBar, Content Areas)**: Use percentages, e.g., `width: 'calc(100% - 115px)'` instead of fixed widths like `1325px`.
   - **Bottom-aligned Elements**: If placing icons at the bottom of the sidebar, use `bottom: [X]px` instead of `top: [Y]px` so they stick to the bottom when the height expands.
   - **Vertically Centered Elements**: Use `top: '50%', transform: 'translateY(-50%)'` instead of fixed `top` pixel values.

## Why this works
- All structural elements (like sidebar width `115px`) still use exact `px` values from Figma.
- The scaling ensures everything shrinks or grows proportionally (maintaining 1:1 ratio).
- The dynamic canvas dimensions (`100vw / scale`) allow fluid components (using `100%` or `calc`) to stretch horizontally and vertically, completely eliminating letterbox margins on all monitors.
