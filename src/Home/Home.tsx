import CourseInfo from "./CourseInfo";
import People from "./People";
import Schedule from "./Schedule";

const Home = () => (
  <div className="mt-2 w-11/12 md:w-4/5 mx-auto">
    <CourseInfo />
    <People />
    <div className="flex w-full flex-col mb-6">
      <h1 className="text-4xl font-normal mb-4">schedule</h1>
      <Schedule />
    </div>
  </div>
);

export default Home;