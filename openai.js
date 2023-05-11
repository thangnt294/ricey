import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY, OPENAI_ORG_ID } from "./constants.js";
import withTemplate from "./template.js";

const configuration = new Configuration({
  organization: OPENAI_ORG_ID,
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const sendMsgToGPT = async (msg) => {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: withTemplate(msg) }],
    });
    return res.data.choices[0].message.content;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export default sendMsgToGPT;
