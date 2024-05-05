"use client";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComment("");
    await addDoc(collection(db, "posts", id, "comment"), {
      comment: comment,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timeStamp: serverTimestamp(),
    });
  };

  // useEffect(() => {
  //   onSnapshot(collection(db, "posts", id, "comment"), (snapshot) => {
  //     setComments(snapshot.docs);
  //   });
  // }, [db]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comment"),
        orderBy("timeStamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db]);

  console.log(comments);

  return (
    <div>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll">
          {comments.map((comment, id) => (
            <div
              className="flex items-center space-x-2 mb-2 justify-between"
              key={id}
            >
              <img
                src={comment.data().userImage}
                alt="userimage"
                className="h-7 rounded-full object-cover border p-[2px]"
              />
              <p className="text-sm flex-1">
                <span className="font-bold text-gray-700">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="text-xs text-gray-400 pr-2">
                {comment.data().timeStamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form onSubmit={handleSubmit} className="flex items-center p-4 gap-2">
          <img
            src={session?.user?.image}
            alt={session?.user?.name}
            className="h-10 w-10 rounded-full border p-[4px] object-cover"
          />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="'Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            disabled={!comment.trim()}
            type="submit"
            className="text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
