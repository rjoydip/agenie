import { useCallback, useState } from "react";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";

import { colors } from "./theme";

interface InputProps {
  onSubmit: (value: string) => void;
}

export function Input({ onSubmit }: InputProps) {
  // Input manages its own state - typing won't cause parent re-renders
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback((val: string) => {
    setQuery("");
    if (!val.trim()) return;
    onSubmit(val);
  }, []);

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={colors.muted}
      width="100%"
    >
      <Box paddingX={1}>
        <Text color={colors.primary} bold>
          {"> "}
        </Text>
        <TextInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          focus={true}
        />
      </Box>
    </Box>
  );
}
