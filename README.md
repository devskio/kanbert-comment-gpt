# kanbert-comment-gpt

A Chrome extension that creates comments on tasks in Kanbert, powered by OpenAI's ChatGPT.

## Setup

Following package is not in chrome store yet, so you need to install it manually.
Download the latest release from the [releases page]() and unzip it. Then follow the instructions below.

### Load extension to chrome

1. Go to `chrome://extensions/` and click Load Unpacked
2. Load `dist` folder

### Set API key for the OpenAI API

1. Log into your OpenAI account on the [OpenAI website](https://platform.openai.com/).
2. Click on the "API Keys" in the sidebar.
3. Click on the "Create new secret key" button to generate a new API key.
4. Once the API key is generated, you can copy it and set it on the kanbert-comment-gpt options.
5. Also fill in your name as it is shown in Kanbert. So the extension can map your name to your comments.

## Development

```
npm install
npm run build
```

### Build in watch mode

```
npm run watch
```
