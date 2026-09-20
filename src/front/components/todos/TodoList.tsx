import { View } from "tamagui";
import { useTodoStore } from "@/states/todo";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";

export default function TodoList() {
	const todos = useTodoStore((state) => state.todos);
	return (
		<View>
			{/* Todo追加欄 */}
			<CreateTodo />

			{/* Todo一覧 */}
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</View>
	);
}
