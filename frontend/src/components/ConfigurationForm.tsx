import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

type ConfigurationFormProps = {
  selectedNodeConfiguration: Record<string, string>;
  selectedNodeId: string;
};

export const ConfigurationForm = (props: ConfigurationFormProps) => {
  const [formState, setFormState] = useState<
    typeof props.selectedNodeConfiguration
  >(props.selectedNodeConfiguration);

  return (
    <FormControl>
      {props.selectedNodeConfiguration && (
        <div>
          {Object.entries(formState).map(
            ([fieldName, fieldDefaultValue], index) => {
              return (
                <TextField
                  defaultValue={fieldDefaultValue}
                  key={`${fieldName}-${index}-${props.selectedNodeId}`}
                  sx={{
                    marginBottom: "16px",
                    width: "100%",
                  }}
                  label={fieldName}
                  onChange={(ev) => {
                    setFormState((prev: Record<string, string>) => {
                      console.log(prev);
                      console.log({
                        ...prev,
                        [fieldName]: ev.target.value,
                      });
                      return {
                        ...prev,
                        [fieldName]: ev.target.value,
                      };
                    });
                  }}
                />
              );
            }
          )}
        </div>
      )}
      <Button onSubmit={() => {}}>Submit</Button>
    </FormControl>
  );
};
