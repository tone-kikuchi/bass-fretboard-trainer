import { NavLink } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { TEXT } from '../lib/i18n';

export default function BottomNav() {
  const language = useAppStore((state) => state.language);
  const appText = TEXT[language].app;

  return (
    <nav className="bottom-nav" aria-label="メインナビゲーション">
      <NavLink to="/" end className="bottom-nav__link">
        {appText.nav.fretboard}
      </NavLink>
      <NavLink to="/practice" className="bottom-nav__link">
        {appText.nav.practice}
      </NavLink>
      <NavLink to="/progression" className="bottom-nav__link">
        {appText.nav.progression}
      </NavLink>
      <NavLink to="/stats" className="bottom-nav__link">
        {appText.nav.stats}
      </NavLink>
    </nav>
  );
}
