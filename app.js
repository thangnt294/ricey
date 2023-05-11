import express from "express";
import sendMsgToGPT from "./openai.js";
import { react, sendMsg } from "./facebook.js";
import * as dotenv from "dotenv";
import body_parser from "body-parser";
import { FB_VERIFY_TOKEN, PORT } from "./constants.js";

dotenv.config();

// FACEBOOK
const app = express().use(body_parser.json()); // creates express http server

app.listen(PORT, () => console.log(`webhook is listening on port ${PORT}`));

// Facebook verify webhook working
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === FB_VERIFY_TOKEN) {
      console.log("Webhook successfully verified by Facebook");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Actual webhook
app.post("/webhook", async (req, res) => {
  let body = req.body;
  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(async function (entry) {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      let { sender, recipient, message } = entry.messaging[0];

      await react(recipient.id, sender.id, "typing_on");

      // talk to chatGPT
      const gptReply = await sendMsgToGPT(message.text);
      await sendMsg(recipient.id, sender.id, gptReply);

      await react(recipient.id, sender.id, "typing_off");
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});
