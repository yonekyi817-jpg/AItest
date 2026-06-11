import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import AuthPanel from './components/AuthPanel'
import AdminDashboard from './components/AdminDashboard'
import CustomerShop from './components/CustomerShop'
import PurchaseHistory from './components/PurchaseHistory'
import ContactPage from './components/ContactPage'
import './components/AppStyles.css'

const initialProducts = [
  {
    id: 1,
    name: 'Smart Watch',
    price: 79,
    stock: 12,
    description: 'Track activity and health with a sharp modern display.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: 59,
    stock: 20,
    description: 'Comfortable fit with crystal-clear sound and long battery life.',
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    name: 'Laptop Sleeve',
    price: 24,
    stock: 18,
    description: 'Protect your device with a durable, slim sleeve.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80',
  },
]

const initialUsers = [
  { email: 'admin@store.com', password: 'admin123', role: 'admin', name: 'Store Admin' },
  { email: 'user@store.com', password: 'user123', role: 'customer', name: 'Jane Buyer' },
]

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('storeCurrentUser')
    return saved ? JSON.parse(saved) : null
  })
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('storeProducts')
    return saved ? JSON.parse(saved) : initialProducts
  })
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('storeUsers')
    return saved ? JSON.parse(saved) : initialUsers
  })
  const [cart, setCart] = useState([])
  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('storeOrderHistory')
    return saved ? JSON.parse(saved) : {}
  })
  const [customerView, setCustomerView] = useState('shop')
  const [searchQuery, setSearchQuery] = useState('')
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('storeComments')
    return saved ? JSON.parse(saved) : []
  })
  const [commentText, setCommentText] = useState('')
  const [message, setMessage] = useState('')
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', description: '', image: '' })
  const [editingProductId, setEditingProductId] = useState(null)
  const [authMode, setAuthMode] = useState('login')
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirm, setRegisterConfirm] = useState('')

  useEffect(() => {
    localStorage.setItem('storeProducts', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('storeUsers', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('storeCurrentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('storeCurrentUser')
    }
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem('storeOrderHistory', JSON.stringify(orderHistory))
  }, [orderHistory])

  useEffect(() => {
    localStorage.setItem('storeComments', JSON.stringify(comments))
  }, [comments])

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cart]
  )

  const visibleProducts = products.filter((product) => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return true
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  })

  const handleLogin = () => {
    const found = users.find(
      (user) => user.email.toLowerCase() === loginEmail.trim().toLowerCase() && user.password === loginPassword
    )
    if (!found) {
      setMessage('Invalid email or password.')
      return
    }
    setCurrentUser(found)
    setMessage('')
    setLoginEmail('')
    setLoginPassword('')
  }

  const handleRegister = () => {
    if (!registerName || !registerEmail || !registerPassword || !registerConfirm) {
      setMessage('Please fill every registration field.')
      return
    }
    if (registerPassword !== registerConfirm) {
      setMessage('Passwords do not match.')
      return
    }
    if (users.some((user) => user.email.toLowerCase() === registerEmail.trim().toLowerCase())) {
      setMessage('That email is already registered.')
      return
    }

    const newUser = {
      email: registerEmail.trim(),
      password: registerPassword,
      role: 'customer',
      name: registerName.trim(),
    }

    setUsers((current) => [...current, newUser])
    setMessage('Account created. Please sign in.')
    setAuthMode('login')
    setRegisterName('')
    setRegisterEmail('')
    setRegisterPassword('')
    setRegisterConfirm('')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCart([])
    setCustomerView('shop')
    setSearchQuery('')
    setCommentText('')
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
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleImageFileChange = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setNewProduct((prev) => ({ ...prev, image: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleCheckout = () => {
    if (!cart.length) {
      setMessage('Your cart is empty.')
      return
    }

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cartTotal,
    }

    setOrderHistory((currentHistory) => {
      const userOrders = currentHistory[currentUser.email] || []
      return {
        ...currentHistory,
        [currentUser.email]: [order, ...userOrders],
      }
    })

    setMessage(`Order placed! Total: $${cartTotal.toFixed(2)}. Your purchase now appears in order history.`)
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id)
        if (!cartItem) return product
        return { ...product, stock: product.stock - cartItem.quantity }
      })
    )
    setCart([])
  }

  const handleAddComment = () => {
    const trimmed = commentText.trim()
    if (!trimmed) {
      setMessage('Please enter a comment before submitting.')
      return
    }

    const newComment = {
      id: Date.now(),
      user: currentUser.name,
      text: trimmed,
      date: new Date().toISOString(),
    }

    setComments((current) => [newComment, ...current])
    setCommentText('')
    setMessage('Comment posted successfully.')
  }

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      setMessage('Complete all product fields.')
      return
    }

    if (editingProductId) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProductId
            ? {
                ...product,
                name: newProduct.name,
                price: Number(newProduct.price),
                stock: Number(newProduct.stock),
                description: newProduct.description || 'No description provided.',
                image: newProduct.image || product.image,
              }
            : product
        )
      )
      setMessage('Product updated successfully.')
      setEditingProductId(null)
    } else {
      setProducts((current) => [
        ...current,
        {
          id: Date.now(),
          name: newProduct.name,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
          description: newProduct.description || 'No description provided.',
          image: newProduct.image || 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=700&q=80',
        },
      ])
      setMessage('Product added successfully.')
    }

    setNewProduct({ name: '', price: '', stock: '', description: '', image: '' })
  }

  const handleUpdateStock = (id, stock) => {
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, stock: Number(stock) } : product))
    )
    setMessage('Product stock updated.')
  }

  const handleDeleteProduct = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id))
    if (editingProductId === id) {
      setEditingProductId(null)
      setNewProduct({ name: '', price: '', stock: '', description: '', image: '' })
    }
    setMessage('Product removed.')
  }

  const handleEditProduct = (product) => {
    setEditingProductId(product.id)
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,
    })
    setMessage('Editing product details. Update the form and save.')
  }

  const handleCancelEdit = () => {
    setEditingProductId(null)
    setNewProduct({ name: '', price: '', stock: '', description: '', image: '' })
    setMessage('Edit cancelled.')
  }

  if (!currentUser) {
    return (
      <AuthPanel
        authMode={authMode}
        setAuthMode={setAuthMode}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        handleLogin={handleLogin}
        registerName={registerName}
        setRegisterName={setRegisterName}
        registerEmail={registerEmail}
        setRegisterEmail={setRegisterEmail}
        registerPassword={registerPassword}
        setRegisterPassword={setRegisterPassword}
        registerConfirm={registerConfirm}
        setRegisterConfirm={setRegisterConfirm}
        handleRegister={handleRegister}
        message={message}
        setMessage={setMessage}
      />
    )
  }

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <div className="app-shell site-wrap">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="uppercase tracking-[0.4em] text-sm text-amber-600">E-Commerce Store</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Welcome, {currentUser.name}</h1>
            <p className="mt-2 text-amber-700">Role: {currentUser.role}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {currentUser.role === 'customer' && (
              <>
                <button
                  onClick={() => setCustomerView('shop')}
                  className={`button-secondary ${customerView === 'shop' ? 'active' : ''}`}
                >
                  Shop
                </button>
                <button
                  onClick={() => setCustomerView('history')}
                  className={`button-secondary ${customerView === 'history' ? 'active' : ''}`}
                >
                  Purchase History
                </button>
                <button
                  onClick={() => setCustomerView('contact')}
                  className={`button-secondary ${customerView === 'contact' ? 'active' : ''}`}
                >
                  Contact
                </button>
                <div className="rounded-3xl bg-white px-5 py-3 text-sm text-amber-950 border border-amber-200">
                  Cart: {cart.length} item{cart.length !== 1 ? 's' : ''}
                </div>
              </>
            )}
            <button
              onClick={handleLogout}
              className="button-secondary"
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
          editingProductId={editingProductId}
          onImageFileChange={handleImageFileChange}
          onSaveProduct={handleSaveProduct}
          onEditProduct={handleEditProduct}
          onCancelEdit={handleCancelEdit}
          onUpdateStock={handleUpdateStock}
          onDeleteProduct={handleDeleteProduct}
          comments={comments}
        />
      ) : customerView === 'history' ? (
        <PurchaseHistory
          orders={orderHistory[currentUser.email] || []}
        />
      ) : customerView === 'contact' ? (
        <ContactPage
          comments={comments}
          commentText={commentText}
          onCommentChange={setCommentText}
          onAddComment={handleAddComment}
        />
      ) : (
        <CustomerShop
          products={visibleProducts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={handleCheckout}
          cartTotal={cartTotal}
        />
      )}
    </div>
    </>
  )
}


export default App
