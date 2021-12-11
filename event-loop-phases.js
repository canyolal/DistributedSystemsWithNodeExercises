//page 10-11

const fs = require('fs');

setImmediate(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
fs.readFile(__filename, () => {
  console.log(4);
  setTimeout(() => console.log(5));
  setImmediate(() => console.log(6));
  process.nextTick(() => console.log(7));
});
console.log(8);

/*

8 3 2 1 4 7 6 5

The script starts off executing line by line in the poll phase. First, the fs module is required, and a whole lot of magic happens behind the scenes. Next, the setImmediate() call is run, which adds the callback printing 1 to the check queue. Then, the promise resolves, adding callback 2 to the promise microtask queue. process.nextTick() runs next, adding callback 3 to the next tick microtask queue. Once that’s done the fs.readFile() call tells the Node.js APIs to start reading a file, placing its callback in the poll queue once it’s ready. Finally, log number 8 is called directly and is printed to the screen.

That’s it for the current stack. Now the two microtask queues are consulted. The next tick microtask queue is always checked first, and callback 3 is called. Since there’s only one callback in the next tick microtask queue, the promise microtask queue is checked next. Here callback 2 is executed. That finishes the two microtask queues, and the current poll phase is complete.

Now the event loop enters the check phase. This phase has callback 1 in it, which is then executed. Both the microtask queues are empty at this point, so the check phase ends. The close phase is checked next but is empty, so the loop continues. The same happens with the timers phase and the pending phase, and the event loop continues back around to the poll phase.

Once it’s back in the poll phase, the application doesn’t have much else going on, so it basically waits until the file has finished being read. Once that happens the fs.readFile() callback is run.

The number 4 is immediately printed since it’s the first line in the callback. Next, the setTimeout() call is made and callback 5 is added to the timers queue. The setImmediate() call happens next, adding callback 6 to the check queue. Finally, the process.nextTick() call is made, adding callback 7 to the next tick microtask queue. The poll queue is now finished, and the microtask queues are again consulted. Call‐ back 7 runs from the next tick queue, the promise queue is consulted and found empty, and the poll phase ends.

Again, the event loop switches to the check phase where callback 6 is encountered. The number is printed, the microtask queues are determined to be empty, and the phase ends. The close phase is checked again and found empty. Finally the timers phase is consulted wherein callback 5 is executed. Once that’s done, the application doesn’t have any more work to do and it exits.

The log statements have been printed in this order: 8, 3, 2, 1, 4, 7, 6, 5.

*/

