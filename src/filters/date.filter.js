export default function dateFilter(value) {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric"
  };

  const locale = localStorage.getItem("ru-en") || "ru-RU";
  return new Intl.DateTimeFormat(locale, options).format(value);
}
