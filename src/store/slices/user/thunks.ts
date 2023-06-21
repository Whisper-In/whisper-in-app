import { createAsyncThunk } from "@reduxjs/toolkit";
import { SetUserActionPayload } from "./types";
import { getUserProfile } from "../../services/userService";

export const fetchUserProfile = createAsyncThunk<SetUserActionPayload | any, string>(
    "user/fetchUserProfile",
    async (userId: string) => {
      let payload: SetUserActionPayload;    
  
      try {
        const userProfile = await getUserProfile(userId);
        
        payload = {            
            name: userProfile.name,
            aboutMe: userProfile.aboutMe,
            avatar: userProfile.avatar,        
            email: userProfile.email,            
        }
      } catch (error) {
        console.log(error);
        return {error};
      }
  
      return payload;
    }
  );