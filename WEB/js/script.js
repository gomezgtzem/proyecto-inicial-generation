// const formElement = document.getElementById("#hashtag");
const $formElement    = document.querySelector('#form-hashtag');
const $hashtagElement = document.querySelector('#input-hashtag');
  $formElement.addEventListener('submit', (e)=>{
    // debugger;
    e.preventDefault();
    console.log($hashtagElement.value);
    let transaction = {hashtag: $hashtagElement.value};
    let transactionJson = JSON.stringify(transaction);
    // Mandar la transactionJson al backend y guardarlos ahi
    fetch('http://localhost:3000/hashtag', {
      method: 'POST',
      body: transactionJson
    });
  })

// formElement.addEventListener("submit", (event) => {
//   event.preventDefault();
//   let hashtag = document.getElementById("#hashtag").value;
//   console.log(typeof(hashtag));
  // .then(x=> console.log('Hola'))
// })