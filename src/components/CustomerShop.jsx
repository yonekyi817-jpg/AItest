export default function CustomerShop({ products, cart, onAddToCart, onRemoveFromCart, onCheckout, cartTotal }) {
  return (
    <div className="section-grid mt-10">
      <section className="panel-card">
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-2xl font-semibold">Shop Products</h2>
            <p className="mt-3 text-amber-700">Browse curated items and add them to your cart.</p>
          </div>
        </div>

        <div className="shop-grid mt-8">
          {products.map((product) => (
            <article key={product.id} className="product-card product-card-shop">
              <img
                src={product.image || 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=400&q=80'}
                alt={product.name}
                className="product-image"
              />
              <div className="product-card-inner">
                <div className="product-header">
                  <div>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-meta">{product.description}</p>
                  </div>
                  <span className="product-badge">${product.price}</span>
                </div>

                <div className="product-meta-row">
                  <span>Stock: {product.stock}</span>
                  <span className="text-sky-700 font-semibold">{product.stock > 0 ? 'Available' : 'Sold Out'}</span>
                </div>

                <div className="product-actions">
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="button-primary px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="cart-panel">
        <h2 className="text-2xl font-semibold">Shopping Cart</h2>
        {cart.length ? (
          <div className="mt-6 cart-grid">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="mt-1 text-amber-700">Qty: {item.quantity} × ${item.price}</p>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="button-danger px-4 py-2 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <p className="text-sm text-amber-700">Total</p>
              <p className="mt-1 text-2xl font-semibold">${cartTotal.toFixed(2)}</p>
            </div>
            <button
              onClick={onCheckout}
              className="button-primary"
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
