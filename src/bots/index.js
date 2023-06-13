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
import ChatGLMBot from "@/bots/lmsys/ChatGLMBot";
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
import SkyWorkBot from "./SkyWorkBot";

const all = [
  AlpacaBot.getInstance(),
  BardBot.getInstance(),
  BingChatCreativeBot.getInstance(),
  BingChatBalancedBot.getInstance(),
  BingChatPreciseBot.getInstance(),
  ChatGLMBot.getInstance(),
  ChatGPT35Bot.getInstance(),
  ChatGPT35PoeBot.getInstance(),
  ChatGPT4Bot.getInstance(),
  ChatGPTBrowsingBot.getInstance(),
  ChatGPT4PoeBot.getInstance(),
  ClaudeBot.getInstance(),
  ClaudeInstantPoeBot.getInstance(),
  ClaudeInstant100kPoeBot.getInstance(),
  ClaudePlusPoeBot.getInstance(),
  GradioAppBot.getInstance(),
  HuggingChatBot.getInstance(),
  MOSSBot.getInstance(),
  OpenAIAPI35Bot.getInstance(),
  OpenAIAPI4Bot.getInstance(),
  QianWenBot.getInstance(),
  SageBot.getInstance(),
  SkyWorkBot.getInstance(),
  SparkBot.getInstance(),
  VicunaBot.getInstance(),
  WenxinQianfanBot.getInstance(),
];

if (process.env.NODE_ENV !== "production") {
  all.push(DevBot.getInstance());
}

const bots = {
  all,
  getBotByClassName(className) {
    return all.find((bot) => bot.getClassname() === className);
  },
};

export default bots;
