import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

function Layout() {
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

export { Layout };
