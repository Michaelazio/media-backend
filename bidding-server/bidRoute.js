import Ad from "./AdbidModel.js";

export default async(req,res)=>{
    try {
        const bids = await Ad.find();
        const winningBid = bids.sort((a, b) => b.bidAmount - a.bidAmount)[0];
    
        if (winningBid) {
          const vastResponse = `
            <VAST version="4.3">
              <Ad id="${winningBid.id}">
                <InLine>
                  <AdSystem>Ad Server</AdSystem>
                  <AdTitle>${winningBid.advertiser}</AdTitle>
                  <Creatives>
                    <Creative>
                      <Linear>
                        <MediaFiles>
                          <MediaFile><![CDATA[${winningBid.creativeUrl}]]></MediaFile>
                        </MediaFiles>
                      </Linear>
                    </Creative>
                  </Creatives>
                </InLine>
              </Ad>
            </VAST>
          `;
          res.set('Content-Type', 'application/xml');
          res.send(vastResponse);
        } else {
          res.status(404).send('No bids available');
        }
      } catch (error) {
        res.status(500).send('Error processing bid');
      }
}