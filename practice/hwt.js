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
	//full page search
	let wTeamName;
	let teamsArr = $(
		".match-info.match-info-MATCH.match-info-MATCH-half-width .team"
	);

	for (let i = 0; i < teamsArr.length; i++) {
		let team = $(teamsArr[i]).hasClass("team-gray");
		if (team == false) {
			let ans = $(teamsArr[i]).find(".name-detail .name");

			wTeamName = $(ans).text().trim();
		}
	}

	//shorter form html
	let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
	let htmlStr = "";
	for (let i = 0; i < inningsArr.length; i++) {
		// let cHtml = $(inningsArr[i]).html();
		// htmlStr += cHtml;
		//team name
		let teamNameElem = $(inningsArr[i]).find(".header-title.label");
		let teamName = teamNameElem.text();
		teamName = teamName.split("INNINGS")[0];
		teamName = teamName.trim();
		//team table
		let hwtName = "";
		let hwt = 0;
		if (wTeamName == teamName) {
			let tableElem = $(inningsArr[i]).find(".table.bowler");
			let allBowlers = $(tableElem).find("tbody tr");

			for (let j = 0; j < allBowlers.length; j++) {
				let allColsOfPlayer = $(allBowlers[j]).find("td");

				let playerName = $(allColsOfPlayer[0]).text();
				let wickets = $(allColsOfPlayer[4]).text();

				if (wickets >= hwt) {
					hwt = wickets;
					hwtName = playerName;
				}
			}
			console.log(
				`Winning Team ${wTeamName} Highest Wicket Taker PlayerName: ${hwtName} Wickets: ${hwt}`
			);
		}
	}
}
