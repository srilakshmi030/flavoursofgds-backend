import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import TopBar from '../components/TopBar';
import { getRememberedCityName, getToken } from '../api/client';

export function PhoneShell({ children }) {
  return (
    <div className="phone-shell">
      <div className="phone-screen">{children}</div>
    </div>
  );
}

export function RequireAuth() {
  const location = useLocation();
  if (!getToken()) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

export function CityLayout() {
  const { cityCode } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <TopBar
        title={getRememberedCityName() || cityCode?.toUpperCase()}
        onProfileClick={() => navigate('/profile')}
      />
      <div className="screen-body screen-body--flush screen-body--nav">
        <Outlet />
      </div>
      <BottomNav cityCode={cityCode} />
    </>
  );
}
