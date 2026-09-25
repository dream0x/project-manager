import { useEffect } from "react";
import { Separator, Text, YStack } from "tamagui";
import { useResourceStore } from "@/domain/resource/state";
import CreateResource from "./CreateResource";
import UpdateResource from "./UpdateResource";

export default function ResourceList() {
	const resources = useResourceStore((state) => state.resources);

	useEffect(() => {
		useResourceStore.getState().getAll();
	}, []);

	return (
		<YStack gap="$3" alignItems="center">
			<YStack width="100%" $xl={{ width: "50%" }} padding="$6">
				{/* Resource追加欄 */}
				<CreateResource />

				{/* Resource一覧 */}
				<YStack gap="$2">
					<Text marginTop="$3">Resource一覧</Text>
					{resources.map((resource) => (
						<UpdateResource key={resource.id} resource={resource} />
					))}
				</YStack>
			</YStack>
		</YStack>
	);
}
