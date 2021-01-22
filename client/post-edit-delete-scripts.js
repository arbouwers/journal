/* *************************
 *** POST JOURNAL ***
************************** */
function postJournal() {
  //  console.log('postJournal Function Called')

  let title = document.getElementById('title').value;
  let date = document.getElementById('entry').value;
  let entry = document.getElementById('date').value;

  const accessToken = localStorage.getItem('SessionToken')
  let newEntry = { journal: { title: title, entry: entry, date: date }};

  fetch('http://localhost:3000/journal/create', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': accessToken
    }),
    body: JSON.stringify(newEntry)
  })
  .then(response => {
    console.log(response.json())
    displayMine()
  })
  .catch((err) => {
    console.log(err)
  })
  }
  
  
  /* *************************
   *** UPDATE JOURNAL ***
  ************************** */
  function editJournal(postId) {
   console.log('editJournal Function Called')
  }
  
  
  /* *************************
   *** DELETE JOURNAL ***
  ************************** */
  function deleteJournal(postId) {
   console.log('deleteJournal Function Called')
  }