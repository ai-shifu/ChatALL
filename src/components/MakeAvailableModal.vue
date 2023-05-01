<template>
    <v-dialog 
        v-model="show"
        persistent
        width="auto"
        min-width="50%"
    >
        <v-list v-if="botSettings !== null">
            <component :is="botSettings" />
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onDone">{{ $t("modal.done") }}</v-btn>
            </v-card-actions>
        </v-list>
    </v-dialog>
</template>

<script>
import { markRaw } from 'vue';

export default {
    props: {
        bot: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            show: false,
            botSettings: null,
        };
    },
    watch: {
        async bot(newBot) {
            if (newBot) {
                this.botSettings = markRaw(await newBot.getSettingsComponent());
            } else {
                this.botSettings = null;
            }
        },
    },
    methods: {
        open() {
            this.show = true;
        },
        onDone() {
            this.show = false;
            this.$emit('done');
        },
    },
};
</script>

<style scoped>
</style>
