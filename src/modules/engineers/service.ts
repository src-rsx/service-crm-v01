import { buildPagination } from "@/lib/api/pagination";

import { engineersRepository } from "./repository";

import {
  CreateEngineerInput,
  UpdateEngineerInput,
} from "./types";

interface GetEngineersOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

function generateEmployeeCode(
  latest?: string | null
) {
  if (!latest) {
    return "ENG-000001";
  }

  const match =
    latest.match(/ENG-(\d+)/);

  if (!match) {
    return "ENG-000001";
  }

  const current =
    Number(match[1]) || 0;

  const next = current + 1;

  return `ENG-${String(next)
    .padStart(6, "0")}`;
}

export const engineersService = {
  async getEngineers(
    tenantId: string,
    options?: GetEngineersOptions
  ) {
    const page =
      options?.page ?? 1;

    const pageSize =
      options?.pageSize ?? 20;

    const search =
      options?.search ?? "";

    const engineers =
      await engineersRepository.findAllByTenant(
        tenantId,
        {
          page,
          pageSize,
          search,
        }
      );

    const total =
      await engineersRepository.countByTenant(
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
      engineers,
      pagination,
    };
  },

  async createEngineer(
    tenantId: string,
    data: CreateEngineerInput
  ) {
    let employeeCode =
      data.employeeCode;

    if (!employeeCode) {
      const latest =
        await engineersRepository.getLatestGeneratedEmployeeCode(
          tenantId
        );

      employeeCode =
        generateEmployeeCode(
          latest
        );
    }

    const existing =
      await engineersRepository.findByEmployeeCode(
        tenantId,
        employeeCode
      );

    if (existing) {
      throw new Error(
        "Employee code already exists"
      );
    }

    return engineersRepository.create({
      ...data,
      tenantId,
      employeeCode,
      isActive: true,
    });
  },

  async getEngineerById(
    tenantId: string,
    engineerId: string
  ) {
    const engineer =
      await engineersRepository.findById(
        tenantId,
        engineerId
      );

    if (!engineer) {
      throw new Error(
        "Engineer not found"
      );
    }

    return engineer;
  },

  async updateEngineer(
    tenantId: string,
    engineerId: string,
    data: UpdateEngineerInput
  ) {
    const existing =
      await engineersRepository.findById(
        tenantId,
        engineerId
      );

    if (!existing) {
      throw new Error(
        "Engineer not found"
      );
    }

    if (
      data.employeeCode &&
      data.employeeCode !==
        existing.employeeCode
    ) {
      const duplicate =
        await engineersRepository.findByEmployeeCode(
          tenantId,
          data.employeeCode
        );

      if (duplicate) {
        throw new Error(
          "Employee code already exists"
        );
      }
    }

    return engineersRepository.update(
      tenantId,
      engineerId,
      data
    );
  },

  async deactivateEngineer(
    tenantId: string,
    engineerId: string
  ) {
    const existing =
      await engineersRepository.findById(
        tenantId,
        engineerId
      );

    if (!existing) {
      throw new Error(
        "Engineer not found"
      );
    }

    return engineersRepository.deactivate(
      tenantId,
      engineerId
    );
  },
};