import { sitesRepository } from "./repository";

import {
    CreateSiteInput,
    UpdateSiteInput,
} from "./types";

import { buildPagination } from "@/lib/api/pagination";

import { companiesRepository }
    from "@/modules/companies/repository";

interface GetSitesOptions {
    page?: number;
    pageSize?: number;
    search?: string;
}

export const sitesService = {
    async getSites(
        tenantId: string,
        options?: GetSitesOptions
    ) {
        const page = options?.page ?? 1;
        const pageSize = options?.pageSize ?? 20;
        const search = options?.search ?? "";

        const sites =
            await sitesRepository.findAllByTenant(
                tenantId,
                {
                    page,
                    pageSize,
                    search,
                }
            );

        const total =
            await sitesRepository.countByTenant(
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
            sites,
            pagination,
        };
    },

    async getSiteById(
        tenantId: string,
        siteId: string
    ) {
        const site =
            await sitesRepository.findById(
                tenantId,
                siteId
            );

        if (!site) {
            throw new Error(
                "Site not found"
            );
        }

        return site;
    },

    async createSite(
        tenantId: string,
        data: CreateSiteInput
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

        return sitesRepository.create({
            ...data,
            tenantId,
            isActive: true,
        });
    },

    async updateSite(
        tenantId: string,
        siteId: string,
        data: UpdateSiteInput
    ) {
        const existing =
            await sitesRepository.findById(
                tenantId,
                siteId
            );

        if (!existing) {
            throw new Error(
                "Site not found"
            );
        }

        if (data.companyId) {
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
        }

        return sitesRepository.update(
            tenantId,
            siteId,
            data
        );
    },

    async deactivateSite(
        tenantId: string,
        siteId: string
    ) {
        const existing =
            await sitesRepository.findById(
                tenantId,
                siteId
            );

        if (!existing) {
            throw new Error(
                "Site not found"
            );
        }

        return sitesRepository.deactivate(
            tenantId,
            siteId
        );
    },
};