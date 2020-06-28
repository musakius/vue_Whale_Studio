<template>
  <div class="mb-4">
    <select
      class="form-control select"
      :value="baseCur"
      @change="$emit('change-select', $event.target.value, label)"
    >
      <option
        v-for="cur of allCur"
        :key="cur.Cur_ID"
        :value="cur.Cur_Name"
        :class="cur.Cur_Name === baseCur ? 'yellow' : ''"
      >{{ srtLocalCur(cur.Cur_Eng_Name, cur.Cur_Name) }}</option>
    </select>
    <strong v-if="label === 'one-cur'">{{'Entry_field' | localize}}</strong>
    <strong v-else>{{'Result' | localize}}</strong>
    <input
      class="form-control"
      type="text"
      :value="setValue(valueCur)"
      @input="$emit('change-input', $event.target.value)"
      placeholder="0.00"
      :readonly="label === 'two-cur'"
    />
  </div>
</template>

<script>
export default {
  name: "EntryField",
  props: {
    allCur: {
      type: Array,
      required: true
    },
    baseCur: {
      type: String,
      required: true
    },
    valueCur: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    setValue(value) {
      return (value = value.replace(/[^\d.]/gi, ""));
    },
    srtLocalCur(strEn, strRu) {
      const local = localStorage.getItem("ru-en") || "ru-RU";
      return local === "ru-RU" ? strRu : strEn;
    }
  }
};
</script>

<style scoped>
.select {
  height: 30px;
  padding: 0 8px;
  margin: 10px 0;
}

input,
select {
  font-size: 18px;
  width: 280px;
}

.yellow {
  font-weight: 600;
  background: rgb(240, 230, 97);
}
</style>
