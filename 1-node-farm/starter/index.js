"use-strict";

const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////////////
//FILES

//Blocking, syncronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

//Non-blocking asyncronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     if (err) return console.log("Error! 💥");

//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             console.log(data3);

//             fs.writeFile(
//                 "./txt/final.txt",
//                 `${data2}\n${data3}`,
//                 "utf-8",
//                 (err) => {
//                     console.log("Your file has been written! 👌");
//                 }
//             );
//         });
//     });
// });
// console.log("Will read the file! 📖");

/////////////////////////////////////////
//SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === "/" || pathName === "/overwiev") {
        res.end("This is the OVERVIEW");
    } else if (pathName === "/product") {
        res.end("This is the PRODUCT");
    } else if (pathName === "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world",
        });
        res.end("<h1>There is no such page!</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Server is listening on port 8000");
});
