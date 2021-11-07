import React from 'react';
import { IconButton } from "../../../Atoms/Button";
import { css, styled } from "../../../../styles/styled";
import { StyleguideLock } from '@matthill8286/atomic-icon-library';
import { Icon } from "../../../Atoms/Icon";
var StyledAssetLocked = styled.div.withConfig({
  displayName: "AssetLocked__StyledAssetLocked",
  componentId: "jgkafr-0"
})(function (_ref) {
  var theme = _ref.theme;
  return css(["position:absolute;z-index:10;display:flex;bottom:calc(", " - 0.5px);right:calc(", " + 1px);"], theme.spacing.base.sm, theme.spacing.base.sm);
});
var StyledIconButton = styled(IconButton).withConfig({
  displayName: "AssetLocked__StyledIconButton",
  componentId: "jgkafr-1"
})(["border:none;display:flex;padding:0;min-width:auto;justify-content:center;"]);
export var AssetLocked = function AssetLocked(_ref2) {
  var _ref2$color = _ref2.color,
      color = _ref2$color === void 0 ? 'grey6' : _ref2$color,
      onLockClick = _ref2.onLockClick,
      locked = _ref2.locked;

  if (!locked) {
    return null;
  }

  return React.createElement(StyledAssetLocked, null, React.createElement(StyledIconButton, {
    isFlat: true,
    round: true,
    onClick: onLockClick
  }, React.createElement(Icon, {
    color: color,
    height: "md"
  }, React.createElement(StyleguideLock, null))));
};
//# sourceMappingURL=AssetLocked.js.map