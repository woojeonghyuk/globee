import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ChildProfile,
} from '@/src/data/classes';
import { supabase } from '@/src/lib/supabase';

type ChildProfileInput = Omit<ChildProfile, 'id'>;

type ChildRow = {
  id: string;
  full_name: string;
  age: number;
  school: string;
  interests: string[];
  note: string;
  gender: ChildProfile['gender'];
};

type ChildProfilesContextValue = {
  children: ChildProfile[];
  addChild: (child: ChildProfileInput) => Promise<void>;
  updateChild: (id: string, child: ChildProfileInput) => Promise<void>;
  deleteChild: (id: string) => Promise<void>;
  refreshChildren: () => Promise<void>;
};

const ChildProfilesContext = createContext<ChildProfilesContextValue | null>(null);

type ChildProfilesProviderProps = {
  children: ReactNode;
};

export function ChildProfilesProvider({ children }: ChildProfilesProviderProps) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);

  const mapChildRow = (row: ChildRow): ChildProfile => ({
    id: row.id,
    fullName: row.full_name,
    age: row.age,
    school: row.school,
    interests: row.interests,
    note: row.note,
    gender: row.gender,
  });

  const refreshChildren = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfiles([]);
        return;
      }

      const { data, error } = await supabase
        .from('children')
        .select('id,full_name,age,school,interests,note,gender')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setProfiles((data as ChildRow[]).map(mapChildRow));
      }
    } catch {
      setProfiles([]);
    }
  }, []);

  useEffect(() => {
    refreshChildren();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        refreshChildren();
      }

      if (event === 'SIGNED_OUT') {
        setProfiles([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [refreshChildren]);

  const value = useMemo<ChildProfilesContextValue>(
    () => ({
      children: profiles,
      refreshChildren,
      addChild: async (child) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setProfiles((prev) => [
            { ...child, id: `child-${Date.now()}` },
            ...prev,
          ]);
          return;
        }

        const { data, error } = await supabase
          .from('children')
          .insert({
            parent_id: user.id,
            full_name: child.fullName,
            age: child.age,
            school: child.school,
            interests: child.interests,
            note: child.note,
            gender: child.gender,
          })
          .select('id,full_name,age,school,interests,note,gender')
          .single();

        if (error) throw error;

        setProfiles((prev) => [mapChildRow(data as ChildRow), ...prev]);
      },
      updateChild: async (id, child) => {
        const { data, error } = await supabase
          .from('children')
          .update({
            full_name: child.fullName,
            age: child.age,
            school: child.school,
            interests: child.interests,
            note: child.note,
            gender: child.gender,
          })
          .eq('id', id)
          .select('id,full_name,age,school,interests,note,gender')
          .single();

        if (error) {
          throw error;
        }

        setProfiles((prev) =>
          prev.map((profile) =>
            profile.id === id ? mapChildRow(data as ChildRow) : profile,
          ),
        );
      },
      deleteChild: async (id) => {
        const { error } = await supabase.from('children').delete().eq('id', id);
        if (error) throw error;

        setProfiles((prev) => prev.filter((profile) => profile.id !== id));
      },
    }),
    [profiles, refreshChildren],
  );

  return (
    <ChildProfilesContext.Provider value={value}>
      {children}
    </ChildProfilesContext.Provider>
  );
}

export function useChildProfiles() {
  const value = useContext(ChildProfilesContext);

  if (!value) {
    throw new Error('useChildProfiles must be used within ChildProfilesProvider');
  }

  return value;
}
