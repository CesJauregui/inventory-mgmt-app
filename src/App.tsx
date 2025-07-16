import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import Page from "./app/dashboard/DashboardPage";
import { Route, Routes } from "react-router-dom";
import LayoutTemplate from "./app/LayoutTemplate";
import ProductsPage from "./app/products/ProductPage";
import CategoryPage from "./app/categories/CategoryPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <LayoutTemplate>
              <Page />
            </LayoutTemplate>
          }
        />
        <Route
          path="/productos"
          element={
            <LayoutTemplate>
              <ProductsPage />
            </LayoutTemplate>
          }
        />
        <Route
          path="/categorias"
          element={
            <LayoutTemplate>
              <CategoryPage />
            </LayoutTemplate>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
