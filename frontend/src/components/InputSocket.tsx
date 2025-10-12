import { $socketsize } from "@/constants";
import * as React from "react";
import { ClassicPreset } from "rete";
import styled from "styled-components";

const Styles = styled.div`
  display: inline-block;
  cursor: pointer;
  border: 1px solid grey;
  background-color: #5a5a5aff;
  width: ${$socketsize}px;
  height: ${$socketsize * 2}px;
  vertical-align: middle;
  z-index: 2;
  box-sizing: border-box;

  &:hover {
    border: 1px solid white;
  }
`;

export function InputSocket<T extends ClassicPreset.Socket>(props: {
  data: T;
}) {
  return <Styles style={{
    borderTopRightRadius: "6px",
    borderBottomRightRadius: "6px",
  }} title={props.data.name} />;
};