import { Link } from 'react-router-dom';

type HeaderBarProps = {
  appName: string;
  pageName?: string;
};

export default function HeaderBar({ appName, pageName }: HeaderBarProps) {
  return (
    <header className="header-bar">
      <div className="header-bar__titles">
        <span className="header-bar__app-name" title={appName}>
          {appName}
        </span>
        {pageName ? <span className="header-bar__page">{pageName}</span> : null}
      </div>
      <Link to="/help" className="header-bar__help" aria-label="ヘルプを開く">
        ?
      </Link>
    </header>
  );
}
