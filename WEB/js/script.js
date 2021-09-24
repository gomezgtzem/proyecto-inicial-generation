const formElement = document.getElementById("searchHashtag");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  let hashtag = document.getElementById("hashtag").value;
  let transaction = {hashtag: hashtag};
  let transactionJson = JSON.stringify(transaction);
  // Mandar la transactionJson al backend y guardarlos ahi
  fetch('http://localhost:3000/hashtag', {
    method: 'POST',
    body: transactionJson
  });
  // .then(x=> console.log('Hola'))
})