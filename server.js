require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

app.listen(PORT, () => {
    console.log(`Listening on ${HOSTNAME}:${PORT}`);
});