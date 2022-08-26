import { Container, Stack } from "@mui/material";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CustomCard from "../../../Components/CustomCard/CustomCard";
import { db } from "../../../FireBase/Config";

export default function UserEduFeed() {
  const [eduPosts, setEduPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "EduationalPost"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postData = [];
      querySnapshot.forEach((doc) => {
        postData.push({ ...doc.data(), id: doc.id });
      });
      setEduPosts(postData);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Container>
      <Stack direction="column">
        {eduPosts?.map((post) => {
          <CustomCard />;
        })}
      </Stack>
    </Container>
  );
}
