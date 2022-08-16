import { useEffect, useState } from "react";
import {
  addNewPost,
  getAllPosts,
  getAllUsers,
  uploadNewFile,
} from "./firebse.service";
// Import the functions you need from the SDKs you need

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({});

  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    //  RESTful API URL

    getAllUsers().then((_users) => {
      setUsers(_users);
    });

    getAllPosts().then((_posts) => {
      setPosts(_posts);
    });
  }, []);

  const formHandler = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const onSubmitPost = () => {
    setIsUploading(true);
    debugger
    uploadNewFile(file).then((url) => {
      addNewPost({
        ...formData,
        imageURL: url,
      }).then((resp) => {
        getAllPosts().then((_posts) => {
          setPosts(_posts);
          setIsUploading(false);
        });
      });
    });
  };

  const onUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <main className="bg-gray-200">
      <div className="w-1/3 m-auto ">
        <div>
          <input
            className="rounded border p-3 block w-full"
            type="file"
            placeholder="imageURL"
            onChange={(event) => onUpload(event)}
          ></input>{" "}
          {isUploading ? (
            <img src="loader.jpeg" className="h-12 animate-spin"></img>
          ) : (
            ""
          )}
          <input
            type="text"
            className="rounded border p-3 block w-full"
            placeholder="title"
            onChange={(event) => formHandler("title", event.target.value)}
          ></input>
          <input
            type="text"
            className="rounded border p-3 block w-full"
            placeholder="message"
            onChange={(event) => formHandler("message", event.target.value)}
          ></input>
          <button
            onClick={() => onSubmitPost()}
            className="bg-blue-600 text-white px-4 p-1 rounded shadow w-full"
          >
            POST
          </button>
        </div>

        <div className="p-4 w-full">
          {posts.map((post, i) => {
            return (
              <div
                key={i}
                className="bg-white shadow p-2 rounded w-full overflow-hidden mb-4"
              >
                <label className="text-red-600 font-bold">{post.title}</label>
                <p>{post.message}</p>
                <img className="aspect-auto" src={post.imageURL}></img>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
