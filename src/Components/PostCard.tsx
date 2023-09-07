import { StyleSheet, Text, View } from 'react-native';
import { IPost } from '../Common/Types';
import { AntDesign } from '@expo/vector-icons';

type IPostProps = Omit<IPost, 'slug' | 'body'>;

export const PostCard: React.FC<IPostProps> = ({
  tagList,
  title,
  author,
  createdAt,
  description,
  favoritesCount,
}) => {
  const cutDescription =
    description.length >= 200 ? `${description.slice(0, 200)}...` : description;

  const date = createdAt.slice(0, 10);
  return (
    <View style={styles.postWrapper}>
      <View style={styles.tagLine}>
        {tagList.length &&
          tagList.map((tag) => (
            <View key={tag} style={styles.tagItem}>
              <Text>#{tag}</Text>
            </View>
          ))}
      </View>
      <Text numberOfLines={3} style={styles.titleText}>
        {title}
      </Text>
      <Text style={styles.descriptionText}>{cutDescription}</Text>

      <View style={styles.authorBlock}>
        <AntDesign name="user" size={20} color="black" />
        <Text>{author.username}</Text>
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
    </View>
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
