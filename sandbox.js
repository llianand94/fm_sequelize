//генераторы

const iterator = generate();


function * generate (){
  console.log("1 - ", 1);
  yield;
  console.log("2 - ", 2);

};


// console.log('res1 : ', iterator.next());
// console.log('res2 : ', iterator.next());

function * generatorIncrNumber (){
  let num = 0;
  while(true){
    yield num++;
  }
}
const num = generatorIncrNumber()
console.log(num.next().value);
console.log(num.next().value);
