import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './presentation/layouts/MainLayout';
import { Header } from './presentation/components/Header/Header';
import { Logo } from './presentation/components/Logo/Logo';
import { ProfileWidget } from './presentation/widgets/ProfileWidget/ProfileWidget';
import { NotificationsWidget } from './presentation/widgets/NotificationsWidget/NotificationsWidget';
import { CartWidget } from './presentation/widgets/CartWidget/CartWidget';
import { CatalogPage } from './presentation/pages/CatalogPage';
import { ProductPage } from './presentation/pages/ProductPage';
import { useNavigateToCatalog } from './presentation/hooks/usePorts';
import './presentation/styles/index.css';

function App() {
  const navigateToCatalog = useNavigateToCatalog();

  return (
    <MainLayout
      header={
        <Header
          leftSlot={<Logo onClick={navigateToCatalog} />}
          rightSlot={
            <>
              <NotificationsWidget />
              <CartWidget />
              <ProfileWidget />
            </>
          }
        />
      }
    >
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
