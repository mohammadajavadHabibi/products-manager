import React, { useState } from "react";
import api from "../configs/Api";

function AddModal({ setShowAddModal, onAddSuccess }) {
  const [product, setProduct] = useState({ name: "", price: "", quantity: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/products", product);
      onAddSuccess(res); // اضافه کردن محصول به کانتکست
      setShowAddModal(false); // بستن مودال
    } catch (err) {
      console.error(err);
      setError("خطا در افزودن محصول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <h2 className="edit-title">افزودن محصول جدید</h2>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">نام کالا</label>
            <input
              type="text"
              id="name"
              placeholder="نام کالا را وارد کنید"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">تعداد موجودی</label>
            <input
              type="number"
              id="quantity"
              placeholder="مثلاً 10"
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">قیمت</label>
            <input
              type="number"
              id="price"
              placeholder="مثلاً 250000"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="edit-actions">
            <button
              type="button"
              className="btn cancel"
              onClick={() => setShowAddModal(false)}
            >
              انصراف
            </button>
            <button type="submit" className="btn save" disabled={loading}>
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
