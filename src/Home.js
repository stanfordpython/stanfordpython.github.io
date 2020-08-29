import React from 'react';
import { LectureData } from './LectureTable'
import { AssignmentData } from './assignmentTable'
import { LabData } from './labTable'
import { Schedule } from './schedule'


export const Home = () => (
	<div>
		<h2> Home page </h2>
		<LectureData/>
		<AssignmentData/>
		<LabData/>
		<Schedule/>

	</div>

)