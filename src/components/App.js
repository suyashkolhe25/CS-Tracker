import React, { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "./ForgotPassword";

import DSA from '../pages/DSA'
import OS from '../pages/OS'
import CN from '../pages/CN'
import Home from '../pages/Home'
import Topic from '../components/Topic/Topic'

import CNTopic from '../components/CNTopic/CNTopic'
import OSTopic from '../components/OSTopic/OSTopic'

import { getData, updateDBData } from '../services/dbServices'
import { CNgetData, CNupdateDBData } from '../services/CNdbservices'
import { OSgetData, OSupdateDBData } from '../services/OSdbservices'



function App() {

  const [questionData, setQuestionData] = useState([]);
  const [CNQuestionData, CNsetQuestionData] = useState([]);
  const [OSQuestionData, OSsetQuestionData] = useState([]);

  useEffect(() => {
    localStorage.removeItem("cid");

    getData((QuestionData) => {
      setQuestionData(QuestionData);
    });

    CNgetData((CNQuestionData) => {
      CNsetQuestionData(CNQuestionData);
    });

    OSgetData((OSQuestionData) => {
      OSsetQuestionData(OSQuestionData);
    });

  }, []);

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

  function CNupdateData(key, topicData, topicPosition) {
    let CNreGenerateUpdatedData = CNQuestionData.map((topic, index) => {
      if (index === topicPosition) {
        CNupdateDBData(key, topicData);
        return { topicName: topic.topicName, position: topic.position, ...topicData };
      } else {
        return topic;
      }
    });
    CNsetQuestionData(CNreGenerateUpdatedData);
  }

  function OSupdateData(key, topicData, topicPosition) {
    let OSreGenerateUpdatedData = OSQuestionData.map((topic, index) => {
      if (index === topicPosition) {
        OSupdateDBData(key, topicData);
        return { topicName: topic.topicName, position: topic.position, ...topicData };
      } else {
        return topic;
      }
    });
    OSsetQuestionData(OSreGenerateUpdatedData);
  }

  return (

    <div style={{ minHeight: "100vh" }}>
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<Home />} path="/" exact />
                <Route path='/DSA' element={<DSA />} />
                <Route path='/DSA/array' element={<Topic data={questionData[0]} updateData={updateData} />} />
                <Route path="/DSA/matrix" element={<Topic data={questionData[1]} updateData={updateData} />} />
                <Route path="/DSA/string" element={<Topic data={questionData[2]} updateData={updateData} />} />
                <Route path="/DSA/search_sort" element={<Topic data={questionData[3]} updateData={updateData} />} />
                <Route path="/DSA/linked_list" element={<Topic data={questionData[4]} updateData={updateData} />} />
                <Route path="/DSA/binary_trees" element={<Topic data={questionData[5]} updateData={updateData} />} />
                <Route path="/DSA/bst" element={<Topic data={questionData[6]} updateData={updateData} />} />
                <Route path="/DSA/greedy" element={<Topic data={questionData[7]} updateData={updateData} />} />
                <Route path="/DSA/backtracking" element={<Topic data={questionData[8]} updateData={updateData} />} />
                <Route path="/DSA/stacks_queues" element={<Topic data={questionData[9]} updateData={updateData} />} />
                <Route path="/DSA/heap" element={<Topic data={questionData[10]} updateData={updateData} />} />
                <Route path="/DSA/graph" element={<Topic data={questionData[11]} updateData={updateData} />} />
                <Route path="/DSA/trie" element={<Topic data={questionData[12]} updateData={updateData} />} />
                <Route path="/DSA/dynamic_programming" element={<Topic data={questionData[13]} updateData={updateData} />} />
                <Route path="/DSA/bit_manipulation" element={<Topic data={questionData[14]} updateData={updateData} />} />

                <Route path='/OS' element={<OS />} />
                <Route path='/OS/operating_system_introduction' element={<OSTopic data={OSQuestionData[0]} OSupdateData={OSupdateData} />} />
                <Route path='/OS/cpu_scheduling' element={<OSTopic data={OSQuestionData[1]} OSupdateData={OSupdateData} />} />
                <Route path='/OS/process_management' element={<OSTopic data={OSQuestionData[2]} OSupdateData={OSupdateData} />} />
                <Route path='/OS/deadlock' element={<OSTopic data={OSQuestionData[3]} OSupdateData={OSupdateData} />} />

                <Route path='/CN' element={<CN />} />
                <Route path='/CN/basic' element={<CNTopic data={CNQuestionData[0]} CNupdateData={CNupdateData} />} />
                <Route path='/CN/models' element={<CNTopic data={CNQuestionData[1]} CNupdateData={CNupdateData} />} />
                <Route path='/CN/network_devices' element={<CNTopic data={CNQuestionData[2]} CNupdateData={CNupdateData} />} />
                <Route path='/CN/network_security' element={<CNTopic data={CNQuestionData[3]} CNupdateData={CNupdateData} />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>

  )
}

export default App;
