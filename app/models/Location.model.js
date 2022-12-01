const sql = require("./db.js")

// constructor
const Location = function(location) {
    this.Location_ID = location.Location_ID;
    this.Name = location.Name;
    this.Service_Type = location.Service_Type;
    this.Address = location.Address;
    this.City = location.City;
    this.State = location.State;
    this.Zip = location.Zip;
  };

Location.getAll = (title, result) => {
  let query = "SELECT * FROM location";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("locations: ", res);
    result(null, res);
  });
};

Location.findByID = (id, result) => {
  console.log(id);
  sql.query(`SELECT * FROM location WHERE Location_ID=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found location: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Location with the id
    result({ kind: "not_found" }, null);
})
}


module.exports = Location