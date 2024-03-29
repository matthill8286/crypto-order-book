import React from 'react';
import { Badge } from "../../Atoms/Badge";
import { Picture } from "../../Atoms/Picture";
import { ScrollSnapSlider } from "./ScrollSnapSlider";
import { pictureEntries, withVideoEntries } from "./ScrollSnapSlider.data";
var badges = [{
  id: 1,
  name: 'Sponsored'
}, {
  id: 2,
  name: 'Featured'
}];

var renderWithPictureComponent = function renderWithPictureComponent(item, index) {
  return React.createElement("article", {
    key: item.assetID + index
  }, React.createElement(Picture, {
    height: "100%",
    width: "100%",
    src: item.url,
    alt: item.assetID
  }));
};

var renderWithPictureOrVideoComponent = function renderWithPictureOrVideoComponent(item, index) {
  if (item.usageType === 'Asset Video') {
    return "Investigate Video Player";
  } else {
    return renderWithPictureComponent(item, index);
  }
};

var SlideSettings = {
  mobileSmall: 1,
  mobileBig: 1,
  tablet: 2,
  desktop: 3
};
export default {
  title: 'Design System/Molecules/ScrollSnapSlider',
  component: ScrollSnapSlider,
  argTypes: {
    slidesPerPageSettings: SlideSettings
  }
};

var Template = function Template(args) {
  return React.createElement(ScrollSnapSlider, args, args.children);
};

var TemplateWithBadge = function TemplateWithBadge(args) {
  return React.createElement("div", null, React.createElement(Badge, {
    badges: badges
  }), React.createElement(ScrollSnapSlider, args, args.children));
};

export var Default = Template.bind({});
Default.args = {
  slidesPerPageSettings: {
    mobileSmall: 1,
    mobileBig: 1,
    tablet: 1,
    desktop: 1
  },
  children: pictureEntries.map(function (item, index) {
    return renderWithPictureComponent(item, index);
  })
};
export var withVideo = Template.bind({});
withVideo.args = {
  slidesPerPageSettings: {
    mobileSmall: 1,
    mobileBig: 1,
    tablet: 1,
    desktop: 1
  },
  children: withVideoEntries.map(function (item, index) {
    return renderWithPictureOrVideoComponent(item, index);
  })
};
export var withBadges = TemplateWithBadge.bind({});
withBadges.args = {
  slidesPerPageSettings: {
    mobileSmall: 1,
    mobileBig: 1,
    tablet: 1,
    desktop: 1
  },
  children: withVideoEntries.map(function (item, index) {
    return renderWithPictureOrVideoComponent(item, index);
  })
};
//# sourceMappingURL=ScrollSnapSlider.story.js.map