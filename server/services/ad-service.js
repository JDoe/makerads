import config from 'getconfig';

import { getAd } from '../db';

export async function jsonAd({ referrer } = {}) {
  const ad = await getAd(null, { referrer });
  let jsonData = {
    id: ad._id,
    impressions: ad.impressions || 0,
    clicks: ad.clicks || 0,
    image: `${config.url}/api/ad/${ad._id}/image`,
    url: `${config.url}/api/ad/${ad._id}/redirect`
  };
  if (referrer) {
    jsonData = {
      ...jsonData,
      image: `${jsonData.image}?ref=${referrer}`,
      url: `${jsonData.url}?ref=${referrer}`
    };
  }
  return jsonData;
}

export default async ({ referrer } = {}) => {
  const ad = await getAd(null, { referrer });
  let url = `${config.url}/api/ad/${ad._id}/redirect`;
  let imgSrc = `${config.url}/api/ad/${ad._id}/image`;
  if (referrer) {
    url = `${url}?ref=${referrer}`;
    imgSrc = `${imgSrc}?ref=${referrer}`;
  }
  return `
    <html>
      <head>
        <base target="_parent">
        <style>
          body {
            padding: 0;
            margin: 0;
          }
          .makerad-link {
            display: inline-block;
            width: 320px;
            height: 144px;
          }
          .makerad {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            overflow: hidden;
          }
        </style>
        <script>

        </script>
      </head>
      <body>
        <a class="makerad-link"  href="${url}" target="_blank" rel="noopener">
          <img class="makerad" src="${imgSrc}" />
        </a>
      </body>
    </html>
  `;
};