import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

import styles from './CourseInfo.module.css';

const CourseInfo = () => {
  return (
    <>
      <div className="flex w-full flex-row mb-4">
        <div className="md:flex flex-col items-center justify-center hidden p-3">
          <img src={logo} alt="cs 41 logo" className=" w-40 " />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-4xl mb-2 font-normal">cs 41: the python programming language</h1>
          <p className="text-slate-600 text-2xl">tuesdays &amp; thursdays, 3:00pm - 4:20pm, 370-370</p>
          <p className="text-2xl">
            <Link to="/page/syllabus" className={styles.link}>syllabus</Link>,{" "}
            <a href="https://open.spotify.com/playlist/516SuW4ejp801YaO9dSsd5?si=c1517d147d1d4c34&pt=5516fb04dd79f31570f9439e4fbd56bc" className={styles.link}>playlist</a>
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col mb-4">
        <h1 className="text-4xl font-normal mb-2">course info</h1>
        <p className="text-xl">CS 41 is a course about the Python programming language. The first two weeks cover the basics of programming in Python (loops, control flow, functions, etc.). The next two weeks cover extending Python through custom objects, decorators. Along the way, it covers different programming philosophies like object-oriented and functional programming. The second half of the course is topics-based, and generally covers creating websites in Python, robotics, and data science. For the last month, every student completes a significant, personal final project in Python, under the supervision of course staff.</p>
      </div>
    </>
  );
}

export default CourseInfo;
