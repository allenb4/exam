import { createSlice, createSelector } from "@reduxjs/toolkit";

export const name = "comments";
const initialState = {
  commentDatas: null,
};

const commentSlice = createSlice({
  name,
  initialState,
  reducers: {
    addComment(state, action) {
      if (state.commentDatas !== null && state.commentDatas !== "") {
        state.commentDatas.push(action.payload);
      } else {
        state.commentDatas = action.payload;
      }
    },
  },
});

const getSlice = (state) => state[name] || {};

export const getCommentDatas = createSelector(
  getSlice,
  (slice) => slice.commentDatas
);

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
