import { useState } from "react";
import axios from "axios";

export default function ReplyForm({ newsId, parentId, onCommentAdd }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/comments/${newsId}`, {
        content,
        author,
        passcode,
        parentId, // The parent comment's ID
      });
      onCommentAdd(res.data.comment); // Add the reply to the list
      setAuthor("");
      setContent("");
      setPasscode("");
    } catch (err) {
      console.error("Error posting reply:", err);
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
          placeholder="Write your reply..."
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
          Post Reply
        </button>
      </form>
    </div>
  );
}
