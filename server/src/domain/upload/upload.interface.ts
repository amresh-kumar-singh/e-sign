export interface AddEsignTag {
  template_id: string;
  role1: RoleInfo;
  role2: RoleInfo;
  role3: RoleInfo;
}

interface RoleInfo {
  name: string;
  email: string;
}
