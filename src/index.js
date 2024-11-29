const express = require("express");
const cors = require("cors");
const { lock } = require("./web3");

const config = require("./config");

const PORT = config.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api", async (req, res) => {
    const { uid } = req.query;
    const segments = req.body;
    let test = "uid" + uid;

    //console.log("Segments", segments);
    console.log("User UID:", test);

    //console.log(segments);
    let full_convo = "";

    let segs = segments.transcript_segments
    for (var i = 0; i < segs.length; i++) {
        full_convo += segs[i].text + " ";
    }
    full_convo = full_convo.toLowerCase();

    const sosRegex = /\byellow big with onions in the years\b/;
    if (sosRegex.test(full_convo)) {

        await lock();

    }
    else {
        res.json({ message: "" });
    }

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});