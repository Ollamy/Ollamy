import { ColorValue, StyleSheet, View } from "react-native";

interface ProgressBarProps {
  progress: number;
  progressColor?: ColorValue;
  backgroundColor?: ColorValue;
}

const ProgressBar = ({
  progress,
  progressColor = "#02DC0A",
  backgroundColor = "#fff",
}: ProgressBarProps) => {
  const styles = StyleSheet.create({
    container: {
      height: 6,
      width: "100%",
      backgroundColor,
      borderRadius: 10,
      overflow: "hidden",
    },
    progress: {
      height: "100%",
      width: `${progress * 100}%`,
      backgroundColor: progressColor,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.progress}></View>
    </View>
  );
};

export default ProgressBar;
