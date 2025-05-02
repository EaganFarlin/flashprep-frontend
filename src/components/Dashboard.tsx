import { useState, useEffect } from "react";
import { Link } from "react-router";

import { fetchSets } from "../api/api.js";

export default function Dashboard() {
  const [sets, setSets] = useState(null);

  useEffect(() => {
    fetchSets().then((res) => setSets(res));
  }, []);

  return (
    <>
      {sets !== null ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
          {sets.map((set) => {
            return (
              <Link
                to={`/set/${set.set_id}`}
                key={set.set_id}
                className="flex justify-center flex-col min-h-30 p-8 border-2 rounded border-gray-700 hover:border-b-4 hover:border-b-amber-500"
              >
                <p className="text-xl hover:gray-900">{set.title}</p>
                <p>{set.description}</p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <p>loading...</p>
        </div>
      )}
    </>
  );
}
