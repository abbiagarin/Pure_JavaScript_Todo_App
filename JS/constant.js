"use strict";

const $ = (el, all) => {
  if (all) {
    return document.querySelectorAll(`${el}`);
  }
  return document.querySelector(`${el}`);
};


