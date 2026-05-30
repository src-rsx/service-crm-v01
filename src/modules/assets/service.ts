import { buildPagination } from "@/lib/api/pagination";

import { assetsRepository } from "./repository";

import {
  CreateAssetInput,
  UpdateAssetInput,
} from "./types";

import { companiesRepository }
  from "@/modules/companies/repository";

import { sitesRepository }
  from "@/modules/sites/repository";

interface GetAssetsOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const assetsService = {
  async getAssets(
    tenantId: string,
    options?: GetAssetsOptions
  ) {
    const page = options?.page ?? 1;
    const pageSize =
      options?.pageSize ?? 20;

    const search =
      options?.search ?? "";

    const assets =
      await assetsRepository.findAllByTenant(
        tenantId,
        {
          page,
          pageSize,
          search,
        }
      );

    const total =
      await assetsRepository.countByTenant(
        tenantId,
        search
      );

    const pagination =
      buildPagination(
        page,
        pageSize,
        total
      );

    return {
      assets,
      pagination,
    };
  },

  async createAsset(
    tenantId: string,
    data: CreateAssetInput
  ) {
    const company =
      await companiesRepository.findById(
        tenantId,
        data.companyId
      );

    if (!company) {
      throw new Error(
        "Company not found"
      );
    }

    const site =
      await sitesRepository.findById(
        tenantId,
        data.siteId
      );

    if (!site) {
      throw new Error(
        "Site not found"
      );
    }

    if (
      site.companyId !==
      data.companyId
    ) {
      throw new Error(
        "Site does not belong to company"
      );
    }

    if (data.serialNumber) {
      const existing =
        await assetsRepository.findBySerialNumber(
          tenantId,
          data.serialNumber
        );

      if (existing) {
        throw new Error(
          "Serial number already exists"
        );
      }
    }

    return assetsRepository.create({
      ...data,
      tenantId,
      isActive: true,
    });
  },

  async getAssetById(
    tenantId: string,
    assetId: string
  ) {
    const asset =
      await assetsRepository.findById(
        tenantId,
        assetId
      );

    if (!asset) {
      throw new Error(
        "Asset not found"
      );
    }

    return asset;
  },

  async updateAsset(
    tenantId: string,
    assetId: string,
    data: UpdateAssetInput
  ) {
    const existing =
      await assetsRepository.findById(
        tenantId,
        assetId
      );

    if (!existing) {
      throw new Error(
        "Asset not found"
      );
    }

    if (
      data.companyId &&
      data.siteId
    ) {
      const site =
        await sitesRepository.findById(
          tenantId,
          data.siteId
        );

      if (!site) {
        throw new Error(
          "Site not found"
        );
      }

      if (
        site.companyId !==
        data.companyId
      ) {
        throw new Error(
          "Site does not belong to company"
        );
      }
    }

    return assetsRepository.update(
      tenantId,
      assetId,
      data
    );
  },

  async deactivateAsset(
    tenantId: string,
    assetId: string
  ) {
    const existing =
      await assetsRepository.findById(
        tenantId,
        assetId
      );

    if (!existing) {
      throw new Error(
        "Asset not found"
      );
    }

    return assetsRepository.deactivate(
      tenantId,
      assetId
    );
  },
};