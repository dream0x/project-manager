import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import CustomTabList from "@/domain/common/components/tab/CustomTabList";
import TabItem from "@/domain/common/components/tab/TabItem";

const tabItems: { name: string; href: string; label: string }[] = [
	{
		name: "todos",
		href: "/todos",
		label: "Todo",
	},
	{
		name: "projects",
		href: "/projects",
		label: "プロジェクト",
	},
	{
		name: "labels",
		href: "/labels",
		label: "ラベル",
	},
];

export default function TabLayout() {
	return (
		<Tabs>
			{/* コンテンツ */}
			<TabSlot />
			{/* タブバー */}
			<TabList asChild>
				<CustomTabList>
					{tabItems.map((tabItem) => (
						<TabTrigger key={tabItem.name} name={tabItem.name} href={tabItem.href} asChild>
							<TabItem label={tabItem.label} />
						</TabTrigger>
					))}
				</CustomTabList>
			</TabList>
		</Tabs>
	);
}
