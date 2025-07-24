import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Shield, 
  Home, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  MapPin,
  Star
} from "lucide-react";
import { sampleUserProfiles, sampleRooms } from "@/data/mockData";
import { MatchingService } from "@/services/matchingService";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Calculate dashboard statistics
  const totalUsers = sampleUserProfiles.length;
  const verifiedUsers = sampleUserProfiles.filter(p => p.backgroundCheckComplete).length;
  const activeRooms = sampleRooms.filter(r => r.isActive).length;
  const pendingVerifications = totalUsers - verifiedUsers;

  // Calculate matches for demonstration
  const generateMatches = () => {
    const matches = [];
    for (let i = 0; i < sampleUserProfiles.length; i++) {
      for (let j = i + 1; j < sampleUserProfiles.length; j++) {
        const profile1 = sampleUserProfiles[i];
        const profile2 = sampleUserProfiles[j];
        const score = MatchingService.calculateCompatibilityScore(profile1, profile2);
        const compatibleRooms = MatchingService.findCompatibleRooms(profile1, profile2, sampleRooms);
        
        matches.push({
          id: `match_${i}_${j}`,
          user1: profile1,
          user2: profile2,
          compatibilityScore: score,
          suggestedRoom: compatibleRooms[0] || null,
          status: score > 85 ? 'high-potential' : score > 70 ? 'good-match' : 'moderate'
        });
      }
    }
    return matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  };

  const matches = generateMatches();
  const successfulMatches = matches.filter(m => m.compatibilityScore > 85).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high-potential': return 'bg-green-100 text-green-800';
      case 'good-match': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Roomee Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor user activity, matches, and platform safety
              </p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{totalUsers}</h3>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{verifiedUsers}</h3>
                <p className="text-sm text-muted-foreground">Verified Users</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{successfulMatches}</h3>
                <p className="text-sm text-muted-foreground">High-Quality Matches</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Home className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{activeRooms}</h3>
                <p className="text-sm text-muted-foreground">Active Rooms</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Views */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Profiles</TabsTrigger>
            <TabsTrigger value="matches">Match Results</TabsTrigger>
            <TabsTrigger value="rooms">Room Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="brutal-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Sarah Chen completed profile verification</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">New high-compatibility match generated</span>
                    <span className="text-xs text-muted-foreground ml-auto">4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Home className="w-5 h-5 text-orange-600" />
                    <span className="text-sm">New room listing in Business District</span>
                    <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                </div>
              </Card>

              {/* Safety Metrics */}
              <Card className="brutal-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Safety & Trust Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Government ID Verification Rate</span>
                    <span className="font-semibold text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Background Check Completion</span>
                    <span className="font-semibold text-green-600">{Math.round((verifiedUsers/totalUsers)*100)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">User Safety Reports</span>
                    <span className="font-semibold text-green-600">0 Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Trust Score</span>
                    <span className="font-semibold text-blue-600">92/100</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="brutal-card p-6">
              <h3 className="text-lg font-semibold mb-4">User Profiles</h3>
              <div className="space-y-4">
                {sampleUserProfiles.map((profile) => (
                  <div key={profile.id} className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={profile.profilePhoto} alt={profile.fullName} />
                      <AvatarFallback>
                        {profile.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{profile.fullName}</h4>
                        <span className="text-sm text-muted-foreground">({profile.pronouns})</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{profile.age} years</span>
                        <span className="capitalize">{profile.occupation}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {profile.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {profile.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{profile.communityScore}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Trust Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <Card className="brutal-card p-6">
              <h3 className="text-lg font-semibold mb-4">Generated Matches</h3>
              <div className="space-y-4">
                {matches.slice(0, 10).map((match) => (
                  <div key={match.id} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          <Avatar className="w-10 h-10 border-2 border-white">
                            <AvatarImage src={match.user1.profilePhoto} alt={match.user1.fullName} />
                            <AvatarFallback>
                              {match.user1.fullName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <Avatar className="w-10 h-10 border-2 border-white">
                            <AvatarImage src={match.user2.profilePhoto} alt={match.user2.fullName} />
                            <AvatarFallback>
                              {match.user2.fullName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {match.user1.fullName} + {match.user2.fullName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {match.user1.occupation} + {match.user2.occupation}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(match.status)}>
                          {match.status.replace('-', ' ')}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {match.compatibilityScore}%
                          </div>
                          <div className="text-xs text-muted-foreground">compatibility</div>
                        </div>
                      </div>
                    </div>
                    
                    {match.suggestedRoom && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 p-2 rounded">
                        <Home className="w-4 h-4" />
                        <span>Suggested Room: {match.suggestedRoom.title}</span>
                        <span className="ml-auto font-semibold">${match.suggestedRoom.rent}/month</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rooms">
            <Card className="brutal-card p-6">
              <h3 className="text-lg font-semibold mb-4">Room Listings</h3>
              <div className="space-y-4">
                {sampleRooms.map((room) => (
                  <div key={room.id} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{room.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {room.location}
                          </span>
                          <span>Floor {room.floorLevel}</span>
                          <span className="capitalize">{room.bedType} beds</span>
                          <span>{room.furnished ? 'Furnished' : 'Unfurnished'}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">${room.rent}</div>
                        <div className="text-xs text-muted-foreground">per month</div>
                        <Badge className="mt-1" variant={room.isActive ? "default" : "secondary"}>
                          {room.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {room.amenities.slice(0, 5).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity.replace('_', ' ')}
                        </Badge>
                      ))}
                      {room.amenities.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{room.amenities.length - 5} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-xs text-green-600">
                      {room.safetyFeatures.length} safety features • Available from {room.availableFrom.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;