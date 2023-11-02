export function closestMultiple(n, x) {

    if (x > n)

        return x;

    n = n + parseInt(x / 2, 10);

    n = n - (n % x);

    return n;

}

/**
 * 乘法
 * @param {*} arg1
 * @param {*} arg2
 */
export const accMul = (arg1, arg2) => {
    if (isNullorEmpty(arg1)) { 
        arg1 = 0;
    }
    if (isNullorEmpty(arg2)) { 
        arg2 = 0;
    }
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  };

/**
 * 除法
 * @param {*} arg1
 * @param {*} arg2
 */
export const accDiv = (arg1, arg2) => {
    if (isNullorEmpty(arg1)) { 
        arg1 = 0;
    }
    if (isNullorEmpty(arg2)) { 
        return 0;
    }
    let t1 = 0;
    let t2 = 0;
    let r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    let intDiv = r1 / r2;
    let pow = Math.pow(10, t2 - t1);
    return accMul(intDiv, pow); // 这里用上面定义好的乘法运算
  };
  
  /**
   * 保留四位小数
   * @param {*} x
   */
  export const toDecimal4 = (x) => {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 10000) / 10000;
    var s = f.toString();
    var rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + 4) {
      s += "0";
    }
    return s;
  };
  

  /*验证是否为空*/
export function isNullorEmpty(str){
    if(typeof (str) == "undefined" || str == null || str === ""){
      return  true;
    }
    return false;
  }