let generateProductionOrderTable = () => {
  var data = [
    [
      "Tiger Nixon",
      "System Architect",
      "Edinburgh",
      "5421",
      "2011/04/25",
      "$3,120",
    ],
    [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300",
    ],
  ];
  $("#products-table").DataTable({
    data : data
  });
};

const getAllProductOrderData = () => {
  showSpinner();
  let api = `${productOrderApi}/all`
  const data = {
    page: 0,
    size: 10,
    sortDirection: "desc",
    properties: null,
  };
  httpGet(api)
  hideSpinner();
};
