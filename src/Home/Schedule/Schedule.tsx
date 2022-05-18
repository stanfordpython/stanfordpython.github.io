import { useContext } from "react";
import DataContext from "../../App/DataModel/DataContext";

const Schedule = () => {
  const data = useContext(DataContext);
  if (!data) return null;
  
  const rows = data.schedule;

  return (
    <table className="w-full rounded">
      <thead className="bg-gradient-to-r from-purple-400 to-indigo-400 rounded text-white">
        <tr>
          <th className="text-left p-2">week</th>
          <th className="text-left p-2">tuesday</th>
          <th className="text-left p-2">thursday</th>
          <th className="text-left p-2">assignment</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.week} className={`align-top border-t`}>
            <td className="p-2 align-middle font-bold text-center">{row.week}</td>
            <td className="p-2"><b>{row.title1}</b><br />{row.visible && row.desc1}</td>
            <td className="p-2"><b>{row.title2}</b><br />{row.visible && row.desc2}</td>
            <td className="p-2">{row.assignment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Schedule;