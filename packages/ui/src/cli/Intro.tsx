import { Box, Text } from "ink";
import BigText from "ink-big-text";
import { colors, dimensions } from "@/cli/theme";

interface IntroProps {
  provider: string;
  model: string;
  terminal_width: number;
}

export function Intro({ model, terminal_width }: IntroProps) {
  const { introWidth } = dimensions;
  const welcomeText = `Welcome to Agenie CLI`;
  const padding = Math.floor((introWidth - welcomeText.length - 2) / 2);

  return (
    <Box
      flexDirection="column"
      marginBottom={1}
      marginLeft={Math.max(0, (terminal_width - introWidth) / 2)}
    >
      <Box justifyContent="center" alignItems="center">
        <Text color={colors.primary} bold>
          <BigText text="agenie" />
        </Text>
      </Box>

      <Box
        flexDirection="column"
        alignItems="center"
        borderColor={colors.primary}
      >
        <Box>
          <Text color={colors.primary}>
            {" ".repeat(padding)}
            <Text bold>{welcomeText}</Text>
            {" ".repeat(introWidth - welcomeText.length - padding - 2)}
          </Text>
        </Box>

        <Box flexDirection="column" padding={1} alignItems="center">
          <Text>Your own AI assistant</Text>
          <Text color={colors.muted}>
            Current model: <Text color={colors.primary}>{model}</Text>
          </Text>
          {/* <Text color={colors.muted}>Current provider: <Text color={colors.primary}>{getProviderDisplayName(provider)}</Text></Text> */}
          <Text color={colors.muted}>Type /model to change the provider</Text>
        </Box>
      </Box>
    </Box>
  );
}
