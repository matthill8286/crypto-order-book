import { CopyText, Heading } from "../../Atoms/Typography";
import { styled } from "../../../styles/styled";
export var BoxHeading = styled(Heading).withConfig({
  displayName: "ErrorBoxstyled__BoxHeading",
  componentId: "sc-1b1ycrk-0"
})(["margin:", " 0;"], function (_ref) {
  var theme = _ref.theme;
  return theme.spacing.base.xxs;
});
export var InfoHost = styled.div.withConfig({
  displayName: "ErrorBoxstyled__InfoHost",
  componentId: "sc-1b1ycrk-1"
})(["margin-left:", ";"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.spacing.base.md;
});
export var BoxSubtitle = styled(CopyText).withConfig({
  displayName: "ErrorBoxstyled__BoxSubtitle",
  componentId: "sc-1b1ycrk-2"
})(["margin-top:", ";margin-bottom:", ";color:", ";"], function (_ref3) {
  var theme = _ref3.theme;
  return theme.spacing.base.xs;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.spacing.base.sm;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.color.grey4;
});
//# sourceMappingURL=ErrorBox.styled.js.map