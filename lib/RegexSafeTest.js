//const { spawnSync } = require("child_process");

function RegexSafeTest(regex, test_str) {
  if (!(regex instanceof RegExp)) return false;
  if (typeof test_str !== "string") return false;

  if(process.platform === "win32"){
    throw "Not implemented"
  }else if(process.platform == "linux"){
   const native_linux = require("../native/linux/regex_safe_test.node");
   return native_linux.nativeTest(regex, test_str);
  }else{
    throw "Not implemented"
  }
    
}

module.exports = RegexSafeTest