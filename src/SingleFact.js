
async function getFact (request, response) {
  let cursor = await store.one(request.params._id);
  console.log(cursor);
  let output = [];
  cursor.forEach((entry) => {
    output.push(entry);
  }, function (err) {
    assert.equal(null, err);
    console.log("Sending " + output.length + " records to client");
    response.type('application/json')
      .send(JSON.stringify(output))
  });
  console.log(output);

}

getFact();
