<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="SwarSetu Logo" />
</p>

<p align="center">SwarSetu: A real-time multilingual voice communication bridge using AI-powered translation and synthesis.</p>

<p align="center">
  <a href="https://github.com/SumitKumar2666/swarsetu-backend" target="_blank"><img src="https://img.shields.io/github/v/release/SumitKumar2666/swarsetu-backend" alt="GitHub Release" /></a>
  <a href="https://github.com/SumitKumar2666/swarsetu-backend" target="_blank"><img src="https://img.shields.io/github/license/SumitKumar2666/swarsetu-backend" alt="License" /></a>
  <a href="https://github.com/SumitKumar2666/swarsetu-backend" target="_blank"><img src="https://img.shields.io/github/stars/SumitKumar2666/swarsetu-backend" alt="GitHub Stars" /></a>
  <a href="https://twitter.com/sumitkumar2666" target="_blank"><img src="https://img.shields.io/twitter/follow/sumitkumar2666.svg?style=social&label=Follow"></a>
</p>


## Description

**SwarSetu** is a real-time voice translation platform designed to bridge communication gaps across different languages. It utilizes AI-powered tools for seamless multilingual voice communication.

### Key Features:
- **Speech-to-Text**: Converts voice input to text using Google Speech-to-Text API.
- **Text Translation**: Translates text between supported languages using OpenAI GPT-3.5-Turbo.
- **Text-to-Speech**: Converts translated text back to speech using Cartesia.ai Sonic Generative Voice API.
- **Language Support**: Currently supports German, English, Spanish, French, Japanese, Portuguese, and Chinese.

---

## Installation

Clone the repository and install dependencies:

```bash
$ git clone https://github.com/SumitKumar2666/swarsetu-backend.git
$ cd swarsetu-backend
$ yarn install
```

---

## Running the App

```bash
# Development mode
$ yarn start:dev

# Production mode
$ yarn start:prod
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
GOOGLE_API_KEY=<your_google_api_key>
OPENAI_API_KEY=<your_openai_api_key>
CARTESIA_API_KEY=<your_cartesia_api_key>
```

---

## Test

```bash
# Run unit tests
$ yarn test

# Run end-to-end tests
$ yarn test:e2e

# Generate test coverage report
$ yarn test:cov
```

---

## How It Works

1. **Voice Input**: User speaks into the microphone.
2. **Speech-to-Text**: Voice input is converted into text using Google Speech-to-Text API.
3. **Text Translation**: Text is translated into the target language using OpenAI GPT-3.5-Turbo.
4. **Text-to-Speech**: Translated text is synthesized back into speech using Cartesia.ai.

---

## Stay in Touch

- **Author**: [Sumit Kumar](https://www.linkedin.com/in/sumitkumar-dev)
- **GitHub**: [SumitKumar2666](https://github.com/SumitKumar2666)
- **Twitter**: [@sumitkumar2666](https://twitter.com/sumitkumar2666)

---

## License

This project is [MIT licensed](LICENSE).
