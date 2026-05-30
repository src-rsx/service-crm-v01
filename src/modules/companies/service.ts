import { companiesRepository } from "./repository";
import { UpdateCompanyInput } from "./schemas";
import { CreateCompanyInput } from "./types";
import { buildPagination } from "@/lib/api/pagination";

interface GetCompaniesOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const companiesService = {
  async getCompanies(
    tenantId: string,
    options?: GetCompaniesOptions
  ) {
    const page = options?.page ?? 1;
    const pageSize = options?.pageSize ?? 20;
    const search = options?.search ?? "";

    const companies =
      await companiesRepository.findAllByTenant(
        tenantId,
        {
          page,
          pageSize,
          search,
        }
      );

    const total =
      await companiesRepository.countByTenant(
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
      companies,
      pagination,
    };
  },

  async createCompany(
    tenantId: string,
    data: CreateCompanyInput
  ) {
    const existing =
      await companiesRepository.findByCustomerCode(
        tenantId,
        data.customerCode
      );

    if (existing) {
      throw new Error(
        "Customer code already exists"
      );
    }

    return companiesRepository.create({
      ...data,
      tenantId,
      isActive: true,
    });
  },

  async getCompanyById(
    tenantId: string,
    companyId: string
  ) {
    const company =
      await companiesRepository.findById(
        tenantId,
        companyId
      );

    if (!company) {
      throw new Error(
        "Company not found"
      );
    }

    return company;
  },

  async updateCompany(
    tenantId: string,
    companyId: string,
    data: UpdateCompanyInput
  ) {
    const existing =
      await companiesRepository.findById(
        tenantId,
        companyId
      );

    if (!existing) {
      throw new Error(
        "Company not found"
      );
    }

    return companiesRepository.update(
      tenantId,
      companyId,
      data
    );
  },

  async deactivateCompany(
    tenantId: string,
    companyId: string
  ) {
    const existing =
      await companiesRepository.findById(
        tenantId,
        companyId
      );

    if (!existing) {
      throw new Error(
        "Company not found"
      );
    }

    return companiesRepository.deactivate(
      tenantId,
      companyId
    );
  }
};