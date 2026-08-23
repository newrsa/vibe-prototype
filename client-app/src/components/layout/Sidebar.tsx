import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/utils/constants'

// ============================================================
// Nav tabs — mapped from sheet-data.json pw:5–pw:14
// Icon assets from public/assets/RSA All Designs_icon/
// ============================================================
const NAV_TABS = [
  {
    id: 'pw-5',
    path: ROUTES.PATHWAY,
    tooltip: 'Pathway',
    // pw:10 — pathway_icon
    icon: `${import.meta.env.BASE_URL}assets/RSA All Designs_icon/Frame-10.svg`,
  },
  {
    id: 'pw-6',
    path: ROUTES.BLUEBOOK,
    tooltip: 'Bluebook',
    // pw:11 — bluebook_icon
    icon: `${import.meta.env.BASE_URL}assets/RSA All Designs_icon/Blue-book.svg`,
  },
  {
    id: 'pw-7',
    path: ROUTES.NETWORK,
    tooltip: 'Network',
    // pw:12 — network_icon
    icon: `${import.meta.env.BASE_URL}assets/RSA All Designs_icon/Frame-6.svg`,
  },
  {
    id: 'pw-8',
    path: ROUTES.MY_PROFILE,
    tooltip: 'My Profile',
    // pw:13 — my_profile_icon
    icon: `${import.meta.env.BASE_URL}assets/RSA All Designs_icon/Frame-8.svg`,
  },
  {
    id: 'pw-9',
    path: ROUTES.SCHEDULE,
    tooltip: 'Schedule',
    // pw:14 — Schedule_icon
    icon: `${import.meta.env.BASE_URL}assets/RSA All Designs_icon/Frame-7.svg`,
  },
]

// ============================================================
// Sidebar — pw:2
// Sheet: width 115px, height 900px, background #000
//        position 0,0 inside pw:1 canvas
// ============================================================
export function Sidebar() {
  return (
    <div
      id="pw-2"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 115,
        height: '100%',
        background: '#000',
        overflow: 'hidden',   // pw:2 prompt: no scrollbar
      }}
    >
      {/* ── pw:3 Brand Logo ──────────────────────────────
          position: 16,22  |  size: 51×48
          src: assets/RSA All Designs_img/Full R White on Black 1.png
      ────────────────────────────────────────────────── */}
      <img
        id="pw-3"
        src={`${import.meta.env.BASE_URL}assets/RSA All Designs_img/Full R White on Black 1.png`}
        alt="Brand Logo"
        style={{
          position: 'absolute',
          left: 16,
          top: 22,
          width: 51,
          height: 48,
        }}
      />

      {/* ── pw:4 Tab Icon Parent ─────────────────────────
          Flex column, gap 12px, vertically centered
          Sheet position: 24,326 (tabs start here)
          pw:5–pw:9 are children (flex items)
      ────────────────────────────────────────────────── */}
      <div
        id="pw-4"
        style={{
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)', // Set vertically center
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        {NAV_TABS.map(({ id, path, tooltip, icon }) => (
          <NavLink
            key={path}
            to={path}
            title={tooltip}
            style={{ textDecoration: 'none' }}
          >
            {({ isActive }) => (
              // pw:5–pw:9 icon tab divs
              // Active: background #3355F6  (pw:5 default active per sheet)
              <div
                id={id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '16px',
                  borderRadius: 4,
                  background: isActive ? '#3355F6' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  // icon itself inside the tab
                }}
              >
                {/* pw:10–pw:14 icon images */}
                <img
                  src={icon}
                  alt={tooltip}
                  style={{ width: 20, height: 20, display: 'block' }}
                />
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* ── pw:15 User Profile Parent ────────────────────
          position: 44,765
          border-radius: 4px  |  background: #1F3394
          display: flex, justify-content: center, align-items: center
      ────────────────────────────────────────────────── */}
      <div
        id="pw-15"
        style={{
          position: 'absolute',
          left: 44,
          bottom: 103, // anchored to bottom instead of top: 765
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          borderRadius: 4,
          background: '#1F3394',
        }}
      >
        {/* ── pw:16 User Image ──
            size: 32×32  |  border-radius: 4px
            src: assets/RSA All Designs_img/avatar-image.png
        ────────────────────────────────────────── */}
        <img
          id="pw-16"
          src={`${import.meta.env.BASE_URL}assets/RSA All Designs_img/avatar-image.png`}
          alt="User Profile"
          style={{
            width: 32,
            height: 32,
            borderRadius: 4,
            aspectRatio: '1/1',
            display: 'block',
          }}
        />
      </div>

      {/* ── pw:17 Settings Icon Parent ───────────────────
          position: 44,813
          display flex, width 32, height 33
          padding: 10px 8px  |  background: #1F3394
      ────────────────────────────────────────────────── */}
      <div
        id="pw-17"
        style={{
          position: 'absolute',
          left: 44,
          bottom: 54, // anchored to bottom instead of top: 813
          display: 'flex',
          width: 32,
          height: 33,
          padding: '10px 8px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          borderRadius: 4,
          background: '#1F3394',
        }}
      >
        {/* ── pw:18 Settings Icon ──
            size: 14.458×15.003
            src: assets/RSA All Designs_icon/Vector-1.svg
        ────────────────────────────────────────── */}
        <img
          id="pw-18"
          src={`${import.meta.env.BASE_URL}assets/RSA All Designs_icon/Vector-1.svg`}
          alt="Settings"
          style={{
            width: 14.458,
            height: 15.003,
            flexShrink: 0,
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}
