import "./App.css";
import ProductsProvider from "./context/ProductsContext.jsx";
import AppRoutes from "./Routes/Router.jsx";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <AppRoutes />
      </ProductsProvider>
    </div>
  );
}

export default App;
