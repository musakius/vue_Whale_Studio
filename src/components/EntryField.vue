<template>
  <div class="d-flex mb-4">
    <input
      class="form-control"
      type="text"
      :value="setValue(valueCur)"
      @input="$emit('change-input', $event.target.value, label)"
      placeholder="0.00"
    />
    <select
      class="form-control select"
      :value="baseCur"
      @change="$emit('change-select', $event.target.value, label)"
    >
      <option
        v-for="cur of allCur"
        :key="cur.Cur_ID"
        :value="cur.Cur_Abbreviation"
        :class="cur.Cur_Abbreviation === baseCur ? 'yellow' : ''"
      >{{ cur.Cur_Abbreviation }}</option>
    </select>
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
    }
  }
};
</script>

<style scoped>
.select {
  width: 90px;
}

input,
select {
  font-size: 18px;
}

.yellow {
  font-weight: 600;
  background: rgb(240, 230, 97);
}
</style>
