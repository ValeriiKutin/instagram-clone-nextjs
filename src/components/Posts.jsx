import { collection, getDocs, orderBy, query } from "firebase/firestore";
import PostItem from "./PostItem";
import { db } from "@/firebase";
export default async function Posts() {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return (
    <div>
      {data.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </div>
  );
}
