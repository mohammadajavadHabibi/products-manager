import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  products: [],
  filterProducts: [],
  selectedIds: [],
  loading: false,
  error: "",
  searchTerm: "",
  showDeleteModal: false,
  showEditModal: false,
  showAddModal: false,
  selectedId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_FILTER":
      return { ...state, filterProducts: action.payload };
    case "SET_SELECTED_IDS":
      return { ...state, selectedIds: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SELECTED_ID":
      return { ...state, selectedId: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SHOW_DELETE_MODAL":
      return { ...state, showDeleteModal: action.payload };
    case "SET_SHOW_EDIT_MODAL":
      return { ...state, showEditModal: action.payload };
    case "SET_SHOW_ADD_MODAL":
      return { ...state, showAddModal: action.payload };
    default:
      return state;
  }
};

const ProductsContext = createContext(undefined);

function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProduct() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProduct باید داخل <ProductsProvider> استفاده شود");
  }
  return [context.state, context.dispatch]; 
}

export { ProductsProvider as default, useProduct };
