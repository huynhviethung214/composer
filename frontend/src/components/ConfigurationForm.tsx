import { Box, FormControl, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type ConfigurationFormProps = {
  selectedNodeConfiguration: Record<string, string>;
  selectedNodeId: string;
};

export const ConfigurationForm = ({
  selectedNodeConfiguration,
  selectedNodeId,
}: ConfigurationFormProps) => {
  const { control, watch, reset } = useForm<Record<string, string>>({
    defaultValues: selectedNodeConfiguration,
  });

  const formValues = watch(); // all current field values

  // Whenever selected node changes → reset form values
  useEffect(() => {
    reset(selectedNodeConfiguration);
  }, [selectedNodeConfiguration, reset]);

  // Example: Persist form values or handle changes
  useEffect(() => {
    console.log("Form changed:", formValues);
    // You could persist to localStorage, Redux, or server here
  }, [formValues]);

  return (
    <Box>
      {Object.entries(selectedNodeConfiguration).map(([fieldName], index) => (
        <Controller
          key={`${fieldName}-${index}-${selectedNodeId}`}
          name={fieldName}
          control={control}
          render={({ field }) => (
            <Box>
              <FormControl fullWidth>
                <TextField
                  {...field}
                  label={fieldName}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
            </Box>
          )}
        />
      ))}
    </Box>
  );
};
