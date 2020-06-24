<template>
  <div class="container">
    <Header />
    <router-view :curEngName="curEngName" :BYN="BYN" />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  data() {
    return {
      curEngName: [
        "Australian Dollar",
        "Bulgarian Lev",
        "Hryvnia",
        "Danish Krone",
        "US Dollar",
        "EURO",
        "Zloty",
        "Iranian Rial",
        "Iceland Krona",
        "Yen",
        "Canadian Dollar",
        "Yuan China",
        "Kuwaiti Dinar",
        "Moldovian Leu",
        " New Zealand Dollar",
        "Norwegian Krone",
        "Russian Ruble",
        "SDR (Special Drawing Rights)",
        "Singapore Dollar",
        "Som",
        "Tenge",
        "Turkish Lira",
        "Pound Sterling",
        "Czech Koruna",
        "Swedish Krona",
        "Swiss Franc"
      ],
      BYN: {
        Cur_ID: 1,
        Cur_Abbreviation: "BYN",
        Cur_OfficialRate: 1,
        Cur_Scale: 1,
        Cur_Name: "Белорусский рубль",
        chosen: false
      }
    };
  },
  components: {
    Header
  }
};
</script>