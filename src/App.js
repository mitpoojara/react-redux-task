import React, { useState } from "react";
import { createNode } from "./types/Node";
import NodeComponent from "./components/NodeComponent";

function App() {
  const [nodes, setNodes] = useState([]);

  // tree code
  const flattenNodes = (nodes) => {
    let result = [];

    nodes.forEach((node) => {
      result.push(node);
      if (node.children.length > 0) {
        result = result.concat(flattenNodes(node.children));
      }
    });

    return result;
  };

  // Cycle code
  const hasCycle = (nodes) => {
    const allNodes = flattenNodes(nodes);

    const findNode = (id) => {
      return allNodes.find((n) => n.id === id);
    };

    for (let node of allNodes) {
      let visited = new Set();
      let current = node;

      while (current && current.linkedTo) {
        if (visited.has(current.id)) {
          return true;
        }

        visited.add(current.id);
        current = findNode(current.linkedTo);
      }
    }

    return false;
  };

  const isCycle = hasCycle(nodes);

  //  Node add code
  const handleAddNode = () => {
    setNodes((prev) => [...prev, createNode()]);
  };

  //  Child add code
  const handleAddChild = (parentId) => {
    console.log(parentId)
    const addChildRecursive = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...node.children, createNode()],
          };
        }

        return {
          ...node,
          children: addChildRecursive(node.children),
        };
      });
    };

    setNodes(addChildRecursive(nodes));
  };

  // Condition update code
  const handleConditionChange = (id, value) => {
    console.log(id)
    const updateRecursive = (nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            condition: value,
          };
        }

        return {
          ...node,
          children: updateRecursive(node.children),
        };
      });
    };

    setNodes(updateRecursive(nodes));
  };

  // link nodes code
  const handleLink = (sourceId, targetId) => {
    const linkRecursive = (nodes) => {
      return nodes.map((node) => {
        if (node.id === sourceId) {
          return {
            ...node,
            linkedTo: targetId,
          };
        }

        return {
          ...node,
          children: linkRecursive(node.children),
        };
      });
    };

    setNodes(linkRecursive(nodes));
  };

  const allNodes = flattenNodes(nodes);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Logic Flow Mapper</h2>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={handleAddNode}  
        style={{
          padding: "6px 10px",
          background: "black",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>+ Add Node</button>

        <button
          disabled={isCycle}
           style={{
          padding: "6px 10px",
          background: "black",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        >
          Simulate Logic
        </button>
      </div>

      {/*  error  code*/}
      {isCycle && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ❌ Cycle detected! Fix links.
        </p>
      )}

      {/* nodes showing */}
      {nodes.map((node) => (
        <NodeComponent
          key={node.id}
          node={node}
          allNodes={allNodes}
          onLink={handleLink}
          onAddChild={handleAddChild}
          onChange={handleConditionChange}
          isCycle={isCycle}
        />
      ))}
    </div>
  );
}

export default App;