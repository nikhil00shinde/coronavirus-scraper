import request from "request";
import cheerio from "cheerio";
import chalk from "chalk";

request(
	"https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary",
	cb
);

function cb(error, response, html) {
	if (error) {
		console.log(error);
	} else {
		handleHtml(html);
	}
}

function handleHtml(html) {
	let $ = cheerio.load(html);

	let firstComment = $(
		".d-flex.match-comment-padder.align-items-center .match-comment-long-text"
	);
	let data = $(firstComment[0]).text();
	let htmlData = $(firstComment[0]).html();
	console.log(chalk.red("Text data: "), data);
	console.log(chalk.blue("HTML data: "), htmlData);
}
