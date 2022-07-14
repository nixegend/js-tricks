function defineRejectedPromise(promises) {
  const outputs = [];

  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise
        .then((value) => {
          outputs.push(value);
          if (outputs.length === promises.length) {
            resolve(outputs);
          }
        })
        .catch(reject);
    }
  });
}

const slowPromise = new Promise((result) => {
  setTimeout(() => {
    result('done');
  }, 1000);
});

const arrOfPromises_1 = [
  Promise.resolve(5),
  Promise.resolve(3),
  Promise.resolve('yes'),
  Promise.reject('rejected because of...'),
  slowPromise,
];

defineRejectedPromise(arrOfPromises_1).then(console.log);

const arrOfPromises_2 = [
  Promise.resolve(5),
  Promise.resolve(3),
  Promise.resolve('yes'),
  slowPromise,
];

defineRejectedPromise(arrOfPromises_2).then(console.log);
