import React from "react";
import styled from "styled-components";

import CommentItem from "./CommentItem";
// import Pagination from "./Pagination";

const PostsWrapper = styled.div`
  display: grid;
  justify-content: space-evenly;
  align-content: space-between;
  align-items: start;
  padding: 4rem 0;
  grid-gap: 4rem 2rem;

  @media ${(props) => props.theme.mediaQueries.small} {
    justify-content: space-around;
    grid-gap: 4rem 1.5rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    grid-gap: 4rem 1rem;
  }
`;

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return null;
  }

  return (
    <>
      <PostsWrapper>
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </PostsWrapper>
      {/* <Pagination posts={posts} /> */}
    </>
  );
};

export default React.memo(CommentList);
