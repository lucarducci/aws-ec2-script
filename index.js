const fs = require("fs");
const io = require("socket.io-client");
const socketHost = process.env.socketURL || "localhost:3000";
const socketUrl = "http://" + socketHost;
const socket = io.connect(socketUrl, {
  reconnect: true,
  query: "taskId=" + process.env.taskId + "&step=" + process.env.step + "&instanceID=" + process.env.instanceId,
});

// const socket = io.connect(socketUrl, {
//   reconnect: true,
//   query: "taskId=" + "5ec19587450b5a199f8e8024" + "&step=" + "step-test" + "&instanceID=" + "123",
// });

console.log("Start");
console.log("Connecting to " + socketUrl);

fs.writeFileSync("test.txt", "connect to " + socketUrl);

// Add a connect listener
socket.on("connect", function () {
  console.log("Connected!");

  console.log("Emit Log");
  socket.emit("log", "loggami");

  console.log("Emit Error");
  socket.emit("errorLog", "è andata male!");

  console.log("Close step");
  socket.emit("close");
});

console.log("End");
