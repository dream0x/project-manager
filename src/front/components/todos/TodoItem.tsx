import { Text, View } from "tamagui";
import type { Todo } from "@/types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
	return (
		<View>
			<Text>{todo.title}</Text>
			<Text>{todo.completed}</Text>
		</View>
	);
}
