import { useEffect } from "react";
import { Separator, Text, YStack } from "tamagui";
import { useTodoStore } from "@/domain/todo/state";
import CreateTodo from "./CreateTodo";
import UpdateTodo from "./UpdateTodo";

export default function TodoList() {
	const todos = useTodoStore((state) => state.todos);
	const incompleteTodos = todos.filter((todo) => !todo.completed);
	const completedTodos = todos.filter((todo) => todo.completed);

	useEffect(() => {
		useTodoStore.getState().getAll();
	}, []);

	return (
		<YStack gap="$3" alignItems="center">
			<YStack width="100%" $xl={{ width: "50%" }} padding="$6">
				{/* Todo追加欄 */}
				<CreateTodo />

				{/* Todo一覧 */}
				<YStack gap="$2">
					{/* 未完了Todo一覧 */}
					<Text marginTop="$3">未完了タスク</Text>
					{incompleteTodos.map((todo) => (
						<UpdateTodo key={todo.id} todo={todo} />
					))}

					{/* 完了済みTodo一覧 */}
					<Separator borderColor="lightgray" marginTop="$3" />
					<Text marginTop="$3">完了済みタスク</Text>
					{completedTodos.map((todo) => (
						<UpdateTodo key={todo.id} todo={todo} />
					))}
				</YStack>
			</YStack>
		</YStack>
	);
}
