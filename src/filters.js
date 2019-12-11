import Vue from 'vue';

//To AUD
Vue.filter("toDollar", function(text) {
  const formatter = new Intl.NumberFormat("en-AUD", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2
  });
  return formatter.format(text);
});

//To Readable Date
Vue.filter("toPrettyDate", function(date) {
  let newDate = moment(date).format("MMM Do YYYY");
  return newDate;
});

//To long Site name
Vue.filter("toLongName", function(text) {
  switch (text) {
    case "GBG":
      return (text = "Geebung");
      break;
    case "MOO":
      return (text = "Moonah");
      break;
    case "ELI":
      return (text = "Elizabeth");
      break;
    case "LON":
      return (text = "Londsdale");
      break;
    case "SMT":
      return (text = "Smithfield");
      break;
    case "TVL":
      return (text = "Townsville");
      break;
    case "NEW":
      return (text = "Newcastle");
      break;
    case "SHP":
      return (text = "Shepparton");
      break;
    case "NOW":
      return (text = "Nowra");
      break;
    case "BAY":
      return (text = "Bayswater");
      break;
    case "QBN":
      return (text = "Queanbeyan");
      break;
    case "WOD":
      return (text = "Wodonga");
      break;
    case "BEN":
      return (text = "Bendigo");
      break;
    case "BAL":
      return (text = "Ballarat");
      break;
    case "CRG":
      return (text = "Craigieburn");
      break;
    case "GEL":
      return (text = "Geelong");
      break;
    case "WBL":
      return (text = "Warrnambool");
      break;
    case "LAU":
      return (text = "Launceston");
      break;
    case "MOO":
      return (text = "Moonah");
      break;
    case "TRA":
      return (text = "Traralgon");
      break;
    case "PER":
      return (text = "Perth");
      break;
    case "MLD":
      return (text = "Mildura");
      break;
    case "KNP":
      return (text = "Kunda Park");
      break;
    case "CRN":
      return (text = "Cairns");
      break;
    default:
      return text;
  }
});