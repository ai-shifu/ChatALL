<template>
  <v-list-subheader>{{ bot.getBrandName() }}</v-list-subheader>
  <v-list-item>
    <v-list-item-title>{{ $t("gradio.url") }}</v-list-item-title>
    <v-list-item-subtitle>{{ $t("gradio.urlPrompt") }}</v-list-item-subtitle>
    <v-text-field
      v-model="gradio.url"
      outlined
      dense
      :placeholder="
        $t('settings.forExample', {
          example: 'https://*.hf.space, http://127.0.0.1:7861',
        })
      "
      @update:model-value="setGradio({ url: $event })"
    ></v-text-field>
    <v-list-item-title>{{ $t("gradio.fnIndex") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("gradio.fnIndexPrompt")
    }}</v-list-item-subtitle>
    <v-text-field
      v-model="gradio.fnIndex"
      outlined
      dense
      placeholder="0"
      @update:model-value="setGradio({ fnIndex: $event })"
    ></v-text-field>
  </v-list-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Bot from "@/bots/huggingface/GradioAppBot";

export default {
  data() {
    return {
      bot: Bot.getInstance(),
    };
  },
  methods: {
    ...mapMutations(["setGradio"]),
  },
  computed: {
    ...mapState(["gradio"]),
  },
};
</script>
