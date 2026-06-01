export interface AssetFormValues {
  companyId: string;

  siteId: string;

  manufacturerId: string;

  assetCode: string;
  assetName: string;

  equipmentType?: string;

  model?: string;
  serialNumber?: string;

  location?: string;

  remarks?: string;
}