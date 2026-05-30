export interface AssetFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateAssetInput {
  companyId: string;
  siteId: string;
  manufacturerId: string;

  assetCode: string;
  assetName: string;

  equipmentType?: string;

  model?: string;
  serialNumber?: string;

  purchaseDate?: string;

  installationDate?: string;

  warrantyStartDate?: string;
  warrantyExpiryDate?: string;

  location?: string;

  status?: string;

  remarks?: string;
}

export interface UpdateAssetInput
  extends Partial<CreateAssetInput> {}