import { View } from "react-native";
import TodoList from "@/components/todos/TodoList";
import { useTodoStore } from "../states/todo";

export default function Index() {
	const todos = useTodoStore((state) => state.todos);
	return (
		<View>
			<TodoList />
		</View>
	);
}
