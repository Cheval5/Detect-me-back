const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c6c352d3c9bd4aeb917de8661fc9c894',
});

const handleApiCall = (req, res) => {
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("unable to work with api"))
}

const handleImages = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImages,
    handleApiCall
}