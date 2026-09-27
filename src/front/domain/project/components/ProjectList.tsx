import { useEffect } from "react";
import { Separator, Text, YStack } from "tamagui";
import { useProjectStore } from "@/domain/project/state";
import CreateProject from "./CreateProject";
import UpdateProject from "./UpdateProject";

export default function ProjectList() {
	const projects = useProjectStore((state) => state.projects);

	useEffect(() => {
		useProjectStore.getState().getAll();
	}, []);

	return (
		<YStack gap="$3" alignItems="center">
			<YStack width="100%" $xl={{ width: "50%" }} padding="$6">
				{/* Project追加欄 */}
				<CreateProject />

				{/* Project一覧 */}
				<YStack gap="$2">
					<Text marginTop="$3">Project一覧</Text>
					{projects.map((project) => (
						<UpdateProject key={project.id} project={project} />
					))}
				</YStack>
			</YStack>
		</YStack>
	);
}
