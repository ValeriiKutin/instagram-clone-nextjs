"use client";
import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

export default function LikeSection({ id }) {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);
  //цей йобаний useEffect для того, щоб можна було показати кількість йобаних лайків
  useEffect(() => {
    // db, "posts", id, "likes" - це ми отримуємо колекцію лайків під потрібним постом
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    if (likes.findIndex((like) => like.id === session?.user?.uid) !== -1) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes]);
  console.log("session: ", session);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  }

  //'post'/post.id/likes/likes.id
  //posts/iCAm09qmnzmEMbkFVIsV/likes/111549657801036842874)

  return (
    <div>
      {session && (
        <div className="flex border-t border-gray-100 px-4 pt-4">
          <div className="flex items-center">
            {hasLiked ? (
              <HiHeart
                onClick={likePost}
                className="text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out"
              />
            ) : (
              <HiOutlineHeart
                onClick={likePost}
                className="cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out"
              />
            )}
            <p className="text-gray-500">
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
