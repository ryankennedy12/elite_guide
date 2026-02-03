import { supabase } from '@/integrations/supabase/client';
import { TradeType } from '@/types/trade';
import { questionBank } from '@/data/questionBank';
import { enhancedCheatSheetData } from '@/data/enhancedCheatSheetData';
import { elite12Data } from '@/data/elite12Data';
import { WizardQuestionCategory } from '@/data/wizard/types';

// Map old categories to new wizard categories
const categoryMapping: Record<string, WizardQuestionCategory> = {
  'Diagnostics': 'Diagnostic / Investigation',
  'Process/Solution': 'System Selection',
  'Proof': 'Risk / Failure / Proof',
  'Red Flag/Insider': 'Risk / Failure / Proof',
  'Cost/Warranty/Risk': 'Cost & Value',
  'Legal/Compliance': 'Compliance / Code',
  'Value/Future-Proofing': 'Cost & Value',
  'Health/Air Quality': 'Health / Safety / Air Quality',
  'Community/External': 'Customer Experience',
  'Empowerment': 'Customer Experience'
};

export const migrateWaterproofingQuestions = async () => {
  try {
    const waterproofingQuestions = questionBank.map((question, index) => ({
      trade: 'waterproofing' as TradeType,
      category: categoryMapping[question.category] || 'Diagnostic / Investigation',
      question: question.question,
      pro_tip: question.proTip || '',
      red_flag: '',
      order_index: index,
      is_active: true,
      metadata: { originalCategory: question.category }
    }));

    const { error } = await supabase
      .from('trade_questions')
      .insert(waterproofingQuestions);

    if (error) throw error;
    return { success: true, count: waterproofingQuestions.length };
  } catch (error) {
    console.error('Error migrating questions:', error);
    return { success: false, error };
  }
};

export const deleteAllWaterproofingQuestions = async () => {
  try {
    const { error } = await supabase
      .from('trade_questions')
      .delete()
      .eq('trade', 'waterproofing');

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting questions:', error);
    return { success: false, error };
  }
};

export const migrateCheatSheetContent = async () => {
  try {
    const contentItems = enhancedCheatSheetData.map((item, index) => ({
      trade: 'waterproofing' as TradeType,
      content_type: 'cheat_sheet',
      content_key: `question_${item.id}`,
      content_value: item.question,
      metadata: { 
        order: index,
        redFlag: item.redFlag,
        proTip: item.proTip 
      }
    }));

    const { error } = await supabase
      .from('trade_content')
      .insert(contentItems);

    if (error) throw error;
    return { success: true, count: contentItems.length };
  } catch (error) {
    console.error('Error migrating cheat sheet:', error);
    return { success: false, error };
  }
};

export const migrateElite12Content = async () => {
  try {
    const contentItems = elite12Data.map((item, index) => ({
      trade: 'waterproofing' as TradeType,
      content_type: 'elite_12',
      content_key: `question_${index + 1}`,
      content_value: item.question,
      metadata: { 
        order: index + 1,
        why: item.why,
        redFlags: item.redFlags,
        followUp: item.followUp,
        proTip: item.proTip
      }
    }));

    const { error } = await supabase
      .from('trade_content')
      .insert(contentItems);

    if (error) throw error;
    return { success: true, count: contentItems.length };
  } catch (error) {
    console.error('Error migrating Elite 12:', error);
    return { success: false, error };
  }
};

export const createHVACQuestionTemplate = async () => {
  try {
    // Create a basic HVAC question set based on waterproofing structure
    const hvacQuestions = [
      {
        trade: 'hvac' as TradeType,
        category: 'Diagnostic / Investigation',
        question: 'How do you diagnose HVAC efficiency issues?',
        pro_tip: 'Look for systematic diagnostic approach using proper testing equipment and load calculations.',
        red_flag: 'They skip diagnostics and immediately recommend full system replacement.',
        order_index: 0
      },
      {
        trade: 'hvac' as TradeType,
        category: 'System Selection',
        question: 'How do you size the right HVAC system for my home?',
        pro_tip: 'They perform Manual J load calculations and consider ductwork, insulation, and home orientation.',
        red_flag: 'They estimate sizing based on square footage alone without detailed calculations.',
        order_index: 1
      },
      {
        trade: 'hvac' as TradeType,
        category: 'Risk / Failure / Proof',
        question: 'What are the most common failure modes for this type of HVAC system?',
        pro_tip: 'They explain specific failure points and have preventive maintenance recommendations.',
        red_flag: 'They claim their systems never fail or avoid discussing potential issues.',
        order_index: 2
      },
      {
        trade: 'hvac' as TradeType,
        category: 'Warranty / Contract',
        question: 'What\'s covered under your HVAC installation warranty?',
        pro_tip: 'Clear distinction between manufacturer warranty and workmanship warranty with specific terms.',
        red_flag: 'Vague warranty terms or they avoid providing warranty details in writing.',
        order_index: 3
      },
      {
        trade: 'hvac' as TradeType,
        category: 'Timeline / Project Management',
        question: 'How do you handle HVAC emergency calls during installation?',
        pro_tip: 'They have emergency protocols and backup plans if primary system fails during installation.',
        red_flag: 'No emergency plan or they say emergencies never happen during their installations.',
        order_index: 4
      }
    ];

    const formattedQuestions = hvacQuestions.map(q => ({
      ...q,
      is_active: true,
      metadata: {}
    }));

    const { error } = await supabase
      .from('trade_questions')
      .insert(formattedQuestions);

    if (error) throw error;
    return { success: true, count: formattedQuestions.length };
  } catch (error) {
    console.error('Error creating HVAC questions:', error);
    return { success: false, error };
  }
};