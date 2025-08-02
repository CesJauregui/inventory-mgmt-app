import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import Page from "./app/dashboard/DashboardPage";
import { Route, Routes } from "react-router-dom";
import LayoutTemplate from "./app/LayoutTemplate";
import ProductsPage from "./app/products/ProductPage";
import CategoryPage from "./app/categories/CategoryPage";
import BrandPage from "./app/brands/BrandPage";
import SupplierPage from "./app/suppliers/SupplierPage";

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
          path="/proveedores"
          element={
            <LayoutTemplate>
              <SupplierPage />
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
        <Route
          path="/marcas"
          element={
            <LayoutTemplate>
              <BrandPage />
            </LayoutTemplate>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
