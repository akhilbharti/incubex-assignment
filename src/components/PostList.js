import React from "react";
import styled from "styled-components";

import PostItem from "./PostItem";
// import Pagination from "./Pagination";

const PostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
  justify-content: space-evenly;
  align-content: space-between;
  align-items: start;
  padding: 4rem 0;
  grid-gap: 4rem 2rem;

  @media ${(props) => props.theme.mediaQueries.small} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 23rem));
    justify-content: space-around;
    grid-gap: 4rem 1.5rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 18rem));
    grid-gap: 4rem 1rem;
  }
`;

const PostsList = ({ posts }) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <>
      <PostsWrapper>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </PostsWrapper>
      {/* <Pagination posts={posts} /> */}
    </>
  );
};

export default React.memo(PostsList);
