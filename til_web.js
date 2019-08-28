/*
  Today I Learned webapp
*/
const assert = require('assert');
const FactStore = require('./lib/factStore')
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.static('build')) // static file server
app.use(express.urlencoded({extended: true})) // all POST bodies are expected to be URL-encoded

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const store = new FactStore(dbUrl);

app.get('/facts', getAll);

async function getAll(request, response) {
  let cursor = await store.all();
  let output = [];
  cursor.forEach((entry) => {
    output.push(entry);
  }, function (err) {
    assert.equal(null, err);
    console.log("Sending " + output.length + " records to client");
    response.type('application/json')
      .send(JSON.stringify(output))
  });
}

// app.get("/singlefact/:_id", getOne);

// async function getOne


app.post('/facts', addFact);

async function addFact(request, response) {
  let result = await store.addFact(request.body.text.trim())
  let output = {
    status: 'ok',
    id: result.id
  }
  response
    .type('application/json')
    .send(JSON.stringify(output))
}

app.listen(port, () => console.log(`TIL web app listening on port ${port}!`))


// adding more facts
// 1 url forming code or 2 dont have the form post anything
// prevent defaults on the form
// input type=text be controlled
// look at app.post --> addFacts in til-webs.js
// search docs on epress.json methods & examples
// mdn fetch post --> return fetch(url....)
// --> body: JSON.stringify(data)
// handle update
// mongo db docs "update" "updating documents" in node.js code "updating a single document"