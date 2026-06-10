import { useMemo, useState } from 'react'

const initialProducts = [
  { id: 1, name: 'Smart Watch', price: 79, stock: 12, description: 'Track activity and health with a sharp modern display.' },
  { id: 2, name: 'Wireless Earbuds', price: 59, stock: 20, description: 'Comfortable fit with crystal-clear sound and long battery life.' },
  { id: 3, name: 'Laptop Sleeve', price: 24, stock: 18, description: 'Protect your device with a durable, slim sleeve.' },
]

const users = [
  { email: 'admin@store.com', password: 'admin123', role: 'admin', name: 'Store Admin' },
  { email: 'user@store.com', password: 'user123', role: 'customer', name: 'Jane Buyer' },
]

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState([])
  const [message, setMessage] = useState('')
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', description: '' })

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cart]
  )

  const handleLogin = () => {
    const found = users.find((user) => user.email === loginEmail && user.password === loginPassword)
    if (!found) {
      setMessage('Invalid email or password.')
      return
    }
    setCurrentUser(found)
    setMessage('')
    setLoginEmail('')
    setLoginPassword('')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCart([])
    setMessage('')
  }

  const handleAddToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
    setMessage(`Added ${product.name} to cart.`)
  }

  const handleRemoveFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId))
  }

  const handleCheckout = () => {
    if (!cart.length) {
      setMessage('Your cart is empty.')
      return
    }
    setMessage(`Order placed! Total: $${cartTotal.toFixed(2)}.`)
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id)
        if (!cartItem) return product
        return { ...product, stock: product.stock - cartItem.quantity }
      })
    )
    setCart([])
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      setMessage('Complete all product fields.')
      return
    }
    setProducts((current) => [
      ...current,
      {
        id: Date.now(),
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        description: newProduct.description || 'No description provided.',
      },
    ])
    setNewProduct({ name: '', price: '', stock: '', description: '' })
    setMessage('Product added successfully.')
  }

  const handleUpdateStock = (id, stock) => {
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, stock: Number(stock) } : product))
    )
    setMessage('Product stock updated.')
  }

  const handleDeleteProduct = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id))
    setMessage('Product removed.')
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-amber-50 text-amber-950 px-6 py-10 sm:px-10 lg:px-20">
        <div className="max-w-xl mx-auto rounded-3xl border border-amber-200 bg-white p-10 shadow-xl shadow-amber-200/40">
          <h1 className="text-3xl font-semibold text-amber-950">Store Login</h1>
          <p className="mt-4 text-amber-700">Login as admin or customer to manage products or shop online.</p>

          <div className="mt-8 space-y-4">
            <label className="block text-sm text-amber-600">
              Email
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 outline-none focus:border-amber-500"
                placeholder="admin@store.com or user@store.com"
              />
            </label>
            <label className="block text-sm text-amber-600">
              Password
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 outline-none focus:border-amber-500"
                placeholder="admin123 or user123"
              />
            </label>
            <button
              onClick={handleLogin}
              className="w-full rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400"
            >
              Login
            </button>
            <div className="rounded-2xl bg-amber-100 p-4 text-sm text-amber-700 border border-amber-200">
              <p>Admin: <span className="font-semibold">admin@store.com</span> / admin123</p>
              <p>User: <span className="font-semibold">user@store.com</span> / user123</p>
            </div>
            {message && <p className="text-sm text-rose-600">{message}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50 text-amber-950 px-6 py-8 sm:px-10 lg:px-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="uppercase tracking-[0.4em] text-sm text-amber-600">E-Commerce Store</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Welcome, {currentUser.name}</h1>
          <p className="mt-2 text-amber-700">Role: {currentUser.role}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {currentUser.role === 'customer' && (
            <div className="rounded-3xl bg-white px-5 py-3 text-sm text-amber-950 border border-amber-200">
              Cart: {cart.length} item{cart.length !== 1 ? 's' : ''}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-300"
          >
            Logout
          </button>
        </div>
      </div>

      {message && <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-100 px-5 py-4 text-amber-950">{message}</div>}

      {currentUser.role === 'admin' ? (
        <AdminDashboard
          products={products}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          onAddProduct={handleAddProduct}
          onUpdateStock={handleUpdateStock}
          onDeleteProduct={handleDeleteProduct}
        />
      ) : (
        <CustomerShop
          products={products}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={handleCheckout}
          cartTotal={cartTotal}
        />
      )}
    </div>
  )
}

function AdminDashboard({ products, newProduct, setNewProduct, onAddProduct, onUpdateStock, onDeleteProduct }) {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-amber-200 bg-white p-8 shadow-xl shadow-amber-200/40">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <p className="mt-3 text-amber-700">Add new products or update stock levels in the store inventory.</p>

        <div className="mt-8 space-y-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-1 text-amber-700">${product.price} • Stock: {product.stock}</p>
                  <p className="mt-2 text-amber-600">{product.description}</p>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <label className="text-sm text-amber-600">
                    Stock
                    <input
                      type="number"
                      value={product.stock}
                      min="0"
                      onChange={(e) => onUpdateStock(product.id, e.target.value)}
                      className="mt-2 w-full max-w-[120px] rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950 outline-none"
                    />
                  </label>
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-white p-8 shadow-xl shadow-amber-200/40">
        <h2 className="text-2xl font-semibold">Add Product</h2>
        <div className="mt-6 space-y-4">
          <label className="block text-sm text-amber-600">
            Name
            <input
              value={newProduct.name}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 outline-none"
              placeholder="Product name"
            />
          </label>
          <label className="block text-sm text-amber-600">
            Price
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 outline-none"
              placeholder="USD"
            />
          </label>
          <label className="block text-sm text-amber-600">
            Stock
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 outline-none"
              placeholder="Quantity"
            />
          </label>
          <label className="block text-sm text-amber-600">
            Description
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 outline-none"
              rows="4"
            />
          </label>
          <button
            onClick={onAddProduct}
            className="w-full rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400"
          >
            Add Product
          </button>
        </div>
      </section>
    </div>
  )
}

function CustomerShop({ products, cart, onAddToCart, onRemoveFromCart, onCheckout, cartTotal }) {
  return (
    <div className="mt-10 grid gap-8 xl:grid-cols-[1.5fr_0.85fr]">
      <section className="rounded-3xl border border-amber-200 bg-white p-8 shadow-xl shadow-amber-200/40">
        <h2 className="text-2xl font-semibold">Shop Products</h2>
        <p className="mt-3 text-amber-700">Browse available items and add them to your cart.</p>

        <div className="mt-8 space-y-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:flex sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-amber-700">{product.description}</p>
                <p className="mt-3 text-amber-600">Price: ${product.price} • Stock: {product.stock}</p>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock <= 0}
                className="mt-4 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <aside className="rounded-3xl border border-amber-200 bg-white p-8 shadow-xl shadow-amber-200/40">
        <h2 className="text-2xl font-semibold">Shopping Cart</h2>
        {cart.length ? (
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="mt-1 text-amber-700">Qty: {item.quantity} × ${item.price}</p>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="rounded-3xl bg-amber-50 p-4 text-amber-950">
              <p className="text-sm text-amber-700">Total</p>
              <p className="mt-1 text-2xl font-semibold">${cartTotal.toFixed(2)}</p>
            </div>
            <button
              onClick={onCheckout}
              className="w-full rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400"
            >
              Checkout
            </button>
          </div>
        ) : (
          <p className="mt-6 text-amber-700">Your cart is empty. Add a product to start shopping.</p>
        )}
      </aside>
    </div>
  )
}

export default App
