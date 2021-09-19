const Twit = require("twit");

const T = new Twit({
  consumer_key: "MJHQa8lNERAERQeuUj6KJMljh",//API KEY
  consumer_secret: "j7uevbcxB9k71sTjzzYMYZYaYcfzhOnzFcqIrBN0qE4z1IFIE6",//API KEY SECRET
  access_token: "95053840-kjXYR2Kwn930kND0NxHPDm6cnbeIPXitPtGlZqaX9",//ACCESS TOKEN
  access_token_secret: "lxWc05ZGV3MEXw8dsZtgLJLQVh0GwOGEreY3UTowSmi67",//ACCESS TOKEN SECRET
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});
//Cuando alguien twittee el hashtag #gomezgtz2021 avisame
const stream = T.stream("statuses/filter", { track: "#gomezgtz2021" });

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
        console.log(`Se hizo retweet al tweet: ${tweet.id_str}`);
      }
    }
  );
  T.post(
    "favorites/create",
    { id: tweet.id_str },
    function (err, data, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Se hizo favorito al tweet: ${tweet.id_str}`);
      }
    }
  );
});
