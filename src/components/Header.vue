<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary d-flex">
    <ul class="navbar-nav mr-auto">
      <li>
        <router-link class="link" to="/" exact>
          {{
          "Converter_Link" | localize
          }}
        </router-link>
      </li>
      <li>
        <router-link class="link" to="/exchange_rates">
          {{
          "All_Cur_Link" | localize
          }}
        </router-link>
      </li>
    </ul>
    <select class="form-control" v-model="locale">
      <option>Русский</option>
      <option>English</option>
    </select>
  </nav>
</template>

<script>
export default {
  data: () => ({
    locale: "Русский"
  }),
  mounted() {
    if (localStorage.getItem("ru-en") === "ru-RU") this.locale = "Русский";
    if (localStorage.getItem("ru-en") === "en-US") this.locale = "English";
  },
  watch: {
    locale(str) {
      localStorage.setItem("ru-en", str === "Русский" ? "ru-RU" : "en-US");
      this.$emit("locale", str);
    }
  }
};
</script>

<style scoped>
.link {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  margin-right: 16px;
}

.link:hover {
  color: #d1a31a;
}

select {
  width: 87px;
  font-size: 15px;
  padding: 4px 8px;
}
</style>
