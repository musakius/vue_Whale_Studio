<template>
  <div class="col-12 col-lg-10 mx-auto">
    <h2 class="text-center my-5">{{ "Title_Table_Page" | localize }} {{ date | date }}</h2>
    <Spinner v-if="loading" />
    <Table v-else :allCur="allCur" @del-chosen="deleteChosen" @add-chosen="addChosen" />
  </div>
</template>

<script>
import Table from "@/components/Table";
import Spinner from "@/components/Spinner";
import Service from "@/services/services";
import en from "../locales/en.json";

export default {
  name: "ExchangeRates",
  data() {
    return {
      allCur: [],
      loading: true,
      date: new Date()
    };
  },
  mounted() {
    const service = new Service();

    service
      .getAllCurrencies()
      .then(data => {
        this.allCur = this.setCur(data);
        this.loading = false;
      })
      .catch(console.error);
  },
  methods: {
    setCur(data) {
      let arr = data.map((el, i) => {
        return { ...el, Cur_Eng_Name: en.Cur_Eng_Name[i], chosen: false };
      });
      return arr.sort(this.sortByUsdEurRub);
    },
    addChosen(id) {
      const chosenElem = this.allCur.find(el => el.Cur_ID === id);
      chosenElem.chosen = true;
      const restElem = this.allCur.filter(el => el.Cur_ID !== id);
      this.allCur = [chosenElem, ...restElem];
    },

    deleteChosen(id) {
      const chosenElem = this.allCur.find(el => el.Cur_ID === id);
      chosenElem.chosen = false;
      const restElem = this.allCur.filter(el => el.Cur_ID !== id);
      this.allCur = [...restElem, chosenElem].sort(this.sortByNameAndChosen);
    },

    sortByUsdEurRub(a, b) {
      const arrCur = ["USD", "RUB", "EUR"];
      for (let i = 0; i < arrCur.length; i++) {
        if (a.Cur_Abbreviation === arrCur[i]) a.chosen = true;
        if (
          a.Cur_Abbreviation === arrCur[i] ||
          b.Cur_Abbreviation === arrCur[i]
        )
          return -1;
      }
    },
    sortByNameAndChosen(a, b) {
      if (a.chosen === false && b.chosen === false) {
        if (a.Cur_Name < b.Cur_Name) return -1;
        if (a.Cur_Name > b.Cur_Name) return 1;
      } else {
        return 0;
      }
    }
  },
  components: {
    Table,
    Spinner
  }
};
</script>

<style scoped>
h2 {
  font-family: cursive;
}
</style>
