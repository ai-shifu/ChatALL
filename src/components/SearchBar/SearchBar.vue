<template lang="">
    <div>
        <input 
        type="text" 
        class="search-bar" 
        v-model="input"
        @change="handleSearchBar($event)"
        @keyup="handleSearchBar($event)" placeholder="Search" /> 
    </div>
</template>

<script>
import "highlight.js/styles/github.css";

export default {
    data() {
        return {
            input: ""
        }
    },
    methods: {
        handleSearchBar(event) {
            const searchInput = event.target.value;
            const texts = document.querySelectorAll('p,ul,li');
            texts.forEach(Text => {
                const regex = new RegExp(searchInput, 'gi')
                const response = Text.innerText.replace(regex, function (str) {
                    return "<span style='background-color: yellow;'>" + str + "</span>"
                });
                Text.innerHTML = response;
            })
        },
    }
}
</script>

<style scoped>
.search-bar {
    border-style: solid;
    border-color: rgb(35, 35, 145)
}
</style>