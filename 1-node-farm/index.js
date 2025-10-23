import fs from "fs";

const text = fs.readFileSync("./starter/txt/input.txt", "utf8");
console.log(text);

const textOut = `This is what we know about avocado: ${text}. \n Created on ${Date.now()}`;
fs.writeFileSync("./starter/txt/output.txt", textOut);

console.log("File written!");
