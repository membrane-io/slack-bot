## Setup

1. [Run this program](https://www.membrane.io/docs/guide/using-membrane/installing-a-driver) on you Membrane account
2. [Create a new Slack App](https://api.slack.com/apps/).
3. Configure your Slack app:
    1. Under "Slash Commands": create a new slash command (e.g. `/botgpt`) to hit your [Membrane program's endpoint](https://www.membrane.io/docs/guide/conventions/the-endpoint-action)
    1. Under "OAuth and Permissions": Generate a "Bot User OAuth token"
6. Use the token from the previous step to configure your Membrane program (Use the graph explorer or `mctl action slack-bot:configure(token:"<your-token>")`)

## Usage

Use `/botgpt help` command in a channel with app permissions
