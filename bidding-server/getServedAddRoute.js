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
    `
  };

export default async(req, res) =>{
    try {
        const ad = await Ad.findOne({id: req.params.id});
        console.log(ad)
        if (ad) {
           return res.set('Content-Type', 'application/xml').json({
            id: ad.id,
            creativeUrl:generateVAST(ad),
            advertiser: ad.advertiser,
            impressions: ad.impressions,
          });
        } else {
          return res.status(404).send('Ad not found');
        }
      } catch (error) {
        return res.status(500).send('Error serving ad');
      }
}