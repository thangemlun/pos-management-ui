let tableProductDefinition;
$(document).ready(() => {
  configProductDefinitionTable();
  getAllDataProductDefinition();
});

const configProductDefinitionTable = () => {
  tableProductDefinition = new DataTable("#product-definition-table", {
    responsive: true,
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
        data: "manufacture",
        className: "text-right",
        title: "Manufacture",
        type: "string",
      },
      {
        data: "category",
        className: "text-right",
        title: "Category",
        type: "string",
      },
      {
        data: "location",
        className: "text-right",
        title: "Location",
        type: "string",
      },
      {
        data: "supplier",
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

const getAllDataProductDefinition = () => {
  showSpinner();
  let productDefinitions = [];
  let api = `${productDefinitionApi}/list`;
  const data = {
    page: 0,
    size: 10,
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
        generateTableProductDef(productDefinitions);
      }
      hideSpinner();
    })
    .fail(() => {
      generateTableProductDef([]);
      hideSpinner();
    });
};

const productDefinitionColumnDef = () => {
  return [
    {
      targets: 8,
      render: (data) => {
        let editBtn = `<a class="btn-floating waves-effect waves-light blue">
                                        <i class="large material-icons">mode_edit</i>
                                      </a>`;
        let deleteBtn = `<a class="btn-floating waves-effect waves-light blue">
                                          <i class="large material-icons">delete</i>
                                        </a>`;
        return `<div class="w-100 justify-content-center">${editBtn}${deleteBtn}</div>`;
      },
    },
  ];
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
}
