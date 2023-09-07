import { SafeAreaView } from 'react-native-safe-area-context';
import { usePostList } from '../Hooks/usePostList';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { Loader } from '../UI/Loader';
import { PostCard } from '../Components/PostCard';

export const PostListScreen: React.FC = () => {
  const { posts, loading, fetchData, reload } = usePostList();

  return (
    <SafeAreaView edges={['bottom']} style={styles.mainContainer}>
      {loading && !posts.length ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={reload} />
          }
          contentContainerStyle={styles.listInnerStyle}
          style={styles.listContainer}
          data={posts}
          onEndReached={fetchData}
          onEndReachedThreshold={0.6}
          keyExtractor={(item, index) => `${index}`}
          ListFooterComponent={() => (loading ? <Loader /> : null)}
          renderItem={({ item }) => (
            <PostCard
              createdAt={item.createdAt}
              description={item.description}
              author={item.author}
              tagList={item.tagList}
              title={item.title}
              favoritesCount={item.favoritesCount}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  listContainer: {
    flex: 1,
  },
  listInnerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
