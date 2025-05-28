import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";

// Comment Component
function Comment({ comment, onReply, onDelete }) {
  return (
    <div className="bg-dark text-light p-3 mb-2 rounded">
      <div className="d-flex flex-row gap-2 align-item-center bg-light p-1 text-dark rounded">
        <h5 className="text-xl">
          <strong>{comment.author}</strong>:
        </h5>{" "}
        <h6>{comment.content}</h6>
      </div>
      <div className="mt-2">
        <button onClick={() => onReply(comment._id)}>Reply</button>
        <button className="ms-2 btn btn-sm btn-danger" onClick={() => onDelete(comment._id)}>
          Delete
        </button>
      </div>
      {/* Render children */}
      {comment.children?.map((child) => (
        <Comment key={child._id} comment={child} onReply={onReply} onDelete={onDelete} />
      ))}
    </div>
  );
}

// Comment Form (for new or reply)
function CommentForm({ newsId, parentId, onCommentAdd }) {
  const [form, setForm] = useState({ content: "", author: "", passcode: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content || !form.author || !form.passcode) return alert("All fields required");
    try {
      const res = await axiosInstance.post(`/comments/${newsId}`, { ...form, parentId });
      onCommentAdd(res.data.comment);
      setForm({ content: "", author: "", passcode: "" });
    } catch (err) {
      alert("Error posting comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        placeholder="Author"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        className="form-control mb-2"
      />
      <textarea
        placeholder="Comment"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="form-control mb-2"
      />
      <input
        type="password"
        placeholder="Passcode"
        value={form.passcode}
        onChange={(e) => setForm({ ...form, passcode: e.target.value })}
        className="form-control mb-2"
      />
      <button type="submit" className="btn mt-3 btn-dark">
        {parentId ? "Post Reply" : "Post Comment"}
      </button>
    </form>
  );
}

// Comments List
function CommentsList({ newsId }) {
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  // Load comments
  useEffect(() => {
    axiosInstance.get(`/comments/news/${newsId}`).then((res) => setComments(res.data.comments));
  }, [newsId]);

  // Add new comment/reply
  const handleNewComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
    setReplyTo(null);
    // Refresh the tree (optional, but ensures latest data)
    axiosInstance.get(`/comments/news/${newsId}`).then((res) => setComments(res.data.comments));
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    const passcode = prompt("Enter passcode to delete:");
    if (!passcode) return;

    try {
      await axiosInstance.delete(`/comments/${commentId}`, { data: { passcode } });
      alert("Comment deleted");
      axiosInstance.get(`/comments/news/${newsId}`).then((res) => setComments(res.data.comments));
    } catch (err) {
      alert("Failed to delete comment: " + (err.response?.data?.message || "Error"));
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm
        newsId={newsId}
        parentId={replyTo}
        onCommentAdd={handleNewComment}
      />
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onReply={(id) => setReplyTo(id)}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default CommentsList;
