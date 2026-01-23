//const { spawnSync } = require("child_process");

function RegexSafeTest(regex, test_str) {
  if (!(regex instanceof RegExp)) return false;
  if (typeof test_str !== "string") return false;

  if(process.platform === "win32" ){
    if(process.version.startsWith("v24")){
        const native_windows = require("../native/windows/regex_safe_test_node24.node");
        return native_windows.nativeTest(regex, test_str);    
    }else if(process.version.startsWith("v20")){
        const native_windows = require("../native/windows/regex_safe_test_node20.node");
        return native_windows.nativeTest(regex, test_str);    
    }else{
        throw "Not implemented for this Node version"
    }
  }else if(process.platform == "linux"){
    if(process.version.startsWith("v24")){
        const native_linux = require("../native/linux/regex_safe_test_node24.node");
        return native_linux.nativeTest(regex, test_str);
    }else if(process.version.startsWith("v20")){
        const native_linux = require("../native/linux/regex_safe_test_node20.node");
        return native_linux.nativeTest(regex, test_str);    
    }else{
        throw "Not implemented for this Node version"
    }
   
  }else{
    throw "Not implemented for this OS"
  }
    
}

module.exports = RegexSafeTest