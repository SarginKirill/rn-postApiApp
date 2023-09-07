import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IPost } from '../Common/Types';
import { AntDesign } from '@expo/vector-icons';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigation';
import { FilterParams, usePostList } from '../Hooks/usePostList';

export interface IPostCardProps extends IPost {
  addFilters: (filters: FilterParams) => void;
}

export const PostCard: React.FC<IPostCardProps> = ({
  tagList,
  title,
  author,
  createdAt,
  description,
  favoritesCount,
  body,
  slug,
  addFilters,
}) => {
  const cutDescription =
    description.length >= 200 ? `${description.slice(0, 200)}...` : description;

  const date = createdAt.slice(0, 10).split('-').reverse().join('.');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goPost = useCallback(() => {
    navigation.navigate('Post', {
      title,
      body,
      author,
      createdAt: date,
      favoritesCount,
      tagList,
      slug,
      description,
      addFilters,
    });
  }, []);

  return (
    <TouchableOpacity onPress={goPost} style={styles.postWrapper}>
      <View style={styles.tagLine}>
        {tagList.length &&
          tagList.map((tag) => (
            <TouchableOpacity
              onPress={() => addFilters({ type: 'tag', action: tag })}
              key={tag}
              style={styles.tagItem}
            >
              <Text>#{tag}</Text>
            </TouchableOpacity>
          ))}
      </View>
      <Text numberOfLines={3} style={styles.titleText}>
        {title}
      </Text>
      <Text style={styles.descriptionText}>{cutDescription}</Text>

      <View style={styles.authorBlock}>
        <TouchableOpacity
          style={styles.authorBlock}
          onPress={() =>
            addFilters({ type: 'author', action: author.username })
          }
        >
          <AntDesign name="user" size={20} color="black" />
          <Text>{author.username}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomLine}>
        <View style={styles.dateBlock}>
          <AntDesign name="calendar" size={20} color="black" />
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.likesBlock}>
          <AntDesign name="like1" size={20} color="black" />
          <Text>{favoritesCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
  },
  likesBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  tagLine: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  tagItem: {
    backgroundColor: 'rgba(32, 132, 214, 0.3)',
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  bottomLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dateBlock: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  dateText: {
    fontWeight: '600',
  },
  authorBlock: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
});
