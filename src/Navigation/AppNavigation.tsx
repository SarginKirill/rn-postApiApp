import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostListScreen } from '../Screens/PostListScreen';

export type RootStackParamList = {
  PostList: undefined;
};

export const AppNavigation = () => {
  const Sctack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Sctack.Navigator>
        <Sctack.Screen name="PostList" component={PostListScreen} />
      </Sctack.Navigator>
    </NavigationContainer>
  );
};
