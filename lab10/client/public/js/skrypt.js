
window.addEventListener("load", function (event) { 
 const es = new EventSource("http://localhost:7000/events/add");
 
 es.addEventListener("message", function(event) {
  const add = document.getElementById("add");

  add.innerHTML = event.data
 });
 
});
