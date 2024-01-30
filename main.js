//AXIOS GLOBAL
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
// function getTodos() {
//   axios({
//     method:'get',
//     url:'https://jsonplaceholder.typicode.com/todos',
//     params:{
//       _limit:5
//     }
//   })
//   .then(res => showOutput(res))//res gives us {data,status,status text,header}
//   .catch(err => console.log(err))
// } // this is long way another way is show below
function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')//{params:{ _limit:5}} to remove this add todos?_limit=5
  .then(res => showOutput(res))//res gives us {data,status,status text,header}
  .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    data:{//if we dont write data also its okay
      title:'New Todo',
      completed: false
    }
})
.then(res => showOutput(res))
.catch(err => console.log(err))
}

// PUT/PATCH REQUEST
// function updateTodo() {
//   axios.put('https://jsonplaceholder.typicode.com/todos/1', //we added /1 after todo
//     {
//       title:'updatedTodo',
//       completed: true
//     }//the put request will also remove the username as we didnt include it in the above code thats where patch comes in
// )
// .then(res => showOutput(res))
// .catch(err => console.log(err))
// }
// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', //we added /1 after todo
    {
      title:'updatedTodo',
      completed: true
    }//the put request will also remove the username as we didnt include it in the above code thats where patch comes in
)
.then(res => showOutput(res))
.catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
       .then(res => showOutput(res))
       .catch(err => console.log(err))

}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
 ])
//  .then(res => {
//       console.log(res[0]);
//       console.log(res[1]);
//       showOutput(res[1]);
//  })
 .then(axios.spread((todos,posts) => showOutput(posts))) //clean than above
 .catch(err => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers:{
      'content-Type':'application/json',
      Authorization:'sometoken'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos',{
    data:{//if we dont write data also its okay
      title:'New Todo',
      completed: false
    }
},config)
.then(res => showOutput(res))
.catch(err => console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const option = {
        method:'post',
        url:'https://jsonplaceholder.typicode.com/todos',
        data:{
          title:'Hello World'
        },
        transformResponse:axios.defaults.transformResponse.concat(data =>{
          data.title = data.title.toUpperCase();
          return data;
        })
  };
  axios(option).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=5')
  .then(res => showOutput(res))
  .catch(err => {
    if(err.response){
      //server responded with a status other than 200 range
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
      if(err.response.status === 404){
        alert('error:page not found');
      }
    }
      else if(err.request){
        //request was made but no response
        console.log(err.request);
      }else{
        console.log(err.message);
      }
  })
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5',{
    cancelToken:source.token
  })
  .then(res => showOutput(res))
  .catch(thrown =>{
    if(axios.isCancel(thrown)){
      console.log('Request Canceled',thrown.message);
    }
  });
  if(true){
    source.cancel('Request canceled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config =>{
  console.log(`${config.method.toUpperCase()} request sent to
   ${config.url} at
  ${new Date().getTime()}`);
  return config;
},
error =>{
  return Promise.reject(error);
});
// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
});
//axiosInstance.get('/comments').then(res => showOutput(res));
// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
