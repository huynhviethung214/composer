'use client';

import { Box, Button, Container } from '@mui/material';
import { useEffect, useRef } from 'react';
import { ClassicPreset, GetSchemes, NodeEditor } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import { Presets, ReactArea2D, ReactPlugin } from 'rete-react-plugin';
import { CustomConnection } from './Connection';
import { InputSocket } from './InputSocket';
import { CustomNode } from './Node';
import { OutputSocket } from './OutputSocket';

type AreaExtra = ReactArea2D<Schemes>;
type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;


export const createEditor = async (container: HTMLElement) => {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);

  const { createRoot } = await import('react-dom/client');
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  render.addPreset(Presets.classic.setup({
    customize: {
      node() {
        return CustomNode
      },
      socket(context) {
        return context.side === "input" ? InputSocket : OutputSocket
      },
      connection() {
        return CustomConnection
      },
    }
  }))
  editor.use(area);
  area.use(render);

  return {
    editor, render, area
  }
}


export default function ReteEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<NodeEditor<Schemes>>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const init = async () => {
      const container = containerRef.current!;
      const { editor } = await createEditor(container);

      editorRef.current = editor;

      // const socket = new ClassicPreset.Socket("socket");

      // const nodeA = new ClassicPreset.Node("A");
      // nodeA.addControl("a", new ClassicPreset.InputControl("text", {}));
      // nodeA.addOutput("a", new ClassicPreset.Output(socket));
      // await editor.addNode(nodeA);

      // const nodeB = new ClassicPreset.Node("B");
      // nodeB.addControl("b", new ClassicPreset.InputControl("text", {}));
      // nodeB.addInput("b", new ClassicPreset.Input(socket));

      // await editor.addNode(nodeB);
      // await editor.addConnection(new ClassicPreset.Connection(nodeA, "a", nodeB, "b"));
    };

    init().catch(console.error);
  }, []);

  return (
    <Box>
      <Button onClick={async () => {
        if (!editorRef.current) return;

        const node = new ClassicPreset.Node("B");
        const socket = new ClassicPreset.Socket("socket");

        node.addControl("c", new ClassicPreset.InputControl("text", {}));
        node.addInput("c", new ClassicPreset.Input(socket));
        node.addOutput("c", new ClassicPreset.Input(socket));

        await editorRef.current.addNode(node);
      }}>
        Add Node
      </Button>
      <Container
        ref={containerRef}
        style={{
          width: '100%',
          height: '80vh',
          background: '#f5f5f5',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      />
    </Box>
  );
}
