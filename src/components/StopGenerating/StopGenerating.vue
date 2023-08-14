<template>
    <v-btn
        class="stop-generating-btn"
        :class="{'drawer-open': store.state.isChatDrawerOpen}"
        @click="stopGenerating"
    >
        {{ $t("footer.stopGenerating") }}
    </v-btn>
</template>

<script setup>
import store from '@/store';
import _bots from '@/bots';
import {computed} from 'vue';

const favBots = computed(() => {
    const _favBots = [];
    store.getters.currentChat.favBots.forEach(favBot => {
        _favBots.push({
            ...favBot,
            instance: _bots.getBotByClassName(favBot.classname),
        });
    });
    return _favBots;
});

const stopGenerating = () => {
    const toBots = favBots.value
        .map(favBot => favBot.instance);

    if (toBots.length === 0) {
        return;
    }

    store.dispatch('stopGenerating', {
        bots: toBots,
    });
};
</script>

<style>
.stop-generating-btn {
    width: 100px;
    position: fixed !important;
    bottom: 60px;
    left: 0;
    right: 0;
    z-index: 9999;
    color: rgb(var(--v-theme-font));
    margin: 0 auto;
}
.stop-generating-btn.drawer-open {
    right: -255px;
}
</style>