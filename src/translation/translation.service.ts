import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslationService {
  private readonly CARTESIA_API_URL = process.env.CARTESIA_API_URL;
  private readonly CARTESIA_API_KEY = process.env.CARTESIA_API_KEY;
  private readonly OPENAI_API_URL = process.env.OPENAI_API_URL;
  
  async speechToText(audioBase64: string): Promise<string> {
    try {
      const response = await axios.post(`${this.CARTESIA_API_URL}/speech-to-text`, { audio: audioBase64, language: "en-US" }, {
        headers: { 'Authorization': `Bearer ${this.CARTESIA_API_KEY}`,'Content-Type': 'application/json' }
      });
      return response.data.text;
    } catch (error) {
      throw new BadRequestException('Error processing speech to text:', error);
    }
  }

  async translateText(sourceText: string, sourceLang: string, targetLang: string): Promise<object> {
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "This is a translation task."
      }, {
        role: "user",
        content: `Translate the following text from ${sourceLang} to ${targetLang}: ${sourceText}`
      }]
    };
    
    try {
      const response = await axios.post(`${this.OPENAI_API_URL}/chat/completions`, data, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      const translatedText = response?.data?.choices[0]?.message?.content.trim();
      return {translatedText};
    } catch (error) {
      throw new Error('Error translating text: ' + error.message);
    }
  }

  async textToSpeech(text: string): Promise<Buffer> {
    const data = {
      transcript: text,
      model_id: "sonic-english",
      voice: {
        mode: "id",
        id: "a0e99841-438c-4a64-b679-ae501e7d6091"
      },
      output_format: {
        container: "raw",
        encoding: "pcm_f32le",
        sample_rate: 44100
      }
    };

    try {
      const response = await axios.post(`${this.CARTESIA_API_URL}/tts/bytes`, data, {
        headers: {
          'Cartesia-Version': '2024-06-10',
          'X-API-Key': this.CARTESIA_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      });
      return response.data;
    } catch (error) {
      console.error('Error processing text to speech:', error);
      throw new Error('Error processing text to speech');
    }
  }
  
}
