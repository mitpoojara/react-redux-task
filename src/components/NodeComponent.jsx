import React from "react";

const NodeComponent = ({
  node,
  allNodes,
  onLink,
  onAddChild,
  onChange,
  isCycle,
}) => {
  const linkedNode = allNodes.find((n) => n.id === node.linkedTo);

  return (
    <div
      style={{
        marginLeft: "40px",
        marginTop: "15px",
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "10px",
        background: isCycle ? "#ffe6e6" : "#ffffff",
        width: "300px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <input
        type="text"
        placeholder="Enter condition"
        value={node.condition}
        onChange={(e) => onChange(node.id, e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
 
      {/* dropdown code */}
      <select
        value={node.linkedTo || ""}
        onChange={(e) => onLink(node.id, e.target.value)}
        style={{
          width: "100%",
          padding: "6px",
          marginBottom: "6px",
          borderRadius: "5px",
        }}
      >
        <option value="">Link to...</option>
        {allNodes.map((n) => (
          <option key={n.id} value={n.id}>
            {n.condition || n.id}
          </option>
        ))}
      </select>

      {/* Show linked Name code */}
      {node.linkedTo && linkedNode && (
        <div style={{ fontSize: "12px", color: "blue", marginBottom: "6px" }}>
          → Linked to: {linkedNode.condition || linkedNode.id} 🔗
        </div>
      )}

      <button
        onClick={() => onAddChild(node.id)}
        style={{
          padding: "6px 10px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        + Add Child
      </button>

      {/* Children  add code*/}
      {node.children.map((child) => (
        <NodeComponent
          key={child.id}
          node={child}
          allNodes={allNodes}
          onLink={onLink}
          onAddChild={onAddChild}
          onChange={onChange}
          isCycle={isCycle}
        />
      ))}
    </div>
  );
};

export default NodeComponent;