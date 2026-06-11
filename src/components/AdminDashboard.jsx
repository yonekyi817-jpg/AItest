export default function AdminDashboard({
  products,
  newProduct,
  setNewProduct,
  editingProductId,
  onImageFileChange,
  onSaveProduct,
  onEditProduct,
  onCancelEdit,
  onUpdateStock,
  onDeleteProduct,
}) {
  return (
    <div className="section-grid mt-10">
      <section className="panel-card">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <p className="mt-3 text-amber-700">Add new products or update stock levels in the store inventory.</p>

        <div className="mt-8 space-y-4">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
                <div className="flex items-start gap-4">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=400&q=80'}
                    alt={product.name}
                    className="product-image"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="mt-1 text-amber-700">${product.price} • Stock: {product.stock}</p>
                    <p className="mt-2 text-amber-600">{product.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <label className="input-group">
                    Stock
                    <input
                      type="number"
                      value={product.stock}
                      min="0"
                      onChange={(e) => onUpdateStock(product.id, e.target.value)}
                      className="input-field w-full max-w-[120px]"
                    />
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="button-secondary px-4 py-2 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="button-danger px-4 py-2 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-card-secondary">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{editingProductId ? 'Edit Product' : 'Add Product'}</h2>
            {editingProductId && <p className="mt-2 text-sm text-amber-700">You are editing an existing product. Update fields and save or cancel.</p>}
          </div>
          {editingProductId && (
            <button
              onClick={onCancelEdit}
              className="button-secondary px-4 py-2 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
        <div className="mt-6 space-y-4">
          <label className="input-group">
            Name
            <input
              value={newProduct.name}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
              className="input-field"
              placeholder="Product name"
            />
          </label>
          <label className="input-group">
            Price
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
              className="input-field"
              placeholder="USD"
            />
          </label>
          <label className="input-group">
            Stock
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}
              className="input-field"
              placeholder="Quantity"
            />
          </label>
          <label className="input-group">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageFileChange(e.target.files?.[0])}
              className="input-field"
            />
          </label>
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="Preview"
              className="product-preview mt-4"
            />
          )}
          <label className="input-group">
            Description
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
              className="input-field"
              rows="4"
            />
          </label>
          <button
            onClick={onSaveProduct}
            className="button-primary"
          >
            {editingProductId ? 'Save Product' : 'Add Product'}
          </button>
        </div>
      </section>
    </div>
  )
}
