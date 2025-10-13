"use client";

import { Box, Button, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { ClassicPreset, GetSchemes, NodeEditor } from "rete";
import { AreaPlugin } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { Presets, ReactArea2D, ReactPlugin } from "rete-react-plugin";
import { CustomConnection } from "./Connection";
import { InputSocket } from "./InputSocket";
import { CustomNode } from "./Node";
import { OutputSocket } from "./OutputSocket";

type AreaExtra = ReactArea2D<Schemes>;
type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;

export const createEditor = async (container: HTMLElement) => {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node(context) {
          console.log(context);
          return CustomNode;
        },
        socket(context) {
          return context.side === "input" ? InputSocket : OutputSocket;
        },
        connection() {
          return CustomConnection;
        },
      },
    })
  );
  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(render);
  area.use(connection);

  return {
    editor,
    render,
    area,
  };
};

export default function ReteEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<NodeEditor<Schemes>>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const init = async () => {
      const container = containerRef.current!;
      const { editor } = await createEditor(container);
      editorRef.current = editor;
    };

    init().catch(console.error);
  }, []);

  return (
    <Box>
      <Button
        onClick={async () => {
          if (!editorRef.current) return;

          const nodeId = editorRef.current.getNodes().length;
          const nodeName = `New Node ${nodeId}`;
          const node = new ClassicPreset.Node(nodeName);
          const socket = new ClassicPreset.Socket("socket");

          node.addControl(nodeName, new ClassicPreset.InputControl("text", {}));
          node.addInput(nodeName, new ClassicPreset.Input(socket));
          node.addOutput(nodeName, new ClassicPreset.Input(socket));

          await editorRef.current.addNode(node);
        }}
      >
        Add Node
      </Button>
      <Container
        ref={containerRef}
        style={{
          width: "100%",
          height: "80vh",
          background: "#f5f5f5",
          borderRadius: 8,
          overflow: "hidden",
        }}
      />
    </Box>
  );
}
