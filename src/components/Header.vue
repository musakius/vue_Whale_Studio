<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary d-flex">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/" exact>Конвертер валют</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/exchange_rates">Все валюты</router-link>
      </li>
    </ul>
    <select class="form-control" value="RU">
      <option>Русский</option>
      <option>English</option>
    </select>
  </nav>
</template>

<style scoped>
select {
  width: 87px;
  font-size: 15px;
  padding: 4px 8px;
}
</style>