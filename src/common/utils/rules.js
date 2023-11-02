/**element-ui表单验证拓展规则，可在提供给验证的validator属性 */

export default {

  checkInterNum: function (rule, value, callback) { /**整数验证 */
    const reg = /^[0-9]*[1-9][0-9]*$/;
    if (!value) {
      return callback();
    } else {
      if (!reg.test(value)) {
        return callback(new Error('请输入整数'));
      } else {
        return callback();
      }

    }
  },
  email: function (rule, value, callback) { /**邮箱验证 */
    const reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
    if (!value) {
      return callback();
    } else {
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的邮箱地址'));
      } else {
        return callback();
      }

    }
  },
  checkNum: function (rule, value, callback) { /**带小数的数字验证 */
    const reg = /(^\d+(\.\d{1,4})?$)/;
    if (!value) {
      return callback();
    } else {
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的数字(最多保留四位小数)'));
      } else {
        return callback();
      }

    }
  },
  checkPhone: function (rule, value, callback) { /**手机和电话验证 */
    const reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^0?[1][34578][0-9]{9}$)|(^1[3456789]\d{9}$)/;
    if (!value) {
      return callback();
    } else {
      if (!reg.test(value)) {
        return callback(new Error('请输入正确格式的电话或手机号'));
      } else {
        return callback();
      }
    }
  },
  checkNaPost: function (rule, value, callback) { /**邮政编码验证 */
    const reg = /^[0-9]\d{5}$/;
    if (!value) {
      return callback();
    } else {
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的邮政编码'));
      } else {
        return callback();
      }
    }
  },
  checkFax: function (rule, value, callback) { /**传真验证 */
    const reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if (!value) {
      return callback();
    } else {
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的传真号,如:010-88888888'));
      } else {
        return callback();
      }
    }
  },
  checkCreditCode: function (rule, value, callback) { /**统一信用代码 */
    const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
    if (!value) {
      return callback();
    } else {
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的统一信用代码'));
      } else {
        return callback();
      }
    }
  },
  maxString20: function (rule, value, callback) { /**验证字符串不能超过数据库的70长度 */
    if (value != null) {
      var realLength = 0, len = value.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      if (realLength > 20) {
        return callback(new Error('内容长度超过最大长度'));
      } else {
        return callback();
      }
    }
    else {
      return callback();
    }

  },
  maxString30: function (rule, value, callback) { /**验证字符串不能超过数据库的70长度 */
    if (value != null) {
      var realLength = 0, len = value.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      if (realLength > 30) {
        return callback(new Error('内容长度超过最大长度'));
      } else {
        return callback();
      }
    }
    else {
      return callback();
    }
  },
  maxString50: function (rule, value, callback) { /**验证字符串不能超过数据库的70长度 */
    if (value != null) {
      var realLength = 0, len = value.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      if (realLength > 50) {
        return callback(new Error('内容长度超过最大长度'));
      } else {
        return callback();
      }
    }
    else {
      return callback();
    }
  },
  maxString70: function (rule, value, callback) { /**验证字符串不能超过数据库的70长度 */
    if (value != null) {
      var realLength = 0, len = value.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      if (realLength > 70) {
        return callback(new Error('内容长度超过最大长度'));
      } else {
        return callback();
      }
    }
    else {
      return callback();
    }
  },
  maxString80: function (rule, value, callback) { /**验证字符串不能超过数据库的70长度 */
    if (value != null) {
      var realLength = 0, len = value.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      if (realLength > 80) {
        return callback(new Error('内容长度超过最大长度'));
      } else {
        return callback();
      }
    }
    else {
      return callback();
    }
  },
  maxString100: function (rule, value, callback) { /**验证字符串不能超过数据库的70长度 */
    if (value != null) {
      var realLength = 0, len = value.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      if (realLength > 100) {
        return callback(new Error('内容长度超过最大长度'));
      } else {
        return callback();
      }
    }
    else {
      return callback();
    }
  },
  maxString255: function (rule, value, callback) { /**验证字符串不能超过数据库的70长度 */
    if (value != null) {
      var realLength = 0, len = value.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
          realLength += 1;
        else
          realLength += 2;
      }
      if (realLength > 255) {
        return callback(new Error('内容长度超过最大长度'));
      } else {
        return callback();
      }
    }
    else {
      return callback();
    }
  },

};
