import CustomerShop from './CustomerShop'
import PurchaseHistory from './PurchaseHistory'
import ContactPage from './ContactPage'

export default function CustomerPanel({
  currentUser,
  customerView,
  setCustomerView,
  searchQuery,
  onSearchChange,
  visibleProducts,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
  cartTotal,
  orders,
  comments,
  commentText,
  onCommentChange,
  onAddComment,
  onDeleteComment,
  commentEditId,
  onEditComment,
}) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="uppercase tracking-[0.4em] text-sm text-amber-600">E-Commerce Store</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Welcome, {currentUser.name}</h1>
          <p className="mt-2 text-amber-700">Role: {currentUser.role}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {customerView === 'history' ? (
        <PurchaseHistory orders={orders} />
      ) : customerView === 'contact' ? (
        <ContactPage
          comments={comments}
          commentText={commentText}
          onCommentChange={onCommentChange}
          onAddComment={onAddComment}
          currentUser={currentUser}
          onDeleteComment={onDeleteComment}
          commentEditId={commentEditId}
          onEditComment={onEditComment}
        />
      ) : (
        <CustomerShop
          products={visibleProducts}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          cart={cart}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          onCheckout={onCheckout}
          cartTotal={cartTotal}
        />
      )}
    </>
  )
}
