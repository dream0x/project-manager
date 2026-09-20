import { View } from "tamagui";
import { useTodoStore } from "@/states/todo";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

export default function TodoList() {
	const todos = useTodoStore((state) => state.todos);
	return (
		<View>
			{/* Todo追加欄 */}
			<AddTodo />

			{/* Todo一覧 */}
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</View>
	);
}
