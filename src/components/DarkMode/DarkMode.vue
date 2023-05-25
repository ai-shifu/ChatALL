<template>
      <label class="switch">
  <input type="checkbox" @click="toggleTheme">
  <span class="slider round"></span>
</label>

  </template>
  
  <script>
  import { useTheme } from 'vuetify'
  
  export default {
    setup () {
      const theme = useTheme();
      var darkText={
        message:"Dark Mode",
      }
      return {
        theme,
        toggleTheme() { 
            theme.global.name.value = theme.global.current.value.dark ? 'light': 'dark' ;
            if(theme.global.current.value.dark){
            darkText.message="Light Mode"
            }
          else {
            darkText.message="Dark Mode"
           }
        },
      }
    },
  }
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 55px;
  height: 25px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:black;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 22px;
  left: 3px;
  bottom: 4px;
  background-color:rgb(var(--v-theme-primary));
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: rgb(var(--v-theme-text));
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
