import Ad from "./AdbidModel.js";

export default async (req, res) => {
    try {
        const newAd = new Ad(req.body);
        await newAd.save();
        res.status(201).send('Bid submitted successfully');
      } catch (error) {
        res.status(500).send('Error submitting bid');
      }
}