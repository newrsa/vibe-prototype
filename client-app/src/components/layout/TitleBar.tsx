// ============================================================
// TitleBar — pw:19
// Sheet: child of pw:1, references desgin-json/title-bar.json
// Title-bar.json: HORIZONTAL layout, width 1324px, height 67px
//   primaryAxisAlignItems: MAX (items pushed to right)
//   paddingLeft: 1034, paddingRight: 34, paddingTop: 13, paddingBottom: 14
//   itemSpacing: 17
// Position: left=115 (after sidebar), top=0
// Assets: Frame-9.svg, Frame-11.svg, Frame-2.svg
// ============================================================
import { ThemeToggle } from './ThemeToggle';

export function TitleBar() {
  return (
    <div
      id="pw-19"
      style={{
        position:       'absolute',
        left:           115,
        top:            0,
        width:          'calc(100% - 115px)',
        height:         67,
        display:        'flex',
        flexDirection:  'row',
        alignItems:     'center',
        justifyContent: 'flex-end',  // primaryAxisAlignItems: MAX
        paddingRight:   34,
        paddingTop:     13,
        paddingBottom:  14,
        gap:            17,          // itemSpacing from title-bar.json
        background:     '#1A1B20',   // dark bg (from Figma fill color)
        boxSizing:      'border-box',
      }}
    >
      {/* Theme Switcher Toggle */}
      <ThemeToggle />

      {/* Frame-2.svg — Notification Bell Icon */}
      <div
        style={{
          width: 36,
          height: 36,
          backgroundColor: '#2C2D35',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        <img
          id="pw-19-icon-2"
          src="/assets/RSA All Designs_icon/Frame-2.svg"
          alt="Notifications"
          style={{ width: 16, height: 16, display: 'block' }}
        />
      </div>
    </div>
  )
}
