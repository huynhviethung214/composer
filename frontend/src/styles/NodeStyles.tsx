import { $socketmargin, $socketsize } from "@/constants";
import styled, { css } from "styled-components";

export type NodeExtraData = { width?: number; height?: number };

export const EditorNodeStyles = styled.div<
    NodeExtraData & { selected: boolean; styles?: (props: any) => any }
>`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  user-select: none;
  ${(props) =>
        props.selected &&
        css`
      border-color: red;
    `}
  .title {
    font-family: sans-serif;
    font-size: 18px;
    padding: 8px;
  }
  .output {
    text-align: right;
  }
  .input {
    text-align: left;
  }
  .output-socket {
    display: inline-block;
    text-align: right;
  }
  .input-socket {
    display: inline-block;
    text-align: left;
  }
  .input-title, .output-title {
    vertical-align: middle;
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    margin: ${$socketmargin}px;
    line-height: ${$socketsize}px;
  }
  .input-control {
    z-index: 1;
    width: calc(100% - ${$socketsize + 2 * $socketmargin}px);
    vertical-align: middle;
    display: inline-block;
  }
  .control {
    display: block;
    padding: ${$socketmargin}px ${$socketsize / 2 + $socketmargin}px;
  }
  ${(props) => props.styles && props.styles(props)}
`;