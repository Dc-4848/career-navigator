import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import api from '../api/api';

const CATEGORIES = [
  'All',
  'Placement Preparation',
  'Internships',
  'Hackathons',
  'Projects',
  'Programming',
  'Data Science & AI',
  'Career Guidance',
  'College Announcements',
];

function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Just now';
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function CommunityScreen({ navigation }) {
  const { user, profile } = useMobileApp();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Post creation modal
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newPostCategory, setNewPostCategory] = useState('Placement Preparation');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  // Expanded comments state: { [postId]: { comments: [], loading: boolean, input: string } }
  const [expandedComments, setExpandedComments] = useState({});

  // Fetch posts from backend
  const fetchPosts = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const params = {};
      if (selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const res = await api.get('/community/posts', { params });
      if (res.data && Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.warn('Error fetching community posts:', err.message);
      setError('Could not load community feed. Please verify your connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Vote on poll
  const handleVote = async (postId, optionIndex) => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please log in to vote on community polls.');
      return;
    }

    // Optimistic UI update
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post._id !== postId || !post.poll) return post;
        const currentUserId = user._id || user.id;
        const updatedOptions = post.poll.options.map((opt, idx) => {
          const currentVotes = Array.isArray(opt.votes) ? opt.votes : [];
          const hadVoted = currentVotes.some(v => String(v) === String(currentUserId));
          if (idx === optionIndex) {
            return {
              ...opt,
              votes: hadVoted ? currentVotes : [...currentVotes, currentUserId],
            };
          } else {
            return {
              ...opt,
              votes: currentVotes.filter(v => String(v) !== String(currentUserId)),
            };
          }
        });
        const total = updatedOptions.reduce((acc, opt) => acc + opt.votes.length, 0);
        return {
          ...post,
          poll: {
            ...post.poll,
            options: updatedOptions,
            totalVotes: total,
          },
        };
      })
    );

    try {
      const res = await api.post(`/community/posts/${postId}/poll/vote`, { optionIndex });
      if (res.data && res.data.poll) {
        setPosts(prevPosts =>
          prevPosts.map(p => (p._id === postId ? { ...p, poll: res.data.poll } : p))
        );
      }
    } catch (err) {
      console.warn('Poll voting failed:', err.message);
      fetchPosts(); // Rollback to actual state
    }
  };

  // Like / Unlike post
  const handleToggleLike = async (postId) => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please log in to like posts.');
      return;
    }

    const currentUserId = user._id || user.id;

    // Optimistic toggle
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post._id !== postId) return post;
        const likes = Array.isArray(post.likes) ? post.likes : [];
        const isLiked = likes.some(id => String(id) === String(currentUserId));
        const updatedLikes = isLiked
          ? likes.filter(id => String(id) !== String(currentUserId))
          : [...likes, currentUserId];
        return { ...post, likes: updatedLikes };
      })
    );

    try {
      const res = await api.post(`/community/posts/${postId}/like`);
      if (res.data) {
        setPosts(prevPosts =>
          prevPosts.map(p =>
            p._id === postId ? { ...p, likes: res.data.likes } : p
          )
        );
      }
    } catch (err) {
      console.warn('Like toggle failed:', err.message);
      fetchPosts();
    }
  };

  // Share post
  const handleShare = async (post) => {
    try {
      const shareUrl = `https://careernavigator.app/community/${post._id}`;
      const title = post.author?.name ? `${post.author.name} on Career Navigator` : 'Career Navigator Post';
      const result = await Share.share({
        title,
        message: `${post.content}\n\nRead more on Career Navigator: ${shareUrl}`,
      });

      if (result.action === Share.sharedAction) {
        // Register share with backend
        await api.post(`/community/posts/${post._id}/share`).catch(() => {});
        setPosts(prevPosts =>
          prevPosts.map(p =>
            p._id === post._id ? { ...p, sharesCount: (p.sharesCount || 0) + 1 } : p
          )
        );
      }
    } catch (err) {
      console.warn('Share failed:', err.message);
    }
  };

  // Report post
  const handleReport = (postId) => {
    Alert.alert(
      'Report Content',
      'Do you want to report this post to community moderators for policy violations?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.post(`/community/posts/${postId}/report`, { reason: 'Student moderation report' });
              Alert.alert('Report Received', 'Thank you for helping maintain community guidelines.');
            } catch (err) {
              Alert.alert('Notice', 'Report has already been noted.');
            }
          },
        },
      ]
    );
  };

  // Delete own post
  const handleDeletePost = (postId) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to permanently delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/community/posts/${postId}`);
              setPosts(prev => prev.filter(p => p._id !== postId));
            } catch (err) {
              Alert.alert('Error', 'Unable to delete post. Please try again.');
            }
          },
        },
      ]
    );
  };

  // Comments toggling and loading
  const handleToggleComments = async (postId) => {
    const isCurrentlyOpen = !!expandedComments[postId]?.isOpen;

    if (isCurrentlyOpen) {
      setExpandedComments(prev => ({
        ...prev,
        [postId]: { ...prev[postId], isOpen: false },
      }));
      return;
    }

    setExpandedComments(prev => ({
      ...prev,
      [postId]: {
        isOpen: true,
        loading: true,
        comments: prev[postId]?.comments || [],
        input: prev[postId]?.input || '',
      },
    }));

    try {
      const res = await api.get(`/community/posts/${postId}/comments`);
      if (res.data && Array.isArray(res.data.comments)) {
        setExpandedComments(prev => ({
          ...prev,
          [postId]: {
            ...prev[postId],
            loading: false,
            comments: res.data.comments,
          },
        }));
      }
    } catch (err) {
      console.warn('Failed to load comments:', err.message);
      setExpandedComments(prev => ({
        ...prev,
        [postId]: { ...prev[postId], loading: false },
      }));
    }
  };

  // Post a new comment
  const handleAddComment = async (postId) => {
    const state = expandedComments[postId];
    const text = state?.input?.trim();
    if (!text) return;

    if (!user) {
      Alert.alert('Sign In Required', 'Please log in to participate in discussions.');
      return;
    }

    try {
      const res = await api.post(`/community/posts/${postId}/comments`, { content: text });
      if (res.data && res.data.comment) {
        setExpandedComments(prev => ({
          ...prev,
          [postId]: {
            ...prev[postId],
            input: '',
            comments: [...(prev[postId]?.comments || []), res.data.comment],
          },
        }));

        setPosts(prevPosts =>
          prevPosts.map(p =>
            p._id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p
          )
        );
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to publish comment. Please try again.');
    }
  };

  // Delete own comment
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await api.delete(`/community/comments/${commentId}`);
      setExpandedComments(prev => ({
        ...prev,
        [postId]: {
          ...prev[postId],
          comments: prev[postId].comments.filter(c => c._id !== commentId),
        },
      }));
      setPosts(prevPosts =>
        prevPosts.map(p =>
          p._id === postId ? { ...p, commentsCount: Math.max(0, (p.commentsCount || 1) - 1) } : p
        )
      );
    } catch (err) {
      Alert.alert('Error', 'Could not delete comment.');
    }
  };

  // Create post submit
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      Alert.alert('Required', 'Please write your post content before submitting.');
      return;
    }

    if (isPollEnabled) {
      if (!pollQuestion.trim()) {
        Alert.alert('Poll Required', 'Please enter a poll question.');
        return;
      }
      const validOptions = pollOptions.map(o => o.trim()).filter(Boolean);
      if (validOptions.length < 2) {
        Alert.alert('Poll Options', 'Please provide at least 2 valid options for your poll.');
        return;
      }
    }

    setSubmitting(true);
    try {
      const payload = {
        category: newPostCategory,
        content: newPostContent.trim(),
        tags: newPostTags ? newPostTags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) : [],
      };

      if (isPollEnabled) {
        payload.isPoll = true;
        payload.poll = {
          question: pollQuestion.trim(),
          options: pollOptions.map(o => o.trim()).filter(Boolean).map(text => ({ text, votes: [] })),
        };
      }

      const res = await api.post('/community/posts', payload);
      if (res.data && res.data.post) {
        setPosts(prev => [res.data.post, ...prev]);
        setCreateModalVisible(false);
        setNewPostContent('');
        setNewPostTags('');
        setIsPollEnabled(false);
        setPollQuestion('');
        setPollOptions(['', '']);
        Alert.alert('Published', 'Your post is now live in the student community feed.');
      }
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to submit post.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddPollOption = () => {
    if (pollOptions.length >= 6) {
      Alert.alert('Limit Reached', 'A maximum of 6 poll options is allowed.');
      return;
    }
    setPollOptions(prev => [...prev, '']);
  };

  const handleRemovePollOption = (index) => {
    if (pollOptions.length <= 2) {
      Alert.alert('Minimum Options', 'A poll requires at least 2 options.');
      return;
    }
    setPollOptions(prev => prev.filter((_, i) => i !== index));
  };

  const currentUserId = user?._id || user?.id;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Student Community"
        rightAction={
          <TouchableOpacity
            style={styles.headerPostBtn}
            onPress={() => setCreateModalVisible(true)}
            accessibilityLabel="Create Post"
          >
            <Ionicons name="create-outline" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.headerPostBtnText}>Post</Text>
          </TouchableOpacity>
        }
      />

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search-outline" size={18} color={colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search questions, roadmaps, internships..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => fetchPosts()}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
            <Ionicons name="close-circle" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Pills (Horizontal Scroll) */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Feed Content */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.accentTeal} />
          <Text style={styles.loadingText}>Loading community feed...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons name="cloud-offline-outline" size={42} color={colors.textMuted} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => fetchPosts()}>
            <Text style={styles.retryBtnText}>Retry Connection</Text>
          </TouchableOpacity>
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="chatbubbles-outline" size={44} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>No posts in this channel</Text>
          <Text style={styles.emptySubtitle}>
            Be the first student to start a discussion or post a placement poll!
          </Text>
          <TouchableOpacity
            style={styles.createFirstBtn}
            onPress={() => setCreateModalVisible(true)}
          >
            <Text style={styles.createFirstBtnText}>Create First Post</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.feedContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchPosts(true)}
              tintColor={colors.accentTeal}
            />
          }
        >
          {posts.map(post => {
            const author = post.author || {};
            const initials = author.name
              ? author.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
              : 'ST';
            const isAuthor = currentUserId && String(author._id) === String(currentUserId);
            const isLiked = Array.isArray(post.likes) && post.likes.some(id => String(id) === String(currentUserId));
            const commentsState = expandedComments[post._id] || {};
            const totalPollVotes = post.poll?.totalVotes || (post.poll?.options?.reduce((s, o) => s + (o.votes?.length || 0), 0)) || 0;

            return (
              <GlassCard key={post._id} style={styles.postCard}>
                {/* Author Header */}
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatar}>
                    <Text style={styles.avatarInitials}>{initials}</Text>
                  </View>

                  <View style={styles.authorInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.authorName}>{author.name || 'Student Explorer'}</Text>
                      {author.isVerified && (
                        <View style={styles.verifiedBadge}>
                          <Ionicons name="checkmark-circle" size={14} color="#0284c7" />
                        </View>
                      )}
                    </View>
                    <Text style={styles.authorMeta} numberOfLines={1}>
                      {author.college ? author.college : 'Engineering Student'}
                      {author.degree ? ` • ${author.degree}` : ''}
                    </Text>
                  </View>

                  <View style={styles.headerRight}>
                    <Text style={styles.timestamp}>{formatTimeAgo(post.createdAt)}</Text>
                    {isAuthor && (
                      <TouchableOpacity
                        style={styles.deletePostBtn}
                        onPress={() => handleDeletePost(post._id)}
                        accessibilityLabel="Delete Post"
                      >
                        <Ionicons name="trash-outline" size={16} color={colors.accentRose} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* Category Chip */}
                {post.category && (
                  <View style={styles.postCategoryBadge}>
                    <Text style={styles.postCategoryText}>{post.category}</Text>
                  </View>
                )}

                {/* Post Content */}
                <Text style={styles.postContentText}>{post.content}</Text>

                {/* Tags */}
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <View style={styles.tagsRow}>
                    {post.tags.map((tag, idx) => (
                      <Text key={idx} style={styles.tagText}>
                        #{tag}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Interactive Poll Component */}
                {post.isPoll && post.poll && Array.isArray(post.poll.options) && (
                  <View style={styles.pollContainer}>
                    <View style={styles.pollHeaderRow}>
                      <Ionicons name="bar-chart-outline" size={16} color={colors.accentTeal} style={{ marginRight: 6 }} />
                      <Text style={styles.pollQuestion}>{post.poll.question}</Text>
                    </View>

                    <View style={styles.pollOptionsList}>
                      {post.poll.options.map((option, idx) => {
                        const optVotes = Array.isArray(option.votes) ? option.votes.length : 0;
                        const percentage = totalPollVotes > 0 ? Math.round((optVotes / totalPollVotes) * 100) : 0;
                        const hasVotedForThis = Array.isArray(option.votes) &&
                          option.votes.some(v => String(v) === String(currentUserId));

                        return (
                          <TouchableOpacity
                            key={idx}
                            style={[
                              styles.pollOptionRow,
                              hasVotedForThis && styles.pollOptionRowSelected,
                            ]}
                            onPress={() => handleVote(post._id, idx)}
                            activeOpacity={0.7}
                          >
                            {/* Vote Percentage Fill Bar */}
                            <View
                              style={[
                                styles.pollProgressFill,
                                { width: `${percentage}%` },
                                hasVotedForThis && styles.pollProgressFillSelected,
                              ]}
                            />

                            <View style={styles.pollOptionContent}>
                              <View style={styles.pollOptionLeft}>
                                <Ionicons
                                  name={hasVotedForThis ? 'radio-button-on' : 'radio-button-off'}
                                  size={16}
                                  color={hasVotedForThis ? colors.accentTeal : colors.textMuted}
                                  style={{ marginRight: 8 }}
                                />
                                <Text
                                  style={[
                                    styles.pollOptionText,
                                    hasVotedForThis && styles.pollOptionTextSelected,
                                  ]}
                                >
                                  {option.text}
                                </Text>
                              </View>

                              <Text style={styles.pollPercentageText}>
                                {percentage}% ({optVotes})
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    <View style={styles.pollFooterRow}>
                      <Text style={styles.pollTotalVotesText}>
                        {totalPollVotes} student {totalPollVotes === 1 ? 'vote' : 'votes'} total
                      </Text>
                      {post.poll.isClosed && (
                        <Text style={styles.pollClosedBadge}>Poll Closed</Text>
                      )}
                    </View>
                  </View>
                )}

                {/* Actions Bar (Like, Comment, Share, Report) */}
                <View style={styles.actionsBar}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleToggleLike(post._id)}
                  >
                    <Ionicons
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={18}
                      color={isLiked ? colors.accentRose : colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.actionCount,
                        isLiked && { color: colors.accentRose, fontWeight: '700' },
                      ]}
                    >
                      {Array.isArray(post.likes) ? post.likes.length : 0}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleToggleComments(post._id)}
                  >
                    <Ionicons
                      name={commentsState.isOpen ? 'chatbubble' : 'chatbubble-outline'}
                      size={18}
                      color={commentsState.isOpen ? colors.accentTeal : colors.textSecondary}
                    />
                    <Text style={styles.actionCount}>{post.commentsCount || 0}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleShare(post)}
                  >
                    <Ionicons name="share-social-outline" size={18} color={colors.textSecondary} />
                    <Text style={styles.actionCount}>{post.sharesCount || 0}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, { marginLeft: 'auto' }]}
                    onPress={() => handleReport(post._id)}
                  >
                    <Ionicons name="flag-outline" size={16} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>

                {/* Collapsible Comments Section */}
                {commentsState.isOpen && (
                  <View style={styles.commentsContainer}>
                    <View style={styles.commentsDivider} />

                    {commentsState.loading ? (
                      <View style={{ paddingVertical: 12, alignItems: 'center' }}>
                        <ActivityIndicator size="small" color={colors.accentTeal} />
                      </View>
                    ) : Array.isArray(commentsState.comments) && commentsState.comments.length > 0 ? (
                      <View style={styles.commentsList}>
                        {commentsState.comments.map(comment => {
                          const isCommentAuthor = currentUserId && String(comment.author) === String(currentUserId);
                          const commInitials = comment.authorName
                            ? comment.authorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                            : 'U';

                          return (
                            <View key={comment._id} style={styles.commentItem}>
                              <View style={styles.commentAvatar}>
                                <Text style={styles.commentAvatarText}>{commInitials}</Text>
                              </View>
                              <View style={styles.commentBody}>
                                <View style={styles.commentHeaderRow}>
                                  <Text style={styles.commentAuthorName}>{comment.authorName}</Text>
                                  <Text style={styles.commentTimestamp}>{formatTimeAgo(comment.createdAt)}</Text>
                                  {isCommentAuthor && (
                                    <TouchableOpacity
                                      onPress={() => handleDeleteComment(post._id, comment._id)}
                                      style={{ marginLeft: 6 }}
                                    >
                                      <Ionicons name="trash-outline" size={14} color={colors.accentRose} />
                                    </TouchableOpacity>
                                  )}
                                </View>
                                {comment.authorCollege ? (
                                  <Text style={styles.commentAuthorCollege}>{comment.authorCollege}</Text>
                                ) : null}
                                <Text style={styles.commentContentText}>{comment.content}</Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    ) : (
                      <Text style={styles.noCommentsText}>No comments yet. Start the conversation!</Text>
                    )}

                    {/* Add Comment Input */}
                    <View style={styles.addCommentRow}>
                      <TextInput
                        style={styles.addCommentInput}
                        placeholder="Write a constructive comment..."
                        placeholderTextColor={colors.textMuted}
                        value={commentsState.input || ''}
                        onChangeText={text =>
                          setExpandedComments(prev => ({
                            ...prev,
                            [post._id]: { ...prev[post._id], input: text },
                          }))
                        }
                      />
                      <TouchableOpacity
                        style={styles.sendCommentBtn}
                        onPress={() => handleAddComment(post._id)}
                      >
                        <Ionicons name="send" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </GlassCard>
            );
          })}
        </ScrollView>
      )}

      {/* Create Post Modal */}
      <Modal
        visible={createModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Community Post</Text>
              <TouchableOpacity
                onPress={() => setCreateModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              {/* Channel / Category Picker */}
              <Text style={styles.modalFieldLabel}>Select Category / Channel</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
                {CATEGORIES.filter(c => c !== 'All').map(cat => {
                  const isSelected = newPostCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.modalCatChip, isSelected && styles.modalCatChipActive]}
                      onPress={() => setNewPostCategory(cat)}
                    >
                      <Text style={[styles.modalCatChipText, isSelected && styles.modalCatChipTextActive]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Post Content Input */}
              <Text style={styles.modalFieldLabel}>Post Content</Text>
              <TextInput
                style={styles.modalTextArea}
                placeholder="Share your interview questions, internship openings, project updates, or tech queries..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={newPostContent}
                onChangeText={setNewPostContent}
              />

              {/* Tags Input */}
              <Text style={styles.modalFieldLabel}>Tags (comma-separated)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. dsa, amazon, react, placements"
                placeholderTextColor={colors.textMuted}
                value={newPostTags}
                onChangeText={setNewPostTags}
              />

              {/* Poll Toggle */}
              <View style={styles.pollToggleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pollToggleTitle}>Include an Interactive Poll</Text>
                  <Text style={styles.pollToggleSubtitle}>Gather opinions or placement prep choices from peers</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggleCheckbox, isPollEnabled && styles.toggleCheckboxActive]}
                  onPress={() => setIsPollEnabled(!isPollEnabled)}
                >
                  {isPollEnabled && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </TouchableOpacity>
              </View>

              {/* Poll Builder Fields */}
              {isPollEnabled && (
                <View style={styles.pollBuilderBox}>
                  <Text style={styles.modalFieldLabel}>Poll Question</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. Which programming language are you preparing for placements?"
                    placeholderTextColor={colors.textMuted}
                    value={pollQuestion}
                    onChangeText={setPollQuestion}
                  />

                  <Text style={[styles.modalFieldLabel, { marginTop: 10 }]}>Options (2 to 6)</Text>
                  {pollOptions.map((opt, idx) => (
                    <View key={idx} style={styles.pollOptionInputRow}>
                      <TextInput
                        style={styles.pollOptionInput}
                        placeholder={`Option ${idx + 1}`}
                        placeholderTextColor={colors.textMuted}
                        value={opt}
                        onChangeText={text => {
                          const updated = [...pollOptions];
                          updated[idx] = text;
                          setPollOptions(updated);
                        }}
                      />
                      {pollOptions.length > 2 && (
                        <TouchableOpacity
                          style={styles.removeOptionBtn}
                          onPress={() => handleRemovePollOption(idx)}
                        >
                          <Ionicons name="trash-outline" size={18} color={colors.accentRose} />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}

                  {pollOptions.length < 6 && (
                    <TouchableOpacity
                      style={styles.addOptionBtn}
                      onPress={handleAddPollOption}
                    >
                      <Ionicons name="add" size={16} color={colors.accentTeal} style={{ marginRight: 4 }} />
                      <Text style={styles.addOptionBtnText}>Add Poll Option</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.publishBtn, submitting && { opacity: 0.7 }]}
                onPress={handleCreatePost}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.publishBtnText}>Publish to Community</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  headerPostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentTeal,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: colors.radiusSm,
  },
  headerPostBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 6,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
  },
  clearSearchBtn: {
    padding: 4,
  },
  categoriesContainer: {
    paddingVertical: 6,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  categoryChipActive: {
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
    borderColor: colors.accentTeal,
  },
  categoryChipText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: colors.accentTeal,
    fontWeight: '600',
  },
  feedContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  postCard: {
    padding: 16,
    marginVertical: 6,
    borderRadius: colors.radiusMd,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorAvatar: {
    width: 38,
    height: 38,
    borderRadius: colors.radiusSm,
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(2, 132, 199, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarInitials: {
    color: colors.accentTeal,
    fontSize: 14,
    fontWeight: '700',
  },
  authorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  authorMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  timestamp: {
    color: colors.textMuted,
    fontSize: 11,
  },
  deletePostBtn: {
    marginTop: 4,
    padding: 4,
  },
  postCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(2, 132, 199, 0.25)',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  postCategoryText: {
    color: colors.accentTeal,
    fontSize: 11,
    fontWeight: '600',
  },
  postContentText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tagText: {
    color: colors.accentCyan,
    fontSize: 12,
    fontWeight: '500',
  },
  pollContainer: {
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    padding: 12,
    marginVertical: 10,
  },
  pollHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pollQuestion: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  pollOptionsList: {
    gap: 8,
  },
  pollOptionRow: {
    height: 42,
    borderRadius: colors.radiusSm,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.bgTertiary,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  pollOptionRowSelected: {
    borderColor: colors.accentTeal,
  },
  pollProgressFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
  },
  pollProgressFillSelected: {
    backgroundColor: 'rgba(2, 132, 199, 0.3)',
  },
  pollOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    zIndex: 1,
  },
  pollOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pollOptionText: {
    color: colors.textPrimary,
    fontSize: 13,
  },
  pollOptionTextSelected: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pollPercentageText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  pollFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  pollTotalVotesText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  pollClosedBadge: {
    color: colors.accentRose,
    fontSize: 11,
    fontWeight: '600',
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    marginTop: 6,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 4,
  },
  actionCount: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentsDivider: {
    height: 1,
    backgroundColor: colors.glassBorder,
    marginBottom: 10,
  },
  commentsList: {
    gap: 8,
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: 'row',
    backgroundColor: colors.bgSecondary,
    padding: 10,
    borderRadius: colors.radiusSm,
  },
  commentAvatar: {
    width: 26,
    height: 26,
    borderRadius: 4,
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  commentAvatarText: {
    color: colors.accentTeal,
    fontSize: 10,
    fontWeight: '700',
  },
  commentBody: {
    flex: 1,
  },
  commentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentAuthorName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  commentTimestamp: {
    color: colors.textMuted,
    fontSize: 10,
  },
  commentAuthorCollege: {
    color: colors.textMuted,
    fontSize: 10,
    marginBottom: 2,
  },
  commentContentText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  noCommentsText: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 8,
  },
  addCommentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addCommentInput: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.textPrimary,
    fontSize: 12,
  },
  sendCommentBtn: {
    backgroundColor: colors.accentTeal,
    width: 36,
    height: 36,
    borderRadius: colors.radiusSm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 10,
  },
  errorText: {
    color: colors.accentRose,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 12,
  },
  retryBtn: {
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: colors.radiusSm,
  },
  retryBtnText: {
    color: colors.accentTeal,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  createFirstBtn: {
    backgroundColor: colors.accentTeal,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: colors.radiusSm,
  },
  createFirstBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.bgSecondary,
    borderTopLeftRadius: colors.radiusMd,
    borderTopRightRadius: colors.radiusMd,
    borderTopWidth: 1,
    borderColor: colors.glassBorder,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalScroll: {
    padding: 16,
  },
  modalFieldLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  modalCatChip: {
    backgroundColor: colors.bgTertiary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  modalCatChipActive: {
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
    borderColor: colors.accentTeal,
  },
  modalCatChipText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  modalCatChipTextActive: {
    color: colors.accentTeal,
    fontWeight: '600',
  },
  modalTextArea: {
    backgroundColor: colors.bgTertiary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    padding: 12,
    color: colors.textPrimary,
    fontSize: 13,
    minHeight: 100,
    marginBottom: 12,
  },
  modalInput: {
    backgroundColor: colors.bgTertiary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.textPrimary,
    fontSize: 13,
    marginBottom: 12,
  },
  pollToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgTertiary,
    padding: 12,
    borderRadius: colors.radiusSm,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginBottom: 12,
  },
  pollToggleTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  pollToggleSubtitle: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  toggleCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.bgSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  toggleCheckboxActive: {
    backgroundColor: colors.accentTeal,
    borderColor: colors.accentTeal,
  },
  pollBuilderBox: {
    backgroundColor: colors.bgTertiary,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: colors.radiusSm,
    padding: 12,
    marginBottom: 12,
  },
  pollOptionInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pollOptionInput: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.textPrimary,
    fontSize: 12,
  },
  removeOptionBtn: {
    padding: 8,
    marginLeft: 4,
  },
  addOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.accentTeal,
    borderStyle: 'dashed',
    borderRadius: colors.radiusSm,
    paddingVertical: 8,
    marginTop: 4,
  },
  addOptionBtnText: {
    color: colors.accentTeal,
    fontSize: 12,
    fontWeight: '600',
  },
  publishBtn: {
    backgroundColor: colors.accentTeal,
    borderRadius: colors.radiusSm,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
