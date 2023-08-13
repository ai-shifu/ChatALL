const templateKey = {
  loopStart: "{loopStart}",
  loopEnd: "{loopEnd}",
  botName: "{botName}",
  botResponse: "{botResponse}",
  index: "{index}",
};

const templateLoopKey = {
  loopStart: templateKey.loopStart,
  loopEnd: templateKey.loopEnd,
};

const templatePlaceholder = `Summarize the data below in a markdown table with the bot name, difference and response rating (1-5) columns.
Do not include response column in your table.
Simplify the data and identify the differences.
Response is delimited by \`details\` tag and bot name is delimited by \`summary\` tag.

{loopStart}
<details>
  <summary>{botName}</summary>
{botResponse}
</details>
{loopEnd}

Give me the best response.`;

function lexer(template) {
  let tokens = [];
  let current = 0;
  while (current < template.length) {
    let char = template[current];
    // Check for keywords
    if (char === "{") {
      let isMatchKeyword;
      for (const key in templateLoopKey) {
        if (
          template.slice(current, current + templateKey[key].length) ===
          templateKey[key]
        ) {
          tokens.push({
            type: templateKey[key],
          });
          current += templateKey[key].length;
          isMatchKeyword = true;
          break;
        }
      }
      if (isMatchKeyword) continue;
    }
    if (!tokens.length) {
      tokens.push({
        value: char,
      });
    } else {
      const lastToken = tokens[tokens.length - 1];
      if (lastToken.type === undefined) {
        lastToken.value += char;
      } else {
        tokens.push({
          value: char,
        });
      }
    }
    current++;
  }

  return tokens;
}

function parse(tokens) {
  let ast = [];
  let loopStack = [];
  let current = 0;
  while (current < tokens.length) {
    let token = tokens[current];
    if (token.type === templateKey.loopStart) {
      let loopNode = {
        type: "Loop",
        values: [],
      };
      if (loopStack.length) {
        let parentLoop = loopStack[loopStack.length - 1];
        parentLoop.values.push(loopNode);
      } else {
        ast.push(loopNode);
      }
      loopStack.push(loopNode);
    } else if (token.type === templateKey.loopEnd) {
      loopStack.pop();
    } else {
      const target = loopStack.length
        ? loopStack[loopStack.length - 1].values
        : ast;
      target.push({
        type: "Text",
        value: token.value,
      });
    }
    current++;
  }
  return ast;
}

function evaluate(node, isLoop, data) {
  if (!node) {
    return;
  }
  let result = "";
  if (node.type === "Body") {
    node.values.forEach((value) => {
      result += evaluate(value, value.type === "Loop", data);
    });
  } else if (node.type === "Text") {
    if (isLoop) {
      for (let i = 0; i < data.length; i++) {
        const response = data[i];
        result += node.value
          .replaceAll(templateKey.botName, response.botName)
          .replaceAll(templateKey.botResponse, response.botResponse)
          .replaceAll(templateKey.index, i + 1);
      }
    } else {
      return node.value;
    }
    return result;
  } else if (node.type === "Loop") {
    node.values.forEach((value) => {
      result += evaluate(value, true, data);
    });
  }
  return result;
}

function preview(template, data) {
  const tokens = lexer(template);
  const ast = parse(tokens);
  return evaluate({ type: "Body", values: ast }, false, data);
}

export { templatePlaceholder, preview };
