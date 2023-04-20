<template>
    <v-card 
        :class="['message', message.type]"
        flat
        :loading="message.done ? false : 'primary'"
    >
        <v-card-title v-if="message.type === 'response'" class="title">
            <img :src="message.logo" alt="Bot Icon" />
            {{ message.name }}
        </v-card-title>
        <Markdown class="markdown-body" :breaks="true" :source="message.content" />
    </v-card>
</template>

<script>
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown-light.css'

export default {
    components: {
        Markdown,
    },
    props: {
        message: {
            type: Object,
            default: () => ({})
        },
        columns: {
            type: Number,
            default: 1
        }
    },
    mounted() {
        this.$el.style.setProperty('--columns', this.columns);
    },
    watch: {
        columns() {
            this.$el.style.setProperty('--columns', this.columns);
        }
    },
};
</script>

<style scoped>
.message {
    border-radius: 8px;
    padding: 16px;
    word-wrap: break-word;
    text-align: left;
}

.prompt {
    background-color: #95EC69;
    width: fit-content;
    grid-column: 1 / span var(--columns);
}

.response {
    background-color: #FFF;
    width: 100%;
    grid-column: auto / span 1;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    padding: 0;
    margin-bottom: 8px;
}

.title img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
}

.markdown-body {
    background-color: inherit;
}
</style>