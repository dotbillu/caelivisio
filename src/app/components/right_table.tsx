import React from 'react';
export default function Table() {

    const satellites = [
        { id: 1, name: "ISS", risk: "Normal", altitude: "420 km", velocity: "7.6 km/s" },
        { id: 2, name: "Debris-1", risk: "Risk", altitude: "400 km", velocity: "7.7 km/s" },
        { id: 3, name: "Cartosat", risk: "Normal", altitude: "650 km", velocity: "7.5 km/s" },
    ];

    return (
        <div className="absolute top-4 right-4 w-96 bg-black/80 mt-10  text-white rounded-2xl shadow shadow-gray-50 p-4 backdrop-blur-md">
            <h2 className="text-lg font-bold mb-3">Satellite Status</h2>
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="text-gray-300 border-b border-gray-700">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Risk</th>
                        <th className="text-left p-2">Altitude</th>
                        <th className="text-left p-2">Velocity</th>
                    </tr>
                </thead>
                <tbody>
                    {satellites.map((sat) => (
                        <tr key={sat.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="p-2">{sat.name}</td>
                            <td
                                className={`p-2 ${sat.risk.includes("Risk") ? "text-red-400 font-bold" : "text-green-400"
                                    }`}
                            >
                                {sat.risk}
                            </td>
                            <td className="p-2">{sat.altitude}</td>
                            <td className="p-2">{sat.velocity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

