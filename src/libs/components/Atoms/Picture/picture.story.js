import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Picture } from "./Picture";
var imageUrls = ['https://wac-cdn.atlassian.com/dam/jcr:e9ef90f9-c84a-4cba-af2f-9aa7d683ede3/Jira%20Integration.svg?cdnVersion=1324', 'https://www.mountaingoatsoftware.com/uploads/blog/2018-05-22-the-10-best-bits-of-scrum-master-advice-quote.png', 'https://chartec.net/wp-content/uploads/2017/10/Procrastination.jpg', 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_750/https://focusinspired.com/wp/wp-content/uploads/2017/01/BMC.png', 'https://picscdn.redblue.de/doi/pixelboxx-mss-76251365/fee_786_587_png', 'https://picscdn.redblue.de/doi/pixelboxx-mss-72273220/fee_786_587_png'];
var objectFitList = ['none', 'contain', 'cover', 'fill', 'scale-down'];
storiesOf('Design System/Atoms/Picture', module).add('Default', function () {
  return React.createElement(Picture, {
    src: 'https://wac-cdn.atlassian.com/dam/jcr:e9ef90f9-c84a-4cba-af2f-9aa7d683ede3/Jira%20Integration.svg?cdnVersion=1324',
    alt: 'thumbnail'
  });
}).add('Thumbnail Image', function () {
  return React.createElement(Picture, {
    width: "180px",
    height: "70px",
    onClick: action('click'),
    src: 'https://wac-cdn.atlassian.com/dam/jcr:e9ef90f9-c84a-4cba-af2f-9aa7d683ede3/Jira%20Integration.svg?cdnVersion=1324',
    alt: 'thumbnail'
  });
}).add('Object-Fit', function () {
  var url = select('Image', imageUrls, imageUrls[0]);
  var objectFit = select('Object Fit', objectFitList, 'fill');
  return React.createElement("div", null, React.createElement(Picture, {
    width: "100%",
    height: "300px",
    src: url,
    objectFit: objectFit
  }));
}).add('Rounded Border', function () {
  var url = 'http://es34.mycliplister.com/cls/static/20cacbf0765456d6519b9194c7aef6f3c0c1c2fd3a05395aeb8146fdebcfc4a7e4c5829e2232ea4a0fd88c560cad1304';
  return React.createElement("div", null, React.createElement(Picture, {
    src: url,
    rounded: true
  }));
});
//# sourceMappingURL=picture.story.js.map