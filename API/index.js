const Twit = require("twit");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

let hashtagArray = [];

// #region
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  express.json({
    type: "*/*",
  })
);

app.use(cors());
// #endregion

// Cuando te hagan un get
app.get("/hashtag", (req, res) => {
  res.send("Me hicieron un get");
  console.log(res);
});

// Cuando te hagan un post
app.post("/hashtag", (req, res) => {
  let transaction = req.body;
  hashtagArray.push(transaction);
  res.send(JSON.stringify("Hashtag guardado"));
  for (let i = 0; i < hashtagArray.length; i++) {
    console.log(hashtagArray[i]);
  }
});

app.listen(port, () => {
  console.log(`Estoy ejecutandome en http://localhost:${port}`);
  for (let i = 0; i < hashtagArray.length; i++) {
    console.log(hashtagArray[i]);
  }
});

const T = new Twit({
  consumer_key: "MJHQa8lNERAERQeuUj6KJMljh", //API KEY
  consumer_secret: "j7uevbcxB9k71sTjzzYMYZYaYcfzhOnzFcqIrBN0qE4z1IFIE6", //API KEY SECRET
  access_token: "95053840-kjXYR2Kwn930kND0NxHPDm6cnbeIPXitPtGlZqaX9", //ACCESS TOKEN
  access_token_secret: "lxWc05ZGV3MEXw8dsZtgLJLQVh0GwOGEreY3UTowSmi67", //ACCESS TOKEN SECRET
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});
//Buscar los hashtag que vienen del arreglo hashtag array
const stream = T.stream("statuses/filter", {
  track: `${hashtagArray[0]}`
  });

// Obtener informacion del tweet
stream.on("tweet", function (tweet) {
  console.log(tweet.text);
  console.log(tweet.user.name);
  console.log(tweet.user.screenname);
  console.log(tweet.user.location);
  console.log(tweet.user.description);

// Retweet
T.post(
  "statuses/retweet/:id",
  { id: tweet.id_str },
  function (err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Se hizo retweet al tweet: ${tweet}`);
    }
  }
);
hashtagArray.push(tweet.id_str);
console.log(tweet.id_str);
T.post(
  "favorites/create",
  { id: tweet.text },
  function (err, data, response) {
    if (err) {
      console.log(err);
    }
  }
);
});
