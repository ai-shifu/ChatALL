<template>
    <div>
        <h2>{{ bot.getDisplayName() }} Settings</h2>
        <component :is="bot.getSettingsComponent()" />
    </div>
</template>

<script>
export default {
    name: "BotSettings",
    props: {
        bot: {
            type: Object,
            required: true,
        },
    },
};
</script>