import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { Element, animateScroll as scroll } from "react-scroll";

import Helmet from "react-helmet";
import { getPostComments, clearPost } from "../store/actions";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
// import Cast from "../components/Cast";
import Loader from "../components/Loader";
import Button from "../components/Button";
import NothingSvg from "../svg/nothing.svg";
import BlogImage from "../svg/blogImage.svg";
import Loading from "../components/Loading";
import CommentList from "../components/CommentList";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: 7rem;
  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);

  @media ${(props) => props.theme.mediaQueries.largest} {
    max-width: 105rem;
  }

  @media ${(props) => props.theme.mediaQueries.larger} {
    max-width: 110rem;
    margin-bottom: 6rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    max-width: 110rem;
    margin-bottom: 5rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

const PostDetails = styled.div`
  width: 100%;
  max-width: 60%;
  padding: 4rem;
  flex: 1 1 60%;

  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1rem;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    padding: 0rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: 100%;
    flex: 1 1 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 4rem;

  @media ${(props) => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-bottom: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: 60%;
    flex: 1 1 60%;
  }
`;

const PostImg = styled.img`
  max-height: 100%;
  height: ${(props) => (props.error ? "25rem" : "auto")};
  object-fit: ${(props) => (props.error ? "contain" : "cover")};
  padding: ${(props) => (props.error ? "2rem" : "")};
  max-width: 100%;
  border-radius: 0.8rem;
  box-shadow: ${(props) =>
    props.error ? "none" : "0rem 2rem 5rem var(--shadow-color-dark)"};
`;

const ImgLoading = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const Info = styled.div`
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-primary-lighter);
  font-size: 1.3rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--link-color);
  font-weight: 500;
  margin-bottom: 3rem;
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

const AWrapper = styled.a`
  text-decoration: none;
`;

//Post Component
function PostComment() {
  const dispatch = useDispatch();
  const postComments = useSelector((state) => state.postComments);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const blogPost = useSelector((state) => state.posts?.blogPosts[id - 1]);
  let history = useHistory();

  const { comments, loading, user } = postComments;

  // Fetch Post id when id on the url changes
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    dispatch(getPostComments(id));
    return () => {
      dispatch(clearPost());
      setLoaded(false);
    };
  }, [dispatch, id]);

  //Render the back button if user was pushed into page
  function renderBack() {
    return (
      <div onClick={() => history.push("/")}>
        <Button title="Back" solid left icon="arrow-left" />
      </div>
    );
  }
  // If loading
  if (loading) {
    return <Loader />;
  }

  if (comments.status_code) {
    history.push(process.env.PUBLIC_URL + "/404");
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${user.name} - Author`}</title>
      </Helmet>
      <LazyLoad height={500}>
        <PostWrapper>
          {!loaded ? (
            <ImgLoading>
              <Loading />
            </ImgLoading>
          ) : null}
          <ImageWrapper style={!loaded ? { display: "none" } : {}}>
            <PostImg
              error={error ? 1 : 0}
              src={BlogImage}
              onLoad={() => setLoaded(true)}
              // If no image, error will occurr, we set error to true
              // And only change the src to the nothing svg if it isn't already, to avoid infinite callback
              onError={(e) => {
                setError(true);
                if (e.target.src !== `${NothingSvg}`) {
                  e.target.src = `${NothingSvg}`;
                }
              }}
            />
          </ImageWrapper>
          <PostDetails>
            <HeaderWrapper>
              <Header size="1" title={blogPost?.title} subtitle={user?.name} />
            </HeaderWrapper>
            <DetailsWrapper>
              <EmailWrapper>
                <Info>{user.email}</Info>
              </EmailWrapper>
              <Info>{user.phone}</Info>
            </DetailsWrapper>

            <Heading>The Synopsis</Heading>
            <Text>
              {blogPost?.body
                ? blogPost?.body
                : "There is no synopsis available..."}
            </Text>
            <ButtonsWrapper>
              <LeftButtons>{renderWebsite(user.website)}</LeftButtons>
              {renderBack()}
            </ButtonsWrapper>
          </PostDetails>
        </PostWrapper>
      </LazyLoad>
      <Header title="Comments" subtitle="blogs" />
      {renderComments(comments)}
    </Wrapper>
  );
}

// // Render Personal Website button
function renderWebsite(link) {
  if (!link) {
    return null;
  }
  return (
    <AWrapper target="_blank" href={link}>
      <Button title="Website" icon="link" />
    </AWrapper>
  );
}

// Render recommended comments
function renderComments(comments) {
  if (comments.length === 0) {
    return <NotFound title="Sorry!" subtitle={`There are no comments...`} />;
  } else {
    return (
      <Element name="scroll-to-element">
        <CommentList comments={comments} />;
      </Element>
    );
  }
}

export default React.memo(PostComment);
