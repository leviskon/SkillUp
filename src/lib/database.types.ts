export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          role: 'admin' | 'teacher' | 'student';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          role: 'admin' | 'teacher' | 'student';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          role?: 'admin' | 'teacher' | 'student';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}