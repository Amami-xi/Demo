const eleHasClass = function (ele, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) {
    return false;
  }
  return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

const eleAddClass = function (ele, cls) {
  if (!eleHasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}

const eleRemoveClass = function (ele, cls) {
  if (eleHasClass(ele, cls)) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

const eleToggleClass = function (ele, cls, bool) {
  var isBool = typeof bool == 'undefined',
    hasBool = eleHasClass(ele, cls);
  if ((isBool && !hasBool) || (!isBool && bool)) {
    eleAddClass(ele, cls);
    return true;
  }
  if ((isBool && hasBool) || (!isBool && !bool)) {
    eleRemoveClass(ele, cls);
    return false;
  }
}

//获取ele的同级的其它对象
const eleSibling = function (ele) {
  var nodes = [];
  var _ele = ele;
  while ((ele = ele.previousSibling)) {
    if (ele.nodeType == 1) {
      nodes.push(ele);
    }
  }
  var ele2 = _ele;
  while ((ele2 = ele2.nextSibling)) {
    if (ele2.nodeType == 1) {
      nodes.push(ele2);
    }
  }
  return nodes;
}

const eleSiblingToggleClass = function (ele, cls, bool) {
  eleSibling(ele).forEach(item => {
    eleToggleClass(item, cls, bool);
  });
}

export default { eleHasClass, eleAddClass, eleRemoveClass, eleToggleClass, eleSibling, eleSiblingToggleClass }