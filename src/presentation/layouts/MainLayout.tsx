import type { ReactNode } from 'react';

interface MainLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ header, children }) => {
  return (
    <div className="main-layout">
      {header}
      <main className="main-layout__content">
        {children}
      </main>
    </div>
  );
};
