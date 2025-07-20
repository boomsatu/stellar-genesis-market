import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Upload, Image, Video, Music, FileText, Zap, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CreateNFT = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    royalties: '5',
    category: '',
    attributes: [],
    explicitContent: false,
    unlockableContent: false,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileType(file.type);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    return FileText;
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold mb-4">
              <span className="text-gradient-cyber">Create</span>{' '}
              <span className="text-foreground">NFT</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              Upload your digital creation to the blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-heading text-gradient-cyber">Upload File</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*,video/*,audio/*"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {previewImage ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="max-h-64 mx-auto rounded-lg"
                          />
                          <Badge className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm">
                            {fileType.split('/')[0].toUpperCase()}
                          </Badge>
                        </div>
                        <Button variant="outline" className="glass-button border-white/30">
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-cyber rounded-xl flex items-center justify-center">
                          <Upload className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-lg font-tech text-foreground mb-2">
                            Drop your file here, or browse
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Supports: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Max size: 100MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {/* File Types */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { icon: Image, label: 'Image', formats: 'JPG, PNG, GIF' },
                    { icon: Video, label: 'Video', formats: 'MP4, WEBM' },
                    { icon: Music, label: 'Audio', formats: 'MP3, WAV' },
                    { icon: FileText, label: 'Document', formats: 'PDF, TXT' },
                  ].map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.label} className="glass-button p-4 text-center rounded-lg">
                        <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-sm font-tech text-foreground mb-1">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.formats}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Form Section */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-heading text-gradient-neon">NFT Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-tech">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter NFT name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="glass-button border-white/20 focus:border-primary/50"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-tech">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your NFT..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="glass-button border-white/20 focus:border-primary/50 resize-none"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="font-tech">Category</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="glass-button border-white/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="font-tech">Price (ETH)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.001"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="glass-button border-white/20 focus:border-primary/50"
                  />
                </div>

                {/* Royalties */}
                <div className="space-y-2">
                  <Label htmlFor="royalties" className="font-tech">Royalties (%)</Label>
                  <Input
                    id="royalties"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.royalties}
                    onChange={(e) => setFormData({ ...formData, royalties: e.target.value })}
                    className="glass-button border-white/20 focus:border-primary/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Earn royalties on secondary sales (0-10%)
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-tech">Explicit Content</Label>
                      <p className="text-xs text-muted-foreground">
                        Mark if your NFT contains sensitive content
                      </p>
                    </div>
                    <Switch
                      checked={formData.explicitContent}
                      onCheckedChange={(checked) => setFormData({ ...formData, explicitContent: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-tech">Unlockable Content</Label>
                      <p className="text-xs text-muted-foreground">
                        Include exclusive content for the owner
                      </p>
                    </div>
                    <Switch
                      checked={formData.unlockableContent}
                      onCheckedChange={(checked) => setFormData({ ...formData, unlockableContent: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="mt-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-accent" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Preview Card */}
                  <div className="nft-card">
                    <div className="relative overflow-hidden rounded-t-xl">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="NFT Preview"
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-dark flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <Image className="w-12 h-12 mx-auto mb-2" />
                            <p className="font-tech">Upload file to preview</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-heading font-bold text-gradient-cyber mb-1">
                        {formData.name || 'NFT Name'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {formData.description || 'NFT Description'}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">Price</div>
                          <div className="text-lg font-tech font-bold text-gradient-neon">
                            {formData.price || '0.00'} ETH
                          </div>
                        </div>
                        <Button size="sm" className="btn-cyber">
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-heading font-bold text-gradient-neon">
                      Mint Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Listing Price</span>
                        <span className="font-tech">{formData.price || '0.00'} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform Fee (2.5%)</span>
                        <span className="font-tech">
                          {formData.price ? (parseFloat(formData.price) * 0.025).toFixed(3) : '0.000'} ETH
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gas Fee</span>
                        <span className="font-tech">~0.01 ETH</span>
                      </div>
                      <div className="border-t border-white/10 pt-3">
                        <div className="flex justify-between font-tech">
                          <span>You'll receive</span>
                          <span className="text-gradient-cyber font-bold">
                            {formData.price ? (parseFloat(formData.price) * 0.975).toFixed(3) : '0.000'} ETH
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Button className="w-full btn-cyber" size="lg">
                        <Zap className="w-5 h-5 mr-2" />
                        Create NFT
                      </Button>
                      <Button variant="outline" className="w-full glass-button border-white/30">
                        Save as Draft
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;