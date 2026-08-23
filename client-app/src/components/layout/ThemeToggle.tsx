import { useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      onClick={() => setIsDark(!isDark)}
      style={{
        position: 'relative',
        width: 68,
        height: 29,
        borderRadius: 59,
        backgroundColor: '#1A1B20',
        border: '1px solid #404249',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* The sliding ball */}
      <div
        style={{
          position: 'absolute',
          left: isDark ? 39 : 2, // 2px from left, or 39px from left
          top: 1, 
          width: 25,
          height: 25,
          borderRadius: '50%',
          backgroundColor: '#3355F6',
          transition: 'left 0.3s ease',
        }}
      />
      
      {/* Moon Icon (Left) */}
      <div style={{ position: 'absolute', left: 2, width: 25, height: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <img src={`${import.meta.env.BASE_URL}assets/RSA All Designs_icon/Frame-11.svg`} alt="Moon" style={{ width: 14, height: 14 }} />
      </div>

      {/* Sun Icon (Right) */}
      <div style={{ position: 'absolute', right: 2, width: 25, height: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <img src={`${import.meta.env.BASE_URL}assets/RSA All Designs_icon/Frame-9.svg`} alt="Sun" style={{ width: 16, height: 16 }} />
      </div>
    </div>
  );
}
