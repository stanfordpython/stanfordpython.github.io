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
          <p className="text-slate-600 text-2xl">tuesdays &amp; thursdays, 3:15pm - 4:45pm, mcmurtry 350</p>
          <p className="text-2xl">
            <a href='https://edstem.org/us/courses/20141/' target="_blank" rel="noopener noreferrer" className={styles.link}>ed</a>, <a href="https://canvas.stanford.edu/courses/154418" target="_blank" rel="noopener noreferrer" className={styles.link}>canvas</a>, <Link to="/page/syllabus" className={styles.link}>syllabus</Link>
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