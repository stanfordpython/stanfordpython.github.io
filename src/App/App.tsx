import { useEffect, useState } from 'react';
import { 
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Assignments from '../Assignments';

import Home from '../Home';
import Lectures from '../Lectures';
import Nav from '../Nav';
import NoMatch from '../NoMatch';
import Page from '../Page';
import getAssignmentData from './DataModel/AssignmentData';
import DataContext, { UniversalData } from './DataModel/DataContext';
import getLectureData from './DataModel/LectureData';
import getScheduleData from './DataModel/ScheduleData';

const App = () => {
  if (!window.location.href.includes('#')) {
    window.location.href = window.location.href + '#/';
  }

  const [allData, setAllData] = useState<UniversalData | null>(
    localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')!) : null
  );

  useEffect(() => {
    (async () => {
      const schedule = await getScheduleData();
      const lecture = await getLectureData();
      const assignment = await getAssignmentData();

      setAllData({ schedule, lecture, assignment })
      localStorage.setItem(
        'data', 
        JSON.stringify({ schedule, lecture, assignment })
      );
    })()
  }, [setAllData])

  return (
    <Router>
      <Nav />
      <DataContext.Provider value={allData}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/lectures' element={<Lectures />} />
          <Route path='/assignments' element={<Assignments />} />
          <Route path='/page/*' element={<Page />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </DataContext.Provider>
    </Router>
  );
}

export default App;