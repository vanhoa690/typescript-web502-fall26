console.log("typescript");
var age = 25;
age = 30;
var myName = "hoadv";
myName = "20";
var dihockhong = true;
dihockhong = false;
var myYear = 2005;
// myYear = "20008"; // error
// object: chua nhieu thuoc tinh
var student = {
    name: "hoadv",
    age: 34,
    isActive: true,
};
// enum
var status;
(function (status) {
    status["done"] = "ho\u00E0n th\u00E0nh";
    status["doing"] = "\u0111ang l\u00E0m";
})(status || (status = {}));
// array: []: nhieu phan tu
var numbers = [1, 2, 3, 4];
var students = ["nam", "an"];
var products = [{ name: "laptop" }, { name: "laptop" }];
