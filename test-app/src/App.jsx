import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import { CityLayout, PhoneShell, RequireAuth } from './layouts/AppLayouts';
import CategoryList from './screens/CategoryList';
import CityDashboard from './screens/CityDashboard';
import CitySelect from './screens/CitySelect';
import DetailScreen from './screens/DetailScreen';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Splash from './screens/Splash';
import WinningRecipes from './screens/WinningRecipes';

function SimpleScreen({ title, showBack = true, children }) {
  const navigate = useNavigate();
  return (
    <>
      <TopBar title={title} showBack={showBack} onProfileClick={() => navigate('/profile')} />
      <div className="screen-body screen-body--flush">{children}</div>
    </>
  );
}

export default function App() {
  return (
    <PhoneShell>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route
            path="/cities"
            element={
              <SimpleScreen title="Select city" showBack={false}>
                <CitySelect />
              </SimpleScreen>
            }
          />
          <Route
            path="/profile"
            element={
              <SimpleScreen title="Profile">
                <Profile />
              </SimpleScreen>
            }
          />
          <Route
            path="/item/:itemType/:id"
            element={
              <SimpleScreen title="Details">
                <DetailScreen />
              </SimpleScreen>
            }
          />

          <Route path="/city/:cityCode" element={<CityLayout />}>
            <Route index element={<CityDashboard />} />
            <Route path="winning-recipes" element={<WinningRecipes />} />
            <Route path=":category" element={<CategoryList />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </PhoneShell>
  );
}
