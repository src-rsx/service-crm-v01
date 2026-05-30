export interface EngineerFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateEngineerInput {
  employeeCode?: string;

  name: string;

  mobile?: string;

  email?: string;

  designation?: string;
}

export interface UpdateEngineerInput
  extends Partial<CreateEngineerInput> {}