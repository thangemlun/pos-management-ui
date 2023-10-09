let saveLocationApi;
let addLocationForm;
let table;
let locationSelectBox;
$(document).ready(() => {
  saveLocationApi = `${locationApi}/save`;
  addLocationForm = $("#add-location-form");
  locationSelectBox = $("#location-select");
  initLocationTableConfig();
  getAllLocationData();
  addLocation();
});
const initLocationTableConfig = () => {
  table = new DataTable("#location-table", {
    responsive: true,
    columns: [
      {
        data: "id",
        className: "text-right",
        title: "ID",
        type: "string",
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
      },
    ],
    columnDefs : locationDef()
  });
}
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
      locationSelectBox.append(`<option value="" disabled selected>Choose product definition's location</option>`)
      locations.forEach(x => {
        let option = `<option value="${x.getId()}" class="left circle">${x.getLocationName()}</option>`;
        locationSelectBox.append(option);
      })
      generateLocationTable(locations);
      regenerateSelectBox();
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

const locationDef = () => {
return [{
               targets:2,
               render: (data) => {
                 let editBtn = `<a class="btn-floating waves-effect waves-light blue">
                                    <i class="large material-icons">mode_edit</i>
                                  </a>`;
                 let deleteBtn = `<a class="btn-floating waves-effect waves-light blue">
                                      <i class="large material-icons">delete</i>
                                    </a>`;
                 return `<div class="w-100 justify-content-center">${editBtn}${deleteBtn}</div>`
               }
             }]
};

class LocationModel {
  id;
  locationName;
  action;
  constructor({id,locationName}){
    this.id = id;
    this.locationName = locationName;
    this.action = {id,locationName}
  }
  getId(){
    return this.id;
  }
  getLocationName(){
    return this.locationName;
  }
  setLocationName(locationName){
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
}