import Localbase from "localbase";
import QuestionData, { version } from "../Questions/OSq";

let db = new Localbase("db");
window.db = db;
db.config.debug = true;
const localVersion = localStorage.getItem("50version");
window.localVersion = localVersion;
window.version = version;

export function OSinsertData(callback) {
	QuestionData.forEach((topic, index) => {
		db.collection("osArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
	});
	OSgetData(callback);
}

export function OSgetData(callback) {
	db.collection("osArchive")
		.get()
		.then((data) => {
			if (data.length === 0) {
				OSinsertData(callback);
			} else {
				data.sort((a, b) => {
					return a.position - b.position;
				});
				if (localVersion === null || localVersion === undefined) {
					localStorage.setItem("50version", 666666666);
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
						OSupdateDBData(key, {
							started: topic.started,
							doneQuestions: topic.doneQuestions,
							questions: dataFromJSON,
						});
						i++;
					}
					localStorage.setItem("50version", version);
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				} else {
					return callback(data);
				}
			}
		});
}

export function OSgetTopicData(key, callback) {
	db.collection("osArchive")
		.doc(key)
		.get()
		.then((document) => {
			callback(document);
		});
}

export function OSupdateDBData(key, updateData) {
	db.collection("osArchive").doc(key).update(updateData);
}

export function OSresetDBData(callback) {
	db.collection("osArchive")
		.delete()
		.then((response) => {
			callback(response);
		})
		.catch((error) => {
			console.log("There was an error, do something else", error);
		});
}

export function OSexportDBData(callback) {
	db.collection("osArchive")
		.get()
		.then((data) => {
			callback(data);
		});
}

export function OSimportDBData(data, callback) {
	OSresetDBData((response) => {
		new Promise((resolve, reject) => {
			data.forEach((topic, index) => {
				db.collection("osArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
				if (index === data.length - 1) {
					resolve();
				}
			});
		}).then(() => {
			OSgetData((data) => {
				callback(data);
			});
		});
	});
}
