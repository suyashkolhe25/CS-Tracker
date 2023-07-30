import { React, useState, useEffect } from "react";

import Navbar from "../components/Navbar/Navbar";
import './DSA.css'
import { Route, Routes } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import TopicCard from "../components/TopicCard/TopicCard"
import { getData, updateDBData } from "../services/dbServices";

function DSA() {

	const [questionData, setQuestionData] = useState([]);

	useEffect(() => {
		localStorage.removeItem("cid");

		getData((QuestionData) => {
			setQuestionData(QuestionData);
		});
	});

	function updateData(key, topicData, topicPosition) {
		let reGenerateUpdatedData = questionData.map((topic, index) => {
			if (index === topicPosition) {
				updateDBData(key, topicData);
				return { topicName: topic.topicName, position: topic.position, ...topicData };
			} else {
				return topic;
			}
		});
		setQuestionData(reGenerateUpdatedData);
	}

	return (
		<div>
			<div className="DSA-Background">
				<Navbar></Navbar>
				<h2 className="app-heading2 text-center mb-3">A curated List of DSA Questions that will boost <br/>your confidence in solving any DSA Question</h2>
				{questionData.length === 0 ? (
					// load spinner until data is fetched from DB
					<div className="d-flex justify-content-center">
						<Spinner animation="grow" variant="success" />
					</div>
				) : (
					<>
						<Routes>
							<Route exact path="/" element={<TopicCard questionData={questionData}></TopicCard>} />
						</Routes>
					</>

				)}
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />

			</div>
		</div>
	);
}

export default DSA;