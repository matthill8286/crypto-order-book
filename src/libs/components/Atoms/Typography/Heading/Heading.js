function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Typo } from "../Typo";
import { HeadingPresets } from "./HeadingPresets";
export var Heading = function Heading(_ref) {
  var scale = _ref.scale,
      margin = _ref.margin,
      children = _ref.children,
      _ref$bold = _ref.bold,
      bold = _ref$bold === void 0 ? false : _ref$bold,
      _ref$uppercase = _ref.uppercase,
      uppercase = _ref$uppercase === void 0 ? false : _ref$uppercase,
      limitLines = _ref.limitLines,
      limitWidth = _ref.limitWidth,
      color = _ref.color,
      showCursor = _ref.showCursor,
      restProps = _objectWithoutProperties(_ref, ["scale", "margin", "children", "bold", "uppercase", "limitLines", "limitWidth", "color", "showCursor"]);

  var props = _objectSpread(_objectSpread({
    margin: '0',
    color: color,
    fontFamily: 'default',
    spacing: 'base'
  }, HeadingPresets[scale]), restProps);

  if (margin) {
    props.margin = margin;
  }

  if (bold) {
    props.weight = 'bold';
  }

  return React.createElement(Typo, _extends({
    limitLines: limitLines,
    limitWidth: limitWidth,
    toUpperCase: uppercase
  }, props), children);
};
Heading.displayName = 'Heading';
//# sourceMappingURL=Heading.js.map