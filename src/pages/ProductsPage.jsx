import React, { useEffect } from "react";
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
    filterProducts,
    searchTerm,
    loading,
    error,
    selectedId,
    showAddModal,
    showEditModal,
    showDeleteModal,
  } = state;

  useEffect(() => {
    fetchProducts(dispatch);
  }, [dispatch]);

  // جستجو
  useEffect(() => {
    if (!searchTerm) {
      dispatch({ type: "SET_FILTER", payload: products });
      return;
    }

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch({ type: "SET_FILTER", payload: filtered });
  }, [searchTerm, products]);

  const handleAdd = () =>
    dispatch({ type: "SET_SHOW_ADD_MODAL", payload: true });
  const handleEdit = (id) => {
    dispatch({ type: "SET_SELECTED_ID", payload: id });
    dispatch({ type: "SET_SHOW_EDIT_MODAL", payload: true });
  };
  const handleDelete = (id) => {
    dispatch({ type: "SET_SELECTED_ID", payload: id });
    dispatch({ type: "SET_SHOW_DELETE_MODAL", payload: true });
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

        <button className="add-btn" onClick={handleAdd}>
          افزودن محصول
        </button>
      </div>

      {filterProducts.length === 0 ? (
        <p className="status-text">محصولی یافت نشد.</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>تعداد</th>
              <th>شناسه محصول</th> {/* اضافه شد */}
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filterProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.id}</td> {/* نمایش شناسه */}
                <td className="actions-cell">
                  <button
                    className="icon-link edit"
                    onClick={() => handleEdit(product.id)}
                  >
                    <FaRegPenToSquare />
                  </button>
                  <button
                    className="icon-link delete"
                    onClick={() => handleDelete(product.id)}
                  >
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
          onAddSuccess={(newProduct) => {
            dispatch({
              type: "SET_PRODUCTS",
              payload: [...products, newProduct],
            });
            dispatch({
              type: "SET_FILTER",
              payload: [...filterProducts, newProduct],
            });
          }}
        />
      )}

      {showEditModal && (
        <EditModal
          id={selectedId}
          setShowEditModal={() =>
            dispatch({ type: "SET_SHOW_EDIT_MODAL", payload: false })
          }
          onUpdateSuccess={(updatedProduct) => {
            dispatch({
              type: "SET_PRODUCTS",
              payload: products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              ),
            });
            dispatch({
              type: "SET_FILTER",
              payload: filterProducts.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              ),
            });
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          id={selectedId}
          setShowDeleteModal={() =>
            dispatch({ type: "SET_SHOW_DELETE_MODAL", payload: false })
          }
          updateProducts={(id) => {
            dispatch({
              type: "SET_PRODUCTS",
              payload: products.filter((p) => p.id !== id),
            });
            dispatch({
              type: "SET_FILTER",
              payload: filterProducts.filter((p) => p.id !== id),
            });
          }}
        />
      )}
    </div>
  );
}

export default ProductsPage;
