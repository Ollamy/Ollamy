import { Route, Routes } from 'react-router-native';
import Profile from 'src/pages/profile';

function ProfileRoutes() {
  return (
    <Routes>
      <Route path={'profile'} Component={Profile} />
    </Routes>
  );
}

export default ProfileRoutes;
