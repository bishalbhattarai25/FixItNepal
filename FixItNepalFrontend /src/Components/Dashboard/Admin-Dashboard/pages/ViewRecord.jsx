import { useParams } from "react-router-dom";

const ViewRecord = () => {
  const { id } = useParams();
  
  const record = {
    id,
    name: "John Doe",
    email: "john@example.com",
    status: "Pending",
    createdAt: "2026-03-19",
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">Record Details</h1>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold text-gray-600">ID:</span> {record.id}
          </div>

          <div>
            <span className="font-semibold text-gray-600">Name:</span> {record.name}
          </div>

          <div>
            <span className="font-semibold text-gray-600">Email:</span> {record.email}
          </div>

          <div>
            <span className="font-semibold text-gray-600">Status:</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                record.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {record.status}
            </span>
          </div>

          <div>
            <span className="font-semibold text-gray-600">Created At:</span>{" "}
            {record.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecord;