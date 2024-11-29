export const SAMPLE_POSTS = [
  {
    id: '1',
    author: {
      name: 'Nikita Harris',
      role: 'Sales Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    content: 'Just completed another successful training session with the team! 🎯 The engagement levels were fantastic, and everyone showed great progress in their development tracks.',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    likes: 12,
    comments: [],
    shares: 2,
    isLiked: false,
  },
  {
    id: '2',
    author: {
      name: 'Roger Knight',
      role: 'Development Lead',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
    content: 'Excited to share that our team has achieved a 95% completion rate in this month\'s skill development program! 📈 Keep up the great work everyone!',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    likes: 24,
    comments: [],
    shares: 7,
    isLiked: true,
  },
];