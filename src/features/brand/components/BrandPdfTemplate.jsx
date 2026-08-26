import React, { forwardRef } from "react";

const BrandPdfTemplate = forwardRef(({ data = [] }, ref) => {
    return (
        <div style={{ display: "none" }}>
            <div 
                ref={ref} 
                style={{ 
                    padding: "30px", 
                    backgroundColor: "#ffffff", 
                    color: "#1f2937", 
                    fontFamily: "sans-serif" 
                }}
            >
                {/* Header Section */}
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #2563eb", paddingBottom: "15px", marginBottom: "20px" }}>
                    <div>
                        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb", margin: 0 }}>POS System Co., Ltd</h1>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Official Brand Inventory Report</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#374151", margin: 0 }}>BRAND LIST</h2>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                            Date: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Table Section */}
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#2563eb", color: "#ffffff", fontSize: "12px" }}>
                            <th style={{ padding: "10px", textAlign: "left" }}>#</th>
                            <th style={{ padding: "10px", textAlign: "left" }}>Brand Name</th>
                            <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: "12px" }}>
                        {data.map((item, index) => (
                            <tr 
                                key={item.id || index} 
                                style={{ 
                                    backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                                    borderBottom: "1px solid #e5e7eb" 
                                }}
                            >
                                <td style={{ padding: "10px" }}>{index + 1}</td>
                                <td style={{ padding: "10px", fontWeight: "bold" }}>{item.name}</td>
                                <td style={{ padding: "10px" }}>
                                    <span
                                        style={{
                                            padding: "3px 8px",
                                            borderRadius: "4px",
                                            fontSize: "10px",
                                            fontWeight: "bold",
                                            textTransform: "uppercase",
                                            backgroundColor: item.status === "active" ? "#d1fae5" : "#fee2e2",
                                            color: item.status === "active" ? "#065f46" : "#991b1b"
                                        }}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default BrandPdfTemplate;