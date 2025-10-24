import fs from "fs";
import http from "http";
import path from "path";
import url, { fileURLToPath } from "url";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//it's executed once, so we use sync version to get it's value before we even start handling requests
const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  "utf-8"
);
const dataObj = JSON.parse(data);

// HTML templates:
const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  "utf-8"
);

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
  output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
  output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRODUCT_ID%}/g, product.id);

  if (!product.organic)
    output = output.replace("{%NOT_ORGANIC%}", "not-organic");

  return output;
};

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    // Generate the cards HTML and insert it into the overview template
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(output);

    // Product page
  } else if (pathName === "/product") {
    res.end("This is product");

    // API page
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);

    // 404 page
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-from-custom-header",
    });
    res.end("<h1>Unknown path</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
