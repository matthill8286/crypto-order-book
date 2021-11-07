import React from 'react';
import { styled } from "../../../styles/styled";
import { LogoFiltered } from '@matthill8286/atomic-icon-library';
var StyledWrapper = styled.div.withConfig({
  displayName: "Logo__StyledWrapper",
  componentId: "sc-1m9hc47-0"
})(["position:relative;max-width:200px;fill:", ";"], function (_ref) {
  var color = _ref.color,
      theme = _ref.theme;
  return color && theme.color[color] || theme.color.primary;
});
var StyledsaiyanLogo = styled(LogoFiltered).withConfig({
  displayName: "Logo__StyledsaiyanLogo",
  componentId: "sc-1m9hc47-1"
})(["display:block;height:80px;width:100%;"]);
export var Logo = function Logo(_ref2) {
  var white = _ref2.white,
      className = _ref2.className,
      uni = _ref2.uni;
  return React.createElement(StyledWrapper, {
    color: white ? 'white' : undefined,
    className: className
  }, React.createElement(StyledsaiyanLogo, null));
};
//# sourceMappingURL=Logo.js.map