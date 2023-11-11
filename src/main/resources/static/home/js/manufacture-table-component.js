let saveManufactureApi;
let addManufactureForm;
let manufactureTable;
let selectManufactureBox;
let deleteManufactureApi;
$(document).ready(() => {
  saveManufactureApi = `${manufactureApi}/save`;
  deleteManufactureApi = `${manufactureApi}/delete`;
  addManufactureForm = $("#add-manufacture-form");
  selectManufactureBox = $("#manufacture-select");
  initManufactureTableConfig();
  getAllManufactureData();
  addManufacture();
  deleteManufactures();
  checkAllManufactures();
});

const initManufactureTableConfig = () => {
  manufactureTable = new DataTable("#manufacture-table", {
    responsive: true,
    columns: [
      {
        data: "id",
        className: "text-right",
        title: `<div class="w-100 justify-content-center">
                  <label>
                    <input type="checkbox" id="manufacture_check_all"/>
                    <span></span>               
                  </label>
                </div>`,
        type: "string",
      },
      {
        data: "manufactureName",
        className: "text-right",
        title: "Manufacture Name",
        type: "string",
      },
      {
        data: "action",
        className: "text-right",
        title: "Action",
        type: "string",
      },
    ],
    columnDefs: manufactureDef(),
  });
};
let generateManufactureTable = (manufactures) => {
  manufactureTable.clear().rows.add(manufactures).draw();
};

const getAllManufactureData = () => {
  let manufactures = [];
  showSpinner();
  httpGet(`${manufactureApi}/all`)
    .done((resp) => {
      let data = resp.data;
      if (data && data.length > 0) {
        data.forEach((x) => manufactures.push(new ManufactureModel(x)));

        //Generate Select box for product definition
        //Import first option
        selectManufactureBox.empty();
        selectManufactureBox.append(
          `<option value="" disabled selected>Choose product definition's manufacture</option>`
        );
        manufactures.forEach((x) => {
          let option = `<option value="${x.getId()}" class="left circle">${x.getManufactureName()}</option>`;
          selectManufactureBox.append(option);
          masterData.manufactures.push(x);
        });
      }
      generateManufactureTable(manufactures);
      regenerateSelectBox(selectManufactureBox);
      hideSpinner();
    })
    .fail(() => {
      generateManufactureTable([]);
      hideSpinner();
    });
};
const addManufacture = () => {
  $("#manufacture-add-btn").click(function (e) {
    e.preventDefault();
    showSpinner();
    let body = buildForm(addManufactureForm);
    body.id = null;
    let manufacture = new ManufactureModel(body);
    manufacture.validateAndSave(manufacture);
    hideSpinner();
  });
};

const deleteManufactures = () => {
  $('#btn-delete-manufactures').click((e) => {
    e.preventDefault();
    showSpinner();
    let manufacture = new ManufactureModel({ id:null, manufactureName:null });
    manufacture.deleteIds = getAllCheckedValueByClass('manufactureCheckBox');
    console.log(manufacture.deleteIds);
    manufacture.validateAndDelete();
  })
}

//check all btn event
const checkAllManufactures = () =>{
  checkAllEvent('#manufacture_check_all','manufactureCheckBox');
}

const manufactureDef = () => {
  return [
    {
      targets: 0,
      render: (data) => {
        let checkBox = `<label>
                      <input type="checkbox" class="manufactureCheckBox" id="manufacture_${data}" value="${data}"/>
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
        let deleteBtn = `<a class="btn-floating waves-effect waves-light blue">
                                        <i class="large material-icons">delete</i>
                                      </a>`;
        return `<div class="w-100 justify-content-center">${editBtn}${deleteBtn}</div>`;
      },
    },
  ];
};
class ManufactureModel {
  id;
  manufactureName;
  action;
  deleteIds = [];
  constructor({ id, manufactureName }) {
    this.id = id;
    this.manufactureName = manufactureName;
    this.action = { id, manufactureName };
  }
  getId() {
    return this.id;
  }
  getManufactureName() {
    return this.manufactureName;
  }
  setManufactureName(manufactureName) {
    this.manufactureName = manufactureName;
  }

  validateField = () => {
    let isValid = true;
    if (!this.manufactureName) {
      warning("Missing field", "Manufacture name can not be empty");
      isValid = false;
    }
    return isValid;
  };

  validateAndSave = () => {
    if (this.validateField()) {
      confirmBox(
        "Add Manufacture !",
        "Do you want to add Manufacture",
        this.saveManufacture,
        this
      );
    }
  };

  saveManufacture = () => {
    if (this) {
      httpPost(this, saveManufactureApi).then((resp) => {
        if (resp) {
          successThenDo(resp.status, resp.message, getAllManufactureData);
          clearForm(addManufactureForm);
        }
      });
    }
  };

  //Delete feature

  //delete feature
  validateDelete = () => {
    let isValidToDelete = true;
    if (!this.deleteIds.length > 0) {
      warning(
        "Empty checked value",
        "Please select at least 1 manufacture to delete"
      );
      isValidToDelete = false;
    }
    return isValidToDelete;
  };

  validateAndDelete = () => {
    if (this.validateDelete()) {
      confirmBox(
        "Delete manufactures !",
        "Do you want to delete manufactures ",
        this.deleteManufactures,
        this.deleteIds
      );
    }
    hideSpinner();
  };

  deleteManufactures = () => {
    if (this.deleteIds) {
      httpDelete(this.deleteIds, deleteManufactureApi).then((resp) => {
        if (resp) {
          successThenDo(resp.status, resp.message, getAllManufactureData);
        }
      });
    }
  };
}
