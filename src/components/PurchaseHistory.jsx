export default function PurchaseHistory({ orders = [] }) {
  return (
    <section className="section-grid mt-10">
      <div className="panel-card">
        <div>
          <h2 className="text-2xl font-semibold">Purchase History</h2>
          <p className="mt-3 text-amber-700">All completed orders are saved here even after you log out.</p>
        </div>

        {orders.length ? (
          <div className="history-grid mt-8">
            {orders.map((order) => (
              <article key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                    <p className="order-meta">{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <div className="order-total">
                    <p className="text-sm text-amber-700">Order total</p>
                    <p className="text-2xl font-semibold">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={`${order.id}-${item.id}`} className="order-item">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="order-meta">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-amber-700">You have no purchases yet. Add items to your cart and checkout to save orders.</p>
        )}
      </div>
    </section>
  )
}
