// src/utils/productHandlers.js
export const handleAdd = (dispatch) => {
  dispatch({ type: "SET_SHOW_ADD_MODAL", payload: true });
};

export const handleEdit = (dispatch, id) => {
  dispatch({ type: "SET_SELECTED_ID", payload: id });
  dispatch({ type: "SET_SHOW_EDIT_MODAL", payload: true });
};

export const handleDelete = (dispatch, id) => {
  dispatch({ type: "SET_SELECTED_ID", payload: id });
  dispatch({ type: "SET_SHOW_DELETE_MODAL", payload: true });
};

export const handleSearch = (dispatch, products, searchTerm) => {
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
};
