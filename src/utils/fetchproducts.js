import api from "../configs/Api";

 const fetchProducts = async (dispatch) => {
  dispatch({ type: "SET_LOADING", payload: true });
  dispatch({ type: "SET_ERROR", payload: "" });

  try {
    const res = await api.get("/products");
    dispatch({ type: "SET_PRODUCTS", payload: res.data });
    dispatch({ type: "SET_FILTER", payload: res.data });
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      payload: err.message || "خطا در دریافت محصولات",
    });
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};



export default fetchProducts;
