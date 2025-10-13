"use client";

import { ConfigurationForm } from "@/components/ConfigurationForm";
import { TextNode } from "@/components/Node";
import { useNodeDataQuery } from "@/queries/useNodeDataQuery";
import { Box, Button, Drawer, Typography } from "@mui/material";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  EdgeChange,
  MiniMap,
  NodeChange,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

// const initialNodes = [
//   {
//     id: "n1",
//     position: { x: 0, y: 0 },
//     data: { label: "Configration Board" },
//     type: "configurationBoard",
//   },
// ];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

type CustomNodeProps = {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  type: string;
};

export default function HomePage() {
  const [nodes, setNodes] = useState<CustomNodeProps[]>([]);
  const [edges, setEdges] = useState(initialEdges);
  const { refetch } = useNodeDataQuery("node_a");
  const [selectedNodeConfiguration, setSelectedNodeConfiguration] = useState<
    Record<string, string>
  >({});

  const onNodesChange = useCallback(
    (changes: NodeChange<CustomNodeProps>[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<{ id: string; source: string; target: string }>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const [selectedNode, setSelectedNode] = useState<CustomNodeProps | null>(
    null
  );

  const onNodeClick = useCallback(
    async (_, node: CustomNodeProps) => {
      const { data } = await refetch();

      if (!data) return;

      setSelectedNode(node);
      setSelectedNodeConfiguration(data);
    },
    [refetch]
  );

  const nodeTypes = {
    textUpdater: TextNode,
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* React Flow canvas */}
      <Box sx={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={() => {
            setSelectedNode(null);
          }}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </Box>
      {/* Configuration Drawer */}
      <Drawer
        anchor="right"
        open={!!selectedNode}
        variant="persistent"
        sx={{
          width: selectedNode ? 300 : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            p: 2,
          },
        }}
      >
        {selectedNode && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Node {selectedNode.id}&apos;s Configuration
            </Typography>
            <ConfigurationForm
              selectedNodeConfiguration={selectedNodeConfiguration}
              selectedNodeId={selectedNode.id}
            />
          </Box>
        )}
      </Drawer>
      <Button
        onClick={async () => {
          setNodes((prev) => [
            ...prev,
            {
              id: nodes.length.toString(),
              position: { x: 0, y: 0 },
              data: {
                label: `Node ${nodes.length.toString()}`,
              },
              type: "textUpdater",
            },
          ]);
        }}
      >
        Add Node
      </Button>
    </Box>
  );
}
