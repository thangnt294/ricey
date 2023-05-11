import axios from "axios";
import { FB_API_VERSION, FB_PAGE_ACCESS_TOKEN } from "./constants.js";

export const react = async (pageID, recipientID, action) => {
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${pageID}/messages`;
  try {
    await axios.post(url, null, {
      params: {
        recipient: {
          id: recipientID,
        },
        sender_action: action,
        access_token: FB_PAGE_ACCESS_TOKEN,
      },
    });
  } catch (err) {
    console.log(
      `error from facebookAPI at react(${pageID}, ${recipientID}, ${action})`
    );
  }
};

export const sendMsg = async (pageID, recipientID, msg) => {
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${pageID}/messages`;
  try {
    await axios.post(url, null, {
      params: {
        recipient: {
          id: recipientID,
        },
        messaging_type: "RESPONSE",
        message: {
          text: msg,
        },
        access_token: FB_PAGE_ACCESS_TOKEN,
      },
    });
  } catch (err) {
    console.log(
      `error from facebookAPI at sendMsg(${pageID}, ${recipientID}, ${msg})`
    );
  }
};
