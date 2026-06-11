export default function Navbar({ currentUser, onLogout }) {
  return (
    <header className="navbar sticky top-0 z-50 bg-sky-500 text-white shadow-lg shadow-sky-300/40">
      <div className="site-wrap flex flex-col gap-3 px-6 py-4 sm:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

        <div className="navbar-contact flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-sky-100">
          <span>Email: <a href="mailto:support@honeysmarket.com" className="contact-link">support@honeysmarket.com</a></span>
          <span>Phone: <a href="tel:+18001234567" className="contact-link">+1 (800) 123-4567</a></span>
          <span>Telegram: <a href="https://t.me/Mgwe_Drix" target="_blank" rel="noreferrer" className="contact-link">@Mgwe_Drix</a></span>
        </div>
      </div>
    </header>
  )
}
