<template>
  <table class="table border border-dark">
    <tbody>
      <tr class="table-dark">
        <th scope="row">Валюта</th>
        <td>Курс</td>
        <td>Код</td>
        <td>Избранные</td>
      </tr>
    </tbody>
    <transition-group name="flip-list" tag="tbody">
      <tr v-for="cur of allCur" :key="cur.Cur_ID" :class="cur.chosen ? 'yellow' : 'table-active'">
        <th scope="row">{{`${cur.Cur_Scale} ${cur.Cur_Eng_Name}`}}</th>
        <td>{{cur.Cur_OfficialRate.toFixed(3)}}</td>
        <td>{{cur.Cur_Abbreviation}}</td>
        <td class="text-center">
          <i v-if="cur.chosen" class="fas fa-star yellow" @click="$emit('del-chosen', cur.Cur_ID)" />
          <i v-else class="far fa-star" @click="$emit('add-chosen', cur.Cur_ID)" />
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    allCur: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
i {
  font-size: 25px;
  cursor: pointer;
}

.yellow {
  color: #d1a31a;
}

th {
  width: 66%;
}

.flip-list-move {
  transition: transform 1s;
}
</style>