import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

import NothingSvg from "../svg/nothing.svg";
import EmptySvg from "../svg/empty.svg";

// import Rating from "../components/Rating";
// import Loading from "../components/Loading";

const PostWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: transparent;
  border-radius: 0.8rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);

  &:hover {
    transform: scale(1.03);

    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    background-color: var(--color-primary);
    z-index: -99;
    box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const PostImg = styled.img`
  width: 100%;
  height: 38rem;
  object-fit: contain;
  border-radius: 0.8rem;
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

  ${PostWrapper}:hover & {
    border-radius: 0.8rem 0.8rem 0rem 0rem;
    box-shadow: none;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const ImgLoading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  border-radius: 0.8rem;
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-primary-light);
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  ${PostWrapper}:hover & {
    color: var(--text-color);
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1.5rem 1.5rem;
  }
`;

// Function to render list of Posts
const PostItem = ({ post }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => setLoaded(false);
  }, []);

  return (
    <LazyLoad height={200} offset={200}>
      <PostWrapper to={`${process.env.PUBLIC_URL}/posts/${post.id}`}>
        <ImgLoading>
          <PostImg
            error={error ? 1 : 0}
            onLoad={() => setLoaded(true)}
            style={!loaded ? { display: "none" } : {}}
            src={EmptySvg}
            // If no image, error will occurr, we set error to true
            // And only change the src to the nothing svg if it isn't already, to avoid infinite callback
            onError={(e) => {
              setError(true);
              if (e.target.src !== `${NothingSvg}`) {
                e.target.src = `${NothingSvg}`;
              }
            }}
          />
        </ImgLoading>

        <DetailsWrapper>
          <Title>{post.title}</Title>
        </DetailsWrapper>
      </PostWrapper>
    </LazyLoad>
  );
};

export default React.memo(PostItem);
