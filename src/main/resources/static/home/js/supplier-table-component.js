let saveSupplierApi;
let deleteSupplierApi;
let supplierTable;
let supplierSelectBox;
$(document).ready(() => {
  saveSupplierApi = `${supplierApi}/save`;
  deleteSupplierApi = `${supplierApi}/delete`;
  supplierSelectBox = $("#supplier-select");
  initSupplierTableConfig();
  checkAllSuppliers();
  addSupplier();
  deleteSuppliers();
  getAllSupplierData();
});

const initSupplierTableConfig = () => {
  supplierTable = new DataTable("#suppliers-table", {
    responsive: true,
    columns: [
      {
        data: "id",
        className: "text-right",
        title: `<div class="w-100 justify-content-center">
                  <label>
                    <input type="checkbox" id="supplier_check_all"/>
                    <span></span>               
                  </label>
                </div>`,
        type: "string",
      },
      {
        data: "supplierName",
        className: "text-right",
        title: "Supplier Name",
        type: "string",
      },
      {
        data: "action",
        className: "text-right",
        title: "Action",
        type: "string",
      },
    ],
    columnDefs: supplierDef(),
  });
};

let generateSupplierTable = (suppliers) => {
  supplierTable.clear().rows.add(suppliers).draw();
};

const getAllSupplierData = () => {
  let suppliers = [];
  showSpinner();
  httpGet(`${supplierApi}/all`)
    .done((resp) => {
      let data = resp.data;
      if (data && data.length > 0) {
        data.forEach((x) => suppliers.push(new Supplier(x)));
      }
      //Init generate supplier select box
      //import first option for select
      supplierSelectBox.empty();
      supplierSelectBox.append(
        `<option value="" disabled selected>Choose product definition's supplier</option>`
      );
      suppliers.forEach((x) => {
        let option = `<option value="${x.getId()}" class="left circle">${x.getSupplierName()}</option>`;
        supplierSelectBox.append(option);
        masterData.suppliers.push(x);
      });
      generateSupplierTable(suppliers);
      regenerateSelectBox(supplierSelectBox);
      hideSpinner();
    })
    .fail(() => {
      generateSupplierTable([]);
      hideSpinner();
    });
};

const addSupplier = () => {
  $("#supplier-add-btn").click(function (e) {
    e.preventDefault();
    showSpinner();
    let body = buildForm("#supplier-form");
    validateAndSave(body);
    hideSpinner();
  });
};

const deleteSuppliers = () => {
  $('#btn-delete-suppliers').click((e) => {
    e.preventDefault();
    showSpinner();
    let supplier = new SupplierComponent();
    supplier.deleteIds = getAllCheckedValueByClass('supplierCheckBox');
    console.log(JSON.stringify(supplier.deleteIds));
    supplier.validateAndDelete();
    hideSpinner();
  });
}

const checkAllSuppliers = () =>{
  checkAllEvent('#supplier_check_all','supplierCheckBox');
}

const validateField = (body) => {
  let isValid = true;
  if (!body.supplierName) {
    warning("Missing field", "Supplier name can not be empty");
    isValid = false;
  }
  return isValid;
};

const validateAndSave = (body) => {
  if (validateField(body)) {
    confirmBox(
      "Add Supplier !",
      "Do you want to add supplier",
      saveSuppier,
      body
    );
  }
};

const saveSuppier = (body) => {
  console.log(body);
  if (body) {
    httpPost(body, saveSupplierApi).then((resp) => {
      if (resp) {
        successThenDo(resp.status, resp.message, getAllSupplierData);
        clearForm("#supplier-form");
      }
    });
  }
};

const supplierDef = () => {
  return [
    {
      targets: 0,
      render: (data) => {
        let checkBox = `<label>
                          <input type="checkbox" class="supplierCheckBox" id="supplier_${data}" value="${data}"/>
                          <span></span>               
                        </label>`;
        return `<div class="w-100 justify-content-center">${checkBox}</div>`;
      },
      orderable: false,
    },
    {
      targets: 2,
      render: (data) => {
        let editBtn = `<a class="btn-floating waves-effect waves-light blue">
                                    <i class="large material-icons">mode_edit</i>
                                  </a>`;
        return `<div class="w-100 justify-content-center">${editBtn}</div>`;
      },
    },
  ];
};
