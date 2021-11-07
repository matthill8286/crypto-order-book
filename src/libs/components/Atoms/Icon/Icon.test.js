import React from 'react';
import { IconArticle } from '@matthill8286/atomic-icon-library';
import { renderWithTheme } from "../../../testRenderer";
import { Icon } from "./Icon";
describe('Icon', function () {
  it('renders correctly', function () {
    var tree = renderWithTheme(React.createElement(Icon, null, React.createElement(IconArticle, null)));
    expect(tree).toMatchSnapshot();
  });
});
//# sourceMappingURL=Icon.test.js.map