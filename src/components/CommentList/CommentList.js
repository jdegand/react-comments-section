import { useState, useEffect } from 'react';
import Comment from '../Comment/Comment.js';
import CommentForm from '../CommentForm/CommentForm.js';
import './CommentList.css';

function CommentList() {
    const [data,setData]=useState([]);
    const [comments,setComments]=useState([]);
    const [user, setUser]=useState('');

    const getData=()=>{
      fetch('data.json', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
        .then(function(response){
          return response.json();
        })
        .then(function(data) {
          //const keys = Object.keys(data) [currentUser, comments]
          setData(data);

          const user = data['currentUser'];
          setUser(user);

          const comments = data['comments'];
          setComments(comments)

        });
    }

    useEffect(()=>{
      getData()
    },[]);

    const createComment = async(text, currentUser) => {
      const newComment = {
            "id": Math.random().toString(36).substring(2,9),
            "content": text,
            "createdAt": "Today",
            "score": 0,
            "user": {
              "image": { 
                "png": currentUser.image.png,
                "webp": currentUser.image.webp
              },
              "username": currentUser.username
            },
            "replyingTo": null
          };
      setComments([...comments, newComment]);
  }
  
  //problems here
  const createReply = async(id, text, currentUser, replied) => {
    //let comment = comments.find(comment => comment.id === id); 
    const newReply = {
    "id": Math.random().toString(36).substring(2,9),
    "content": text,
    "createdAt": "Today",
    "score": 0,
    "replyingTo": replied,
    "user": {
      "image": { 
        "png": currentUser.image.png,
        "webp": currentUser.image.webp,
      },
      "username": currentUser.username
      }
  }

  //console.log({newReply})

  //replying to comment from same user causes problems
  let index = comments.findIndex(comment => comment.user.username === replied);

  if(comments[index].user.username === newReply.user.username){
    alert("Can't reply to yourself");
    return;
  }

  let insert = index + 1;
  let c = [...comments];
  //console.log({c})
  c.splice(insert, 0, newReply); 
  setComments([...c]);
}
   
    return (
      <div className="App">
          <div>{comments.map(comment => 
              (
                <div key={comment.id} className={`${comment.replyingTo ? "reply" : "comment"}`}>
                  <Comment currentUser={user} comment={comment} createReply={createReply} />
                </div>
              )
        )}
          </div>
          <CommentForm currentUser={user} createComment={createComment} />
      </div>
    );
  }
  
  export default CommentList;