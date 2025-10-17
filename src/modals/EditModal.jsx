import React, { useState, useEffect } from "react";
import api from "../configs/Api";
import { useProduct } from "../context/ProductsContext";
import "../styles/EditModal.css"; // همون استایل مشابه AddModal

function EditModal({ id, setShowEditModal }) {
  const [state, dispatch] = useProduct();
  const { products, filterProducts } = state;

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // پیدا کردن محصول از context
  useEffect(() => {
    if (!id) return;

    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct({
        name: found.name,
        price: found.price,
        quantity: found.quantity,
      });
      setLoading(false);
    } else {
      setError("محصول یافت نشد");
      setLoading(false);
    }
  }, [id, products]);

  // ذخیره تغییرات در API و context
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.put(`/products/${id}`, product);
      const updatedProduct = res.data;

      // اگر API پاسخی نداد، از product فعلی استفاده کن
      const finalProduct = updatedProduct || { ...product, id };

      // به‌روزرسانی state ها در context
      const updatedProducts = products.map((p) =>
        p.id === id ? finalProduct : p
      );
      const updatedFilter = filterProducts.map((p) =>
        p.id === id ? finalProduct : p
      );

      dispatch({ type: "SET_PRODUCTS", payload: updatedProducts });
      dispatch({ type: "SET_FILTER", payload: updatedFilter });

      setShowEditModal(false);
    } catch (err) {
      console.error("خطا در ویرایش محصول:", err);
      setError("ویرایش محصول انجام نشد");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="edit-overlay">
        <div className="edit-modal">
          <p>در حال بارگذاری اطلاعات...</p>
        </div>
      </div>
    );

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <h2 className="edit-title">ویرایش محصول</h2>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">نام کالا</label>
            <input
              type="text"
              id="name"
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">تعداد موجودی</label>
            <input
              type="number"
              id="quantity"
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
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="edit-actions">
            <button
              type="button"
              className="btn cancel"
              onClick={() => setShowEditModal(false)}
            >
              انصراف
            </button>
            <button type="submit" className="btn save" disabled={loading}>
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
