import React from "react";
// import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { editCommentAction, addComment } from "../store/actions";

// import Button from "../../../components/UI/Forms/Button/Button";
import Header from "./Header";
import Modal from "./Modal";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
// import Message from "../../../components/UI/Message/Message";
// import { StyledForm } from "../../../hoc/layout/elements";

// import * as actions from "../../../store/actions";

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  width: 100%;
  padding: 0 3rem;
`;

export const StyledForm = styled(Form)`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const CommentSchema = Yup.object().shape({
  name: Yup.string().required("The title is required.").min(4, "Too short."),
  body: Yup.string().required("The body is required.").min(4, "Too short."),
});

const InputComment = ({ close, opened, editComment }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.postComments);

  const loadingText = editComment ? "Editing..." : "Adding...";

  return (
    <>
      <Modal opened={opened} close={close}>
        <Header title={editComment ? "Edit your todo" : "Add your new todo"} />
        <Formik
          initialValues={{
            name: editComment ? editComment.name : "",
            body: editComment ? editComment.body : "",
          }}
          validationSchema={CommentSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // send our todo
            const res = editComment
              ? dispatch(editCommentAction(editComment.id, values))
              : dispatch(addComment(values));
            if (res) {
              close();
            }
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <Field
                type="text"
                name="name"
                placeholder="Enter Name..."
                component={Input}
              />
              <Field
                type="text"
                name="body"
                placeholder="Enter Comments..."
                component={Input}
              />
              <ButtonsWrapper>
                <SubmitButton
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? loadingText : null}
                >
                  {editComment ? "Edit todo" : "Add todo"}
                </SubmitButton>
                <SubmitButton
                  type="button"
                  color="main"
                  contain
                  onClick={() => {
                    close();
                    resetForm();
                  }}
                >
                  Cancel
                </SubmitButton>
              </ButtonsWrapper>
              <MessageWrapper>
                {/* <Message error show={error}>
                  {error}
                </Message> */}
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default InputComment;
