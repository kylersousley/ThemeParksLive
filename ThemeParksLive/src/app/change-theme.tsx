import { useTheme } from "@/contexts/ThemeContext";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";

export default function ChangeTheme() {
    const { colors, changeTheme } = useTheme()
    return(
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
            <Text style={[styles.text, { color: colors.onSurfaceVariant }]}>Choose a color theme for the app.</Text>
            <CustomButton title="Red" onPress={() => changeTheme("red")} />
            <CustomButton title="Orange" onPress={() => changeTheme("orange")} />
            <CustomButton title="Yellow" onPress={() => changeTheme('yellow')} />
            <CustomButton title="Green" onPress={() => changeTheme('green')} />
            <CustomButton title="Blue" onPress={() => changeTheme("blue")} />
            <CustomButton title="Purple" onPress={() => changeTheme("purple")} />    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 16,
        gap: 12
    },
    text: {
        fontSize: 15,
        marginBottom: 8
    }
})