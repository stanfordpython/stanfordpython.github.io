import moment from "moment";
import { useContext } from "react";
import DataContext from "../App/DataModel/DataContext";

const Assignments = () => {
  const data = useContext(DataContext);
  if (!data) return null;

  const rows = data.assignment.map(a => ({ ...a, due: a.due ? moment(a.due) : null }))

  return (
    <div className="mt-2 w-11/12 md:w-4/5 mx-auto">
      <h1 className="text-4xl mb-4 font-normal">assignments</h1>
      <table className="w-full rounded">
        <thead className="bg-gradient-to-r from-purple-400 to-indigo-400 rounded text-white font-normal">
          <tr>
            <th className="text-left p-2">title</th>
            <th className="text-left p-2">due</th>
            <th className="text-left p-2">materials</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.title} className={`align-top border-t ${row.highlighted && "bg-violet-200 font-normal"}`}>
              <td className="p-2 align-middle font-normal">{row.title}</td>
              <td className="p-2 align-middle">{row.due && `${row.due.format("MMMM Do YYYY @ h:mma")} (${row.due.fromNow()})`.toLowerCase()}</td>
              <td className="p-2 align-middle">
                {row.materials.map(m => (
                  <a href={m.link} target="_blank" rel="noopener noreferrer" key={m.title} className="p-1 rounded-lg inline-block border border-indigo-700 bg-indigo-200 hover:bg-indigo-300 cursor-pointer mr-1">
                    {m.title}
                  </a>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;