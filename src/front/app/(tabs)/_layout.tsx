import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import CustomTabList from "@/domain/common/components/tab/CustomTabList";
import TabItem from "@/domain/common/components/tab/TabItem";

const tabs: { name: string; href: string; label: string }[] = [
	{
		name: "todos",
		href: "/todos",
		label: "Todo",
	},
	{
		name: "filters",
		href: "/filters",
		label: "フィルター",
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
					{tabs.map((tab) => (
						<TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
							<TabItem label={tab.label} />
						</TabTrigger>
					))}
				</CustomTabList>
			</TabList>
		</Tabs>
	);
}
