// ============================================
// REUSABLE DATA TABLE COMPONENT
// ============================================
import React from 'react';

const CustomTable = ({
    columns = [],
    data = [],
    emptyMessage = "No items found",
    className = ""
}) => {
    return (
        <div className={`overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-150 ${className}`}>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                        {columns.map((col, index) => (
                            <th
                                key={col.key || index}
                                className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider"
                                style={col.width ? { width: col.width } : undefined}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={row.id || rowIndex} className="hover:bg-gray-50 transition-colors">
                                {columns.map((col, colIndex) => {
                                    const value = row[col.key];
                                    return (
                                        <td key={colIndex} className="px-6 py-5 text-base text-gray-700">
                                            {col.render ? col.render(row, rowIndex) : value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center text-base text-gray-400">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
