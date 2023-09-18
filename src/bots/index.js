// Bots
import ChatGPT35Bot from "@/bots/openai/ChatGPT35Bot";
import ChatGPT4Bot from "@/bots/openai/ChatGPT4Bot";
import ChatGPTBrowsingBot from "@/bots/openai/ChatGPTBrowsingBot";
import BingChatPreciseBot from "@/bots/microsoft/BingChatPreciseBot";
import BingChatBalancedBot from "@/bots/microsoft/BingChatBalancedBot";
import BingChatCreativeBot from "@/bots/microsoft/BingChatCreativeBot";
import SageBot from "@/bots/poe/SageBot";
import SparkBot from "@/bots/SparkBot";
import BardBot from "@/bots/BardBot";
import OpenAIAPI35Bot from "@/bots/openai/OpenAIAPI35Bot";
import OpenAIAPI4Bot from "@/bots/openai/OpenAIAPI4Bot";
import MOSSBot from "@/bots/MOSSBot";
import WenxinQianfanBot from "@/bots/baidu/WenxinQianfanBot";
import VicunaBot from "@/bots/lmsys/VicunaBot";
import ChatGLMBot from "@/bots/ChatGLMBot";
import AlpacaBot from "@/bots/lmsys/AlpacaBot";
import ClaudeBot from "@/bots/lmsys/ClaudeBot";
import DevBot from "@/bots/DevBot";
import GradioAppBot from "@/bots/huggingface/GradioAppBot";
import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";
import QianWenBot from "./QianWenBot";
import ChatGPT35PoeBot from "./poe/ChatGPT35PoeBot";
import ChatGPT4PoeBot from "./poe/ChatGPT4PoeBot";
import ClaudeInstantPoeBot from "./poe/ClaudeInstantPoeBot";
import ClaudeInstant100kPoeBot from "./poe/ClaudeInstant100kPoeBot";
import ClaudePlusPoeBot from "./poe/ClaudePlusPoeBot";
import ChatGPT432kPoeBot from "./poe/ChatGPT432kPoeBot";
import SkyWorkBot from "./SkyWorkBot";
import ChatGPT4MobileBot from "./openai/ChatGPT4MobileBot";
import OpenAIAPI3516KBot from "./openai/OpenAIAPI3516KBot";
import AzureOpenAIAPIBot from "./microsoft/AzureOpenAIAPIBot";
import WenxinQianfanTurboBot from "./baidu/WenxinQianfanTurboBot";
import YouChatBot from "./YouChatBot";
import PiBot from "./PiBot";
import Qihoo360AIBrainBot from "./Qihoo360AIBrainBot";
import OpenAssistantBot from "./OpenAssistantBot";
import CharacterAIBot from "./CharacterAIBot";
import ClaudeAIBot from "./ClaudeAIBot";
import Llama2HC70bBot from "./huggingface/Llama2HC70bBot";
import Llama213bBot from "./lmsys/Llama213bBot";
import Llama27bBot from "./lmsys/Llama27bBot";
import Llama270bBot from "./lmsys/Llama270bBot";
import Falcon180bBot from "./huggingface/Falcon180bBot";
import ChatGLM6bBot from "./lmsys/ChatGLM6bBot";
import CodeLlamaBot from "./lmsys/CodeLlamaBot";
import Vicuna7bBot from "./lmsys/Vicuna7bBot";
import Vicuna13bBot from "./lmsys/Vicuna13bBot";
import Wizardlm13bBot from "./lmsys/Wizardlm13bBot";
import Wizardlm70bBot from "./lmsys/Wizardlm70bBot";

const all = [
  Qihoo360AIBrainBot.getInstance(),
  AlpacaBot.getInstance(),
  SageBot.getInstance(), // Assistant@Poe
  BardBot.getInstance(),
  BingChatCreativeBot.getInstance(),
  BingChatBalancedBot.getInstance(),
  BingChatPreciseBot.getInstance(),
  CharacterAIBot.getInstance(),
  ChatGLMBot.getInstance(),
  ChatGLM6bBot.getInstance(),
  ClaudeInstantPoeBot.getInstance(),
  ClaudeInstant100kPoeBot.getInstance(),
  ClaudeBot.getInstance(),
  ClaudeAIBot.getInstance(),
  ClaudePlusPoeBot.getInstance(),
  CodeLlamaBot.getInstance(),
  WenxinQianfanBot.getInstance(),
  WenxinQianfanTurboBot.getInstance(),
  Falcon180bBot.getInstance(),
  AzureOpenAIAPIBot.getInstance(),
  ChatGPT35Bot.getInstance(),
  ChatGPT35PoeBot.getInstance(),
  OpenAIAPI35Bot.getInstance(),
  OpenAIAPI3516KBot.getInstance(),
  ChatGPT4Bot.getInstance(),
  ChatGPT4MobileBot.getInstance(),
  ChatGPT4PoeBot.getInstance(),
  ChatGPTBrowsingBot.getInstance(),
  OpenAIAPI4Bot.getInstance(),
  ChatGPT432kPoeBot.getInstance(),
  GradioAppBot.getInstance(),
  Llama27bBot.getInstance(),
  Llama213bBot.getInstance(),
  Llama270bBot.getInstance(),
  Llama2HC70bBot.getInstance(),
  MOSSBot.getInstance(),
  HuggingChatBot.getInstance(),
  OpenAssistantBot.getInstance(),
  PiBot.getInstance(),
  QianWenBot.getInstance(),
  SkyWorkBot.getInstance(),
  SparkBot.getInstance(),
  Vicuna7bBot.getInstance(),
  Vicuna13bBot.getInstance(),
  VicunaBot.getInstance(),
  Wizardlm13bBot.getInstance(),
  Wizardlm70bBot.getInstance(),
  YouChatBot.getInstance(),
];

const disabled = ["ClaudeBot", "ChatGPTBrowsingBot", "AlpacaBot"];

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
    bots.getBotByClassName("ChatGLM6bBot"),
    bots.getBotByClassName("ChatGPT35Bot"),
    bots.getBotByClassName("ChatGPT35PoeBot"),
    bots.getBotByClassName("ClaudeBot"),
    bots.getBotByClassName("ClaudeInstantPoeBot"),
    bots.getBotByClassName("HuggingChatBot"),
    bots.getBotByClassName("Llama27bBot"),
    bots.getBotByClassName("Llama213bBot"),
    bots.getBotByClassName("Llama270bBot"),
    bots.getBotByClassName("Llama2HC70bBot"),
    bots.getBotByClassName("CodeLlamaBot"),
    bots.getBotByClassName("MOSSBot"),
    bots.getBotByClassName("OpenAssistantBot"),
    bots.getBotByClassName("Qihoo360AIBrainBot"),
    bots.getBotByClassName("QianWenBot"),
    bots.getBotByClassName("SkyWorkBot"),
    bots.getBotByClassName("SparkBot"),
    bots.getBotByClassName("YouChatBot"),
    bots.getBotByClassName("GradioAppBot"),
    bots.getBotByClassName("AlpacaBot"),
    bots.getBotByClassName("VicunaBot"),
    bots.getBotByClassName("Vicuna7bBot"),
    bots.getBotByClassName("Vicuna13bBot"),
    bots.getBotByClassName("CharacterAIBot"),
    bots.getBotByClassName("ClaudeAIBot"),
    bots.getBotByClassName("PiBot"),
    bots.getBotByClassName("SageBot"),
    bots.getBotByClassName("Falcon180bBot"),
    bots.getBotByClassName("Wizardlm13bBot"),
    bots.getBotByClassName("Wizardlm70bBot"),
  ],
  paid: [
    bots.getBotByClassName("ChatGPT4Bot"),
    bots.getBotByClassName("ChatGPT4MobileBot"),
    bots.getBotByClassName("ChatGPT4PoeBot"),
    bots.getBotByClassName("ChatGPTBrowsingBot"),
    bots.getBotByClassName("ClaudeInstant100kPoeBot"),
    bots.getBotByClassName("ClaudePlusPoeBot"),
    bots.getBotByClassName("ChatGPT432kPoeBot"),
  ],
  openSource: [
    bots.getBotByClassName("AlpacaBot"),
    bots.getBotByClassName("HuggingChatBot"),
    bots.getBotByClassName("Llama27bBot"),
    bots.getBotByClassName("Llama213bBot"),
    bots.getBotByClassName("Llama270bBot"),
    bots.getBotByClassName("Llama2HC70bBot"),
    bots.getBotByClassName("MOSSBot"),
    bots.getBotByClassName("OpenAssistantBot"),
    bots.getBotByClassName("VicunaBot"),
    bots.getBotByClassName("Vicuna7bBot"),
    bots.getBotByClassName("Vicuna13bBot"),
    bots.getBotByClassName("Falcon180bBot"),
    bots.getBotByClassName("ChatGLM6bBot"),
    bots.getBotByClassName("CodeLlamaBot"),
    bots.getBotByClassName("Wizardlm13bBot"),
    bots.getBotByClassName("Wizardlm70bBot"),
  ],
  api: [
    bots.getBotByClassName("AzureOpenAIAPIBot"),
    bots.getBotByClassName("OpenAIAPI35Bot"),
    bots.getBotByClassName("OpenAIAPI3516KBot"),
    bots.getBotByClassName("OpenAIAPI4Bot"),
    bots.getBotByClassName("WenxinQianfanBot"),
    bots.getBotByClassName("WenxinQianfanTurboBot"),
  ],
  madeInChina: [
    bots.getBotByClassName("Qihoo360AIBrainBot"),
    bots.getBotByClassName("QianWenBot"),
    bots.getBotByClassName("SkyWorkBot"),
    bots.getBotByClassName("SparkBot"),
    bots.getBotByClassName("WenxinQianfanBot"),
    bots.getBotByClassName("WenxinQianfanTurboBot"),
    bots.getBotByClassName("MOSSBot"),
    bots.getBotByClassName("ChatGLMBot"),
    bots.getBotByClassName("ChatGLM6bBot"),
  ],
};
export default bots;
