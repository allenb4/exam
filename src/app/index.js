import React, { useEffect } from "react";
import "app/App.css";
import logo from "app/logo.svg";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import { getCommentDatas, addComment } from "store/slices/comments";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Paper,
  Typography,
  ButtonBase,
  Grid,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  commentCard: {
    width: "75%",
    margin: "auto",
  },
  avatar: {
    margin: "auto",
  },
  commentItems: {
    margin: 14,
  },
  name: {
    fontWeight: "bold",
  },
}));

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let avatarColor = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    avatarColor += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return avatarColor;
};

const stringAvatar = (name) => {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    sx: {
      bgcolor: stringToColor(name),
    },
  };
};

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const comments = useSelector(getCommentDatas);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/comments";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch(addComment(data));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Header />

      <CommentModal />

      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <div className={classes.commentCard}>
        <h1>COMMENT SECTION:</h1>
      </div>

      {comments !== null ? (
        comments
          ?.map((item) => {
            return (
              <div className={classes.commentCard}>
                <Paper
                  sx={{
                    p: 2,
                    margin: "auto",
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    className={classes.commentItems}
                    key={item?.id}
                  >
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        {item?.name ? (
                          <Avatar
                            className={classes.avatar}
                            {...stringAvatar(item?.name)}
                          />
                        ) : (
                          <Avatar className={classes.avatar} />
                        )}
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography
                            className={classes.name}
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {item?.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {item?.body}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item?.email}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            sx={{ cursor: "pointer" }}
                            variant="body2"
                          >
                            {/* Remove */}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            );
          })
          .reverse()
      ) : (
        <div className={classes.commentCard}>
          {" "}
          <CircularProgress />{" "}
        </div>
      )}
    </>
  );
}

export default App;
