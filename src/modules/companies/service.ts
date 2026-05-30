import { companiesRepository } from "./repository";
import { CreateCompanyInput } from "./types";

export const companiesService = {
  async getCompanies(
    tenantId: string
  ) {
    return companiesRepository.findAllByTenant(
      tenantId
    );
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
};