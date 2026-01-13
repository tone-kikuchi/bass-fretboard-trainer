import type { ReactNode } from 'react';
import HeaderBar from './HeaderBar';
import BottomNav from './BottomNav';

type AppShellProps = {
  appName: string;
  pageName?: string;
  children: ReactNode;
};

export default function AppShell({ appName, pageName, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <HeaderBar appName={appName} pageName={pageName} />
      <main className="app-shell__main">{children}</main>
      <BottomNav />
    </div>
  );
}
