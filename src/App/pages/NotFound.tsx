import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>Requested page not found</h2>
      <Link to="/">Go back to main page</Link>
    </>
  );
}

export default NotFound;
