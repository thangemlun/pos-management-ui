let saveLocationApi;
let addLocationForm;
let table;
let locationSelectBox;
$(document).ready(() => {
  saveLocationApi = `${locationApi}/save`;
  deleteLocationApi = `${locationApi}/delete`;
  addLocationForm = $("#add-location-form");
  locationSelectBox = $("#location-select");
  initLocationTableConfig();
  getAllLocationData();
  addLocation();
  deleteLocations();
  checkAllLocations();
});
const initLocationTableConfig = () => {
  table = new DataTable("#location-table", {
    responsive: true,
    columns: [
      {
        data: "id",
        className: "text-right",
        title: `<div class="w-100 justify-content-center">
                  <label>
                    <input type="checkbox" id="location_check_all"/>
                    <span></span>               
                  </label>
                </div>`,
        type: "string",
        orderable : false
      },
      {
        data: "locationName",
        className: "text-right",
        title: "Location Name",
        type: "string",
      },
      {
        data: "action",
        className: "text-right",
        title: "Action",
        type: "string",
        orderable : false
      },
    ],
    columnDefs: locationDef(),
  });
};
let generateLocationTable = (locations) => {
  table.clear().rows.add(locations).draw();
};

const getAllLocationData = () => {
  let locations = [];
  showSpinner();
  httpGet(`${locationApi}/all`)
    .done((resp) => {
      let data = resp.data;
      if (data && data.length > 0) {
        data.forEach((x) => locations.push(new LocationModel(x)));
      }
      //Generate location select box
      //Import first option for location option
      locationSelectBox.empty();
      locationSelectBox.append(
        `<option value="" disabled selected>Choose product definition's location</option>`
      );
      locations.forEach((x) => {
        let option = `<option value="${x.getId()}" class="left circle">${x.getLocationName()}</option>`;
        locationSelectBox.append(option);
        masterData.locations.push(x);
      });
      generateLocationTable(locations);
      regenerateSelectBox(locationSelectBox);
      hideSpinner();
    })
    .fail(() => {
      generateLocationTable([]);
      hideSpinner();
    });
};
const addLocation = () => {
  $("#location-add-btn").click(function (e) {
    e.preventDefault();
    showSpinner();
    let body = buildForm(addLocationForm);
    body.id = null;
    let location = new LocationModel(body);
    location.validateAndSave(location);
    hideSpinner();
  });
};

const deleteLocations = () => {
  $('#btn-delete-locations').click((e) => {
    e.preventDefault();
    showSpinner();
    let location = new LocationModel({id : null,locationName:null});
    location.deleteIds = getAllCheckedValueByClass('locationCheckBox');
    location.validateAndDelete();
  })
}

const checkAllLocations = () =>{
  checkAllEvent('#location_check_all','locationCheckBox');
}

const locationDef = () => {
  return [
    {
      targets: 0,
      render: (data) => {
        let checkBox = `<label>
                        <input type="checkbox" class="locationCheckBox" id="location_${data}" value="${data}"/>
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
      orderable: false,
    },
  ];
};

class LocationModel {
  id;
  locationName;
  action;
  deleteIds = [] ;
  constructor({ id, locationName }) {
    this.id = id;
    this.locationName = locationName;
    this.action = { id, locationName };
  }
  getId() {
    return this.id;
  }
  getLocationName() {
    return this.locationName;
  }
  setLocationName(locationName) {
    this.locationName = locationName;
  }

  validateField = () => {
    let isValid = true;
    if (!this.locationName) {
      warning("Missing field", "Location name can not be empty");
      isValid = false;
    }
    return isValid;
  };

  validateAndSave = () => {
    if (this.validateField()) {
      confirmBox(
        "Add Location !",
        "Do you want to add Location",
        this.saveLocation,
        this
      );
    }
  };

  saveLocation = () => {
    if (this) {
      httpPost(this, saveLocationApi).then((resp) => {
        if (resp) {
          successThenDo(resp.status, resp.message, getAllLocationData);
          clearForm(addLocationForm);
        }
      });
    }
  };

  //delete feature
  validateDelete = () => {
    let isValidToDelete = true;
    if(!this.deleteIds.length > 0){
      warning("Empty checked value", "Please select at least 1 location to delete");
      isValidToDelete = false;
    }
    return isValidToDelete;
  }

  validateAndDelete = () =>{
    if(this.validateDelete()) {
      confirmBox(
        "Delete locations !",
        "Do you want to delete locations",
        this.deleteLocations,
        this.deleteIds
      );
      hideSpinner();
    }
  }

  deleteLocations = () => {
    if(this.deleteIds){
      httpDelete(this.deleteIds,deleteLocationApi).then((resp) => {
        if(resp) {
          successThenDo(resp.status, resp.message, getAllLocationData);
        }
      });
    }
  }

}
