import bots from "@/bots";
export function get_messages(){
    // Get the chat history from localStorage.
    const chatallMessages = localStorage.getItem("chatall-messages");
    if (!chatallMessages) {
      return;
    }
  
    const chats = JSON.parse(chatallMessages)?.chats ?? [];
  
    // Create an array of messages from the chat history.
    const messages = chats
      .filter((d) => !d.hide)
      .map((chat) => ({
        // The title of the chat.
        title: chat.title,
        // The messages in the chat.
        messages: chat.messages
          .filter((d) => !d.hide)
          .reduce((arr, message) => {
            const t = message.type;
            const content = message.content;
            if (t == "prompt") {
              arr.push({
                prompt: content,
                responses: [],
              });
            } else {
              const botClassname = message.className;
              const bot = bots.getBotByClassName(botClassname);
              const botName = bot.getFullname();
              arr.at(-1).responses.push({
                content,
                botName,
                botClassname,
                botModel: message.model,
                highlight: message.highlight,
              });
            }
            return arr;
          }, []),
      }));
    return messages
  }