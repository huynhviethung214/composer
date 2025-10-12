import { EditorNodeStyles, NodeExtraData } from "@/styles/NodeStyles";
import { Box, Typography } from "@mui/material";
import { ClassicScheme, Presets, RenderEmit } from "rete-react-plugin";


const { RefSocket, RefControl } = Presets.classic;


type Props<S extends ClassicScheme> = {
  data: S["Node"] & NodeExtraData;
  styles?: () => any;
  emit: RenderEmit<S>;
};

export function CustomNode<Scheme extends ClassicScheme>(props: Props<Scheme>) {
  const inputs = Object.entries(props.data.inputs);
  const outputs = Object.entries(props.data.outputs);
  const controls = Object.entries(props.data.controls);
  const selected = props.data.selected || false;
  const { id, label, width, height } = props.data;

  return (
    <EditorNodeStyles
      selected={selected}
      width={width}
      height={height}
      styles={props.styles}
      data-testid="node"
    >
      <Box sx={{
        width: 300,
        height: 200,
        border: "2px solid black",
        display: "grid",
        gridTemplateColumns: "0.1fr 2fr 0.1fr",
        gridTemplateRows: "0.5fr 3fr 0.5fr",
        borderRadius: "6px",
        // "&:hover": {
        //   border: "2px solid #777777ff"
        // }
      }}>
        <Typography
          sx={{ gridColumn: "1 / 4", gridRow: "1", borderBottom: "2px solid black" }}
          align="center"
          alignContent={"center"}
          padding={'6px'}
        >
          Node Name: {label}
        </Typography>
        <Box sx={{ gridColumn: "1", gridRow: "2", borderRight: "2px solid black" }}>
          {/* Inputs */}
          {inputs.map(
            ([key, input]) =>
              input && (
                <RefSocket
                  name="input-socket"
                  emit={props.emit}
                  side="input"
                  socketKey={key}
                  nodeId={id}
                  payload={input.socket}
                  key={key}
                />
                // <Stack className="input" key={key} data-testid={`input-${key}`}>
                //   <RefSocket
                //     name="input-socket"
                //     emit={props.emit}
                //     side="input"
                //     socketKey={key}
                //     nodeId={id}
                //     payload={input.socket}
                //   />
                //   {/* {input && (!input.control || !input.showControl) && (
                //     <Stack className="input-title" data-testid="input-title">
                //       {input?.label}
                //     </Stack>
                //   )} */}
                //   {/* {input?.control && input?.showControl && (
                //     <RefControl
                //       key={key}
                //       name="input-control"
                //       emit={props.emit}
                //       payload={input.control}
                //     />
                //   )} */}
                // </Stack>
              )
          )}
        </Box>
        <Box sx={{ gridColumn: "2", gridRow: "2" }}>
          {/* Controls */}
          {controls.map(([key, control]) => {
            return control ? (
              <RefControl
                key={key}
                name="control"
                emit={props.emit}
                payload={control}
              />
            ) : null;
          })}
        </Box>
        <Box sx={{ gridColumn: "1 / 4", gridRow: "3", borderTop: "2px solid black" }}>
          {/* Buffer at bottom just in case */}
        </Box>
        <Box sx={{ gridColumn: "3", gridRow: "2", borderLeft: "2px solid black" }}>
          {/* Outputs */}
          {outputs.map(
            ([key, output]) =>
              output && (
                <RefSocket
                  name="output-socket"
                  side="output"
                  emit={props.emit}
                  socketKey={key}
                  nodeId={id}
                  payload={output.socket}
                  key={key}
                />
                // <Stack className="output" key={key} data-testid={`output-${key}`}>
                //   {/* <Stack className="output-title" data-testid="output-title">
                //     {output?.label}
                //   </Stack> */}
                //   <RefSocket
                //     name="output-socket"
                //     side="output"
                //     emit={props.emit}
                //     socketKey={key}
                //     nodeId={id}
                //     payload={output.socket}
                //   />
                // </Stack>
              )
          )}
        </Box>
      </Box>
    </EditorNodeStyles>
  );
}
