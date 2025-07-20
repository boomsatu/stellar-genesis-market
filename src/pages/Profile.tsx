import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Copy, ExternalLink, Grid, List, Heart, Eye, Share2, Settings, Edit3, Zap } from 'lucide-react';

const Profile = () => {
  const { address } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock user data
  const user = {
    address: address || '0x742d35cc6ce4c5e848ff5e2b1e5c0f8e5d8f1234',
    username: 'CyberCreator',
    bio: 'Digital artist exploring the intersection of technology and consciousness. Creating NFTs that bridge the gap between reality and the metaverse.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    verified: true,
    followers: 12500,
    following: 342,
    joinedDate: 'March 2023',
    website: 'https://cybercreator.art',
    twitter: '@cybercreator',
    instagram: '@cybercreator_art',
  };

  const stats = {
    nftsOwned: 156,
    nftsCreated: 89,
    totalVolume: '234.5 ETH',
    floorPrice: '0.8 ETH',
  };

  const nfts = [
    {
      id: 1,
      name: 'Cyber Guardian #1247',
      collection: 'Cyber Punks',
      price: '2.5 ETH',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
      likes: 342,
      views: 1250,
      type: 'owned',
    },
    {
      id: 2,
      name: 'Neural Interface #891',
      collection: 'Neural Networks',
      price: '1.8 ETH',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
      likes: 189,
      views: 890,
      type: 'created',
    },
    {
      id: 3,
      name: 'Quantum Portal #3344',
      collection: 'Digital Cosmos',
      price: '0.9 ETH',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop',
      likes: 567,
      views: 2100,
      type: 'liked',
    },
  ];

  const collections = [
    {
      id: 1,
      name: 'Cyber Genesis',
      items: 25,
      floorPrice: '0.5 ETH',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Digital Dreams',
      items: 50,
      floorPrice: '0.3 ETH',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop',
    },
  ];

  const activities = [
    {
      id: 1,
      type: 'sale',
      nft: 'Cyber Guardian #1247',
      price: '2.5 ETH',
      from: '0x1234...',
      to: '0x5678...',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'mint',
      nft: 'Neural Interface #891',
      price: '1.8 ETH',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'transfer',
      nft: 'Quantum Portal #3344',
      from: '0x9abc...',
      to: '0xdef0...',
      time: '3 days ago',
    },
  ];

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Banner & Profile Header */}
      <div className="relative">
        {/* Banner */}
        <div 
          className="h-64 md:h-80 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${user.banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-20">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-card">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="text-2xl font-heading">CC</AvatarFallback>
              </Avatar>
              {user.verified && (
                <Badge className="absolute -bottom-2 -right-2 bg-primary">
                  <Zap className="w-3 h-3" />
                </Badge>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-heading font-bold text-gradient-cyber mb-2">
                      {user.username}
                    </h1>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <span className="font-tech">{shortenAddress(user.address)}</span>
                      <Button variant="ghost" size="sm" className="h-auto p-1">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="glass-button border-white/30">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" className="btn-cyber">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>

                <p className="text-foreground/80 mb-4 font-body max-w-2xl">
                  {user.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center space-x-4 mb-4">
                  <a href={user.website} className="text-primary hover:text-primary/80 font-tech text-sm">
                    {user.website}
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-foreground/60 font-tech text-sm">Joined {user.joinedDate}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-lg font-tech font-bold text-gradient-neon">
                      {user.followers.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground ml-1 font-body">followers</span>
                  </div>
                  <div>
                    <span className="text-lg font-tech font-bold">{user.following}</span>
                    <span className="text-muted-foreground ml-1 font-body">following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-heading font-bold text-gradient-cyber">{stats.nftsOwned}</div>
                <div className="text-sm text-muted-foreground font-body">NFTs Owned</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-heading font-bold text-gradient-neon">{stats.nftsCreated}</div>
                <div className="text-sm text-muted-foreground font-body">Created</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-heading font-bold text-gradient-cyber">{stats.totalVolume}</div>
                <div className="text-sm text-muted-foreground font-body">Volume</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-heading font-bold text-gradient-neon">{stats.floorPrice}</div>
                <div className="text-sm text-muted-foreground font-body">Floor Price</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="owned" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <TabsList className="glass-card grid w-full md:w-auto grid-cols-4 md:grid-cols-5">
              <TabsTrigger value="owned" className="font-tech">Owned</TabsTrigger>
              <TabsTrigger value="created" className="font-tech">Created</TabsTrigger>
              <TabsTrigger value="collections" className="font-tech">Collections</TabsTrigger>
              <TabsTrigger value="liked" className="font-tech">Liked</TabsTrigger>
              <TabsTrigger value="activity" className="font-tech">Activity</TabsTrigger>
            </TabsList>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="flex rounded-lg border border-white/20 overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* NFTs Grid */}
          <TabsContent value="owned">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {nfts.filter(nft => nft.type === 'owned').map((nft) => (
                <Card key={nft.id} className="nft-card group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                          viewMode === 'grid' ? 'w-full h-64' : 'w-32 h-32'
                        }`}
                      />
                    </div>
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="text-lg font-heading font-bold text-gradient-cyber mb-1">
                        {nft.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{nft.collection}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-tech font-bold text-gradient-neon">{nft.price}</div>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{nft.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{nft.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="created">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.filter(nft => nft.type === 'created').map((nft) => (
                <Card key={nft.id} className="nft-card">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-heading font-bold text-gradient-cyber mb-1">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{nft.collection}</p>
                      <div className="text-lg font-tech font-bold text-gradient-neon">{nft.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collections">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Card key={collection.id} className="nft-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-heading font-bold text-gradient-cyber">{collection.name}</h3>
                        <p className="text-sm text-muted-foreground">{collection.items} items</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Floor Price</div>
                        <div className="text-lg font-tech font-bold text-gradient-neon">{collection.floorPrice}</div>
                      </div>
                      <Button size="sm" className="btn-cyber">
                        View
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.filter(nft => nft.type === 'liked').map((nft) => (
                <Card key={nft.id} className="nft-card">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-heading font-bold text-gradient-cyber mb-1">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{nft.collection}</p>
                      <div className="text-lg font-tech font-bold text-gradient-neon">{nft.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge className={`
                          ${activity.type === 'sale' ? 'bg-accent' : ''}
                          ${activity.type === 'mint' ? 'bg-primary' : ''}
                          ${activity.type === 'transfer' ? 'bg-secondary' : ''}
                        `}>
                          {activity.type.toUpperCase()}
                        </Badge>
                        <div>
                          <div className="font-tech font-medium">{activity.nft}</div>
                          {activity.price && (
                            <div className="text-sm text-gradient-neon font-tech">{activity.price}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                        {activity.from && (
                          <div className="text-xs text-muted-foreground">
                            {shortenAddress(activity.from)} → {shortenAddress(activity.to!)}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;