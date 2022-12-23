import { Outlet } from 'react-router-dom';
import Header from '../Header';

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <footer>(c)2022</footer>
    </>
  );
}

export default MainLayout;
