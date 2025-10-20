import "./App.css";
import ProductsProvider from "./context/ProductsContext.jsx";
import AppRoutes from "./Routes/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";




const queryclient = new QueryClient();
function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <QueryClientProvider   client={queryclient}>
          <AppRoutes />
        </QueryClientProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
