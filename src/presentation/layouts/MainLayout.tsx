import type { ReactNode } from 'react';
import './MainLayout.css';

interface MainLayoutProps {
  header: ReactNode;
  sidebar?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
}

export function MainLayout({ header, sidebar, content, footer }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <div className="main-layout-header">
        {header}
      </div>
      <div className="main-layout-body">
        {sidebar && <aside className="main-layout-sidebar">{sidebar}</aside>}
        <main className="main-layout-content">
          {content}
        </main>
      </div>
      {footer && <footer className="main-layout-footer">{footer}</footer>}
    </div>
  );
}
