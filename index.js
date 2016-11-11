'use strict';

const Data = require('./data.json');
const _ = require('lodash');

class Pinyin {
  get(str) {
    this.isZh = false;
    let ret = [];
    let reg = new RegExp('[a-zA-Z0-9\- ]');
    if (str && str.length !== 0) {
      _.forEach(str, val => {
        if (reg.test(val)) {
          if (ret.length !== 0 && !this.isZh) {
            ret.push(ret.pop() + val);
          } else {
            this.isZh = false;
            ret.push(val);
          }
        } else {
          let name = this.search(val);
          if (name) {
            this.isZh = true;
            ret.push(name);
          }
        }
      });
    }
    return ret;
  }

  search(str) {
    let once = true;
    let ret = null;
    _.forEach(Data, (val, key) => {
      if (once && val.indexOf(str) !== -1) {
        once = false;
        ret = key;
      }
    });
    return ret;
  }
}
let pinyin = new Pinyin();
module.exports = pinyin.get.bind(pinyin);
