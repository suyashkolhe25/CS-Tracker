import Localbase from "localbase";
import QuestionData, { version } from "../Questions/CNq";

let db = new Localbase("db");
window.db = db;
db.config.debug = true;
const localVersion = localStorage.getItem("25version");
window.localVersion = localVersion;
window.version = version;

export function CNinsertData(callback) {
	QuestionData.forEach((topic, index) => {
		db.collection("cnArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
	});
	CNgetData(callback);
}

export function CNgetData(callback) {
	db.collection("cnArchive")
		.get()
		.then((data) => {
			if (data.length === 0) {
				CNinsertData(callback);
			} else {
				data.sort((a, b) => {
					return a.position - b.position;
				});
				if (localVersion === null || localVersion === undefined) {
					localStorage.setItem("25version", 999999999);
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				}

				if (parseInt(localVersion) !== version) {
					let i = 0;
					for (let topic of data) {
						let dataFromJSON = QuestionData[i].questions;
						let len = dataFromJSON.length;
						let key = topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
						topic.questions.forEach((qObj, index) => {
							if (index < len) {
								if (qObj.Done) {
									dataFromJSON[index]["Done"] = true;
								}
								if (qObj.hasOwnProperty("Bookmark")) {
									dataFromJSON[index]["Bookmark"] = qObj.Bookmark;
								} else {
									dataFromJSON[index]["Bookmark"] = false;
								}
								if (qObj.hasOwnProperty("Notes")) {
									dataFromJSON[index]["Notes"] = qObj.Notes;
								} else {
									dataFromJSON[index]["Notes"] = "";
								}
							}
						});
						CNupdateDBData(key, {
							started: topic.started,
							doneQuestions: topic.doneQuestions,
							questions: dataFromJSON,
						});
						i++;
					}
					localStorage.setItem("25version", version);
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				} else {
					return callback(data);
				}
			}
		});
}

export function CNgetTopicData(key, callback) {
	db.collection("cnArchive")
		.doc(key)
		.get()
		.then((document) => {
			callback(document);
		});
}

export function CNupdateDBData(key, updateData) {
	db.collection("cnArchive").doc(key).update(updateData);
}

export function CNresetDBData(callback) {
	db.collection("cnArchive")
		.delete()
		.then((response) => {
			callback(response);
		})
		.catch((error) => {
			console.log("There was an error, do something else", error);
		});
}

export function CNexportDBData(callback) {
	db.collection("cnArchive")
		.get()
		.then((data) => {
			callback(data);
		});
}

export function CNimportDBData(data, callback) {
	CNresetDBData((response) => {
		new Promise((resolve, reject) => {
			data.forEach((topic, index) => {
				db.collection("cnArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
				if (index === data.length - 1) {
					resolve();
				}
			});
		}).then(() => {
			CNgetData((data) => {
				callback(data);
			});
		});
	});
}
