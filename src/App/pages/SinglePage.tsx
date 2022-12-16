import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type kekw = {
  title: string;
  body: string;
};

function SinglePage() {
  const { id } = useParams();
  const [post, setPost] = useState<kekw | null>(null);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));

    // fetch('https://dummyjson.com/products?limit=100')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPosts(data.products);
    //   });
  }, [id]);
  return (
    <div>
      <button type="button" onClick={goBack}>
        Go back
      </button>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </>
      )}
    </div>
  );
}

export { SinglePage };
