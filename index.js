import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { fileURLToPath } from "url";
import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
  modelPath: path.join(
    __dirname,
    "models",
    "codeninja-1.0-openchat-7b.Q2_K.gguf"
  ),
});
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });

// const q1 = "Hi there, how are you?";
// console.log("User: " + q1);

// const a1 = await session.prompt(q1);
// console.log("AI: " + a1);

// const q2 = "How create a html site?";
// console.log("User: " + q2);

// const a2 = await session.prompt(q2);
// console.log("AI: " + a2);

const client = new Client();

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (msg) => {
  console.log(msg.body);
  if (msg.body) {
    session.prompt(msg.body).then((res) => {
      msg.reply(res);
    });
  }
});

client.initialize();
