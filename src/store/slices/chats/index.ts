import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadChatsProfile, LoadChatsActionPayload } from "./types";
import {
  loadChatsReducer,
  addNewChatMessageReducer,
  toggleChatAudioRepliesReducer,
  updateChatFeaturesReducer,
} from "../../reducers/chatsReducer";
import { initialChatHistoryState } from "../../states/chatsState";
import { fetchChatCompletion, fetchChats } from "./thunks";


export const chatHistorySlice = createSlice({
  name: "chats",
  initialState: initialChatHistoryState,
  reducers: {
    addNewChatMessage: addNewChatMessageReducer,
    toggleAudioReplies: toggleChatAudioRepliesReducer,
    updateChatFeatures: updateChatFeaturesReducer
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, loadChatsReducer);
    builder.addCase(fetchChatCompletion.fulfilled, addNewChatMessageReducer);
  },
});

export const { 
  addNewChatMessage,
  toggleAudioReplies,
  updateChatFeatures
} = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
