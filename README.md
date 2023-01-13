Create app in the [slack dev portal](https://api.slack.com/apps/).

1: Configure the program callback url in your app
https://api.slack.com/apps/{APPID}/slash-commands

2: Generate bot token in OAuth & Permissions
https://api.slack.com/apps/{APPID}/oauth

Run `slack-bot: configure (token:<Token>)`

3: use `/botgpt help` command in a channel with app permissions