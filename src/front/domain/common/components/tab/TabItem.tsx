import type { TabTriggerSlotProps } from "expo-router/ui";
import { Pressable } from "react-native";
import { Button, Text } from "tamagui";

export default function TabItem(
	props: TabTriggerSlotProps & { label: string },
) {
	const { isFocused, ...rest } = props;
	return (
		<Pressable {...rest}>
			<Button backgroundColor={isFocused ? "$gray9" : undefined}>
				<Text>{props.label}</Text>
			</Button>
		</Pressable>
	);
}
