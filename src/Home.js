import React from 'react';
import { LectureData } from './LectureTable'
import { AssignmentData } from './assignmentTable'

export const Home = () => (
	<div>
		<h2> Home page </h2>
		<LectureData/>
		<AssignmentData/>
	</div>

)