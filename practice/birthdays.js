import request from "request";
import cheerio from "cheerio";
import chalk from "chalk";

const url =
	"https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

request(url, cb);
function cb(err, response, html) {
	if (err) {
		console.log(err);
	} else {
		extractHTML(html);
	}
}

function extractHTML(html) {
	let $ = cheerio.load(html);

	let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
	for (let i = 0; i < inningsArr.length; i++) {
		//table Name
		let teamNameElem = $(inningsArr[i]).find(".header-title.label");
		let teamName = teamNameElem.text();
		teamName = teamName.split("INNINGS")[0];
		teamName = teamName.trim();

		//table batsman
		let tableElem = $(inningsArr[i]).find(".table.batsman");
		let allBatsman = $(tableElem).find("tbody tr");

		for (let j = 0; j < allBatsman.length; j++) {
			let allColsOfPlayer = $(allBatsman[j]).find("td");

			let isbatsManCol = $(allColsOfPlayer[0]).hasClass("batsman-cell");

			if (isbatsManCol == true) {
				let href = $(allColsOfPlayer[0]).find("a").attr("href");
				let name = $(allColsOfPlayer[0]).text();
				let fullLink = "https://www.espncricinfo.com" + href;
				getBirthdayPage(fullLink, name, teamName);
			}
		}
	}
}

function getBirthdayPage(url, name, teamName) {
	request(url, cb);
	function cb(err, response, html) {
		if (err) {
			console.log(err);
		} else {
			extractBirthday(html, name, teamName);
		}
	}
}

function extractBirthday(html, name, teamName) {
	let $ = cheerio.load(html);

	let detailsArr = $("h5.player-card-description");

	let birthDay = $(detailsArr[1]).text();
	console.log(`${name} plays for ${teamName} was born on ${birthDay}`);
}
