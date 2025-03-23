
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/types';
import { supabase } from '@/lib/supabase';

// Convert Supabase user to our User type
export const handleUserLogin = async (supabaseUser: SupabaseUser): Promise<User | null> => {
  try {
    // First check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();
    
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching profile:', profileError);
      throw profileError;
    }
    
    let userProfile = profile;
    
    // If profile doesn't exist, create one
    if (!profile) {
      const newProfile = {
        id: supabaseUser.id,
        username: supabaseUser.email?.split('@')[0] || 'user',
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`,
        level: 1,
        points: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      try {
        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
        
        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }
        
        userProfile = createdProfile;
      } catch (createErr) {
        console.error('Failed to create profile:', createErr);
        // Fallback to use the new profile object if Supabase insert fails
        userProfile = newProfile;
      }
    }
    
    // Map to our User type
    const mappedUser: User = {
      id: supabaseUser.id,
      username: userProfile.username,
      email: supabaseUser.email || '',
      avatar: userProfile.avatar_url || undefined,
      role: 'user',
      points: userProfile.points,
      level: userProfile.level,
      createdAt: new Date(userProfile.created_at)
    };
    
    return mappedUser;
  } catch (err) {
    console.error('Error in handleUserLogin:', err);
    return null;
  }
};
