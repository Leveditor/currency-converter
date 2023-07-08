<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default defineComponent({
  name: 'App',
});
</script>
