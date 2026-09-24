import type { ReactNode } from "react";
import { XStack } from "tamagui";

export default function CustomTabList(props: { children: ReactNode }) {
	return (
		<XStack justifyContent="space-between" background={"$gray7"} padding={"$2"}>
			{props.children}
		</XStack>
	);
}
