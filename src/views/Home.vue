<template>
  <div>
    <h2 class="text-center my-5">{{ "Title_Home_Page" | localize }}</h2>
    <Spinner v-if="loading" />
    <div v-else class="col-11 col-md-10 col-lg-8 mx-auto d-flex justify-content-between">
      <div>
        <strong>{{'Name_One_Input' | localize}}</strong>
        <EntryField
          :allCur="allCur"
          :baseCur="oneObjCur.Cur_Name"
          :valueCur="oneValСur"
          :label="'one-cur'"
          @change-input="onChangeInput"
          @change-select="onChangeSelect"
        />
      </div>
      <i class="fas fa-sync-alt" @click="swapValues"></i>
      <div>
        <strong>{{'Name_Two_Input' | localize}}</strong>
        <EntryField
          :allCur="allCur"
          :baseCur="twoObjCur.Cur_Name"
          :valueCur="twoValСur"
          :label="'two-cur'"
          @change-input="onChangeInput"
          @change-select="onChangeSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EntryField from "@/components/EntryField";
import Spinner from "@/components/Spinner";
import Service from "@/services/services";
import en from "../locales/en.json";

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
      rotate: 0,
      BYN: {
        Cur_ID: 1,
        Cur_Abbreviation: "BYN",
        Cur_OfficialRate: 1,
        Cur_Scale: 1,
        Cur_Name: "Белорусский рубль",
        Cur_Eng_Name: "Belarusian Ruble"
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
      let arr = data.map((el, i) => {
        return { ...el, Cur_Eng_Name: en.Cur_Eng_Name[i] };
      });
      const USD = data.find(el => el.Cur_Abbreviation === "USD");
      this.oneObjCur = JSON.parse(localStorage.getItem("one-cur")) || this.BYN;
      this.twoObjCur = JSON.parse(localStorage.getItem("two-cur")) || USD;
      this.allCur = [this.BYN, ...arr.sort(this.sortByUsdEur)];
    },
    getResConver(val) {
      const { Cur_OfficialRate: oneRat, Cur_Scale: oneSc } = this.oneObjCur;
      const { Cur_OfficialRate: twoRat, Cur_Scale: twoSc } = this.twoObjCur;

      this.twoValСur = ((val * oneRat) / (twoRat / twoSc) / oneSc).toFixed(2);
    },
    onChangeSelect(val, str) {
      const elem = this.allCur.find(
        el => el.Cur_Name === val || el.Cur_Eng_Name === val
      );
      str === "one-cur" ? (this.oneObjCur = elem) : (this.twoObjCur = elem);
      localStorage.setItem(str, JSON.stringify(elem));
      this.getResConver(this.oneValСur);
      if (this.oneValСur === "") this.twoValСur = "";
    },
    onChangeInput(val) {
      this.getResConver(val);
      this.oneValСur = val;
      if (val === "") this.twoValСur = "";
    },
    swapValues(e) {
      this.rotate += 180;
      e.target.style.transform = `rotate(${this.rotate}deg)`;
      let arr1 = this.twoObjCur;
      let arr2 = this.oneObjCur;

      this.twoObjCur = arr2;
      this.oneObjCur = arr1;
      this.getResConver(this.oneValСur);
      localStorage.setItem("two-cur", JSON.stringify(arr2));
      localStorage.setItem("one-cur", JSON.stringify(arr1));
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
h2 {
  font-family: cursive;
}
strong {
  font-size: 20px;
  margin-bottom: 15px;
}
i {
  align-self: center;
  font-size: 40px;
  cursor: pointer;
  transition: all 1s;
}
</style>
