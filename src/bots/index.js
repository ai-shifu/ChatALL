// Bots
import GeminiAPIBot from "@/bots/google/GeminiAPIBot";
import Gemini15ProAPIBot from "@/bots/google/Gemini15ProAPIBot";
import Gemini15FlashAPIBot from "@/bots/google/Gemini15FlashAPIBot";
import Gemini20FlashAPIBot from "@/bots/google/Gemini20FlashAPIBot";
import Gemini20FlashLiteAPIBot from "@/bots/google/Gemini20FlashLiteAPIBot";
import Gemini25ProAPIBot from "@/bots/google/Gemini25ProAPIBot";
import Gemini25FlashAPIBot from "@/bots/google/Gemini25FlashAPIBot";
import ChatGPT4Bot from "@/bots/openai/ChatGPT4Bot";
import CohereAPICommandBot from "@/bots/cohere/CohereAPICommandBot";
import CohereAPICommandLightBot from "@/bots/cohere/CohereAPICommandLightBot";
import CohereAPICommandRBot from "@/bots/cohere/CohereAPICommandRBot";
import CohereAPICommandRPlusBot from "@/bots/cohere/CohereAPICommandRPlusBot";
import CohereAPIAya23Bot from "@/bots/cohere/CohereAPIAya23Bot";
import BingChatPreciseBot from "@/bots/microsoft/BingChatPreciseBot";
import BingChatBalancedBot from "@/bots/microsoft/BingChatBalancedBot";
import BingChatCreativeBot from "@/bots/microsoft/BingChatCreativeBot";
import SparkBot from "@/bots/SparkBot";
import BardBot from "@/bots/google/BardBot";
import OpenAIAPI35Bot from "@/bots/openai/OpenAIAPI35Bot";
import OpenAIAPI4Bot from "@/bots/openai/OpenAIAPI4Bot";
import OpenAIAPI4128KBot from "@/bots/openai/OpenAIAPI4128KBot";
import OpenAIAPI4oBot from "@/bots/openai/OpenAIAPI4oBot";
import OpenAIAPI4oMiniBot from "./openai/OpenAIAPI4oMiniBot";
import OpenAIAPI41Bot from "./openai/OpenAIAPI41Bot";
import OpenAIAPI41MiniBot from "./openai/OpenAIAPI41MiniBot";
import OpenAIAPI41NanoBot from "./openai/OpenAIAPI41NanoBot";
import OpenAIAPIo1Bot from "./openai/OpenAIAPIo1Bot";
import OpenAIAPIo1MiniBot from "./openai/OpenAIAPIo1MiniBot";
import OpenAIAPIo3Bot from "@/bots/openai/OpenAIAPIo3Bot";
import OpenAIAPIo3MiniBot from "./openai/OpenAIAPIo3MiniBot";
import OpenAIAPIo4MiniBot from "@/bots/openai/OpenAIAPIo4MiniBot";
import OpenAIAPI45Bot from "./openai/OpenAIAPI45Bot";
import MistralBot from "./MistralBot";
import MOSSBot from "@/bots/MOSSBot";
import WenxinQianfanBot from "@/bots/baidu/WenxinQianfanBot";
import ChatGLMBot from "@/bots/zhipu/ChatGLMBot";
import DevBot from "@/bots/DevBot";
import GradioAppBot from "@/bots/huggingface/GradioAppBot";
import Gemma7bGroqAPIBot from "@/bots/groq/Gemma7bGroqAPIBot";
import Gemma29bGroqAPIBot from "@/bots/groq/Gemma29bGroqAPIBot";
import Llama38bGroqAPIBot from "@/bots/groq/Llama38bGroqAPIBot";
import Llama370bGroqAPIBot from "@/bots/groq/Llama370bGroqAPIBot";
import Llama4ScoutGroqAPIBot from "@/bots/groq/Llama4ScoutGroqAPIBot";
import Llama4MaverickGroqAPIBot from "@/bots/groq/Llama4MaverickGroqAPIBot";
import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";
import QianWenBot from "./QianWenBot";
import SkyWorkBot from "./SkyWorkBot";
import AzureOpenAIAPIBot from "./microsoft/AzureOpenAIAPIBot";
import WenxinQianfanTurboBot from "./baidu/WenxinQianfanTurboBot";
import YouChatBot from "./YouChatBot";
import PerplexityBot from "./PerplexityBot";
import PhindBot from "./PhindBot";
import PiBot from "./PiBot";
import Qihoo360AIBrainBot from "./Qihoo360AIBrainBot";
import CharacterAIBot from "./CharacterAIBot";
import ClaudeAIBot from "./ClaudeAIBot";
import WenxinQianfan4Bot from "./baidu/WenxinQianfan4Bot";
import GeminiAdvBot from "./google/GeminiAdvBot";
import ChatGLM4Bot from "./zhipu/ChatGLM4Bot";
import KimiBot from "./moonshot/KimiBot";
import ClaudeAPIOpusBot from "./anthropic/ClaudeAPIOpusBot";
import ClaudeAPI20Bot from "./anthropic/ClaudeAPI20Bot";
import ClaudeAPI21Bot from "./anthropic/ClaudeAPI21Bot";
import ClaudeAPISonnetBot from "./anthropic/ClaudeAPISonnetBot";
import ClaudeAPI37SonnetBot from "./anthropic/ClaudeAPI37SonnetBot";
import ClaudeAPIHaikuBot from "./anthropic/ClaudeAPIHaikuBot";
import Grok2APIBot from "./xai/Grok2APIBot";
import Grok3APIBot from "./xai/Grok3APIBot";
import Grok3MiniAPIBot from "./xai/Grok3MiniAPIBot";

const all = [
  Qihoo360AIBrainBot.getInstance(),
  BingChatCreativeBot.getInstance(),
  BingChatBalancedBot.getInstance(),
  BingChatPreciseBot.getInstance(),
  CharacterAIBot.getInstance(),
  ChatGLMBot.getInstance(),
  ChatGLM4Bot.getInstance(),
  ClaudeAIBot.getInstance(),
  ClaudeAPIOpusBot.getInstance(),
  ClaudeAPISonnetBot.getInstance(),
  ClaudeAPI37SonnetBot.getInstance(),
  ClaudeAPIHaikuBot.getInstance(),
  ClaudeAPI20Bot.getInstance(),
  ClaudeAPI21Bot.getInstance(),
  CohereAPICommandBot.getInstance(),
  CohereAPICommandLightBot.getInstance(),
  CohereAPICommandRBot.getInstance(),
  CohereAPICommandRPlusBot.getInstance(),
  CohereAPIAya23Bot.getInstance(),
  WenxinQianfanBot.getInstance(),
  WenxinQianfanTurboBot.getInstance(),
  WenxinQianfan4Bot.getInstance(),
  BardBot.getInstance(),
  GeminiAdvBot.getInstance(),
  GeminiAPIBot.getInstance(),
  Gemini15ProAPIBot.getInstance(),
  Gemini15FlashAPIBot.getInstance(),
  Gemini20FlashAPIBot.getInstance(),
  Gemini20FlashLiteAPIBot.getInstance(),
  Gemini25ProAPIBot.getInstance(),
  Gemini25FlashAPIBot.getInstance(),
  AzureOpenAIAPIBot.getInstance(),
  OpenAIAPI35Bot.getInstance(),
  ChatGPT4Bot.getInstance(),
  OpenAIAPI4Bot.getInstance(),
  OpenAIAPI4128KBot.getInstance(),
  OpenAIAPI4oBot.getInstance(),
  OpenAIAPI4oMiniBot.getInstance(),
  OpenAIAPI41Bot.getInstance(),
  OpenAIAPI41MiniBot.getInstance(),
  OpenAIAPI41NanoBot.getInstance(),
  OpenAIAPIo1Bot.getInstance(),
  OpenAIAPIo1MiniBot.getInstance(),
  OpenAIAPIo3Bot.getInstance(),
  OpenAIAPIo3MiniBot.getInstance(),
  OpenAIAPIo4MiniBot.getInstance(),
  OpenAIAPI45Bot.getInstance(),
  GradioAppBot.getInstance(),
  Gemma7bGroqAPIBot.getInstance(),
  Gemma29bGroqAPIBot.getInstance(),
  Llama38bGroqAPIBot.getInstance(),
  Llama370bGroqAPIBot.getInstance(),
  Llama4ScoutGroqAPIBot.getInstance(),
  Llama4MaverickGroqAPIBot.getInstance(),
  KimiBot.getInstance(),
  MistralBot.getInstance(),
  MOSSBot.getInstance(),
  HuggingChatBot.getInstance(),
  PerplexityBot.getInstance(),
  PhindBot.getInstance(),
  PiBot.getInstance(),
  QianWenBot.getInstance(),
  SkyWorkBot.getInstance(),
  SparkBot.getInstance(),
  YouChatBot.getInstance(),
  Grok2APIBot.getInstance(),
  Grok3APIBot.getInstance(),
  Grok3MiniAPIBot.getInstance(),
];

const disabled = ["HuggingChatBot"];

if (process.env.NODE_ENV !== "production") {
  all.push(DevBot.getInstance());
}

const bots = {
  all,
  getBotByClassName(className) {
    return all.find((bot) => bot.getClassname() === className);
  },
};

disabled.forEach((className) => {
  const bot = bots.getBotByClassName(className);
  bot?.disable();
});

export const botTags = {
  free: [
    bots.getBotByClassName("BardBot"),
    bots.getBotByClassName("BingChatBalancedBot"),
    bots.getBotByClassName("BingChatCreativeBot"),
    bots.getBotByClassName("BingChatPreciseBot"),
    bots.getBotByClassName("ChatGLMBot"),
    bots.getBotByClassName("ChatGLM4Bot"),
    bots.getBotByClassName("HuggingChatBot"),
    bots.getBotByClassName("MistralBot"),
    bots.getBotByClassName("MOSSBot"),
    bots.getBotByClassName("Qihoo360AIBrainBot"),
    bots.getBotByClassName("QianWenBot"),
    bots.getBotByClassName("SkyWorkBot"),
    bots.getBotByClassName("SparkBot"),
    bots.getBotByClassName("YouChatBot"),
    bots.getBotByClassName("GradioAppBot"),
    bots.getBotByClassName("CharacterAIBot"),
    bots.getBotByClassName("ClaudeAIBot"),
    bots.getBotByClassName("PerplexityBot"),
    bots.getBotByClassName("PhindBot"),
    bots.getBotByClassName("PiBot"),
    bots.getBotByClassName("KimiBot"),
  ],
  paid: [
    bots.getBotByClassName("ChatGPT4Bot"),
    bots.getBotByClassName("GeminiAdvBot"),
  ],
  openSource: [
    bots.getBotByClassName("HuggingChatBot"),
    bots.getBotByClassName("MOSSBot"),
  ],
  api: [
    bots.getBotByClassName("GeminiAPIBot"),
    bots.getBotByClassName("Gemini15ProAPIBot"),
    bots.getBotByClassName("Gemini15FlashAPIBot"),
    bots.getBotByClassName("Gemini20FlashAPIBot"),
    bots.getBotByClassName("Gemini20FlashLiteAPIBot"),
    bots.getBotByClassName("Gemini25ProAPIBot"),
    bots.getBotByClassName("Gemini25FlashAPIBot"),
    bots.getBotByClassName("AzureOpenAIAPIBot"),
    bots.getBotByClassName("OpenAIAPI35Bot"),
    bots.getBotByClassName("OpenAIAPI4Bot"),
    bots.getBotByClassName("OpenAIAPI4128KBot"),
    bots.getBotByClassName("OpenAIAPI4oBot"),
    bots.getBotByClassName("OpenAIAPI4oMiniBot"),
    bots.getBotByClassName("OpenAIAPI41Bot"),
    bots.getBotByClassName("OpenAIAPI41MiniBot"),
    bots.getBotByClassName("OpenAIAPI41NanoBot"),
    bots.getBotByClassName("OpenAIAPIo1Bot"),
    bots.getBotByClassName("OpenAIAPIo1MiniBot"),
    bots.getBotByClassName("OpenAIAPIo3Bot"),
    bots.getBotByClassName("OpenAIAPIo3MiniBot"),
    bots.getBotByClassName("OpenAIAPIo4MiniBot"),
    bots.getBotByClassName("OpenAIAPI45Bot"),
    bots.getBotByClassName("WenxinQianfanBot"),
    bots.getBotByClassName("WenxinQianfanTurboBot"),
    bots.getBotByClassName("WenxinQianfan4Bot"),
    bots.getBotByClassName("ClaudeAPI20Bot"),
    bots.getBotByClassName("ClaudeAPI21Bot"),
    bots.getBotByClassName("ClaudeAPIHaikuBot"),
    bots.getBotByClassName("ClaudeAPIOpusBot"),
    bots.getBotByClassName("ClaudeAPISonnetBot"),
    bots.getBotByClassName("ClaudeAPI37SonnetBot"),
    bots.getBotByClassName("CohereAPICommandBot"),
    bots.getBotByClassName("CohereAPICommandLightBot"),
    bots.getBotByClassName("CohereAPICommandRBot"),
    bots.getBotByClassName("CohereAPICommandRPlusBot"),
    bots.getBotByClassName("CohereAPIAya23Bot"),
    bots.getBotByClassName("Gemma7bGroqAPIBot"),
    bots.getBotByClassName("Gemma29bGroqAPIBot"),
    bots.getBotByClassName("Llama38bGroqAPIBot"),
    bots.getBotByClassName("Llama370bGroqAPIBot"),
    bots.getBotByClassName("Llama4ScoutGroqAPIBot"),
    bots.getBotByClassName("Llama4MaverickGroqAPIBot"),
    bots.getBotByClassName("Grok2APIBot"),
    bots.getBotByClassName("Grok3APIBot"),
    bots.getBotByClassName("Grok3MiniAPIBot"),
  ],
  madeInChina: [
    bots.getBotByClassName("Qihoo360AIBrainBot"),
    bots.getBotByClassName("QianWenBot"),
    bots.getBotByClassName("SkyWorkBot"),
    bots.getBotByClassName("SparkBot"),
    bots.getBotByClassName("WenxinQianfanBot"),
    bots.getBotByClassName("WenxinQianfanTurboBot"),
    bots.getBotByClassName("WenxinQianfan4Bot"),
    bots.getBotByClassName("MOSSBot"),
    bots.getBotByClassName("ChatGLMBot"),
    bots.getBotByClassName("ChatGLM4Bot"),
    bots.getBotByClassName("KimiBot"),
  ],
};
export default bots;
