let tableProductDefinition;
let pdefEntries = $("#product-definition-entries-data");
let pdefPagination = $("#product-definition-pagination");
let pdef_size = 10;
let pdef_page = 0;
let selectPageSizeId = "#select-page-size";
const selectPageSize = $(selectPageSizeId);
let firstInitSelect = false;
let spinnerPDef = $("#spinner-pdef-data");
$(document).ready(() => {
  configProductDefinitionTable();
  getAllDataProductDefinition();
  onChangePdefPageSize();
});

const configProductDefinitionTable = () => {
  tableProductDefinition = new DataTable("#product-definition-table", {
    responsive: true,
    paging: false,
    bInfo: false,
    columns: [
      {
        data: "id",
        className: "text-right",
        title: "ID",
        type: "string",
      },
      {
        data: "modelName",
        className: "text-right",
        title: "Model Name",
        type: "string",
      },
      {
        data: "model",
        className: "text-right",
        title: "Model",
        type: "string",
      },
      {
        data: "manufacture.manufactureName",
        className: "text-right",
        title: "Manufacture",
        type: "string",
      },
      {
        data: "category.categoryName",
        className: "text-right",
        title: "Category",
        type: "string",
      },
      {
        data: "location.locationName",
        className: "text-right",
        title: "Location",
        type: "string",
      },
      {
        data: "supplier.supplierName",
        className: "text-right",
        title: "Supplier",
        type: "string",
      },
      {
        data: "color",
        className: "text-right",
        title: "Color",
        type: "string",
      },
      {
        data: "action",
        className: "text-right",
        title: "Action",
        type: "string",
      },
    ],
    columnDefs: productDefinitionColumnDef(),
  });
};

const generateTableProductDef = (productDefinitions) => {
  tableProductDefinition.clear().rows.add(productDefinitions).draw();
};

const showPDefSpinner = () => {
  spinnerPDef.show();
};

const hidePDefSpinner = () => {
  spinnerPDef.hide();
};

const getAllDataProductDefinition = () => {
  showPDefSpinner();
  let productDefinitions = [];
  let api = `${productDefinitionApi}/list`;
  const data = {
    page: pdef_page,
    size: pdef_size,
    sortDirection: "desc",
    properties: ["createdTime"],
  };
  httpPost(data, api)
    .done((res) => {
      let data = res.data;
      if (data.content) {
        data.content.forEach((x) => {
          let productDef = new ProductDefinitionData();
          productDef.fromResponse(x);
          productDefinitions.push(productDef);
        });
        ProductDefinitionData.generatePageList(pdefPagination, data);
        ProductDefinitionData.generateEntriesInfo(pdefEntries, data);
        ProductDefinitionData.generatePageSize(selectPageSize, data);
        generateTableProductDef(productDefinitions);
      }
      hidePDefSpinner();
    })
    .fail(() => {
      generateTableProductDef([]);
      hidePDefSpinner();
    });
};

const productDefinitionColumnDef = () => {
  return [
    {
      targets: 8,
      render: (data) => {
        let editBtn = `<a class="btn-floating waves-effect waves-light blue" onclick="onUpdateProductDefinition(${data.id})">
                                        <i class="large material-icons">mode_edit</i>
                                      </a>`;
        return `<div class="w-100 justify-content-center">${editBtn}</div>`;
      },
    },
  ];
};

const onSelectPDefPage = (page) => {
  pdef_page = page;
  getAllDataProductDefinition();
};

const onChangePdefPageSize = () => {
  $(selectPageSizeId).on("change", function () {
    pdef_size = $(`${selectPageSizeId} option:selected`).val();
    getAllDataProductDefinition();
  });
};

const materialSelect = (element) => {
  return M.FormSelect.getInstance(element);
};

class ProductDefinitionData {
  id;
  modelName;
  model;
  location;
  manufacture;
  category;
  supplier;
  color;
  action;
  constructor() {}
  fromResponse(x) {
    this.id = x.id;
    this.modelName = x.modelName;
    this.model = x.model;
    this.location = x.location;
    this.manufacture = x.manufacture;
    this.category = x.category;
    this.supplier = x.supplier;
    this.color = x.color;
    this.action = x;
  }
  static generatePageList = (element, data) => {
    let currentPage = pdef_page;
    if (data) {
      if (!data.empty) {
        element.empty();
        //Init previous button page
        if (data.totalPages > 1) {
          element.append(
            data.first
              ? `<li class="disabled">
                <a><i class="material-icons">chevron_left</i></a>
                </li>`
              : //case not first active
                `<li class="waves-effect">
                  <a onClick="onSelectPDefPage(${pdef_page - 1})">
                  <i class="material-icons">chevron_left</i></a>
                  </li>`
          );
        }
        //Init pagination
        for (let i = 0; i < data.totalPages; i++) {
          element.append(
            currentPage === i
              ? `<li class="active"><a>${i + 1}</a></li>`
              : `<li class="waves-effect"><a onClick="onSelectPDefPage(${i})">${
                  i + 1
                }</a></li>`
          );
        }
        //Init next button page
        if (data.totalPages > 1) {
          element.append(
            data.last
              ? `<li class="disabled">
              <a><i class="material-icons">chevron_right</i></a>
              </li>`
              : //case not last active
                `<li class="waves-effect">
                <a onClick="onSelectPDefPage(${
                  pdef_page + 1
                })"><i class="material-icons">chevron_right</i></a>
            </li>`
          );
        }
      }
    }
  };

  static generatePageSize = (element, data) => {
    let pageSizes = [10, 25, 50, 100];
    element.empty();
    if (data) {
      for (let i of pageSizes) {
        let optionPageSize =
          pdef_size == i
            ? `<option value="" disabled selected>${i}</option>`
            : `<option value="${i}">${i}</option>`;
        element.append(optionPageSize);
      }
      regenerateSelectBox(element);
    }
  };

  static generateEntriesInfo = (element, data) => {
    if (data) {
      element.html(
        `showing ${data.numberOfElements} entries of ${data.totalElements}`
      );
    }
  };
}
