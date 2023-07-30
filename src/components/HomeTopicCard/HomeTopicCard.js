import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

import './HomeTopicCard.css';

export default function HomeTopicCard({ subjects }) {
    let topicCard = subjects.map((topic, index) => {
        let { topicName, totalQuestions, started } = topic;

        if (started) {
            return (
                <Fade duration={500 + index * 0.4} key={index}>
                    <div className="col mb-4">
                        <Link
                            to={`/${topic.topicName
                                .replace(/[^A-Z0-9]+/gi, "_")
                                }`}
                            style={{ textDecoration: "none" }}
                        >
                            <Card
                                className={`mb-3 inprogress-card animate__slideInDown hvr-grow `}
                            >
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title className="topicName">
                                                {topic.topicName}
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                </Fade>
            );
        } else {
            return (
                <Fade duration={500 + index * 50} key={index}>
                    <div className="col mb-4">
                        <Link
                            to={`/${topic.topicName
                                .replace(/[^A-Z0-9]+/gi, "_")
                                }`}
                            style={{ textDecoration: "none" }}
                        >
                            <Card
                                className={`mb-3 notstarted-card hvr-grow`}
                            >
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title className="topicName">
                                                {" "}
                                                {topicName}{" "}
                                            </Card.Title>
                                        </Col>
                                        <Col>
                                            <h4>
                                                <Badge
                                                    pill
                                                    variant="primary"
                                                    className="float-right"
                                                    style={{ fontWeight: "500", cursor: "pointer" }}
                                                >
                                                    Start Now
                                                </Badge>
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Card.Text className="totalQuestion">
                                        Total Questions: {totalQuestions}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                </Fade>
            );
        }
    });
    return (
        <>
            <div className="container container-custom">
                <div className="row row-cols-1 row-cols-md-3 mt-3 grids">
                    {topicCard}
                </div>
            </div>
        </>
    );
}