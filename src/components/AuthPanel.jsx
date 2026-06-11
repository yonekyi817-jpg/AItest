export default function AuthPanel({
  authMode,
  setAuthMode,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  handleLogin,
  registerName,
  setRegisterName,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  registerConfirm,
  setRegisterConfirm,
  handleRegister,
  message,
  setMessage,
}) {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <div className="site-wrap flex items-center justify-between px-6 py-4 sm:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-sky-700">Honey's Market</p>
            <h1 className="text-2xl font-semibold text-amber-950 sm:text-3xl">Login and register in style</h1>
          </div>
          <p className="hidden text-sm text-amber-700 sm:block">Secure access for admins and shoppers.</p>
        </div>
      </header>

      <main className="auth-main site-wrap">
        <section className="panel-card">
          <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs uppercase tracking-[0.24em] font-semibold text-amber-700">
            Welcome
          </span>
          <h1 className="panel-heading">
            Shop smarter with a secure login and multi-user checkout.
          </h1>
          <p className="panel-text">
            Register as a customer to buy products, or sign in as admin to manage the catalog. Only logged-in customers can add items to the cart and checkout.
          </p>
          <div className="cards-grid mt-10 text-sm text-amber-700">
            <div className="card-sample">
              <p className="font-semibold text-amber-900">Admin sample</p>
              <p>admin@store.com</p>
              <p>admin123</p>
            </div>
            <div className="card-sample">
              <p className="font-semibold text-amber-900">Customer sample</p>
              <p>user@store.com</p>
              <p>user123</p>
            </div>
          </div>
        </section>

        <section className="panel-card-secondary">
          <div className="panel-toggle">
            <button
              onClick={() => { setAuthMode('login'); setMessage('') }}
              className={`toggle-button ${authMode === 'login' ? 'active' : ''}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setMessage('') }}
              className={`toggle-button ${authMode === 'register' ? 'active' : ''}`}
            >
              Register
            </button>
          </div>

          <div className="mt-8 space-y-4">
            {authMode === 'login' ? (
              <>
                <label className="input-group">
                  Email
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="input-field"
                    placeholder="your email"
                  />
                </label>
                <label className="input-group">
                  Password
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="input-field"
                    placeholder="your password"
                  />
                </label>
                <button
                  onClick={handleLogin}
                  className="button-primary"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <label className="input-group">
                  Full name
                  <input
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </label>
                <label className="input-group">
                  Email
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="input-group">
                  Password
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="input-field"
                    placeholder="create a password"
                  />
                </label>
                <label className="input-group">
                  Confirm password
                  <input
                    type="password"
                    value={registerConfirm}
                    onChange={(e) => setRegisterConfirm(e.target.value)}
                    className="input-field"
                    placeholder="repeat password"
                  />
                </label>
                <button
                  onClick={handleRegister}
                  className="button-primary"
                >
                  Create account
                </button>
              </>
            )}

            {message && <p className="text-sm text-rose-600">{message}</p>}
          </div>
        </section>
      </main>
    </div>
  )
}
