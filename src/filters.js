import Vue from 'vue';

Vue.filter("toDollar", function(text) {
  const formatter = new Intl.NumberFormat("en-AUD", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2
  });
  return formatter.format(text);
});

Vue.filter("toPrettyDate", function(date) {
  let newDate = moment(date).format("MMM Do YYYY");
  return newDate;
});
