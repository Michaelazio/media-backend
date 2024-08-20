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
  
  app.get('/vast/:id', async (req, res) => {
    const ad = await Ad.findById(req.params.id);
    const vastXml = generateVAST(ad);
    res.set('Content-Type', 'application/xml');
    res.send(vastXml);
  });
  