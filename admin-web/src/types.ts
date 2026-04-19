export type ApplicationStatus =
  | 'applied'
  | 'waiting'
  | 'confirmed'
  | 'completed'
  | 'no_show'
  | 'canceled';

export type CompletedClassPhotoRow = {
  id: string;
  completed_class_id: string;
  storage_path: string;
  file_name: string;
  sort_order: number;
  created_at?: string;
};

export type CompletedClassRow = {
  id: string;
  completed_at: string;
  diary: string;
  teacher_comment: string;
  completed_class_photos?: CompletedClassPhotoRow[] | null;
};

export type ApplicationRow = {
  id: string;
  parent_id: string;
  child_id: string;
  class_id: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string | null;
  children: {
    id: string;
    full_name: string;
  } | null;
  classes: {
    id: string;
    title: string;
    country: string;
    flag: string;
    campus: string;
    teacher_name: string;
    starts_at: string;
  } | null;
  completed_classes: CompletedClassRow | CompletedClassRow[] | null;
};

export type AdminProfile = {
  id: string;
  role: 'admin' | 'parent';
  full_name: string | null;
  phone: string | null;
};
