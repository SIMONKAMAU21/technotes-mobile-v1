// components/ui/shadow.tsx

import React, { useContext } from "react";
import { BarChart, LineChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { HStack, VStack } from "./Stacks";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

const screenWidth = Dimensions.get("window").width / 2 - 16;

interface Props {
  adminCount: number;
  studentCount: number;
  teacherCount: number;
  parentCount: number;
}

export const shadow = {
  shadowColor: "rgb(35, 25, 173)",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.9,
  shadowRadius: 80,
  elevation: 70,
};

export default function MyLineChart({
  adminCount,
  studentCount,
  teacherCount,
  parentCount,
}: Props) {
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  const chartConfig = {
    backgroundGradientFrom: theme === "dark" ? color.bg : color.background,
    backgroundGradientTo: theme ==="dark" ?color.background : color.tint,
    color: theme === "dark" ? ( (opacity = 1) => `rgba(255, 225, 255, ${opacity})`) : (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: theme === "dark" ? ( (opacity = 1) => `rgba(255, 225, 255, ${opacity})`) : (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 0.8,
  };

  const data = {
    labels: ["A", "S", "T", "P"],
    datasets: [
      {
        data: [adminCount, studentCount, teacherCount, parentCount],
      },
    ],
  };

  return (
    <HStack className="text-sm p-0  gap-1 rounded-lg shadow-2xl">
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </HStack>
  );
}
