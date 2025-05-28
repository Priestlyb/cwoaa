import { useState } from "react";
import { axiosInstance } from "../../config";

export default function NewCommentForm({ newsId, onCommentAdd }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/comments/${newsId}`, {
        content,
        author,
        passcode,
        parentId: null, // No parent for a new comment
      });
      onCommentAdd(res.data.comment); // Add the new comment to the list
      setAuthor("");
      setContent("");
      setPasscode("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="item">
        <input
          className="input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your Name"
          required
        />
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          required
        />
        <input
          className="input"
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          required
        />
        <button className="bg-dark text-light fw-bold text-lg" type="submit">
          Post Comment
        </button>
      </form>
    </div>
  );
}
