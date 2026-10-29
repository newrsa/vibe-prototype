// TODO: Implement PathwayPage UI
export function PathwayPage() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0E0F13] flex flex-col">
      {/* Background Decorative Blur Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-start justify-start text-left w-full h-full pt-[149px] pl-[89px]">
        {/* Greeting */}
        <div className="text-[#9090b0] text-[28px] font-extrabold mb-[16px]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
          👋🏼 Hi Mohit,
        </div>

        {/* Sub-heading */}
        <p className="text-white text-[23px] font-light mb-[8px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Every meaningful achievement starts with a clear aspiration.
        </p>

        {/* Main Heading */}
        <h1 className="text-[33px] font-bold leading-[42px] mb-[32px] text-transparent bg-clip-text bg-gradient-to-r from-[#002AF4] via-[#02D9DD] to-[#5BA947] max-w-[748px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Start with your aspiration. We'll help you build the path to get there.
        </h1>

        {/* CTA Card (Create New Aspiration) */}
        <button className="flex flex-col items-center justify-center gap-4 bg-[#2944C5] hover:bg-[#2036a1] transition-colors duration-200 rounded-[8px] w-[307px] h-[172px] shadow-2xl hover:-translate-y-1 transform">
          <div className="w-[66px] h-[66px] bg-[#C2CCFC] rounded-[40px] flex items-center justify-center shadow-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span className="text-[#E6E6E6] text-[24px] font-medium tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Create New Aspiration
          </span>
        </button>
      </div>
    </div>
  )
}
