import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/AppNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { usePostComments } from '../Hooks/usePostComments';
import { AntDesign } from '@expo/vector-icons';
import { FilterParams } from '../Hooks/usePostList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Post'>;

type Props = {
  route: PostScreenRouteProp;
};

export const PostScreen: React.FC<Props> = ({ route }) => {
  const {
    title,
    body,
    tagList,
    description,
    createdAt,
    author,
    favoritesCount,
    slug,
    addFilters,
  } = route.params;

  const { comments } = usePostComments(slug);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goBackOnFilters = (filters: FilterParams) => {
    addFilters(filters);
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.screenWrapper}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>{title}</Text>

        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.tagline}>
          {tagList.map((tag) => (
            <TouchableOpacity
              onPress={() => goBackOnFilters({ type: 'tag', action: tag })}
              key={tag}
              style={styles.tagItem}
            >
              <Text>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.infoBlock}>
          <TouchableOpacity
            onPress={() =>
              goBackOnFilters({ type: 'author', action: author.username })
            }
            style={styles.authorBlock}
          >
            <Image
              style={styles.userAvatar}
              source={{
                uri: author.image,
              }}
            />
            <Text>{author.username}</Text>
          </TouchableOpacity>
          <View style={styles.bottomLine}>
            <View style={styles.dateBlock}>
              <AntDesign name="calendar" size={20} color="black" />
              <Text>
                {createdAt.slice(0, 10).split('-').reverse().join('.')}
              </Text>
            </View>
            <View style={styles.likesBlock}>
              <AntDesign name="like1" size={20} color="black" />
              <Text>{favoritesCount}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.textBody}>{body}</Text>

        <Text style={styles.commentsTitle}>Comments:</Text>
        {comments.length ? (
          comments.map((comment) => (
            <View style={styles.commentContainer}>
              <Text>{comment}</Text>
            </View>
          ))
        ) : (
          <Text>No commets</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
  },
  tagline: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  tagItem: {
    backgroundColor: 'rgba(32, 132, 214, 0.3)',
    paddingHorizontal: 6,
    borderRadius: 4,
    paddingVertical: 4,
  },
  infoBlock: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 16,
    marginTop: 20,
  },
  authorBlock: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
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
  likesBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  textBody: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 20,
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '600',
    marginTop: 20,
  },
  commentContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
  },
});
