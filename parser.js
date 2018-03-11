function getName(obj, str) {
    var res = str.match(/Name: .*/g);
    res = res[0].replace("Name: ", "").split(" ");
    obj.name = {};
    obj.name.first_name = res[0];
    obj.name.last_name = res[1];
}

function getDob(obj, str) {
    var res = str.match(/Date of Birth: .*/g);
    res = res[0].replace("Date of Birth: ", "");
    obj.dob = res;
}

function getAddresses(obj, str) {
    var res = str.match(/(Address Line \d: .*)/g);
    
    obj.address = [];
    for (let address of res) {
        var addy = address.split(":")[1].trim();
        if (addy.length > 0) {
            obj.address.push(addy);
        }
    }
}

function getCity(obj, str) {
    var res = str.match(/City: .*/g);
    res = res[0].replace("City: ", "");
    obj.city = res;
}

function getState(obj, str) {
    var res = str.match(/State: .*/g);
    res = res[0].replace("State: ", "");
    obj.state = res;
}

function getZip(obj, str) {
    var res = str.match(/Zip: .*/g);
    res = res[0].replace("Zip: ", "");
    obj.zip = res;
}

function getPhoneNumber(obj, str) {
    var res = str.match(/Phone Number: .*/g);
    res = res[0].replace("Phone Number: ", "");
    obj.phone = res;
}

function getEmail(obj, str) {
    var res = str.match(/Email: .*/g);
    res = res[0].replace("Email: ", "");
    obj.email = res;
}

function getCoverages(obj, str) {
    var res = str.match(/(Part \w Effective Date: .*)/g);
    
    obj.coverages = [];
    for (let coverage of res) {
        var covArray = coverage.split(":");
        var covDate = covArray[1].trim();
        var covName = covArray[0].split("Effective Date")[0];
        obj.coverages.push({
            "type" : covName.trim(),
            "effective_date": covDate
        });
    }
}

module.exports = {
    parse : function(data) {
        var top = "--------------------------------\nDemographic\n\n--------------------------------";
        var bottom = "--------------------------------\nEmergency Contact\n\n--------------------------------";
        
        var str = data.substring(data.indexOf(top), data.indexOf(bottom));
        
        var jsonObj = {};
        getName(jsonObj, str);
        getDob(jsonObj, str);
        getAddresses(jsonObj, str);
        getCity(jsonObj, str);
        getState(jsonObj, str);
        getZip(jsonObj, str);
        getPhoneNumber(jsonObj, str);
        getEmail(jsonObj, str);
        getCoverages(jsonObj, str);
        
        return jsonObj;
    }
}