function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { subscribe } from 'subscribe-ui-event';
export var withBackToTop = function withBackToTop(WrappedComponent) {
  return function (_Component) {
    _inherits(_class2, _Component);

    var _super = _createSuper(_class2);

    function _class2() {
      var _this;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "handleTimeout", void 0);

      _defineProperty(_assertThisInitialized(_this), "subscribers", []);

      _defineProperty(_assertThisInitialized(_this), "state", {
        scrollDirection: 'NONE',
        backToTop: 'HIDDEN'
      });

      return _this;
    }

    _createClass(_class2, [{
      key: "handleScroll",
      value: function handleScroll(event, augmentedEvent) {
        if (augmentedEvent.scroll.delta > 0 && this.state.scrollDirection !== 'DOWN' && augmentedEvent.scroll.top > 0) {
          this.setState({
            scrollDirection: 'DOWN'
          });
        } else if (augmentedEvent.scroll.delta < 0 && this.state.scrollDirection !== 'UP') {
          this.setState({
            scrollDirection: 'UP'
          });
        }

        this.handleBackToTop(augmentedEvent.scroll.top);
      }
    }, {
      key: "handleBackToTop",
      value: function handleBackToTop(scrollPositionY) {
        var _this2 = this;

        clearTimeout(this.handleTimeout);

        if (this.state.scrollDirection === 'DOWN' && scrollPositionY > 300) {
          this.setState({
            backToTop: 'VISIBLE'
          });
          this.handleTimeout = setTimeout(function () {
            _this2.setState({
              backToTop: 'TRANSPARENT'
            });
          }, 6000);
        } else if (this.state.scrollDirection === 'UP') {
          this.handleTimeout = setTimeout(function () {
            _this2.setState({
              backToTop: 'TRANSPARENT'
            });

            _this2.setState({
              backToTop: 'HIDDEN'
            });
          }, 1000);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.subscribers = [subscribe('scroll', this.handleScroll.bind(this), {
          useRAF: true,
          enableScrollInfo: true
        })];
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.subscribers.forEach(function (subscriber) {
          return subscriber.unsubscribe();
        });
        clearTimeout(this.handleTimeout);
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        return React.createElement(WrappedComponent, _extends({
          visible: this.state.backToTop,
          onMouseOver: function onMouseOver() {
            return clearTimeout(_this3.handleTimeout);
          }
        }, this.props));
      }
    }]);

    return _class2;
  }(Component);
};
//# sourceMappingURL=withBackToTop.js.map