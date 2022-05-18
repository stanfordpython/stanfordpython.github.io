import people from '../../res/people.json';
import PersonCard from './PersonCard';

const People = () => (
  <div className="flex w-full flex-col mb-4">
    <h1 className="text-4xl font-normal mb-4">people</h1>
    <div className="flex flex-row justify-around items-start flex-wrap">
      {
        people.map(person => <PersonCard key={person.name} {...person} />)
      }
    </div>
  </div>
);

export default People;