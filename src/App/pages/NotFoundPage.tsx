import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      This is page doesn&apos;t exist. Go <Link to="/">home</Link>
    </div>
  );
}

export { NotFoundPage };
