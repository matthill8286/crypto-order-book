import { getPictureUrl } from "../../../utils/getPictureUrl";
export var tableHeadingDataMock = [{
  productId: '2247449',
  product: {
    title: 'APPLE iPhone SE 32 GB Gold AGB super strong 500 Watt',
    titleImageId: getPictureUrl('pixelboxx-mss-58658835', 'fee_194_131_png')
  },
  price: {
    price: 129.44,
    currency: 'EUR'
  }
}, {
  productId: '2247446',
  product: {
    title: 'APPLE iPhone SE 32 GB Space 5000 Watt Base Machine with dolby surrond sound.',
    titleImageId: getPictureUrl('pixelboxx-mss-74948678', 'fee_194_131_png')
  },
  price: {
    price: 5,
    currency: 'EUR'
  }
}, {
  productId: '2247447',
  product: {
    title: 'APPLE iPhone SE 32 GB Silber',
    titleImageId: getPictureUrl('pixelboxx-mss-77106620', 'fee_194_131_png')
  },
  price: {
    price: 5,
    currency: 'EUR'
  }
}];
export var tableContentDataMock = [{
  tableRow: [{
    text: 'RAM',
    isFeatureName: true,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: '3 GB',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: '1 GB',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: '50 GB',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }],
  __typename: 'GQLTableRow'
}, {
  tableRow: [{
    text: 'Front Camera 5000 Watt 999x Optical Zoom. Buy it now and make rly cool pics!',
    isFeatureName: true,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: '15 Megapixel Dual',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: '22 Megapixel',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: '100 Megapixel UHD 9000 GigaWatts',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }],
  __typename: 'GQLTableRow'
}, {
  tableRow: [{
    text: 'Powerpoint',
    image: {
      url: 'https://mms-test.cdn.prismic.io/mms-test/0e3789245ff064b99b7f7a8cb5fddecf696167c0_icon_pp.png',
      __typename: 'GQLImageField'
    },
    isFeatureName: true,
    type: 'paragraph+image',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check true',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check true',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check false',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }],
  __typename: 'GQLTableRow'
}, {
  tableRow: [{
    text: 'Word',
    image: {
      url: 'https://mms-test.cdn.prismic.io/mms-test/82cb314aef9c37f8379bd350eb50d8eb47bbd8b3_icon_word.png',
      __typename: 'GQLImageField'
    },
    isFeatureName: true,
    type: 'paragraph+image',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check false',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check false',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check false',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }],
  __typename: 'GQLTableRow'
}, {
  tableRow: [{
    text: 'Excel with excellence!',
    image: {
      url: 'https://mms-test.cdn.prismic.io/mms-test/eba8dab06f037e9a196a6f8e0bc94ad02d8ea724_icon_excel.png',
      __typename: 'GQLImageField'
    },
    isFeatureName: true,
    type: 'paragraph+image',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check true',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check true',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }, {
    text: 'check false',
    isFeatureName: false,
    type: 'paragraph',
    __typename: 'GQLRichTextField'
  }],
  __typename: 'GQLTableRow'
}];
//# sourceMappingURL=ProductsTable.mock.js.map