import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostListScreen } from '../Screens/PostListScreen';
import { PostScreen } from '../Screens/PostScreen';
import { IPostCardProps } from '../Components/PostCard';

export type RootStackParamList = {
  PostList: undefined;
  Post: IPostCardProps;
};

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PostList"
          component={PostListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
