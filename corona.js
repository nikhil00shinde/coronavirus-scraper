import request from "request";
import cheerio from "cheerio";
import chalk from "chalk";
import fs from "fs";

let data = {};
request("https://www.worldometers.info/coronavirus/", cb);

function cb(error, response, html) {
	if (error) {
		console.error("error:", error); // Print the error if one occurred
	} else {
		handleHtml(html);
		// console.log("html:", html); // Print the HTML for the Google homepage.
	}
}

function handleHtml(html) {
	let selTool = cheerio.load(html);

	let contentArray = selTool("#maincounter-wrap span");
	// [i] -> wrap selTool
	// for (let i = 0; i < contentArray.length; i++) {
	// 	let data = selTool(contentArray[i]).text();
	// 	console.log(data);
	// }

	let total = selTool(contentArray[0]).text();
	let death = selTool(contentArray[1]).text();
	let recovered = selTool(contentArray[2]).text();

	console.log(chalk.gray("Total Cases " + total));
	console.log(chalk.red("Total Deaths " + death));
	console.log(chalk.green("Total Recoverd " + recovered));
	data = { total, death, recovered };
	fs.writeFileSync("data.json", JSON.stringify(data));
}
