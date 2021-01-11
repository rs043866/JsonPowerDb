$("#empId").focus();
function validateAndGetFormData() {  //Function for validating all Fields
    var empIdVar = $("#empId").val();
    if (empIdVar === "") { //Emp Id Validation
        alert("Employee ID Required Value");
        $("#empId").focus();
        return "";
    }
    var empNameVar = $("#empName").val();
    if (empNameVar === "") { //EmpName Validation
        alert("Employee Name is Required Value");
        $("#empName").focus();
        return "";
    }
    var empEmailVar = $("#empEmail").val();
    if (empEmailVar === "") { //Emp Email Validation
        alert("Employee Email is Required Value");
        $("#empEmail").focus();
        return "";
    }
    var jsonStrObj = {  
        empId: empIdVar,
        empName: empNameVar,
        empEmail: empEmailVar,
    };
    return JSON.stringify(jsonStrObj); //return Json object
}
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
    + "\"token\" : \""
    + connToken
    + "\","
    + "\"dbName\": \""
    + dbName
    + "\",\n" + "\"cmd\" : \"PUT\",\n"
    + "\"rel\" : \""
    + relName + "\","
    + "\"jsonStr\": \n"
    + jsonObj
    + "\n"
    + "}";
    return putRequest;
}
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
} 
function resetForm() { // Reset the form and place cursor at EmpId
    $("#empId").val("")
    $("#empName").val("");
    $("#empEmail").val("");
    $("#empId").focus();
}
function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90937251|-31948794367916233|90932824", jsonStr, "SAMPLE", "EMP-REL");
    //alert(putReqStr);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(putReqStr,"http://api.login2explore.com:5577", "/api/iml");
    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    resetForm();
}