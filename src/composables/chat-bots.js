import { AVAILABLE_BOT_NAMES } from "@/config"
import bots from '@/bots'
import { computed, reactive, ref, watch } from "vue"
import { useStore } from "vuex"

// In order to obtain image, fullName and name without instanciate the bot
function getAvailableBotsMetaData() {
  return AVAILABLE_BOT_NAMES.reduce((acc, availableBotName) => {
    const bot = bots[availableBotName]
  
    if (!bot) {
      return acc
    }

    acc[availableBotName] = {
      name: bot.prototype.constructor._className,
      fullName: bot.prototype.getFullname(),
      logo: '/bots/' + bot.prototype.constructor._logoFilename,
    }
  
    return acc
  }, {})
}

export function useChatBots() {
  
  const store = useStore()
  const chatsBotInstances = reactive({}) // all chats with their bots instances
  const isMakeAvailableOpen = ref(false)
  const clickedBotInstance = ref(null)
  
  const currentChatId = computed(() => store.getters["chatsModule/getCurrentChatId"])
  const currentChatBotInstances = computed(() => chatsBotInstances[currentChatId.value] 
    ? Object.values(chatsBotInstances[currentChatId.value])
    : []
  )

  // Get bot names that are active in the current chat
  const currentChatActiveBotNames = computed({
    get: () => store.getters["chatsModule/getCurrentChatActiveBotNames"],
    set: (value) => store.commit("chatsModule/UPDATE_CURRENT_CHAT_ACTIVE_BOTS", value)
  })

  // Get bot instances that are active in the current chat
  const currentChatActiveBotInstances = computed(() => {
    if (!currentChatId.value) {
      return []
    }
    return chatsBotInstances[currentChatId.value]
  })

  async function checkAllBotsAvailability(specifiedBot = null) { 
    if (!currentChatBotInstances.value.length) {
      return
    }

    let botsToCheck = currentChatBotInstances.value

    // if a bot is specified, only check bots of the same brand
    if (specifiedBot) {
      botsToCheck = currentChatBotInstances.value.filter(
        (bot) =>
          bot.constructor._brandId === specifiedBot.constructor._brandId,
      )
    }

    const checkAvailabilityPromises = botsToCheck.map((bot) =>
      bot
        .checkAvailability()
        .then(() => updateCurrentChatActiveBots())
        .catch((error) => {
          console.error(
            `Error checking login status for ${bot.getFullname()}:`,
            error,
          )
        }),
    )

    try {
      await Promise.allSettled(checkAvailabilityPromises)
    } catch (error) {
      console.error("Error checking login status for bots:", error)
    }
  }

  function updateCurrentChatActiveBots() {
    for (const bot of currentChatBotInstances.value) {
      if (bot.isAvailable()) {
        continue
      }
      currentChatActiveBotNames.value = currentChatActiveBotNames.value.filter(
        (botName) => botName !== bot.constructor._className,
      )
    }
  }

 async function setupBotInstances(botNames) {

    for (const botName of botNames) {
      // get the right bot class to instanciate it
      const bot = Object.values(bots)
        .find((bot) => bot.prototype.constructor._className === botName)
  
      const botInstance = bot.getInstance()
  
      // link chat
      botInstance.setChatId(currentChatId.value)
  
      // check availability
      await botInstance.checkAvailability()
  
      if (!botInstance.isAvailable()) {
        clickedBotInstance.value = botInstance
        isMakeAvailableOpen.value = true
        currentChatActiveBotNames.value = currentChatActiveBotNames.value.filter(
          (botName) => botName !== botInstance.constructor._className
        )
        return
      }
  
      // store bot instance by chat id
      if (!chatsBotInstances[currentChatId.value]) {
        chatsBotInstances[currentChatId.value] = {}
      }    
      chatsBotInstances[currentChatId.value][botName] = botInstance
    }
  }

  /** 
   * When a new bot is enabled by user,
   * we need to instanciate and configure it then associate it to the current chat.
   */
  watch(currentChatActiveBotNames, async (newValue, oldValue) => {
    if (!currentChatId.value) {
      return
    }

    // if a bot has been disabled 
    if (oldValue && newValue.length < oldValue.length) {
      const botNameToDisable = oldValue.find((botName) => !newValue.includes(botName))
      delete chatsBotInstances[currentChatId.value][botNameToDisable]
      return
    }
    
    // compare old and new active bots to find the new one
    const newActiveBotNames = oldValue && oldValue.length 
      ? newValue.filter((botName) => !oldValue.includes(botName))
      : newValue

    if (!newActiveBotNames.length) {
      return
    }

    await setupBotInstances(newActiveBotNames)

  }, { immediate: true })

  /**
   * When the current chat changes, we need to instanciate and configure the bots
   * that are active in the new chat.
   */
  watch(() => currentChatId.value, async (newValue) => {
    if (!newValue) {
      return
    }

    if (chatsBotInstances[newValue]) {
      return
    }

    const activeBotNames = store.getters["chatsModule/getCurrentChatActiveBotNames"]
    await setupBotInstances(activeBotNames)

  })

  return {
    currentChatId,
    availableBotsData: getAvailableBotsMetaData(),
    currentChatActiveBotNames,
    chatsBotInstances,
    currentChatActiveBotInstances,
    isMakeAvailableOpen,
    checkAllBotsAvailability,
    clickedBotInstance,
  }
}