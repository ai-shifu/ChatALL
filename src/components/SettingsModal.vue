<template>
    <v-dialog 
        v-model="dialog" 
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar
                dark
                color="primary"
            >
                <v-btn
                icon
                dark
                @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ $t("settings") }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        variant="text"
                        @click="dialog = false"
                    >
                        {{ $t("save") }}
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-list
                lines="two"
                subheader
            >
                <v-list-subheader>{{ $t("general") }}</v-list-subheader>
                <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
                <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
            </v-list>
            <v-divider></v-divider>
            <ChatGPTBotSettings></ChatGPTBotSettings>
            </v-card>
    </v-dialog>
</template>

<script>
import ChatGPTBotSettings from '@/components/BotSettings/ChatGPTBotSettings.vue';
// Import more bot settings components here

export default {
    components: {
        ChatGPTBotSettings,
        // Add more bot settings components here
    },
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        open() {
            this.dialog = true;
        },
    },
};
</script>
