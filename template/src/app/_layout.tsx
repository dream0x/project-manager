import { defaultConfig } from "@tamagui/config/v5";
import { Slot } from "expo-router";
import { createTamagui, TamaguiProvider } from "tamagui";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme={"light"}>
      <Slot />
    </TamaguiProvider>
  );
}
