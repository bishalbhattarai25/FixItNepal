import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../../../Server/Axios";

const ViewRecord = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get(`/api/mechanic/${id}`)
        .then((res) => {
          setRecord(res.data);
        })
        .catch((err) => {
          console.error("Error fetching record:", err);
        })
        .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!record) return <p className="p-6">No data found</p>;

  return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">

          <h1 className="text-xl font-bold mb-4">Record Details</h1>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
                src={record.logo?.accessUrl}
                alt="logo"
                className="w-20 h-20 rounded-full border object-cover"
            />
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold text-gray-600">Name:</span> {record.userName}
            </div>

            <div>
              <span className="font-semibold text-gray-600">Email:</span> {record.email}
            </div>

            <div>
              <span className="font-semibold text-gray-600">Phone:</span> {record.phoneNumber}
            </div>

            {/* Address */}
            <div>
              <span className="font-semibold text-gray-600">Address:</span>
              <p className="text-gray-800">
                {record.address?.tole}, {record.address?.city}, {record.address?.province}
              </p>
            </div>

            <div>
              <span className="font-semibold text-gray-600">Postal Code:</span> {record.address?.postalCode}
            </div>

            {/* Status (temporary since API doesn't provide) */}
            <div>
              <span className="font-semibold text-gray-600">Status:</span>
              <span className="ml-2 px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
              Pending
            </span>
            </div>

            {/* Documents */}
            <div>
              <span className="font-semibold text-gray-600">Documents:</span>
              <div className="flex gap-2 flex-wrap mt-2">
                {record.documents?.map((doc) => (
                    <img
                        key={doc?.id}
                        src={doc?.accessUrl}
                        alt="doc"
                        className="w-20 h-20 object-cover rounded border"
                    />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
  );
};

export default ViewRecord;