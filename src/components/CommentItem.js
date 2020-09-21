import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Button from "./Button";
import { deleteComment } from "../store/actions";
import { useDispatch } from "react-redux";

// import NothingSvg from "../svg/nothing.svg";
// import Loading from "../components/Loading";
import InputComment from "./InputComment";

const PostWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: transparent;
  border-radius: 0.8rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  margin: 1rem;
`;

const Title = styled.h2`
  text-align: left;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-primary-light);
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 3rem;

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1.5rem 1.5rem;
  }
`;

const RatingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-right: auto;
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--link-color);
  font-weight: 500;
  margin-bottom: 3rem;
  word-wrap: break-word;
  width: 70rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftButtons = styled.div`
  margin-right: auto;
  display: flex;

  @media ${(props) => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }

  & > *:not(:last-child) {
    margin-right: 2rem;

    @media ${(props) => props.theme.mediaQueries.large} {
      margin-right: 1rem;
    }
  }
`;

// Function to render list of movies
function PostItem({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  return (
    <LazyLoad height={200} offset={200}>
      <PostWrapper>
        <DetailsWrapper>
          <RatingsWrapper>
            <Title>{comment.name}</Title>
            <Text>{comment.body}</Text>
          </RatingsWrapper>
          <ButtonsWrapper>
            <LeftButtons>
              {
                <div onClick={() => dispatch(deleteComment(comment.id))}>
                  <Button title="Remove" icon="fa-trash" />
                </div>
              }

              {
                <div onClick={() => setIsEditing(true)}>
                  <Button title="Edit" icon="fa-pencil" />
                </div>
              }
              <InputComment
                opened={isEditing}
                editComment={comment}
                close={() => setIsEditing(false)}
              />
            </LeftButtons>
          </ButtonsWrapper>
        </DetailsWrapper>
      </PostWrapper>
    </LazyLoad>
  );
}

export default React.memo(PostItem);
