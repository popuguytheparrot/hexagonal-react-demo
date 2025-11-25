import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { DIProvider } from './infrastructure/di';
import { MainLayout } from './presentation/layouts';
import { Header } from './presentation/widgets/header';
import { ProfileWidget } from './presentation/widgets/profile';
import { NotificationsWidget } from './presentation/widgets/notifications';
import { CartWidget } from './presentation/widgets/cart';
import { CatalogPage, CatalogFilters } from './presentation/pages/catalog';
import { ProductPage } from './presentation/pages/product';
import './App.css';

function AppHeader() {
  const navigate = useNavigate();
  
  return (
    <Header
      onLogoClick={() => navigate('/')}
      rightSlot={
        <>
          <NotificationsWidget />
          <CartWidget />
          <ProfileWidget />
        </>
      }
    />
  );
}

function CatalogWithFilters() {
  return <CatalogPage filtersSlot={<CatalogFilters />} />;
}

function AppContent() {
  return (
    <MainLayout
      header={<AppHeader />}
      content={
        <Routes>
          <Route path="/" element={<CatalogWithFilters />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      }
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <DIProvider>
        <AppContent />
      </DIProvider>
    </BrowserRouter>
  );
}

export default App;
