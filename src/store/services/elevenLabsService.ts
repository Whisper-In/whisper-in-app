import ReactNativeBlobUtil from 'react-native-blob-util';
import { REACT_APP_WHISPER_SERVICE_BASEURL } from '@env';
import { Store } from '../store';

const baseURL = `${REACT_APP_WHISPER_SERVICE_BASEURL}`;
const route = "eleven-labs";

let storeRef: Store;

export const initElevenServiceStore = (store: Store) => storeRef = store;

export const getTextToSpeech = async (aiProfileId: string, text: string) => {
    try {
        const token = storeRef.getState().user?.token;

        const result = await ReactNativeBlobUtil
            .config({
                fileCache: true,
                appendExt: 'mp3'
            })
            .fetch(
                "POST",
                `${baseURL}/${route}/text-to-speech/${aiProfileId}`,
                {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                JSON.stringify({ text })
            ).catch((error) => {
                throw error;
            });

        if (result.info().status != 200) {
            return {
                data: undefined                
            }
        }

        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
};