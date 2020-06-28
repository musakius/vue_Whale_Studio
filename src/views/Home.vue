<template>
  <div>
    <h1 class="text-center my-5">{{ "Title_Home_Page" | localize }}</h1>
    <Spinner v-if="loading" />
    <div v-else class="col-11 col-md-6 col-lg-4 mx-auto">
      <EntryField
        :allCur="allCur"
        :baseCur="oneObjCur.Cur_Abbreviation"
        :valueCur="oneValСur"
        :label="'one-cur'"
        @change-input="onChangeInput"
        @change-select="onChangeSelect"
      />
      <EntryField
        :allCur="allCur"
        :baseCur="twoObjCur.Cur_Abbreviation"
        :valueCur="twoValСur"
        :label="'two-cur'"
        @change-input="onChangeInput"
        @change-select="onChangeSelect"
      />
    </div>
  </div>
</template>

<script>
import EntryField from "@/components/EntryField";
import Spinner from "@/components/Spinner";
import Service from "@/services/services";

export default {
  name: "Home",
  data() {
    return {
      allCur: [],
      oneValСur: "",
      twoValСur: "",
      oneObjCur: {},
      twoObjCur: {},
      loading: true,
      BYN: {
        Cur_ID: 1,
        Cur_Abbreviation: "BYN",
        Cur_OfficialRate: 1,
        Cur_Scale: 1,
        Cur_Name: "Белорусский рубль"
      }
    };
  },
  mounted() {
    const service = new Service();

    service
      .getAllCurrencies()
      .then(data => {
        this.setCur(data);
        this.loading = false;
      })
      .catch(console.error);
  },
  methods: {
    setCur(data) {
      const USD = data.find(el => el.Cur_Abbreviation === "USD");
      this.oneObjCur = JSON.parse(localStorage.getItem("one-cur")) || this.BYN;
      this.twoObjCur = JSON.parse(localStorage.getItem("two-cur")) || USD;
      this.allCur = [this.BYN, ...data.sort(this.sortByUsdEur)];
    },
    getResConver(val, str) {
      const { Cur_OfficialRate: oneRat, Cur_Scale: oneSc } = this.oneObjCur;
      const { Cur_OfficialRate: twoRat, Cur_Scale: twoSc } = this.twoObjCur;
      if (str === "one-cur") {
        this.twoValСur = ((val * oneRat) / (twoRat / twoSc) / oneSc).toFixed(2);
      } else {
        this.oneValСur = ((val * twoRat) / (oneRat / oneSc) / twoSc).toFixed(2);
      }
    },
    onChangeSelect(val, str) {
      const elem = this.allCur.find(el => el.Cur_Abbreviation === val);
      str === "one-cur" ? (this.oneObjCur = elem) : (this.twoObjCur = elem);
      localStorage.setItem(str, JSON.stringify(elem));

      if (str === "one-cur") this.getResConver(this.oneValСur, str);
      if (str === "two-cur") this.getResConver(this.twoValСur, str);

      if (this.oneValСur === "") this.twoValСur = "";
      if (this.twoValСur === "") this.oneValСur = "";
    },
    onChangeInput(val, str) {
      this.getResConver(val, str);
      str === "one-cur" ? (this.oneValСur = val) : (this.twoValСur = val);

      if (val === "") if (str === "one-cur") this.twoValСur = "";
      if (val === "") if (str === "two-cur") this.oneValСur = "";
    },

    sortByUsdEur(a, b) {
      const arrCur = ["USD", "RUB", "EUR"];
      for (let i = 0; i < arrCur.length; i++) {
        if (
          a.Cur_Abbreviation === arrCur[i] ||
          b.Cur_Abbreviation === arrCur[i]
        )
          return -1;
      }
    }
  },
  components: {
    EntryField,
    Spinner
  }
};
</script>

<style scoped>
h1 {
  font-family: cursive;
}
</style>
