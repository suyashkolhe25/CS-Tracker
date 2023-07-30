import { React, useState, useEffect } from "react";

import Navbar from "../components/Navbar/Navbar";
import './DSA.css'
import { Route, Routes } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import CNTopicCard from "../components/CNTopicCard/CNTopicCard"
import { CNgetData, CNupdateDBData } from "../services/CNdbservices";

function CN() {

    const [questionData, setQuestionData] = useState([]);

	useEffect(() => {
		localStorage.removeItem("cid");

		CNgetData((QuestionData) => {
			setQuestionData(QuestionData);
		});
	});

	function updateData(key, topicData, topicPosition) {
		let reGenerateUpdatedData = questionData.map((topic, index) => {
			if (index === topicPosition) {
				CNupdateDBData(key, topicData);
				return { topicName: topic.topicName, position: topic.position, ...topicData };
			} else {
				return topic;
			}
		});
		setQuestionData(reGenerateUpdatedData);
	}

    return(
        <div className="DSA-Background">
            <Navbar></Navbar>
            <h1 className="app-heading2 text-center mb-3 mt-3">Popular Computer Network Questions</h1>
            <h3 className="app-heading2 text-center mb-3 mt-3">Asked in Interviews</h3>
            {questionData.length === 0 ? (
					// load spinner until data is fetched from DB
					<div className="d-flex justify-content-center">
						<Spinner animation="grow" variant="success" />
					</div>
				) : (
					<>
						<Routes>
							<Route exact path="/" element={<CNTopicCard questionData={questionData}></CNTopicCard>} />
						</Routes>
					</>

				)}
        </div>
    )
}

export default CN;