import React, { useEffect, useMemo } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import "../styles/ProductsPage.css";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import AddModal from "../modals/AddModal";
import SearchBox from "../components/SearchBox";

import { useProduct } from "../context/ProductsContext";
import Loader from "../components/Loader";
import fetchProducts from "../utils/fetchproducts";

function ProductsPage() {
  const [state, dispatch] = useProduct();
  const {
    products,
    searchTerm,
    loading,
    error,
    selectedId,
    showAddModal,
    showEditModal,
    showDeleteModal,
  } = state;

  // فراخوانی اولیه محصولات
  useEffect(() => {
    fetchProducts(dispatch);
  }, [dispatch]);

  // محصولات فیلتر شده با useMemo
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // helper برای آپدیت محصولات و فیلتر
  const updateProductsAndFilter = (newProducts) => {
    dispatch({ type: "SET_PRODUCTS", payload: newProducts });
    dispatch({ type: "SET_FILTER", payload: newProducts });
  };

  // helper برای باز کردن مودال‌ها
  const showModal = (type, id = null) => {
    if (id) dispatch({ type: "SET_SELECTED_ID", payload: id });
    dispatch({ type: `SET_SHOW_${type}_MODAL`, payload: true });
  };

  if (loading) return <Loader />;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div className="products-container">
      <h2 className="products-title">مدیریت محصولات</h2>

      <div className="toolbar">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={(value) =>
            dispatch({ type: "SET_SEARCH_TERM", payload: value })
          }
        />
        <button className="add-btn" onClick={() => showModal("ADD")}>
          افزودن محصول
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="status-text">محصولی یافت نشد.</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>تعداد</th>
              <th>شناسه محصول</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.id}</td>
                <td className="actions-cell">
                  <button onClick={() => showModal("EDIT", product.id)}>
                    <FaRegPenToSquare />
                  </button>
                  <button onClick={() => showModal("DELETE", product.id)}>
                    <AiTwotoneDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddModal && (
        <AddModal
          setShowAddModal={() =>
            dispatch({ type: "SET_SHOW_ADD_MODAL", payload: false })
          }
          onAddSuccess={(newProduct) =>
            updateProductsAndFilter([...products, newProduct])
          }
        />
      )}

      {showEditModal && (
        <EditModal
          id={selectedId}
          setShowEditModal={() =>
            dispatch({ type: "SET_SHOW_EDIT_MODAL", payload: false })
          }
          onUpdateSuccess={(updatedProduct) =>
            updateProductsAndFilter(
              products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              )
            )
          }
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          id={selectedId}
          setShowDeleteModal={() =>
            dispatch({ type: "SET_SHOW_DELETE_MODAL", payload: false })
          }
          updateProducts={(id) =>
            updateProductsAndFilter(products.filter((p) => p.id !== id))
          }
        />
      )}
    </div>
  );
}

export default ProductsPage;
