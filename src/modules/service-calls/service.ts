import { buildPagination }
  from "@/lib/api/pagination";

import {
  serviceCallsRepository,
} from "./repository";

import {
  CreateServiceCallInput,
  UpdateServiceCallInput,
} from "./types";

import { companiesRepository }
  from "@/modules/companies/repository";

import { sitesRepository }
  from "@/modules/sites/repository";

import { assetsRepository }
  from "@/modules/assets/repository";

interface GetServiceCallsOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

/* ---------- HELPER ---------- */
function generateCallNumber(
  latest?: string
) {
  if (!latest) {
    return "SC-000001";
  }

  const current =
    Number(
      latest
        .replace("SC-", "")
        .trim()
    ) || 0;

  const next = current + 1;

  return `SC-${String(next)
    .padStart(6, "0")}`;
}

export const serviceCallsService = {
  async getServiceCalls(
    tenantId: string,
    options?: GetServiceCallsOptions
  ) {
    const page =
      options?.page ?? 1;

    const pageSize =
      options?.pageSize ?? 20;

    const search =
      options?.search ?? "";

    const serviceCalls =
      await serviceCallsRepository.findAllByTenant(
        tenantId,
        {
          page,
          pageSize,
          search,
        }
      );

    const total =
      await serviceCallsRepository.countByTenant(
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
      serviceCalls,
      pagination,
    };
  },

  async createServiceCall(
    tenantId: string,
    data: CreateServiceCallInput
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

    if (data.assetId) {
      const asset =
        await assetsRepository.findById(
          tenantId,
          data.assetId
        );

      if (!asset) {
        throw new Error(
          "Asset not found"
        );
      }

      if (
        asset.siteId !==
        data.siteId
      ) {
        throw new Error(
          "Asset does not belong to site"
        );
      }
    }

    const latest =
      await serviceCallsRepository.getLatestCallNumber(tenantId);

    const callNumber =
      generateCallNumber(
        latest
      );

    return serviceCallsRepository.create({
      ...data,

      tenantId,

      callNumber,

      status: "OPEN",

      openedAt:
        new Date(),
    });
  },

  async getServiceCallById(
    tenantId: string,
    serviceCallId: string
  ) {
    const serviceCall =
      await serviceCallsRepository.findById(
        tenantId,
        serviceCallId
      );

    if (!serviceCall) {
      throw new Error(
        "Service call not found"
      );
    }

    return serviceCall;
  },

  async updateServiceCall(
    tenantId: string,
    serviceCallId: string,
    data: UpdateServiceCallInput
  ) {
    const existing =
      await serviceCallsRepository.findById(
        tenantId,
        serviceCallId
      );

    if (!existing) {
      throw new Error(
        "Service call not found"
      );
    }

    return serviceCallsRepository.update(
      tenantId,
      serviceCallId,
      data
    );
  },
};