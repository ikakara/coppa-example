// these functions are pass by reference
function alert(promise) {
  if (promise instanceof Promise) {
    promise.then((val) => alert(val));
  } else {
    alert(promise);
  }
}

// these functions are pass by reference
function log(promise) {
  if (promise instanceof Promise) {
    promise.then((val) => console.log(val));
  } else {
    console.log(promise);
  }
}

export { alert, log };
