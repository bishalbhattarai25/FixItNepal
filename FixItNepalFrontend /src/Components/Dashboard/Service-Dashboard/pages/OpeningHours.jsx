import React, { useEffect, useState } from "react";
import {
  Clock3,
  Save,
  X,
  Check,
  CalendarDays,
  Loader2,
} from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../../Server/Axios";

/* ---------------- API ---------------- */
const fetchOpeningHours = async (garageId) => {
  const res = await instance.get(
    `/api/garage/${garageId}/opening-hours`
  );

  return res.data.openingHours;
};

const updateOpeningHours = async ({ garageId, openingHours }) => {
  const payload = {
    openingHours: openingHours.map((item) => ({
      id: item.id,
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      isItClosed: item.isClosed,
      maxAppointmentsPerSlot: item.maxAppointmentsPerSlot,
    })),
  };

  const res = await instance.put(
    `/api/garage/${garageId}/opening-hours`,
    payload
  );

  return res.data;
};

const OpeningHours = () => {
  const garageId = localStorage.getItem("userId");

  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["opening-hours", garageId],
    queryFn: () => fetchOpeningHours(garageId),
  });

  const [hours, setHours] = useState([]);

  /* ---------------- SET STATE ---------------- */
  useEffect(() => {
    if (data.length > 0) {
      setHours(
        data.map((item) => ({
          ...item,
          isClosed: item.isItClosed,
        }))
      );
    }
  }, [data]);

  /* ---------------- UPDATE ---------------- */
  const { mutate, isPending } = useMutation({
    mutationFn: updateOpeningHours,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["opening-hours", garageId],
      });
    },
  });

  const handleSave = () => {
    mutate({
      garageId,
      openingHours: hours,
    });
  };

  /* ---------------- UPDATE FIELD ---------------- */
  const updateField = (index, field, value) => {
    const updated = [...hours];
    updated[index][field] = value;
    setHours(updated);
  };

  /* ---------------- TOGGLE ---------------- */
  const toggleClosed = (index) => {
    const updated = [...hours];

    updated[index].isClosed = !updated[index].isClosed;

    setHours(updated);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-sm font-bold text-gray-500">
        Loading opening hours...
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">

            <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
              <CalendarDays className="text-red-500" size={20} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                Opening Hours
              </h1>

              <p className="text-sm text-gray-500 font-medium">
                Manage your weekly garage availability
              </p>
            </div>

          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-95 disabled:opacity-60 text-white px-5 py-3 rounded-2xl text-sm font-black shadow-lg shadow-red-100 transition-all"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        {/* TOP BAR */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">

          <div>
            <h2 className="text-lg font-black text-gray-900">
              Weekly Schedule
            </h2>

            <p className="text-xs text-gray-400 font-semibold mt-1">
              Configure garage operating hours for each day
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-2 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Schedule Active
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase tracking-widest font-black">
              <tr>
                <th className="px-6 py-4">Day</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4">Start Time</th>
                <th className="px-6 py-4">End Time</th>
                <th className="px-6 py-4">Slots</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {hours.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/70 transition-all"
                >

                  {/* DAY */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                        <Clock3 size={18} className="text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-black text-gray-900">
                          {item.dayOfWeek}
                        </h3>

                        <p className="text-xs text-gray-400 font-semibold">
                          Weekly availability
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* OPEN/CLOSED */}
                  <td className="px-6 py-5">
                    <button
                      onClick={() => toggleClosed(index)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                        item.isClosed
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {item.isClosed ? "Closed" : "Open"}
                    </button>
                  </td>

                  {/* START TIME */}
                  <td className="px-6 py-5">
                    <input
                      type="time"
                      value={item.startTime}
                      disabled={item.isClosed}
                      onChange={(e) =>
                        updateField(index, "startTime", e.target.value)
                      }
                      className={`px-3 py-2 rounded-xl border text-sm font-bold outline-none transition-all ${
                        item.isClosed
                          ? "bg-gray-100 text-gray-400 border-gray-100"
                          : "bg-white border-gray-200 focus:border-red-300"
                      }`}
                    />
                  </td>

                  {/* END TIME */}
                  <td className="px-6 py-5">
                    <input
                      type="time"
                      value={item.endTime}
                      disabled={item.isClosed}
                      onChange={(e) =>
                        updateField(index, "endTime", e.target.value)
                      }
                      className={`px-3 py-2 rounded-xl border text-sm font-bold outline-none transition-all ${
                        item.isClosed
                          ? "bg-gray-100 text-gray-400 border-gray-100"
                          : "bg-white border-gray-200 focus:border-red-300"
                      }`}
                    />
                  </td>

                  {/* SLOT */}
                  <td className="px-6 py-5">
                    <input
                      type="number"
                      min="0"
                      value={item.maxAppointmentsPerSlot}
                      disabled={item.isClosed}
                      onChange={(e) =>
                        updateField(
                          index,
                          "maxAppointmentsPerSlot",
                          Number(e.target.value)
                        )
                      }
                      className={`w-24 px-3 py-2 rounded-xl border text-sm font-black outline-none transition-all ${
                        item.isClosed
                          ? "bg-gray-100 text-gray-400 border-gray-100"
                          : "bg-white border-gray-200 focus:border-red-300"
                      }`}
                    />
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    {item.isClosed ? (
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-black">
                        <X size={14} />
                        Closed
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 text-green-600 text-xs font-black">
                        <Check size={14} />
                        Active
                      </div>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;