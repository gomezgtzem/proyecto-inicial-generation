const Twit = require("twit");

const T = new Twit({
  consumer_key: "zM0cnjpMtiEVigzSK7pMwho3q",
  consumer_secret: "X0XpzeaLqrL3Rt83l77u0gfZDVPd4ZUs0rRmkd9Osk6mskpqTk",
  access_token: "95053840-ih2xOx0ccNfaLJwJoVlVYwntAcbSifo7ZVjvxVb4Q",
  access_token_secret: "yMaMD9BA3qE6CR1lx0D3RJiOkxRCf0Y93n7naKWcKuUwd",
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
