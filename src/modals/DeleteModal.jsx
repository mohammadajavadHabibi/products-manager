
import "../styles/Deletemodal.css";
import api from "../configs/Api";

function DeleteModal({ setShowDeleteModal, id , updateProducts }) {
  const deleteHandler = async () => {
  try {
    await api.delete(`/products/${id}`);
    updateProducts(id); // ← با state فعلی کار می‌کنه
    setShowDeleteModal(false);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


  const closeHandler = () => {
    setShowDeleteModal(false);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">آیا از حذف این محصول اطمینان دارید؟</h3>

        <div className="modal-actions">
          <button className="btn cancel" onClick={closeHandler}>
            لغو
          </button>
          <button className="btn delete" onClick={deleteHandler}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
