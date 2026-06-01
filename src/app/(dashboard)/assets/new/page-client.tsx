"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AssetCreateClient({
  companies,
  sites,
}: any) {
  const router = useRouter();

  const [form, setForm] =
    useState({
      companyId: "",
      siteId: "",
      manufacturerId:
        "392ea85e-83aa-4855-b16c-d1da447a710d",

      assetCode: "",
      assetName: "",
      model: "",
      serialNumber: "",
    });

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch("/api/assets", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(form),
    });

    router.push("/assets");
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 max-w-xl"
    >
      <h1 className="text-2xl font-semibold">
        Create Asset
      </h1>

      <select
        className="w-full border p-2"
        value={form.companyId}
        onChange={(e) =>
          setForm({
            ...form,
            companyId:
              e.target.value,
          })
        }
      >
        <option value="">
          Select Company
        </option>

        {companies.map(
          (company: any) => (
            <option
              key={company.id}
              value={company.id}
            >
              {company.companyName}
            </option>
          )
        )}
      </select>

      <select
        className="w-full border p-2"
        value={form.siteId}
        onChange={(e) =>
          setForm({
            ...form,
            siteId:
              e.target.value,
          })
        }
      >
        <option value="">
          Select Site
        </option>

        {sites.map(
          (site: any) => (
            <option
              key={site.id}
              value={site.id}
            >
              {site.siteName}
            </option>
          )
        )}
      </select>

      <input
        className="w-full border p-2"
        placeholder="Asset Code"
        value={form.assetCode}
        onChange={(e) =>
          setForm({
            ...form,
            assetCode:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Asset Name"
        value={form.assetName}
        onChange={(e) =>
          setForm({
            ...form,
            assetName:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Model"
        value={form.model}
        onChange={(e) =>
          setForm({
            ...form,
            model:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Serial Number"
        value={form.serialNumber}
        onChange={(e) =>
          setForm({
            ...form,
            serialNumber:
              e.target.value,
          })
        }
      />

      <button
        type="submit"
        className="rounded border px-4 py-2"
      >
        Save Asset
      </button>
    </form>
  );
}