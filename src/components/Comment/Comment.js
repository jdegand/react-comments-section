import { useState, useCallback } from 'react';
import './Comment.css';

function Comment({comment, currentUser, createReply}) {

  const [count, setCount] = useState(comment.score);
  const [text, setText] = useState('');
  const [replied, setReplied] = useState('');
  const [id, setId] = useState(null);

  function useToggle(initialValue = false) {

    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(() => {
      setValue(v => !v);
    }, []);
    return [value, toggle];
  }

  const [isOn, toggleIsOn] = useToggle();

  const onSubmit = (event) => {
    event.preventDefault();
    setText(text);
    setReplied(replied);
    setId(id);
    createReply(id, text, currentUser, replied);
    setText("");
  }

  return (
    <>
    <div className="Comment" key={comment.id}>
      <div className="side">
        <img className="pointer" src="images/icon-plus.svg" alt="Click to like" onClick={()=>setCount(prev => prev + 1)} />
        <div>{count}</div>
        <img className="pointer" src="images/icon-minus.svg" alt="Click to dislike" onClick={()=>setCount(prev => prev - 1)} />
      </div>
      <div className="user">
        <div className="profile-div">
          <img src={comment.user.image.png} alt={comment.user.username} />
          <div className="username">{comment.user.username}</div>
          <div>{comment.createdAt}</div>
        </div>
        <div 
          className="pointer" 
          onClick={toggleIsOn} onClickCapture={()=> {
            setReplied(comment.user.username)
            setId(comment.id);
          }}>
          <img src="images/icon-reply.svg" alt="Click to reply" />
          <span>Reply</span>
        </div>
      </div>
      <div className="content">
        <p>{comment.content}</p>
      </div>
    </div>

    {isOn ? (
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
        <button type="submit">REPLY</button>
      </div>
    </form>
    ) : null }
      </>
  ); 
}

export default Comment;