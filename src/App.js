import { useEffect, useState } from "react";

const baseUrl = "http://localhost:8080";

const fetchAllUsers = () => {
  return fetch(baseUrl + "/get-all-users").then((resp) => resp.json());
};

const fetchPostsByUserId = (userId) => {
  return fetch(baseUrl + "/get-posts?userId=" + userId).then((resp) =>
    resp.json()
  );
};

function App() {
  const [users, setUsers] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    //  RESTful API URL
    fetchAllUsers().then((resp) => {
      setUsers(resp);
    });
  }, []);

  function loadPostsHandler(user) {
    fetchPostsByUserId(user.id).then((resp) => {
      setRelatedPosts(resp);
    });
  }

  return (
    <div className="flex">
      <div className="w-1/3">
        {users.map((user, i) => (
          <div
            onClick={() => loadPostsHandler(user)}
            key={i}
            className="p-4 bg-white shadow rounded m-2"
          >
            <div className="font-bold">{user.name}</div>
            <div>{user.username}</div>
            <div className="text-gray-400">{user.email}</div>
          </div>
        ))}
      </div>

      {/* POSTS */}
      <div className="p-4">
        {relatedPosts.map((post,i) => {
          return (
            <div  key={i} className="bg-white shadow p-2 rounded">
              <label className="text-red-600 font-bold">{post.userId}</label>
              <h1 className="text-xl font-bold">{post.title}</h1>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
