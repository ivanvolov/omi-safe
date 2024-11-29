const express = require("express");
const cors = require("cors");
const User = require("./core/config");

const PORT = process.env.PORT || 3001;
const app = express();
require("dotenv").config();
const OpenAI = require("openai");
const nodemailer = require('nodemailer');
require("dotenv").config();

app.use(express.json());
app.use(cors());

//openai
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


app.post("/api", async (req, res) => {
    const { uid } = req.query;
    const segments = req.body;
    var test = "uid" + uid;

    console.log("User UID:", test);

    var full_convo = "";

    var segs = segments.transcript_segments
    for (var i = 0; i < segs.length; i++) {
        full_convo += segs[i].text + " ";
    }
    full_convo = full_convo.toLowerCase();
    console.log("Full Convo ########### \n", full_convo);
    console.log("########### \n");

    //sos should only be detected if it is alone, not in a word
    const sosRegex = /\bsos\b/;
    if (sosRegex.test(full_convo)) {

        console.log("SOS DETECTED");
        await contactAuthorities(segments, full_convo, uid, res);

    }
    else {
        test = "   " + test + "USER is SAFE";
        res.json({ message: "" });
    }

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});



//Helper Functions
const contactAuthorities = async (segments, full_convo, uid, res) => {

}