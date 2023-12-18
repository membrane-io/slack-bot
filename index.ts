// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persist across program updates. Store data here.
import { nodes, root, state } from "membrane";
import { api, parseQS } from "./utils";

export const Root = {
  configure: ({ args }) => {
    state.token = args.token;
  },
  status() {
    if (!state.token) {
      return "Please [configure the Slack token](https://api.slack.com/authentication/token-types#bot)";
    } else {
      return `Ready`;
    }
  }
};

export async function endpoint({ args: { path, body } }) {
  if (!body || !path) {
    return;
  }
  switch (path) {
    case "/commands": {
      const { response_url: url, text } = parseQueryString(body);

      const subcommand = text.split("+")[0].toLowerCase();
      const prompt = text.substring(text.indexOf("+") + 1);

      switch (subcommand) {
        case "chat": {
          completionChat(url, prompt);
          return "Processing...";
        }
        case "image": {
          generateImg(url, prompt);
          return "Generating image...";
        }
        case "help": {
          return "\n\nCommands: \n\nchat - generate a chat response \nimage - generate an image \nmoderate - moderate a text \n\nExample: \n\n/botgpt chat <prompt> \n/botgpt image <prompt> \n";
        }
      }
      return "Command not found. Try \n/botgpt help";
    }
    default:
      console.log("Unknown Endpoint:", path);
  }
  return;
}

async function generateImg(url: string, text: string): Promise<void> {
  const res = await nodes.openai.image({ prompt: text, n: 1 }).$invoke();

  return await api("POST", url, {
    replace_original: "true",
    text: res[0].url,
  });
}

async function completionChat(url: string, text: string): Promise<void> {
  const gptText = await nodes.openai.completion({ prompt: text }).$invoke();
  
  return await api("POST", url, {
    replace_original: "true",
    text: gptText,
  });
}
