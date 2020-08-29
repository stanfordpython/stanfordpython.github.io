import React from 'react';
import { LectureData } from './LectureTable'
import { AssignmentData } from './AssignmentTable'
import { LabData } from './LabTable'
import { Schedule } from './Schedule'


export const Home = () => (
	<div>
		<h2> Home page </h2>
		<LectureData/>
		<AssignmentData/>
		<LabData/>
		<Schedule/>

	</div>

)