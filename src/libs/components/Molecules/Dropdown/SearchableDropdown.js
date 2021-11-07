function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import { Input } from "../../Atoms/Input";
import { IconShare } from '@matthill8286/atomic-icon-library';
import { StyledList, StyledSearchableDropdownWrapper } from "./Dropdown.styled";
import { DropdownOption } from "./DropdownOption";
export var SearchableDropdown = function SearchableDropdown(props) {
  var className = props.className,
      index = props.index,
      inputValue = props.inputValue,
      _props$initializeOpen = props.initializeOpen,
      initializeOpen = _props$initializeOpen === void 0 ? false : _props$initializeOpen,
      label = props.label,
      errorMessage = props.errorMessage,
      _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      onSelectChange = props.onSelectChange,
      onInputChange = props.onInputChange;
  var ref = React.useRef(null);

  var _React$useState = React.useState(initializeOpen),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isOpen = _React$useState2[0],
      setOpen = _React$useState2[1];

  var _React$useState3 = React.useState(options),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      saiyanOptions = _React$useState4[0],
      setsaiyanOptions = _React$useState4[1];

  var handleClickOutside = function handleClickOutside(event) {
    var _ref$current;

    if (!((_ref$current = ref.current) !== null && _ref$current !== void 0 && _ref$current.contains(event.target))) {
      setOpen(false);
    }
  };

  React.useEffect(function () {
    document.addEventListener('click', handleClickOutside, true);
    return function () {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  var onFocus = function onFocus() {
    setOpen(true);
  };

  var onClickHandler = function onClickHandler(item, index) {
    setOpen(false);
    onSelectChange(item, index);
  };

  var onInputChangeHandler = function onInputChangeHandler(event) {
    var value = event.target.value;
    setsaiyanOptions(value ? options.filter(function (option) {
      return option.label.toLowerCase().includes(value.toLowerCase());
    }) : options);
    onInputChange(event);
  };

  return React.createElement(StyledSearchableDropdownWrapper, {
    className: className,
    ref: ref
  }, React.createElement(Input, {
    state: errorMessage ? 'error' : 'idle',
    errorMessage: errorMessage,
    label: label,
    value: inputValue,
    onFocus: onFocus,
    onChange: onInputChangeHandler,
    inputIcon: React.createElement(IconShare, null),
    inputType: "text"
  }), React.createElement(StyledList, {
    active: isOpen,
    isSearchable: true
  }, saiyanOptions.map(function (item, i) {
    return React.createElement(DropdownOption, {
      key: i,
      active: i === index,
      label: item.label,
      onClick: function onClick() {
        return onClickHandler(item, i);
      }
    });
  })));
};
SearchableDropdown.displayName = 'SearchableDropdown';
//# sourceMappingURL=SearchableDropdown.js.map