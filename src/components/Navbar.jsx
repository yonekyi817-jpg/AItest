export default function Navbar({ currentUser, onLogout }) {
  return (
    <header className="navbar sticky top-0 z-50 bg-sky-500 text-white shadow-lg shadow-sky-300/40">
      <div className="site-wrap flex items-center justify-between px-6 py-4 sm:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.36em] text-sky-100">Honey's Market</p>
          <h2 className="text-lg font-semibold text-white">Your friendly marketplace</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-sky-900">{currentUser.name}</span>
          <button
            onClick={onLogout}
            className="button-primary px-4 py-2 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
