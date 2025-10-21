// helper برای آپدیت محصولات و فیلتر
const updateProductsAndFilter = (newProducts, dispatch) => {
  dispatch({ type: "SET_PRODUCTS", payload: newProducts });
  dispatch({ type: "SET_FILTER", payload: newProducts });
};


// helper برای باز کردن مودال‌ها
const showModal = (type, dispatch, id = null) => {
  if (id) dispatch({ type: "SET_SELECTED_ID", payload: id });
  dispatch({ type: `SET_SHOW_${type}_MODAL`, payload: true });
};


export { updateProductsAndFilter, showModal };
