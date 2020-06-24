<template>
  <div>
    <h2 class="text-center my-5">Конвертер валют по курсу Нацбанка РБ</h2>
    {{oneObjCur}}
    <Spinner v-if="loading" />
    <div v-else class="col-3 mx-auto">
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
    {{twoObjCur}}
  </div>
</template>

<script>
import EntryField from "@/components/EntryField";
import Spinner from "@/components/Spinner";
import Service from "@/services/services";

export default {
  name: "Home",
  props: ["BYN"],
  data() {
    return {
      allCur: [],
      oneValСur: "",
      twoValСur: "",
      oneObjCur: {},
      twoObjCur: {},
      loading: true
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
      this.allCur = [this.BYN, ...data.sort(this.sortByUsdEur)];

      const USD = data.find(el => el.Cur_Abbreviation === "USD");
      const localOneCur = localStorage.getItem("one-cur");
      const localTwoCur = localStorage.getItem("two-cur");

      if (localOneCur) {
        this.oneObjCur = JSON.parse(localOneCur);
      } else {
        this.oneObjCur = this.BYN;
        localStorage.setItem("one-cur", JSON.stringify(this.BYN));
      }

      if (localTwoCur) {
        this.twoObjCur = JSON.parse(localTwoCur);
      } else {
        this.twoObjCur = USD;
        localStorage.setItem("two-cur", JSON.stringify(USD));
      }
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
    },
    getResConver(val, str) {
      const { Cur_OfficialRate: oneRat, Cur_Scale: oneSc } = this.oneObjCur;
      const { Cur_OfficialRate: twoRat, Cur_Scale: twoSc } = this.twoObjCur;
      if (str === "one-cur") {
        this.twoValСur = (((oneRat / twoRat) * val) / oneSc).toFixed(2);
      } else {
        this.oneValСur = ((val * twoRat) / (oneRat / oneSc) / twoSc).toFixed(2);
      }
    },
    onChangeSelect(val, str) {
      const elem = this.allCur.find(el => el.Cur_Abbreviation === val);
      if (str === "one-cur") this.getResConver(this.oneValСur, str);
      if (str === "two-cur") this.getResConver(this.twoValСur, str);
      str === "one-cur" ? (this.oneObjCur = elem) : (this.twoObjCur = elem);
      if (this.oneValСur === "") this.twoValСur = "";
      if (this.twoValСur === "") this.oneValСur = "";
      localStorage.setItem(str, JSON.stringify(elem));
    },
    onChangeInput(val, str) {
      this.getResConver(val, str);
      str === "one-cur" ? (this.oneValСur = val) : (this.twoValСur = val);
      if (val === "") if (str === "one-cur") this.twoValСur = "";
      if (val === "") if (str === "two-cur") this.oneValСur = "";
    }
  },
  components: {
    EntryField,
    Spinner
  }
};
</script>