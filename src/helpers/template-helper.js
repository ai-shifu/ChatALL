import {
  PromptTemplate,
  FewShotPromptTemplate,
  LengthBasedExampleSelector,
} from "langchain/prompts";

const prefixPlaceholder = `Summarize the data below in a markdown table with the bot name, difference, and response rating (1-5) columns.
Do not include the response' value column in your table.
Simplify the data and identify the differences.
Each response is delimited by the \`resp\` tag.
Inside every response, the bot's name is delimited by the \`name\` tag, and the bot's response is delimited by the \`value\` tag.`;
const templatePlaceholder = `<resp>
    <name>{botName}</name>
    <value>{botResponse}</value>
</resp>`;
const suffixPlaceholder = "Give me the best response.";

async function preview(prefix, exampleTemplate, suffix, data) {
  const examplePrompt = new PromptTemplate({
    template: exampleTemplate,
    inputVariables: ["botName", "botResponse"],
  });

  const exampleSelector = await LengthBasedExampleSelector.fromExamples(data, {
    examplePrompt,
    maxLength: Number.MAX_VALUE,
  });

  const dynamicPrompt = new FewShotPromptTemplate({
    exampleSelector,
    examplePrompt,
    prefix: prefix,
    suffix: suffix,
    inputVariables: [],
  });
  return await dynamicPrompt.format();
}

export { prefixPlaceholder, templatePlaceholder, suffixPlaceholder, preview };
