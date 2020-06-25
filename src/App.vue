<template>
  <div class="container">
    <Header @locale="setLocale" />
    <router-view :key="key_locale" />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  data() {
    return {
      key_locale: ""
    };
  },
  methods: {
    setLocale(str) {
      this.key_locale = str;
    }
  },
  components: {
    Header
  }
};
</script>
