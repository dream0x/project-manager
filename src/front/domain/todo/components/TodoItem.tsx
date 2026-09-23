import { Circle, CircleCheck } from "@tamagui/lucide-icons-2";
import { useState } from "react";
import { Button, Text, XStack } from "tamagui";
import CommonDialog from "@/domain/common/CommonDialog";
import CommonForm from "@/domain/common/CommonForm";
import DeleteButton from "@/domain/common/DeleteButton";
import {
	updateTodoFields,
	updateTodoSchema,
	type updateTodoValues,
} from "../form/update-todo-form";
import { useTodoStore } from "../state";
import type { Todo } from "../type";

export default function TodoItem(props: { todo: Todo }) {
	const updateTodo = useTodoStore((state) => state.update);
	const toggleTodo = useTodoStore((state) => state.update);
	const [isHoveringToggle, setIsHoveringToggle] = useState(false);

	// フォームのデフォルト値
	const updateTodoDefaultValues: updateTodoValues = {
		title: props.todo.title,
		description: props.todo.description,
		completed: props.todo.completed,
	};

	return (
		<CommonDialog
			trigger={
				<Button
					unstyled
					cursor="pointer"
					borderRadius="$2"
					borderWidth={1}
					borderColor="lightgray"
					padding="$2"
				>
					<XStack gap="$2" alignItems="center">
						<Button
							unstyled
							cursor="pointer"
							padding="$2"
							icon={isHoveringToggle ? CircleCheck : Circle}
							onMouseEnter={() => setIsHoveringToggle(true)}
							onMouseLeave={() => setIsHoveringToggle(false)}
							onPress={() =>
								toggleTodo(
									props.todo.id,
									props.todo.title,
									props.todo.description,
									!props.todo.completed,
								)
							}
						/>
						<Text
							textDecorationLine={
								props.todo.completed ? "line-through" : "none"
							}
						>
							{props.todo.title}
						</Text>
					</XStack>
				</Button>
			}
			content={(setClose) => (
				<CommonForm
					schema={updateTodoSchema}
					defaultValues={updateTodoDefaultValues}
					formFields={updateTodoFields}
					onSubmit={async ({ title, description }: updateTodoValues) => {
						await updateTodo(
							props.todo.id,
							title,
							description,
							props.todo.completed,
						);
						setClose();
					}}
					submitLabel="更新"
				/>
			)}
			menuItems={<DeleteButton todo={props.todo} />}
		/>
	);
}
