import Ad from "./AdbidModel.js";

const generateVAST = (ad) => {
  return `
    <VAST version="4.3">
      <Ad id="${ad.id}">
        <InLine>
          <AdSystem>Ad Server</AdSystem>
          <AdTitle>${ad.advertiser}</AdTitle>
          <Creatives>
            <Creative>
              <Linear>
                <MediaFiles>
                  <MediaFile><![CDATA[${ad.creativeUrl}]]></MediaFile>
                </MediaFiles>
              </Linear>
            </Creative>
          </Creatives>
        </InLine>
      </Ad>
    </VAST>
    `;
};

const generateVMAP = (ads) => {
  return `
    <VMAP version="1.0">
      <AdBreak timeOffset="start" breakType="linear" breakId="preroll">
        <AdSource allowMultipleAds="false" followRedirects="true" id="1">
          <VASTAdData>
            ${generateVAST(ads[0])}
          </VASTAdData>
        </AdSource>
      </AdBreak>
      <AdBreak timeOffset="00:10:00" breakType="linear" breakId="midroll">
        <AdSource allowMultipleAds="false" followRedirects="true" id="2">
          <VASTAdData>
            ${generateVAST(ads[1])}
          </VASTAdData>
        </AdSource>
      </AdBreak>
      <AdBreak timeOffset="end" breakType="linear" breakId="postroll">
        <AdSource allowMultipleAds="false" followRedirects="true" id="3">
          <VASTAdData>
            ${generateVAST(ads[2])}
          </VASTAdData>
        </AdSource>
      </AdBreak>
    </VMAP>
    `;
};

export default async (req, res) => {
  try {
    const ads = await Ad.find().limit(3);
    const vmapXml = generateVMAP(ads);
    return res.status(200).set("Content-Type", "application/xml").send(vmapXml);
  } catch (error) {
    return res.status(500).json(error);
  }
};
