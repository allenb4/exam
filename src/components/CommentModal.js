import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  TextField,
  FormControl,
  Modal,
  Card,
  CardActions,
  CardContent,
  Button,
  Grid,
} from "@material-ui/core";
import { HighlightOff, AddComment } from "@material-ui/icons";
import clsx from "clsx";
import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";
import { addComment, getCommentDatas } from "store/slices/comments";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: 250,
  },
  commentTextField: {
    width: 524,
  },
  actionButton: {
    marginLeft: 16,
  },
}));

const CommentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [commentSection, setComment] = useState("");

  const isOpen = useSelector(getViewCommentsModalOpen);
  const comments = useSelector(getCommentDatas);
  let isEmailValid = true;

  const validateEmail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === true) {
      return true;
    } else {
      return false;
    }
  };
  const handleClose = () => dispatch(closeCommentsModal());

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastData = comments[comments.length - 1];
    isEmailValid = validateEmail(email);

    const data = {};
    data.id = lastData.id + 1;
    data.name = firstName + " " + lastName;
    data.email = email;
    data.body = commentSection;

    if (email !== "" && isEmailValid) {
      if (data.name !== "" && data.body !== "") {
        dispatch(addComment(data));
        handleClose();

        setFirstName("");
        setEmail("");
        setLastName("");
        setComment("");
      }
    } else {
      if (data.name !== "" && data.body !== "") {
        dispatch(addComment(data));
        handleClose();

        setFirstName("");
        setLastName("");
        setComment("");
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6} md={4}>
              <FormControl>
                <TextField
                  label="First Name"
                  name="fistName"
                  id="firstName"
                  variant="outlined"
                  value={firstName}
                  onInput={(e) => setFirstName(e.target.value)}
                  className={clsx(classes.margin, classes.textField)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl>
                <TextField
                  label="Last Name"
                  name="lastName"
                  id="lastName"
                  variant="outlined"
                  value={lastName}
                  onInput={(e) => setLastName(e.target.value)}
                  className={clsx(classes.margin, classes.textField)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl>
                <TextField
                  error={email !== "" && !validateEmail(email)}
                  label="Email"
                  type="email"
                  name="email"
                  id="email"
                  variant="outlined"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  className={clsx(classes.margin, classes.textField)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <FormControl>
                <TextField
                  label="Comment Section"
                  name="commentSection"
                  id="commentSection"
                  placeholder="Comment"
                  multiline
                  variant="outlined"
                  value={commentSection}
                  onInput={(e) => setComment(e.target.value)}
                  className={clsx(classes.margin, classes.commentTextField)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={clsx(classes.margin, classes.actionButton)}>
          <Button
            variant="outlined"
            startIcon={<HighlightOff />}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddComment />}
            onClick={handleSubmit}
            disabled={email !== "" && !validateEmail(email)}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default CommentModal;
