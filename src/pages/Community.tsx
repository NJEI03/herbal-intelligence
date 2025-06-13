import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Lock,
  Search,
  Image,
  Send,
  Heart,
  MessageCircle
} from "lucide-react";
import { createPost, getPosts } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { uploadFile, generateFilePath } from "@/lib/storage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const topics = [
  {
    id: 1,
    title: "Natural Remedies for Common Ailments",
    author: "Sarah Johnson",
    replies: 24,
    likes: 156,
    lastActivity: "2 hours ago",
    isPremium: false
  },
  {
    id: 2,
    title: "Meditation Techniques for Beginners",
    author: "Michael Chen",
    replies: 18,
    likes: 89,
    lastActivity: "5 hours ago",
    isPremium: false
  },
  {
    id: 3,
    title: "Advanced Herbal Medicine Practices",
    author: "Dr. Emily Brown",
    replies: 42,
    likes: 203,
    lastActivity: "1 day ago",
    isPremium: true
  },
  {
    id: 4,
    title: "Holistic Nutrition Guide",
    author: "Lisa Martinez",
    replies: 31,
    likes: 167,
    lastActivity: "3 days ago",
    isPremium: true
  }
];

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      let imageUrl = null;
      if (selectedImage) {
        const filePath = generateFilePath(user.uid, 'post', selectedImage.name);
        imageUrl = await uploadFile(selectedImage, filePath);
      }

      const postData = {
        content: newPost,
        imageUrl,
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      };

      await createPost(postData);
      setNewPost("");
      setSelectedImage(null);
      
      // Refresh posts
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <p>Loading community posts...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-herbal-text-primary">Community</h1>
          <p className="text-herbal-text-secondary">Connect with wellness enthusiasts</p>
        </div>
        <Button className="bg-herbal-primary hover:bg-herbal-primary/90">
          New Topic
        </Button>
      </div>

      {user && (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <Textarea
                placeholder="Share your wellness journey..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  {selectedImage && (
                    <span className="text-sm text-herbal-text-secondary">
                      {selectedImage.name}
                    </span>
                  )}
                </div>
                <Button type="submit" className="bg-herbal-primary hover:bg-herbal-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search topics..." 
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Topics</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {topics.map((topic) => (
                <Card key={topic.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {topic.isPremium && !user ? (
                            <span className="flex items-center gap-2">
                              {topic.title}
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            </span>
                          ) : (
                            topic.title
                          )}
                        </CardTitle>
                        <CardDescription>
                          Posted by {topic.author} • {topic.lastActivity}
                        </CardDescription>
                      </div>
                      {topic.isPremium && !user ? (
                        <Button variant="outline" size="sm">
                          Upgrade to Access
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">
                          View Discussion
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{topic.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{topic.likes} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="popular" className="space-y-4">
              {/* Similar structure as "all" but sorted by likes */}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {/* Similar structure as "all" but sorted by lastActivity */}
            </TabsContent>
          </Tabs>
        </div>

        <Card className="w-80 h-fit">
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
            <CardDescription>Keep our community healthy and supportive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Be Respectful</h4>
              <p className="text-sm text-muted-foreground">
                Treat all members with respect and kindness
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Share Knowledge</h4>
              <p className="text-sm text-muted-foreground">
                Contribute valuable insights and experiences
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Stay On Topic</h4>
              <p className="text-sm text-muted-foreground">
                Keep discussions relevant to health and wellness
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <img
                  src={post.userPhoto || "/placeholder.svg"}
                  alt={post.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <CardTitle className="text-base">{post.userName}</CardTitle>
                  <CardDescription>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post attachment"
                  className="rounded-lg mb-4 max-h-[400px] w-full object-cover"
                />
              )}
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {post.comments.length}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 