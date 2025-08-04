import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTradeContent } from '@/hooks/useTradeContent';
import { useTradeQuestions } from '@/hooks/useTradeQuestions';
import { TradeType, tradeDefinitions } from '@/types/trade';
import { WizardQuestionCategory } from '@/data/wizard/types';
import { useToast } from '@/hooks/use-toast';
import { 
  migrateWaterproofingQuestions, 
  migrateCheatSheetContent, 
  migrateElite12Content,
  createHVACQuestionTemplate 
} from '@/utils/contentMigration';

const Admin = () => {
  const [selectedTrade, setSelectedTrade] = useState<TradeType>('waterproofing');
  const { toast } = useToast();

  const handleMigrateQuestions = async () => {
    const result = await migrateWaterproofingQuestions();
    if (result.success) {
      toast({
        title: "Success",
        description: `Migrated ${result.count} waterproofing questions`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to migrate questions",
        variant: "destructive",
      });
    }
  };

  const handleMigrateCheatSheet = async () => {
    const result = await migrateCheatSheetContent();
    if (result.success) {
      toast({
        title: "Success",
        description: `Migrated ${result.count} cheat sheet items`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to migrate cheat sheet",
        variant: "destructive",
      });
    }
  };

  const handleMigrateElite12 = async () => {
    const result = await migrateElite12Content();
    if (result.success) {
      toast({
        title: "Success",
        description: `Migrated ${result.count} Elite 12 questions`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to migrate Elite 12",
        variant: "destructive",
      });
    }
  };

  const handleCreateHVAC = async () => {
    const result = await createHVACQuestionTemplate();
    if (result.success) {
      toast({
        title: "Success",
        description: `Created ${result.count} HVAC questions`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to create HVAC questions",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage trade content and questions</p>
        </div>

        <Tabs defaultValue="seeding" className="space-y-6">
          <TabsList>
            <TabsTrigger value="seeding">Data Seeding</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="questions">Question Management</TabsTrigger>
          </TabsList>

          <TabsContent value="seeding">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Migrate Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Import existing waterproofing questions from static data.
                  </p>
                  <Button onClick={handleMigrateQuestions}>
                    Migrate Waterproofing Questions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Migrate Cheat Sheet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Import cheat sheet data to the content management system.
                  </p>
                  <Button onClick={handleMigrateCheatSheet}>
                    Migrate Cheat Sheet
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Migrate Elite 12</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Import Elite 12 questions to content system.
                  </p>
                  <Button onClick={handleMigrateElite12}>
                    Migrate Elite 12
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Create HVAC Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Create sample HVAC questions to start Phase 2.
                  </p>
                  <Button onClick={handleCreateHVAC}>
                    Create HVAC Questions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Trade Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Content management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Question Bank</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Question management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;