import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import { getPosts, clearPosts } from "../store/actions";

import Loader from "../components/Loader";
import Header from "../components/Header";
import PostList from "../components/PostList";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

// Discover Component
function PostContainer() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  // Send url to setSelected Action Creator, it will check if is valid

  // Call hook to fetch posts discover, pass in the url query
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    dispatch(getPosts());
    return () => clearPosts();
  }, [dispatch]); // If loading
  if (posts.loading) {
    return <Loader />;
  }

  // Else return posts list
  return (
    <Wrapper>
      <Header title="Assignmnent" subtitle="Incubex" />
      <PostList posts={posts.blogPosts}></PostList>
    </Wrapper>
  );
}

export default PostContainer;
