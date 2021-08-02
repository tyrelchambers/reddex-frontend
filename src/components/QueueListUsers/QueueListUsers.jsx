import React from "react";

const QueueListUsers = ({ selectedPost, posts, setSelectedPost }) => {
  return (
    <section className="flex flex-col w-full queue-list-users gap-2 overflow-y-auto">
      {posts.map((u, id) => (
        <div
          className={`${
            selectedPost && u._id === selectedPost._id && "bg"
          } p-4`}
          onClick={() => setSelectedPost(u)}
          key={u._id}
        >
          <p className="font-bold">{u.author}</p>
          <p className="truncate">{u.title}</p>
        </div>
      ))}
    </section>
  );
};

export default QueueListUsers;
