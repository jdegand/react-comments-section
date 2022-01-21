import { useState } from "react";
import './CommentForm.css';

function CommentForm({currentUser, createComment}) {

  const [text, setText] = useState('');
  const disableButton = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    setText(text);
    createComment(text, currentUser); //pass the text to function in parent 
    setText("");
  }

  // trying to render <img src={currentUser.image.png} alt={currentUser.username} /> breaks the app
  // works if change is hot reloaded but not on refresh - undefined error 

  return (
    <form className="CommentForm" onSubmit={onSubmit}>
      <div className="user">
      {currentUser.username}
      </div>
      <div className="input">
      <textarea
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      </div>
      <div className="button">
        <button type="submit" disabled={disableButton}>SEND</button>
      </div>
    </form>
  );
}

export default CommentForm;