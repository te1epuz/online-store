import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>(c)2022</footer>
    </>
  );
}

export { Layout };
