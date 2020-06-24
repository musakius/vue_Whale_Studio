<template>
  <div class="col-8 mx-auto">
    <h2 class="text-center my-5">Курсы валют на {{getDate}}</h2>
    <Spinner v-if="loading" />
    <Table v-else :allCur="allCur" @del-chosen="deleteChosen" @add-chosen="addChosen" />
  </div>
</template>

<script>
import Table from "@/components/Table";
import Spinner from "@/components/Spinner";
import Service from "@/services/services";

export default {
  name: "ExchangeRates",
  props: ["curEngName"],
  data() {
    return {
      allCur: [],
      loading: true
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
        return { ...el, Cur_Eng_Name: this.curEngName[i], chosen: false };
      });
      console.log(arr);
      return arr.sort(this.sortByUsdEurRub);
    },
    setr(data) {
      data = data.map(el => (el = { ...el, chosen: false }));
      return data.sort(this.sortByUsdEurRub);
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
    sortByNameAndchosen(a, b) {
      if (a.chosen === false && b.chosen === false) {
        if (a.Cur_Name < b.Cur_Name) return -1;
        if (a.Cur_Name > b.Cur_Name) return 1;
      } else {
        return 0;
      }
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
      this.allCur = [...restElem, chosenElem].sort(this.sortByNameAndchosen);
    }
  },
  components: {
    Table,
    Spinner
  },
  computed: {
    getDate() {
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
      };
      return new Intl.DateTimeFormat("ru-RU", options).format(new Date());
    }
  }
};
</script>

<style scoped>
h2 {
  font-family: cursive;
}
</style>