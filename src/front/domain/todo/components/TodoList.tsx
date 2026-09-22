import { Separator, Text, YStack } from "tamagui";
import { useTodoStore } from "@/domain/todo/state";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";

export default function TodoList() {
	const todos = useTodoStore((state) => state.todos);
	const incompleteTodos = todos.filter((todo) => !todo.completed);
	const completedTodos = todos.filter((todo) => todo.completed);

	return (
		<YStack padding="$6" gap="$3">
			{/* Todo追加欄 */}
			<CreateTodo />

			{/* Todo一覧 */}
			<YStack gap="$2">
				{/* 未完了Todo一覧 */}
				<Text>未完了タスク</Text>
				{incompleteTodos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}

				{/* 完了済みTodo一覧 */}
				<Separator borderColor="lightgray" marginVertical="$3" />
				<Text>完了済みタスク</Text>
				{completedTodos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</YStack>
		</YStack>
	);
}
